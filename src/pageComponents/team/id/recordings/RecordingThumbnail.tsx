import { EndToEndTestContext } from "@/components/EndToEndTestContext";
import { Icon } from "@/components/Icon";
import { SessionContext } from "@/components/SessionContext";
import { getRecordingThumbnailClient } from "@/graphql/queries/getRecordingThumbnail";
import { RecordingTarget, getRecordingTarget } from "@/utils/recording";
import { MutableRefObject, Suspense, useContext, useEffect, useRef, useState } from "react";

type Props = { buildId: string; recordingId: string };

// This data is lazy-loaded on the client because we currently store full-size thumbnails and loading them is slow
export function RecordingThumbnail(props: Props) {
  return (
    <Suspense fallback={null}>
      <RecordingThumbnailSuspends {...props} />
    </Suspense>
  );
}

function RecordingThumbnailSuspends({ buildId, recordingId }: Props) {
  const { mockGraphQLData } = useContext(EndToEndTestContext);
  const { accessToken } = useContext(SessionContext);

  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const elementRef = useRef<HTMLElement>();

  const target = getRecordingTarget(buildId);

  useEffect(() => {
    if (accessToken == null || target === RecordingTarget.unknown) {
      return;
    }

    const element = elementRef.current!;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          getRecordingThumbnailClient(accessToken, recordingId, mockGraphQLData).then(thumbnail => {
            setThumbnail(thumbnail);
          });

          observer.disconnect();
        }
      });
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [accessToken, mockGraphQLData, recordingId, target]);

  if (thumbnail) {
    return (
      <img
        alt="Recording thumbnail"
        className="w-full h-9 rounded-sm"
        ref={elementRef as MutableRefObject<HTMLImageElement>}
        src={thumbnail}
      />
    );
  } else {
    return (
      <div
        className="flex items-center justify-center w-full h-full"
        ref={elementRef as MutableRefObject<HTMLDivElement>}
      >
        <Icon
          className="w-6 h-6 text-gray-700"
          type={
            target === RecordingTarget.node ? "recording-graphic-node" : "recording-graphic-browser"
          }
        />
      </div>
    );
  }
}

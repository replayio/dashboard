import { Icon } from "@/components/Icon";
import { SessionContext } from "@/components/SessionContext";
import { getRecordingThumbnailClient } from "@/graphql/queries/getRecordingThumbnail";
import {
  MutableRefObject,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const EMPTY =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

// This data is lazy-loaded on the client because we currently store full-size thumbnails and loading them is slow
export function RecordingThumbnail({ recordingId }: { recordingId: string }) {
  return (
    <Suspense fallback={null}>
      <RecordingThumbnailSuspends recordingId={recordingId} />
    </Suspense>
  );
}

function RecordingThumbnailSuspends({ recordingId }: { recordingId: string }) {
  const { accessToken } = useContext(SessionContext);

  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const elementRef = useRef<HTMLElement>();

  useEffect(() => {
    if (accessToken == null) {
      return;
    }

    const element = elementRef.current!;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          getRecordingThumbnailClient(accessToken, recordingId).then(
            (thumbnail) => {
              setThumbnail(thumbnail);
            }
          );

          observer.disconnect();
        }
      });
    });
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [accessToken, recordingId]);

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
          type="recording-no-screenshot-fallback"
        />
      </div>
    );
  }
}

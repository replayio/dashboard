import { SessionContext } from "@/components/SessionContext";
import { getRecordingThumbnailClient } from "@/graphql/queries/getRecordingThumbnail";
import { Suspense, useContext, useEffect, useRef, useState } from "react";

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

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (accessToken == null) {
      return;
    }

    const image = imageRef.current!;

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
    observer.observe(image);

    return () => {
      observer.disconnect();
    };
  }, [accessToken, recordingId]);

  return (
    <img
      alt="Recording thumbnail"
      className="w-full h-9 rounded-sm"
      ref={imageRef}
      src={thumbnail ?? EMPTY}
    />
  );
}

"use client";

import { useRecordingThumbnail } from "@/graphql/queries/getRecordingThumbnail";
import { Suspense } from "react";

// This data is lazy-loaded on the client because we currently store full-size thumbnails and loading them is slow
export function RecordingThumbnail({ recordingId }: { recordingId: string }) {
  return (
    <Suspense fallback={null}>
      <RecordingThumbnailSuspends recordingId={recordingId} />
    </Suspense>
  );
}

function RecordingThumbnailSuspends({ recordingId }: { recordingId: string }) {
  const thumbnail = useRecordingThumbnail(recordingId);
  return thumbnail ? (
    <img
      alt="Recording thumbnail"
      className="w-full h-9 rounded-sm"
      src={thumbnail}
    />
  ) : null;
}

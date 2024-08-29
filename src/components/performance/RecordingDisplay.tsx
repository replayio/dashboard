import { RecordingLink } from "./RecordingLink";

// Displays overall information about the recording being examined.

interface RecordingDisplayProps {
  recordingURL: string;
}

export function RecordingDisplay(props: RecordingDisplayProps) {
  const { recordingURL } = props;

  const url = new URL(recordingURL);
  const name = url.host;

  return (
    <div className="RecordingInfo">
      <RecordingLink
        className="DefaultRecordingLink"
        text={`Recording of ${name}`}
        point={undefined}
        time={undefined}
      ></RecordingLink>
    </div>
  );
}

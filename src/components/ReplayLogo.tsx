import Image from "next/image";

export function ReplayLogo() {
  return (
    <Image
      alt="Replay logo"
      className="h-8 w-8"
      height={32}
      src="/images/replay-logo.svg"
      width={32}
    />
  );
}

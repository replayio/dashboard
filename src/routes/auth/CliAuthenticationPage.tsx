import { SessionContext } from "@/components/SessionContext";
import { useContext } from "react";

export function CliAuthenticationPage() {
  const { accessToken } = useContext(SessionContext);

  // TODO: Implement the CLI authentication page
  if (accessToken) {
    return (
      <div className="text-white">Would you like to authorize the CLI?</div>
    );
  } else {
    return <div className="text-white">You need to sign in</div>;
  }
}

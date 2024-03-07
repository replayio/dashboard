import { redirect } from "next/navigation";

export default function Home() {
  // TODO Redirect to the most recently viewed team/page
  return redirect("/team/me/recordings");
}

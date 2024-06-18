import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

export default function MixPanel() {
  useEffect(() => {
    // Initialize MixPanel with the provided project token
    mixpanel.init("ffaeda9ef8fb976a520ca3a65bba5014", {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
  }, []);

  return null;
}

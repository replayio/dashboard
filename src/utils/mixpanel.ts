import mixpanel from "mixpanel-browser";

export const initializeMixPanel = () => {
  mixpanel.init("ffaeda9ef8fb976a520ca3a65bba5014", {
    track_pageview: true,
    persistence: "localStorage",
    api_host: "https://holger.evandor.de",
  });
};

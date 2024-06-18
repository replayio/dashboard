import mixpanel from "mixpanel-browser";

export const initializeMixPanel = () => {
  mixpanel.init("ffaeda9ef8fb976a520ca3a65bba5014", {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
  });
};

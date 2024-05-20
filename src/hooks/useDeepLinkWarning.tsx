import { useCallback, useEffect, useRef, useState } from "react";

export function useDeepLinkWarning({
  deepLinkReferenceFound,
  isLoading,
  urlHasDeepLink: urlHasDeepLinkProp,
}: {
  deepLinkReferenceFound: boolean;
  isLoading: boolean;
  urlHasDeepLink: boolean;
}) {
  // This prop is only meaningful during mount but URL updates may cause this value to change
  // Using a ref helps ignore updates after mount
  // For more details see PRO-425
  const urlHasDeepLink = useRef(urlHasDeepLinkProp);

  const [{ hasLoadedInitialData, showWarning }, setState] = useState<{
    hasLoadedInitialData: boolean;
    showWarning: boolean;
  }>({
    hasLoadedInitialData: false,
    showWarning: false,
  });

  useEffect(() => {
    if (!urlHasDeepLink) {
      return;
    }

    if (!isLoading && !hasLoadedInitialData) {
      setState({
        hasLoadedInitialData: true,
        showWarning: !deepLinkReferenceFound,
      });
    }
  }, [deepLinkReferenceFound, hasLoadedInitialData, isLoading, showWarning, urlHasDeepLink]);

  const dismissWarning = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      showWarning: false,
    }));
  }, []);

  return {
    dismissWarning,
    showWarning,
  };
}

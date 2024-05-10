import { useCallback, useEffect, useState } from "react";

export function useDeepLinkWarning({
  deepLinkReferenceFound,
  isLoading,
  urlHasDeepLink,
}: {
  deepLinkReferenceFound: boolean;
  isLoading: boolean;
  urlHasDeepLink: boolean;
}) {
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

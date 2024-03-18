import { AUTH_REDIRECT_URI, LOCAL_STORAGE } from "@/constants";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import useLocalStorage from "@/hooks/useLocalStorage";
import { User, useAuth0 } from "@auth0/auth0-react";
import { PropsWithChildren, createContext } from "react";

export type SessionContextType = {
  accessToken: string | null;
  isLoading: boolean;
  user: User | null;
};

export const SessionContext = createContext<SessionContextType>({
  accessToken: null,
  isLoading: true,
  user: null,
});

export function SessionContextProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    LOCAL_STORAGE.accessToken,
    null
  );

  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    user = null,
  } = useAuth0();

  useIsomorphicLayoutEffect(() => {
    if (isLoading) {
      return;
    }

    if (isAuthenticated) {
      getAccessTokenSilently().then((accessToken) => {
        setAccessToken(accessToken);
      });
    } else {
      loginWithRedirect({
        authorizationParams: {
          audience: "https://api.replay.io",
          code_challenge_method: "S256",
          redirect_uri: AUTH_REDIRECT_URI,
          response_type: "code",
          scope: "openid profile offline_access",
        },
      });
    }
  }, [
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    setAccessToken,
  ]);

  return (
    <SessionContext.Provider value={{ accessToken, isLoading, user }}>
      {accessToken == null ? null : children}
    </SessionContext.Provider>
  );
}

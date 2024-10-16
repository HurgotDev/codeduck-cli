"use client";
import authenticationService from "@/shared/client/services/authentication.service";
import useLoading from "@/shared/hooks/useLoading";
import {type User} from "@/shared/types/user";

import useSaveSession from "./useSaveSession";

export interface OptionsProps {
  onSuccess?: (user: User, accessToken: string) => void;
  onError?: (error: Error) => void;
}

export default function useLogin(options?: OptionsProps) {
  const [{loading, loadingRef}, setLoading] = useLoading();

  const {saveSession} = useSaveSession();

  const login = (email: string, password: string) => {
    if (loadingRef) return;

    setLoading(true);

    authenticationService
      .authenticate({
        email,
        password,
        strategy: "local",
      })
      .then(async ({user, accessToken}) => {
        await saveSession({user: user as User, accessToken: accessToken as string});
        options?.onSuccess?.(user as User, accessToken as string);
      })
      // eslint-disable-next-line @typescript-eslint/use-unknown-in-catch-callback-variable
      .catch((error) => {
        options?.onError?.(error as Error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    login,
  };
}

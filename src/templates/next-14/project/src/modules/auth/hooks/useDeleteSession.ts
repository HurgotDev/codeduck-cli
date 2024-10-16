"use client";
import authenticationService from "@/shared/client/services/authentication.service";
import useLoading from "@/shared/hooks/useLoading";
import {useAuth} from "@/modules/auth/context";

export interface OptionsProps {
  onSuccess?: () => void;
}

export default function useDeleteSession(options?: OptionsProps) {
  const [{loading, loadingRef}, setLoading] = useLoading();

  const {setSession} = useAuth();

  const deleteSession = async () => {
    if (loadingRef) {
      return;
    }

    try {
      setLoading(true);

      await Promise.all([
        authenticationService.logout(),
        fetch("/api/auth/session", {
          method: "DELETE",
        }),
      ]);

      options?.onSuccess?.();
      setSession(null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error deleting session", error);
    } finally {
      setLoading(false);
    }
  };

  return {deleteSession, loading};
}

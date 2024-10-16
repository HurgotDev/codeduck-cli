"use client";

import React from "react";
import {useRouter} from "next/navigation";

import useDeleteSession from "@/modules/auth/hooks/useDeleteSession";

export default function LogoutPage() {
  const router = useRouter();

  const {deleteSession} = useDeleteSession({
    onSuccess() {
      router.push("/login");
    },
  });

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    deleteSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

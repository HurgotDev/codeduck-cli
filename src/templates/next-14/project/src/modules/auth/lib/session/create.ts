"use server";

import {cookies} from "next/headers";

import environment from "@/shared/environment";

export async function saveSession(accessToken: string) {
  return Promise.resolve(
    cookies().set(environment.sessionTokenName, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    }),
  );
}

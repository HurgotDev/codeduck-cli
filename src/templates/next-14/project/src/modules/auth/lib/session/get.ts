"use server";

import {cookies} from "next/headers";

import environment from "@/shared/environment";
import {type User} from "@/shared/types/user";
import authenticationService from "@/shared/client/services/authentication.service";

import {type Session} from "./types";

export async function getSession(): Promise<Session | null> {
  try {
    const sessionToken = cookies().get(environment.sessionTokenName)?.value;

    if (!sessionToken) {
      return null;
    }

    const {user, accessToken} = await authenticationService.authenticate({
      strategy: "jwt",
      accessToken: sessionToken,
    });

    return {
      user: user as User,
      accessToken: accessToken as string,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error getting session:", error);

    return null;
  }
}

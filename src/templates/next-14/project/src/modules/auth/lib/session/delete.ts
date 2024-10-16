"use server";

import {cookies} from "next/headers";

import environment from "@/shared/environment";

export async function deleteSession() {
  return Promise.resolve(cookies().delete(environment.sessionTokenName));
}

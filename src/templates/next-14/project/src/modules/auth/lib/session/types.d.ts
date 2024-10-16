import {type User} from "@/shared/types/user";

export interface Session {
  user: User;
  accessToken: string;
}

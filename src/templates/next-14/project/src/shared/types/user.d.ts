import {type BaseDto} from "./base";

export interface User extends BaseDto {
  email: string;
  first_name: string;
  last_name: string;
}

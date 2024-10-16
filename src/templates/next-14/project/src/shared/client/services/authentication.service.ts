import {type ClientService} from "@feathersjs/feathers";

import {type User} from "@/shared/types/user";
import {app} from "@/shared/client/client.feathers";

declare module "@/declarations" {
  interface ServiceTypes {
    authentication: ClientService<User>;
  }
}

const authenticationService = app.authentication;

export default authenticationService;

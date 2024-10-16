import {feathers} from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import authentication from "@feathersjs/authentication-client";
import axios from "axios";

import {type Application} from "@/declarations";
import environment from "@/shared/environment";

export const app: Application = feathers();

const restClient = rest(environment.apiBaseUrl);

app.configure(restClient.axios(axios));
app.configure(
  authentication({
    storageKey: environment.sessionTokenName,
  }),
);

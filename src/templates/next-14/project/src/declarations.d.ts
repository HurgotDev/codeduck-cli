import type {Application as FeathersApplication} from "@feathersjs/feathers";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServiceTypes {}

export type Application = FeathersApplication<ServiceTypes>;

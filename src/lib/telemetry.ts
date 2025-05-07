import os from "os";

import {PostHog} from "posthog-node";
import picocolors from "picocolors";

import pkg from "../../package.json";

import {TELEMETRY_API_KEY, TELEMETRY_HOST, TELEMETRY_ENABLED_ENV_VAR} from "./constants";

export const TELEMETRY_ENABLED = process.env[TELEMETRY_ENABLED_ENV_VAR] !== "0";

const client = TELEMETRY_ENABLED
  ? new PostHog(TELEMETRY_API_KEY!, {
      host: TELEMETRY_HOST,
    })
  : null;

export function trackEvent(event: string, properties: Record<string, unknown> = {}) {
  if (!client) {
    return;
  }

  client.capture({
    distinctId: os.userInfo().username || "anonymous",
    event,
    properties: {
      os: os.platform(),
      node_version: process.version,
      codeduck_cli_version: pkg.version,
      ...properties,
    },
  });
}

export function shutdownTelemetry() {
  client?.shutdown();
}

export function showTelemetryStatus() {
  if (TELEMETRY_ENABLED) {
    console.log(
      picocolors.yellow(
        `\nℹ️  Telemetry is enabled. You can disable it by setting the environment variable ${TELEMETRY_ENABLED_ENV_VAR}=0\n`,
      ),
    );
  }
}

export function withTelemetry<T>(
  fn: () => T,
  {event, properties = {}}: {event: string; properties?: Record<string, unknown>},
) {
  return () => {
    showTelemetryStatus();
    trackEvent(event, properties);
    shutdownTelemetry();

    return fn();
  };
}

"use client";

import React from "react";

export function useDebounce(callback: () => void, deps: unknown[], delayMs = 800): void {
  React.useEffect(() => {
    const timeout = setTimeout(callback, delayMs);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

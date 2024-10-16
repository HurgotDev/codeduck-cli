"use client";
import React from "react";

export default function useLoading(
  initialState = false,
): [{loading: boolean; loadingRef: boolean}, (state: boolean) => void] {
  const [loading, setLoading] = React.useState(initialState);

  const loadingRef = React.useRef(initialState);

  const updateLoading = (state: boolean) => {
    setLoading(state);
    loadingRef.current = state;
  };

  return [
    {
      loading,
      loadingRef: loadingRef.current,
    },
    updateLoading,
  ];
}

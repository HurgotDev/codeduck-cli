function getSessionTokenName() {
  const value = process.env.NEXT_PUBLIC_SESSION_TOKEN_NAME;

  if (!value) {
    throw new Error(`Environment NEXT_PUBLIC_SESSION_TOKEN_NAME is missing!`);
  }

  return value;
}

function getApiBaseUrl() {
  const value = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!value) {
    throw new Error("Environment NEXT_PUBLIC_API_BASE_URL is missing!");
  }

  return value;
}

export default {
  sessionTokenName: getSessionTokenName(),
  apiBaseUrl: getApiBaseUrl(),
};

export const apiPost = async (endpoint: string, body: string) => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) return true;
  } catch {
    return false;
  }
  return false;
};

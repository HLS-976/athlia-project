export async function fetchWithAuth(url, options = {}) {
  let accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  // Function to refresh token
  async function refreshAccessToken() {
    if (!refreshToken) return null;
    try {
      const response = await fetch("http://localhost:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) return null;

      const data = await response.json();
      localStorage.setItem("accessToken", data.access);
      return data.access;
    } catch (err) {
      console.error("Token refresh failed:", err);
      return null;
    }
  }

  // If no access token, try refreshing it
  if (!accessToken) {
    console.log("Access token missing, trying to refresh...");
    accessToken = await refreshAccessToken();

    if (!accessToken) {
      localStorage.clear();
      window.location.href = "/login";
      return null;
    }
  }

  // Attach token to headers
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  let response = await fetch(url, options);

  // If token expired or invalid, retry once with refreshed token
  if (response.status === 401) {
    console.warn("Access token possibly expired. Retrying...");
    const newToken = await refreshAccessToken();
    if (newToken) {
      localStorage.setItem("accessToken", newToken);
      options.headers.Authorization = `Bearer ${newToken}`;
      response = await fetch(url, options);
    } else {
      localStorage.clear();
      window.location.href = "/login";
      return null;
    }
  }

  return response;
}

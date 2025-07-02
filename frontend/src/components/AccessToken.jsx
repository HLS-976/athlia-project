export async function refreshAccessToken() {
  console.log("Attempting to refresh access token...");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const response = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      // Refresh token invalide ou expiré
      console.warn("Refresh failed, need to login again.");
      localStorage.clear();
      return null;
    }

    const data = await response.json();
    console.log("Access token refreshed successfully:");
    localStorage.setItem("accessToken", data.access);
    return data.access;
  } catch (error) {
    console.error("Refresh token error:", error);
    return null;
  }
}

export async function fetchWithAuth(url, options = {}) {
  let accessToken = localStorage.getItem("accessToken");

  // Ajoute le token d'accès à la requête
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    // Token expiré, tente de le rafraîchir
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
      // Rejoue la requête avec le nouveau token
      options.headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(url, options);
    } else {
      // Redirige vers login
      window.location.href = "/login";
    }
  }

  return response;
}

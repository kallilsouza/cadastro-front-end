export const isAuthenticated = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      return true;
    }
    return false;
  };
  
export const getToken = () => localStorage.getItem("accessToken");
export const getUsername = () => localStorage.getItem("username");

export const login = (tokens) => {
  localStorage.setItem("accessToken", tokens.access);
  localStorage.setItem("refreshToken", tokens.refresh);
  const { username } = parseJwt(tokens.refresh);
  localStorage.setItem("username", username);
};
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};
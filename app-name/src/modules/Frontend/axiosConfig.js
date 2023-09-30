import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/", // Replace with your API base URL
  timeout: 5000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      // Handle the case where there is no refresh token, e.g., log the user out.
      throw new Error("No refresh token available");
    }

    const response = await axiosInstance.post("/refresh-token-endpoint", {
      refreshToken,
    });

    const newAccessToken = response.data.accessToken;
    // Update the stored access token with the new one
    localStorage.setItem("accessToken", newAccessToken);

    // Return the new access token
    return newAccessToken;
  } catch (error) {
    // Handle the error, e.g., log the user out or show an error message
    throw error;
  }
};

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired, attempt to refresh it
      try {
        const newAccessToken = await refreshAccessToken();
        // Retry the original request with the new access token
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(error.config);
      } catch (refreshError) {
        // Handle the refresh error, e.g., log the user out or show an error message
        throw refreshError;
      }
    }
    // Pass other errors through
    return Promise.reject(error);
  }
);

export default axiosInstance;

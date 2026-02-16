export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.message || "Service error";
  }
  return "Network error";
};

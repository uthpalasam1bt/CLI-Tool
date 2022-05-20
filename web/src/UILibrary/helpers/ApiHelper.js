const getError = (error, defaultMessage) => {
  if (error && error.response && error.response.data && error.response.data.message) {
    return error.response.data;
  }
  return { message: defaultMessage };
};

export { getError };

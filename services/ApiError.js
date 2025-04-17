class ApiError {
  constructor(
    statusCode = "",
    errors = "Something went wrong",
    success = false
  ) {
    (this.statusCode = statusCode),
      (this.errors = errors),
      (this.success = false);
  }
}

export { ApiError };


export const apiError = (err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
};

export class AppError extends Error {
    constructor(status, message){
        super(message)
        this.status = status || 500
        this.name = "App Error"
    }

}

import { ResponseHandler } from "../utils/response-handler";

export function responseInterceptor(
  req,
  res,
  next
) {
  const oldJson = res.json;

  res.json = function (data) {
    if (data && typeof data === "object" && (data.success || data.statusCode)) {
      return oldJson.call(this, data);
    }

    return oldJson.call(
      this,
      ResponseHandler.ok({message: "Request successful", ...data})
    );
  };

  next();
}

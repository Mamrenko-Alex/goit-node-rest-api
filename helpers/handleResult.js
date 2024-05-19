import HttpError from "./HttpError.js";

export const handleResult = (result) => {
  if (!result || result.length === 0) {
    throw HttpError(404, "Not found");
  }
};

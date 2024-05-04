export const tryCatchWrapper = (func) => {
  const funcWithTryCatch = async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return funcWithTryCatch;
};

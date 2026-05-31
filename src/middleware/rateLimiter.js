import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-limit-key");
    if (!success) {
      res.status(429).json({ message: "Too many requests, please try again later" });
    }
    next();
  } catch (error) {
    console.error("Error in rateLimiter middleware", error);
    next(error);
  }
};

export default rateLimiter;

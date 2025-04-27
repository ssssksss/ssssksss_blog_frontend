const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

// custom log라는 의미
const clog = {
  info: (...args: any[]) => isDev && console.log("[INFO]", ...args),
  warn: (...args: any[]) => isDev && console.warn("[WARN]", ...args),
  error: (...args: any[]) => (isDev || isProd) && console.log("[ERROR]", ...args),
};

export default clog;

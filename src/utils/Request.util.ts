import { IncomingMessage } from "http";

export const getIpAddress = (req: IncomingMessage) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string" ? forwarded.split(/, /)[0] : req.socket.remoteAddress;
  return ip;
};

import { createClient } from "redis";

const redisclient = createClient();

redisclient.on("error", (err) => console.error("Redis Client Error", err));

await redisclient.connect();

export default redisclient;
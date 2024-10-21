import io from "socket.io-client";
import { env } from "@/utils";

export const socket = io(env?.API_URL, { transports: ["websocket"] });

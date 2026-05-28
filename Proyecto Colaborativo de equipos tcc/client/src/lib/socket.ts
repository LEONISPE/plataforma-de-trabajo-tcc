import { io } from "socket.io-client";

export const socket = io("http://ec2-100-53-3-92.compute-1.amazonaws.com:8000"); 
// ⚠️ pon tu URL real backend
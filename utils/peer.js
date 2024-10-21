import { socket } from "./socket";

export const peer = import.meta.client
  ? new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    })
  : null;

let updateRemoteStream = null;
let remoteStreamObject = null;

if (peer) {
  peer.ontrack = (event) => {
    const [stream] = event.streams;
    if (typeof updateRemoteStream === "function") {
      updateRemoteStream(stream);
    }
  };
}

export function setRemoteStreamCallback(callback) {
  updateRemoteStream = callback;
}

export function getRemoteStream() {
  return remoteStreamObject;
}

export function remoteStream() {
  if (!peer) return null;
  return (peer.ontrack = (e) => e.streams[0]);
}

export async function createOffer() {
  if (!peer) return null;
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  return offer;
}

export async function createAnswer(offer) {
  if (!peer) return null;
  await peer.setRemoteDescription(offer);
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  return answer;
}

export async function setRemoteAnswer(answer) {
  if (!peer) return null;
  await peer.setRemoteDescription(answer);
}

export function icecandidate() {
  peer.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit("local-icecandidate", event.candidate);
    }
  };
}

export async function addRemoteIceCandidate(candidate) {
  if (peer) {
    try {
      await peer.addIceCandidate(candidate);
    } catch (error) {
      console.error("Failed to add ICE candidate:", error);
    }
  }
}

export async function sendStream(stream) {
  if (!peer) return null;
  const tracks = stream.getTracks();
  for (const track of tracks) {
    peer.addTrack(track, stream);
  }
}

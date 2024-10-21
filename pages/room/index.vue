<template>
  <LayoutChat>
    <div
      class="w-full h-full flex"
      @mousemove="resizePanel"
      @mouseup="resizing(false)"
    >
      <div class="flex-1 bg-red-400"></div>

      <div class="flex w-[2px] bg-white items-center relative z-10">
        <div
          class="bg-white w-7 h-7 text-sm absolute flex justify-center items-center rounded-full translate-x-[calc(-50%_+_2px)] cursor-ew-resize"
          @mousedown="resizing(true)"
          @mouseup="resizing(false)"
          @dblclick="width = 384"
        >
          <i class="fa-solid fa-caret-left"> </i>
          <i class="fa-solid fa-caret-right"> </i>
        </div>
      </div>

      <div class="bg-indigo-800 flex flex-col" :style="{ width: width + 'px' }">
        <div class="flex-1 bg-green-600">
          <video
            autoplay
            playsinline
            :srcObject="remoteStream"
            class="size-full object-contain"
          />
        </div>
        <div class="flex-1 bg-orange-500">
          <video
            autoplay
            muted
            playsinline
            :srcObject="localStream"
            class="size-full object-contain"
          />
        </div>
      </div>
    </div>
  </LayoutChat>
</template>

<script>
import { useCallStore } from "@/stores/useCallStore";
import {
  addRemoteIceCandidate,
  createAnswer,
  getRemoteStream,
  icecandidate,
  peer,
  sendStream,
  setRemoteAnswer,
  setRemoteStreamCallback,
} from "@/utils/peer";
import { socket } from "@/utils/socket";

export default {
  ssr: false,
  data() {
    return {
      width: 384,
      isResizing: false,
      localStream: null,
      remoteStream: null,
      store: useCallStore(),
    };
  },
  computed: {
    callUser() {
      return this.store.callUser;
    },
  },
  mounted() {
    const { email, roomID } = this.$route.query;

    const setupListeners = () => {
      socket.emit("join-user", { email, roomID });
      socket.on("remote-offer", this.remoteOffer);
      socket.on("remote-answer", this.remoteAnswer);
      socket.on("remote-icecandidate", this.remoteIcecandidate);

      this.startLocalStream();
      icecandidate();
      setRemoteStreamCallback(this.updateRemoteStream);
    };

    if (socket.connected) {
      setupListeners();
    } else {
      socket.on("connect", () => {
        setupListeners();
        socket.off("connect");
      });
    }
  },
  beforeUnmount() {
    socket.off("remote-offer", this.remoteOffer);
    socket.off("remote-answer", this.remoteAnswer);
    socket.off("remote-icecandidate", this.remoteIcecandidate);
  },
  methods: {
    resizing(val) {
      this.isResizing = val ?? !this.isResizing;
    },
    resizePanel(e) {
      if (this.isResizing) this.width = window.innerWidth - e.clientX;
    },
    async startLocalStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });

        this.localStream = stream;
        sendStream(stream);
      } catch (error) {}
    },
    async remoteOffer({ offer, sender, receiver }) {
      const answer = await createAnswer(offer);
      socket.emit("local-answer", { answer, sender, receiver });
    },
    async remoteAnswer({ answer, sender, receiver }) {
      await setRemoteAnswer(answer);
      icecandidate();
    },
    async remoteIcecandidate(candidate) {
      await addRemoteIceCandidate(candidate);
    },
    updateRemoteStream(stream) {
      this.remoteStream = stream;
    },
  },
};
</script>

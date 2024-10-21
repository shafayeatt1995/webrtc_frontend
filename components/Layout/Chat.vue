<template>
  <div class="w-screen h-screen overflow-x-hidden">
    <div class="flex flex-wrap items-center gap-2">
      <template v-for="user in activeUsers" :key="user.id">
        <button
          @click="startCall(user)"
          class="flex gap-2 cursor-pointer"
          v-if="user.id !== socketID"
        >
          {{ user.email }}
        </button>
      </template>
    </div>
    <slot />
  </div>
</template>

<script>
import { createOffer } from "@/utils/peer";
import { socket } from "@/utils/socket";

export default {
  data() {
    return {
      activeUsers: [],
      socketID: socket.id,
    };
  },
  computed: {
    sender() {
      return this.activeUsers.find(({ id }) => id === this.socketID);
    },
  },
  mounted() {
    socket.on("active-users", this.joinedRoom);
  },
  beforeUnmount() {
    socket.off("active-users", this.joinedRoom);
  },
  methods: {
    joinedRoom({ activeUser }) {
      this.activeUsers = activeUser;
    },
    async startCall(user) {
      const offer = await createOffer();
      socket.emit("local-offer", {
        offer,
        sender: this.sender,
        receiver: user,
      });
    },
  },
};
</script>

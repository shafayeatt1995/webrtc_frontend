<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { socket } from "@/utils/socket";

export default {
  mounted() {
    if (socket.connected) {
      console.log("socket id:", socket.id);
    } else {
      socket.on("connect", () => {
        console.log("socket id:", socket.id);
      });
    }
  },
};
</script>

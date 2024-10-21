<template>
  <div class="bg-white dark:bg-gray-900 py-20">
    <div class="container mx-auto">
      <div class="flex justify-center">
        <form class="w-1/2" @submit.prevent="joinRoom">
          <div class="relative flex items-center mt-4">
            <label
              class="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px]"
              for="email"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Type Email"
              class="pl-4 pr-12 py-3.5 bg-white w-full text-sm border-2 border-gray-300 focus:border-indigo-600 rounded outline-none"
              v-model="form.email"
            />
          </div>
          <div class="relative flex items-center mt-4">
            <label
              class="text-[13px] bg-white absolute px-2 top-[-10px] left-[18px]"
              for="room"
            >
              Room ID
            </label>

            <input
              v-model="form.roomID"
              id="room"
              type="text"
              placeholder="Type Room ID"
              class="pl-4 pr-12 py-3.5 bg-white w-full text-sm border-2 border-gray-300 focus:border-indigo-600 rounded outline-none"
            />
          </div>

          <div class="flex items-center mt-4">
            <Button class="w-full" type="submit"> Join Room </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { socket } from "@/utils/socket";

export default {
  data() {
    return {
      form: { email: "shafayetalanik@gmail.com", roomID: "1" },
    };
  },
  methods: {
    joinRoom() {
      socket.emit("join-user", this.form);
      this.$router.push({ name: "room", query: { ...this.form } });
    },
  },
};
</script>

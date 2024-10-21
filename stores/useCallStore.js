import { defineStore } from "pinia";

export const useCallStore = defineStore("call", {
  state: () => ({
    callUser: {},
  }),
  actions: {
    setCallUser(user) {
      this.callUser = user;
    },
  },
});

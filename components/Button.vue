<template>
  <nuxt-link
    v-if="to"
    :to="to"
    class="flex justify-center items-center font-medium tracking-wide capitalize transition-colors duration-300 transform rounded-md focus:outline-none focus:ring focus:ring-opacity-50 gap-1"
    :class="[variantClass, roundedClass]"
    :disabled="loading"
  >
    <Spinner v-if="loading" />
    <slot />
  </nuxt-link>
  <button
    v-else
    class="focus:ring-transparent flex justify-center items-center font-medium tracking-wide capitalize transform focus:outline-none focus:ring focus:ring-opacity-50 gap-1 transition-all duration-300"
    :class="[variantClass, roundedClass]"
    :disabled="loading"
    aria-label="Submit"
  >
    <Spinner v-if="loading" />
    <slot v-if="loading ? !rounded : true" />
  </button>
</template>
<script>
export default {
  props: {
    loading: Boolean,
    variant: { type: String, default: "indigo" },
    to: [String, Object],
    rounded: Boolean,
  },
  name: "Button",
  computed: {
    variantClass() {
      if (this.variant === "green") {
        return "text-white bg-green-500 hover:bg-green-600 focus:ring-green-300 disabled:hover:bg-green-300 disabled:bg-green-300";
      } else if (this.variant === "white") {
        return "text-gray-900 border border-gray-200 hover:bg-gray-100 focus:ring-gray-300 disabled:hover:bg-gray-300 disabled:bg-gray-300";
      } else if (this.variant === "gray") {
        return "text-gray-900  bg-gray-500 hover:bg-gray-600 focus:ring-gray-300 disabled:hover:bg-gray-300 disabled:bg-gray-300";
      } else if (this.variant === "lightGray") {
        return "text-gray-800  bg-gray-200 hover:bg-gray-300 focus:ring-gray-300 disabled:hover:bg-gray-300 disabled:bg-gray-300";
      } else if (this.variant === "pink") {
        return "text-white  bg-pink-500 hover:bg-pink-600 focus:ring-pink-300 disabled:hover:bg-pink-300 disabled:bg-pink-300";
      } else if (this.variant === "red") {
        return "text-white  bg-rose-500 hover:bg-rose-600 focus:ring-rose-300 disabled:hover:bg-rose-300 disabled:bg-rose-300";
      } else if (this.variant === "transparent") {
        return "text-gray-700 hover:text-gray-700 focus:ring-transparent disabled:hover:text-gray-400 disabled:text-gray-400 border";
      } else if (this.variant === "blue") {
        return "text-white  bg-blue-500 hover:bg-blue-600 focus:ring-blue-300 disabled:hover:bg-blue-300 disabled:bg-blue-300";
      } else if (this.variant === "yellow") {
        return "text-gray-900  bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300 disabled:hover:bg-yellow-300 disabled:bg-yellow-300";
      } else if (this.variant === "purple") {
        return "text-white  bg-purple-500 hover:bg-purple-600 focus:ring-purple-300 disabled:hover:bg-purple-300 disabled:bg-purple-300";
      } else if (this.variant === "indigo") {
        return "text-white  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300 disabled:hover:bg-indigo-300 disabled:bg-indigo-300";
      } else if (this.variant === "lightIndigo") {
        return "text-indigo-600 hover:text-white  bg-indigo-100 hover:bg-indigo-700 focus:ring-indigo-300 disabled:hover:bg-indigo-300 disabled:bg-indigo-300 disabled:hover:text-gray-300 disabled:text-gray-300";
      } else if (this.variant === "amber") {
        return "text-gray-900  bg-amber-500 hover:bg-amber-600 focus:ring-amber-300 disabled:hover:bg-amber-300 disabled:bg-amber-300";
      } else if (this.variant === "sky") {
        return "text-gray-900  bg-sky-500 hover:bg-sky-600 focus:ring-sky-300 disabled:hover:bg-sky-300 disabled:bg-sky-300";
      } else if (this.variant === "dark") {
        return "text-white bg-gray-900 hover:bg-gray-900 focus:ring-gray-900 disabled:hover:bg-gray-500 disabled:bg-gray-500 hover:shadow-gray-500 disabled:hover:shadow-transparent";
      } else if (this.variant === "black") {
        return "text-white bg-black hover:bg-gray-900 focus:ring-gray-900 disabled:hover:bg-gray-300 disabled:bg-gray-300";
      }
    },
    roundedClass() {
      return this.rounded
        ? "size-10 rounded-full"
        : "px-5 py-[10px] rounded-md  text-sm";
    },
  },
};
</script>

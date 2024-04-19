<template>
  <form
    @submit.prevent="newList()"
    class="flex-shrink-0 sm:w-80 sm:mx-4 sm:mb-0 sm:pr-8 text-gray-800"
  >
    <input
      v-model="newListValue"
      class="w-full p-2.5 bg-white bg-opacity-40 focus:bg-opacity-100 placeholder-white focus:placeholder-gray-600 font-bold rounded-lg outline-none focus:shadow-xl"
      placeholder="Add another list"
    />
  </form>
</template>

<script>
export default {
  emits: ["new-list-coming"],

  data() {
    return {
      newListValue: "",
    };
  },

  methods: {
    newList() {
      this.$emit("new-list-coming", this.newListValue);
      this.newListValue = "";
    },
  },
};
</script>

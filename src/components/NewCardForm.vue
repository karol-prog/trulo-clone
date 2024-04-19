<template>
  <footer>
    <a
      v-if="hideLink"
      @click="showForm()"
      class="p-1 text-gray-500 hover:text-gray-700"
    >
      Add a card...
    </a>

    <form @submit.prevent="submitCard()" v-if="showForms">
      <textarea
        v-model="newCard"
        class="w-full p-3 border-t border-l border-gray-300 outline-none rounded shadow-inner"
        rows="3"
      ></textarea>

      <div class="flex mt-1.5 items-center">
        <button class="btn btn-green">Add card</button>

        <a
          @click="hideForms()"
          class="ml-0.5 p-1 text-gray-500 hover:text-gray-700"
          href="#"
          ><svg class="w-6 h-6 fill-current" viewBox="0 0 20 20">
            <path
              d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"
            ></path>
          </svg>
        </a>
      </div>
    </form>
  </footer>
</template>

<script>
export default {
  emits: ["new-card-coming"],

  props: {
    listId: {
      type: Number,
    },
  },

  data() {
    return {
      showForms: false,
      hideLink: true,
      newCard: "",
    };
  },

  methods: {
    //show the form and change the data
    showForm() {
      this.showForms = true;
      this.hideLink = false;
    },

    //hide the form and change the data to opposite
    hideForms() {
      this.showForms = false;
      this.hideLink = true;
    },

    //after submiting send the emit to the parent
    submitCard() {
      this.$emit("new-card-coming", {
        id: this.listId,
        text: this.newCard,
      });
      //reset the input
      this.newCard = "";
    },
  },
};
</script>

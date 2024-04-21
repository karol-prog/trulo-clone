<template>
  <section class="list">
    <header>
      <h3
        ref="titleElement"
        @click="editingTitle"
        @blur="saveNewTitle"
        @keydown.enter="saveNewTitle"
        :contenteditable="isEditing"
        class="p-1 font-bold leading-none text-gray-900 outline-none"
        :class="{ 'shadow-outline': isEditing }"
      >
        {{ title }}
      </h3>
    </header>

    <transition-group name="card" tag="ul">
      <CardTrulo
        v-for="card in cards"
        :key="card.id"
        :card="card"
        :listId="id"
        @toggle-overlay="overlayToParent($event)"
        @close-overlay="closeOverlayToParent($event)"
        @remove-card-coming="removeCardComing($event)"
        @new-card-text-coming="sendTextToParent($event)"
      />
    </transition-group>

    <NewCardForm :listId="id" @new-card-coming="sentToParent($event)" />
  </section>
</template>

<script>
//imports components
import CardTrulo from "./Cards/CardTrulo.vue";
import NewCardForm from "./NewCardForm.vue";

export default {
  emits: [
    "card-coming",
    "new-list-title",
    "overlay-coming",
    "close-overlay-coming",
    "remove-card-coming-to-parent",
    "new-text-coming-to-parent",
  ],

  components: {
    CardTrulo,
    NewCardForm,
  },

  props: {
    id: {
      type: Number,
    },
    title: {
      type: String,
    },
    cards: {
      type: Array,
    },
  },

  data() {
    return {
      isEditing: false,
    };
  },

  methods: {
    editingTitle() {
      this.isEditing = true;
      //need to wait for show focus on title because we used the contenteditable
      setTimeout(() => {
        this.$refs.titleElement.focus();
      }, 0);
    },

    saveNewTitle() {
      this.isEditing = false;
      //send it to parent
      this.$emit("new-list-title", {
        titleId: this.id,
        newTitle: this.$refs.titleElement.textContent,
      });
    },

    //another emit from NewCardFormand sending it to App
    sentToParent(card) {
      this.$emit("card-coming", card);
    },

    //another emit from CardTrulo sending it to App
    overlayToParent(overlay) {
      this.$emit("overlay-coming", overlay);
    },

    closeOverlayToParent(closeOverlay) {
      this.$emit("close-overlay-coming", closeOverlay);
    },

    removeCardComing(removeCard) {
      this.$emit("remove-card-coming-to-parent", removeCard);
    },

    sendTextToParent(newText) {
      this.$emit("new-text-coming-to-parent", newText);
    },
  },
};
</script>

<style scoped>
.card-enter-active,
.card-leave-active {
  transition: all 0.15s ease;
}

.card-enter-from,
.card-enter-to {
  opacity: 0;
  transform: scale(0.75);
}
</style>

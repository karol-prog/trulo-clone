<template>
  <li
    @contextmenu.prevent="openPopup"
    :class="{ 'z-20': isPopup }"
    class="card relative"
  >
    <CardImg :image="card.image" />

    <div class="p-3">
      <CardLabel :labels="card.labels" />

      <p
        @keydown.enter="saveNewText"
        :contenteditable="isEditing"
        :class="{ 'shadow-outline': isEditing }"
        class="outline-none"
        ref="textElement"
      >
        {{ card.text }}
      </p>

      <CardTags :tags="card.tags" />

      <transition name="pop">
        <CardPopup
          v-if="isPopup"
          :card="card"
          :listId="listId"
          @close-popup="closePopup"
          @remove-card="removeCard($event)"
          @start-edit="startEdit"
        />
      </transition>
    </div>
  </li>
</template>

<script>
import CardImg from "./CardImg.vue";
import CardLabel from "./CardLabel.vue";
import CardTags from "./CardTags.vue";
import CardPopup from "./CardPopup.vue";

export default {
  emits: [
    "toggle-overlay",
    "close-overlay",
    "remove-card-coming",
    "new-card-text-coming",
  ],

  components: {
    CardTags,
    CardImg,
    CardLabel,
    CardPopup,
  },

  props: {
    card: {
      type: Object,
    },
    listId: {
      type: Number,
    },
  },

  data() {
    return {
      isPopup: false,
      isEditing: false,
    };
  },

  methods: {
    openPopup() {
      this.isPopup = true;
      this.$emit("toggle-overlay", this.isPopup);
    },

    closePopup() {
      this.isPopup = false;
      this.$emit("close-overlay", this.isPopup);
    },

    removeCard(cardToRemove) {
      this.$emit("remove-card-coming", cardToRemove);
    },

    //edit card text
    startEdit() {
      this.isEditing = true;
      setTimeout(() => {
        this.$refs.textElement.focus();
      }, 0);
    },

    //save new text to object and send it to parent
    saveNewText() {
      this.isEditing = false;
      //send it to parent
      this.$emit("new-card-text-coming", {
        cardId: this.card.id,
        listId: this.listId,
        newText: this.$refs.textElement.textContent,
      });
    },
  },
};
</script>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: all 0.1s ease-in;
}
.pop-from-active,
.pop-to-active {
  opacity: 0;
  transform: translateX(-25%);
}
</style>

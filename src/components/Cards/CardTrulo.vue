<template>
  <li
    @contextmenu.prevent="openPopup"
    :class="{ 'z-20': isPopup }"
    class="card relative"
  >
    <CardImg :image="card.image" />

    <div class="p-3">
      <CardLabel :labels="card.labels" />

      <p>{{ card.text }}</p>

      <CardTags :tags="card.tags" />

      <transition name="pop">
        <CardPopup
          v-if="isPopup"
          :card="card"
          :listId="listId"
          @close-popup="closePopup"
          @remove-card="removeCard($event)"
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
  emits: ["toggle-overlay", "close-overlay", "remove-card-coming"],

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

<template>
  <section class="list">
    <header>
      <h3 class="p-1 font-bold leading-none text-gray-900 outline-none">
        {{ title }}
      </h3>
    </header>

    <ul>
      <CardTrulo v-for="card in cards" :key="card.id" :card="card" />
    </ul>

    <NewCardForm :listId="id" @new-card-coming="sentToParent($event)" />
  </section>
</template>

<script>
//imports components
import CardTrulo from "./CardTrulo.vue";
import NewCardForm from "./NewCardForm.vue";

export default {
  emits: ["card-coming"],

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

  methods: {
    //another emit from NewCardFormand sending it to App
    sentToParent(card) {
      this.$emit("card-coming", card);
    },
  },
};
</script>

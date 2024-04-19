<template>
  <main
    class="flex min-h-screen bg-purple-500 lg:bg-gradient-to-r from-red-400 to-pink-400"
  >
    <div class="sm:flex items-start w-screen px-4 py-10 overflow-x-auto">
      <ListTrulo
        v-for="list in data"
        :key="list.id"
        :id="list.id"
        :title="list.title"
        :cards="list.cards"
        @card-coming="addNewCard"
      />

      <NewListForm @new-list-coming="addNewList($event)" />
    </div>
  </main>
</template>

<script>
//imports
import { data } from "@/data.js";

//components
import ListTrulo from "./components/ListTrulo.vue";
import NewListForm from "./components/NewListForm.vue";

export default {
  components: {
    ListTrulo,
    NewListForm,
  },

  methods: {
    //adding new list from emits
    addNewList(title) {
      if (!title) return;
      //check if current list have some card in it before creating the new id
      let maxIdList = this.data.length
        ? Math.max(...this.data.map((list) => list.id))
        : 0;

      //push the new list to data
      this.data.push({
        id: maxIdList + 1,
        title: title,
        cards: [],
      });
    },

    //adding new card from emits
    addNewCard(card) {
      //find me the current List that match the coming id
      let currentList = this.data.find((list) => list.id === card.id);
      //check if current list have something in it before creating the new id
      let maxIdCard = currentList.cards.length
        ? Math.max(...currentList.cards.map((card) => card.id))
        : 0;
      //push new card to cards array
      currentList.cards.push({
        id: maxIdCard + 1,
        text: card.text,
      });
    },
  },

  data() {
    return {
      data: data,
    };
  },
};
</script>

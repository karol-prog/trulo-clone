<template>
  <main
    class="flex min-h-screen bg-purple-500 lg:bg-gradient-to-r from-red-400 to-pink-400"
  >
    <transition-group
      name="list"
      tag="div"
      class="sm:flex items-start w-screen px-4 py-10 overflow-x-auto"
    >
      <!-- overlay -->
      <div
        v-if="overlay"
        class="bg-black bg-opacity-70 fixed top-0 left-0 w-full h-screen z-10"
        :key="0"
      ></div>

      <!-- LISTS -->
      <ListTrulo
        v-for="list in data"
        :key="list.id"
        :id="list.id"
        :title="list.title"
        :cards="list.cards"
        @card-coming="addNewCard"
        @new-list-title="editListTitle($event, list)"
        @overlay-coming="openOverlay($event)"
        @close-overlay-coming="closeOverlay($event)"
        @remove-card-coming-to-parent="removeCardComing($event)"
      />

      <NewListForm @new-list-coming="addNewList($event)" :key="0" />
    </transition-group>
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

  data() {
    return {
      data: data,
      overlay: false,
    };
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

    editListTitle(title) {
      //find the list that has same id as id that come from child to edit right title in right list
      let currentListToEdit = this.data.find(
        (listTitle) => listTitle.id === title.titleId
      );
      //update the title in current find list
      currentListToEdit.title = title.newTitle;
    },
    //open the overlay from emit listtrulo (true value or false)
    openOverlay(overlay) {
      this.overlay = overlay;
    },

    closeOverlay(closeOverlay) {
      this.overlay = closeOverlay;
    },

    //remove the selected card from the list with selected id
    removeCardComing(removeCard) {
      let listToRemoveCardFromIt = this.data.find(
        (list) => list.id === removeCard.listsId
      );

      console.log(listToRemoveCardFromIt);
    },
  },
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.15s ease;
}

.list-enter-from,
.list-enter-to {
  opacity: 0;
  transform: scale(0.75);
}
</style>

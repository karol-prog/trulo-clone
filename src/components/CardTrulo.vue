<template>
  <li class="card">
    <div class="p-3">
      <aside v-if="card.labels" class="flex mb-1.5">
        <span
          v-for="(color, index) in card.labels"
          :key="index"
          :class="`w-8 h-2 mr-2 rounded-full bg-${color}-400`"
        ></span>
      </aside>

      <p>{{ card.text }}</p>

      <footer v-if="card.tags" class="flex mt-2 text-xs text-white">
        <a
          v-for="(tags, index) in card.tags"
          :key="index"
          class="px-1 py-0.5 mr-1.5 bg-gray-500 opacity-50 hover:opacity-100 rounded"
          href="#"
          >{{ tags }}</a
        >
      </footer>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
    },
  },
};
</script>

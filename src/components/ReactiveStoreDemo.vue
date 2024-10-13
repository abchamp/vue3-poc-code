<template>
  <div>
    <!-- <p>{{ refData }}</p>
    <p>{{ shlRefData }}</p>
    <p>{{ shlReactiveData }}</p> -->
    <p>{{ p }}</p>
    <button @click="todoStore.setShlRefData">add ref data</button>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useTodoStore } from "../store/todoStore";
import { computed, onMounted, onBeforeUnmount } from "vue";

const todoStore = useTodoStore();

// const { refData, shlRefData, shlReactiveData } = storeToRefs(todoStore);

const p = computed(() => {
  return todoStore.shlReactiveData;
});

function handleExternalEvent(event) {
  console.log("Received external event:", event.detail);
}

onMounted(() => {
  window.addEventListener("externalEvent", handleExternalEvent);
});

onBeforeUnmount(() => {
  window.removeEventListener("externalEvent", handleExternalEvent);
});
</script>

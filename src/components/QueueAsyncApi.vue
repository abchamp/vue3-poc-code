<script setup>
import { useAsyncQueue } from "@vueuse/core";

const getFirstPromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 2000);
  });
};

// result from after promise
const getSecondPromise = (result) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10 + result);
    }, 2000);
  });
};

const { activeIndex, result } = useAsyncQueue([
  getFirstPromise,
  getSecondPromise,
]);
</script>

<template>
  <div>
    <h1>activeIndex {{ activeIndex }}</h1>
    <p>{{ result }}</p>
  </div>
</template>

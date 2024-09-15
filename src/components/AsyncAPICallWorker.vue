<template>
  <div>
    <p class="text-lg">AsyncAPICallWorker</p>
    <button @click="start">Start</button>
    <button @click="stop">Stop</button>
    <h1>Trending</h1>
    <div class="container">
      <div v-for="coin in coins" :key="coin.name">
        <h2>{{ coin.name }}</h2>
        <p>{{ coin.symbol }}</p>
        <p>{{ coin.price }} BTC</p>
        <img :src="coin.logo" :alt="coin.name" />
      </div>
    </div>
  </div>
</template>

<script setup>
// import "../output.css";
import { ref, onBeforeUnmount, onMounted } from "vue";
import AsyncAPILoadWorker from "../asyncAPILoadWorker?worker";
const worker = new AsyncAPILoadWorker();
const coins = ref([]);
// if (typeof Worker !== "undefined") {
//   const worker = new AsyncAPILoadWorker();
// } else {
// }

worker.onmessage = (e) => {
  coins.value = e.data;
};

onMounted(() => {});

onBeforeUnmount(() => {
  worker.postMessage("");
  worker.terminate();
});

function start() {
  worker.postMessage("start");
}

function stop() {
  worker.postMessage("");
}
</script>

<style scoped>
@import "../output.css";
</style>

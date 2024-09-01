<script setup>
import { onMounted, ref } from "vue";
import AppFifoAsyncQueue from "../utils/appFifoSyncQueue";

const fifoAsyncQueue = new AppFifoAsyncQueue(true);

// console.log(fifoAsyncQueue);
function resolveHandler(result) {
  console.log("resolveHandler:", result);
}

function rejectHandler(result) {
  console.log("rejectHandler:", result);
}

let countRequest = 0;
function addRequest() {
  countRequest += 1;
  const createdRequest = (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log("process at id: ", params.id);
        const response = await fetch(
          "https://dummyjson.com/RESOURCE/?delay=5000"
        );

        if (response.status !== 200) {
          throw response;
        }

        resolve({ status: true, id: params.id });
      } catch (error) {
        reject({ status: false, id: params.id });
      }
    });
  };

  fifoAsyncQueue.enqueue(
    createdRequest,
    { id: countRequest },
    resolveHandler,
    rejectHandler
  );
}

function submitRequest() {
  fifoAsyncQueue.next();
}

function clearRequest() {
  fifoAsyncQueue.clear();
}

function addHundredRequest() {
  for (let i = 0; i < 300; i++) {
    addRequest();
  }

  console.log(fifoAsyncQueue.status());
}

onMounted(() => {});
</script>

<template>
  <div>
    <h1>Try Code Project</h1>
    <button @click="addRequest">Add Request</button>
    <button @click="addHundredRequest">Add 100 Request</button>
    <button @click="submitRequest">Run 1 Request</button>
    <button @click="clearRequest">Clear Request</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

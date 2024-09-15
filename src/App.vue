<template>
  <div>
    <!-- <h1>Title Composable</h1> -->
    <!-- <input v-model="title" type="text" /> -->
    <!-- <AsyncAPICallWorker></AsyncAPICallWorker> -->
    <!-- <RequestSyncApp></RequestSyncApp> -->
    <!-- <div>
      <p>Mouse position is at: {{ x }} {{ y }}</p>
      <p>Count {{ count }}</p>
    </div> -->
    <QueueAsyncApi />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTitle, useRefHistory } from "@vueuse/core";
import QueueAsyncApi from "./components/QueueAsyncApi.vue";
import AsyncAPICallWorker from "./components/AsyncAPICallWorker.vue";
import RequestSyncApp from "./components/RequestSyncApp.vue";

import { useMouse } from "./composables/mouse";
import { useMyTitle } from "./composables/myTitle";

const { x, y } = useMouse("My Mouse", {});
const title = useTitle("Green Socks", { titleTemplate: "%s | My Store" });

useMyTitle(ref("champ"));
useMyTitle("champ2");

const count = ref(0);
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

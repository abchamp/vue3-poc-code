import { defineStore } from "pinia";
import { ref, shallowReactive, shallowRef, watch } from "vue";

export const useTodoStore = defineStore("todoStore", () => {
  const refData = ref(new Date());
  const shlRefData = shallowRef({ count: 1 });
  const shlReactiveData = shallowReactive({
    list: new Date(),
  });

  function setShlRefData() {
    refData.value = new Date();
    // shlRefData.value = { count: shlRefData.value.count + 1 };
    //
    shlReactiveData.list = new Date();
  }

  watch(refData, (newValue) => {
    console.log("refData: ", newValue);
  });

  watch(shlRefData, (newValue) => {
    console.log("shlRefData: ", newValue);
  });

  watch(shlReactiveData, (newValue) => {
    console.log("shlReactiveData: ", newValue);
  });

  return { refData, shlRefData, shlReactiveData, setShlRefData };
});

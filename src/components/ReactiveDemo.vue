<template>
  <div class="container">
    <div>
      <p>{{ singleRef }}</p>
      <p>{{ shlRef }}</p>
      <p>{{ reactivityData }}</p>
      <p>{{ shallowReactiveData }}</p>
      <p>{{ state }}</p>
    </div>

    <button @click="setRootData">root data</button>
    <button @click="setDeepData">Data</button>
  </div>
</template>

<script>
import {
  shallowRef,
  ref,
  watch,
  reactive,
  shallowReactive,
  isReactive,
} from "vue";

export default {
  setup() {
    const singleRef = ref({
      name: "abchamp",
      address: ["a1", "b2"],
      a: { b: { c: { d: 1 } } },
    });
    const shlRef = shallowRef({
      name: "ABCP",
      address: ["a1", "b2"],
    });
    const reactivityData = reactive({
      firstName: "AB",
      lastName: "CP",
      address: ["a1", "b2"],
      a: { b: { c: { d: 1 } } },
    });
    const shallowReactiveData = shallowReactive({
      firstName: "CK",
      lastName: "CP",
      address: ["a1", "b2"],
      level: { a: 1, b: 1 },
      a: { b: { c: { d: 1 }, e: 1 } },
    });

    const state = shallowReactive({
      foo: 1,
      nested: {
        bar: 2,
      },
    });

    // console.log(isReactive(state.nested));

    function setRootData() {
      // singleRef.value = "champ69";
      // reactivityData.address.push("c3");
      shlRef.name = "IS SHL REF";
      reactivityData.a.b.c.d++;
      // shallowReactiveData.a.b.c.d++;
      // shallowReactiveData.a.b.e++;
      // shallowReactiveData.level = {
      //   ...shallowReactiveData.level,
      //   a: new Date(),
      // };

      shallowReactiveData.a.b = new Date();
    }
    function setDeepData() {
      // notification.address = ["a1", "b2", "c3"];
      // notification.value = {};
      // ddd.value.address.push("c3");
    }

    watch(
      singleRef,
      (newValue) => console.log("watch singleRef:", newValue)
      // { deep: true }
    );

    watch(reactivityData, (newValue) =>
      console.log("watch reactivityData:", newValue)
    );

    watch(shallowReactiveData, (newValue) =>
      console.log("watch shallowReactiveData:", newValue)
    );

    console.log(reactivityData);
    console.log(shallowReactiveData);

    return {
      state,
      singleRef,
      shlRef,
      reactivityData,
      shallowReactiveData,
      setRootData,
      setDeepData,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

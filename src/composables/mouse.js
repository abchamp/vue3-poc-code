import { ref, onMounted, onUnmounted } from "vue";

export function useMouse(name, options) {
  //
  const { observe = false, titleTemplate = "%s" } = options;

  const x = ref(0);
  const y = ref(0);

  function update(event) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));

  return { x, y };
}

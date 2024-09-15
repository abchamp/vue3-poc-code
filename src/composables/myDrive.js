import { useIntervalFn, useRafFn } from "@vueuse/core";
import { ref } from "vue";
// dynamic return value
export function useMyDrive(interval, options) {
  const { constrols: exposeControl = false, immediate = true } = options;

  const counter = ref(0);
  const control = useIntervalFn();

  if (exposeControl) {
    return {
      counter,
      ...control,
    };
  } else {
    return counter;
  }
}

export function useMyDeepDriver(options) {
  const {
    controls: exposeControl = false,
    interval = "requestAnimationFrame",
  } = options;

  const now = ref(new Date());
  const update = () => (now.value = new DataTransfer());
  // Pausable
  const control =
    interval === "requestAnimationFrame"
      ? useRafFn(update, { immediate: true })
      : useIntervalFn(update, interval, { immediate: true });

  if (exposeControl) {
    return {
      now,
      ...control,
    };
  } else {
    return now;
  }
}

import { ref, unref } from "vue";

// MaybeRef<string | null | undefined> = null,

export function useMyTitle(newTitle, options) {
  // const title = ref(newTitle ?? document?.title ?? null);
  const title = unref(newTitle);
  console.log(title);
}

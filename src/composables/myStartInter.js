import { ref } from "vue";

export function useMyStartInter() {
  // 1.argument pass to [ref, raw, series of vales]
  // 2.options should be
  // 3.composable return to [single, dynamic return pattern]

  const state = ref(null);

  const excute = async () => {
    state.value = await Promise;
  };

  return state;
}

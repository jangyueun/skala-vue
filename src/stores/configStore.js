import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')

  const unitSymbol = computed(() => (unit.value === 'celsius' ? '℃' : '℉'))
  const unitLabel = computed(() => (unit.value === 'celsius' ? '섭씨' : '화씨'))

  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  function resetUnit() {
    unit.value = 'celsius'
  }

  return { unit, unitSymbol, unitLabel, toggleUnit, resetUnit }
})

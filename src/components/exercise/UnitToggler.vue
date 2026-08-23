<script setup>
import { useConfigStore } from '../../stores/configStore'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span>{{ configStore.unitLabel }}({{ configStore.unitSymbol }})</span>
    <button type="button" @click="configStore.toggleUnit">단위 변경</button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
  color: #52647b;
  font-size: 14px;
}
button {
  padding: 7px 10px;
  border: 0;
  border-radius: 8px;
  color: white;
  background: #6f293a;
  cursor: pointer;
}
</style>

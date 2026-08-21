<script setup>
import SlotDefaultParent from './SlotDefaultParent.vue'
import SlotNamedParent from './SlotNamedParent.vue'
import SlotScopedParent from './SlotScopedParent.vue'
</script>

<template>
  <main class="slot-examples">
    <SlotDefaultParent />
    <SlotNamedParent />
    <SlotScopedParent />
  </main>
</template>

<style scoped>
.slot-examples {
  display: grid;
  gap: 36px;
  width: min(900px, calc(100% - 32px));
  margin: 40px auto;
  color: #152238;
}
</style>

<script setup>
import SlotDefaultChild from './SlotDefaultChild.vue'
</script>

<template>
  <section class="slot-practice">
    <h2>Default Slot 레이아웃 주입 실습</h2>

    <SlotDefaultChild>
      <p>단순한 텍스트 문장을 주입합니다.</p>
    </SlotDefaultChild>

    <SlotDefaultChild>
      <h3 class="warning-title">🔥 경고 상태</h3>
      <button type="button">확인</button>
    </SlotDefaultChild>

    <SlotDefaultChild />
  </section>
</template>

<style scoped>
.slot-practice {
  display: grid;
  gap: 14px;
}
.warning-title {
  color: #e74c3c;
}
</style>

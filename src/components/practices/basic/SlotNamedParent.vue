<script setup>
import SlotNamedChild from './SlotNamedChild.vue'
</script>

<template>
  <section>
    <h2>Named Slot 주입 실습</h2>

    <SlotNamedChild>
      <template #header>
        <h3>Child 주입 제목</h3>
      </template>

      <p>본문 콘텐츠가 자식의 기본 슬롯에 들어갑니다.</p>
    </SlotNamedChild>
  </section>
</template>

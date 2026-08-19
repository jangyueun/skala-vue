<script setup>
import { ref } from 'vue'

const count = ref(0)

const showAlert = () => {
  alert('함수가 성공적으로 호출되었습니다!')
}
</script>

<template>
  <section class="practice-section">
    <h2>v-on 이벤트 핸들링 기초</h2>

    <h3>1. 인라인 핸들러</h3>
    <p>현재 카운트: {{ count }}</p>
    <button @click="count++">1씩 증가</button>

    <h3>2. 메서드 핸들러</h3>
    <button @click="showAlert">알림창 띄우기</button>
  </section>
</template>

<style scoped>
.practice-section {
  margin: 24px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  margin: 4px;
  padding: 8px;
}
</style>

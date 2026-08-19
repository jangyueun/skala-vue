<script setup>
import { ref } from 'vue'

const position = ref('아직 버튼을 클릭하지 않았습니다.')
const tagName = ref('아직 버튼을 클릭하지 않았습니다.')

const getOnlyEvent = (event) => {
  position.value = `좌표: X=${event.clientX}, Y=${event.clientY}`
}

const getWithParam = (name, event) => {
  tagName.value = `대상: ${name} / 클릭된 태그: ${event.target.tagName}`
}
</script>

<template>
  <section class="practice-section">
    <h2>이벤트 객체($event)</h2>
    <p>{{ position }}</p>
    <p>{{ tagName }}</p>

    <button @click="getOnlyEvent">클릭 좌표 알아내기</button>
    <button @click="getWithParam('회원A', $event)">회원 정보와 태그 확인</button>
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

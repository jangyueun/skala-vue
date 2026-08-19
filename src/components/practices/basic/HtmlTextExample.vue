<script setup>
import { ref } from 'vue'

const rawHtmlData =
  '이 글자는 <span style="color: red; font-weight: bold;">빨간색 굵은 글자</span>이다.'
const content = '안녕하세요! <strong>Skala-Vue</strong> 강의입니다.'
const inputValue = ref('')
const safeMessage = ref('')

function showAsText() {
  // 사용자 입력은 v-html로 실행하지 않고 텍스트로만 출력합니다.
  safeMessage.value = inputValue.value
}
</script>

<template>
  <section class="practice-section">
    <h2>v-html / v-text</h2>

    <h3>일반 보간법</h3>
    <p>{{ rawHtmlData }}</p>

    <h3>v-html</h3>
    <p v-html="rawHtmlData"></p>

    <h3>v-text</h3>
    <p v-text="'출력: ' + content"></p>

    <h3>XSS 안전 원칙</h3>
    <input v-model="inputValue" placeholder="내용을 입력하세요" />
    <button @click="showAsText">텍스트로 출력</button>
    <p>{{ safeMessage }}</p>
    <small>사용자가 입력한 값은 신뢰할 수 없으므로 v-html로 직접 출력하지 않습니다.</small>
  </section>
</template>

<style scoped>
.practice-section {
  margin: 24px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

input,
button {
  margin: 4px;
  padding: 8px;
}
</style>

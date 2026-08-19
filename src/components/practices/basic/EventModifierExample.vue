<script setup>
import { ref } from 'vue'

const message = ref('버튼을 눌러 결과를 확인하세요.')
const enterMessage = ref('')

const handleLink = () => {
  message.value = '.prevent로 링크 이동을 막았습니다.'
}

const handleBox = () => {
  message.value = '부모 박스 이벤트도 실행되었습니다.'
}

const handleChild1 = () => {
  message.value = '일반 자식 버튼 실행 후 부모로 이벤트가 올라갑니다.'
}

const handleChild2 = () => {
  message.value = '.stop 버튼만 실행되고 부모 이벤트는 실행되지 않습니다.'
}

const runOnce = () => {
  message.value = '.once 이벤트는 처음 한 번만 실행됩니다.'
}

const submitWithEnter = () => {
  message.value = `Enter 입력: ${enterMessage.value}`
}
</script>

<template>
  <section class="practice-section">
    <h2>이벤트 수식어</h2>
    <p class="result">결과: {{ message }}</p>

    <h3>1. .prevent</h3>
    <a href="https://www.naver.com" @click.prevent="handleLink">이동하지 않는 네이버 링크</a>

    <h3>2. .stop</h3>
    <div class="parent-box" @click="handleBox">
      <p>부모 영역</p>
      <button @click="handleChild1">버블링 발생 버튼</button>
      <button @click.stop="handleChild2">버블링 차단 버튼</button>
    </div>

    <h3>3. .once</h3>
    <button @click.once="runOnce">한 번만 작동하는 버튼</button>

    <h3>4. 키보드 .enter</h3>
    <input v-model="enterMessage" @keyup.enter="submitWithEnter" placeholder="입력 후 Enter" />
  </section>
</template>

<style scoped>
.practice-section {
  margin: 24px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.result {
  padding: 10px;
  background: #f3f3f3;
}

.parent-box {
  margin-top: 8px;
  padding: 20px;
  background: #eee;
}

button,
input {
  margin: 4px;
  padding: 8px;
}
</style>

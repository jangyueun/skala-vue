<script setup>
import { ref } from 'vue'

const dynamicUrl = 'https://www.naver.com'
const src = 'https://vuejs.org/images/logo.png'
const id = 'vue-profile-card'
const isButtonDisabled = ref(true)
const isWarning = ref(false)
const themeClass = ref('bg-dark')
const textColor = ref('purple')
const boxWidth = ref(150)
const baseBoxStyle = {
  backgroundColor: '#42b883',
  height: '100px',
  transition: 'all 0.3s ease',
}
</script>

<template>
  <section class="practice-section">
    <h2>v-bind: 속성 / 클래스 / 스타일</h2>

    <h3>속성 바인딩</h3>
    <a :href="dynamicUrl" target="_blank">네이버 열기</a>
    <div :id>
      <img :src alt="Vue 로고" width="70" />
    </div>
    <button :disabled="isButtonDisabled">상태에 따라 잠기는 버튼</button>
    <button @click="isButtonDisabled = !isButtonDisabled">잠금 상태 토글</button>

    <h3>클래스 바인딩</h3>
    <p :class="{ 'text-danger': isWarning }">현재 경고 상태: {{ isWarning }}</p>
    <button @click="isWarning = !isWarning">경고 상태 토글</button>
    <div :class="[themeClass, isWarning ? 'border-red' : 'border-gray']">조건부 클래스 상자</div>

    <h3>스타일 바인딩</h3>
    <p :style="{ color: textColor, fontWeight: 'bold' }">색상이 바뀌는 글자</p>
    <button @click="textColor = textColor === 'purple' ? 'blue' : 'purple'">색상 토글</button>
    <label>
      박스 너비:
      <input v-model="boxWidth" type="number" step="50" />
    </label>
    <div :style="[baseBoxStyle, { width: boxWidth + 'px' }]">{{ boxWidth }}px</div>
  </section>
</template>

<style scoped>
.practice-section {
  margin: 24px 0;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button,
input {
  margin: 4px;
  padding: 8px;
}

.text-danger {
  color: red;
  font-weight: bold;
}

.bg-dark {
  margin-top: 8px;
  padding: 15px;
  color: white;
  background-color: #333;
}

.border-red {
  border: 3px solid red;
}

.border-gray {
  border: 3px solid #ccc;
}
</style>

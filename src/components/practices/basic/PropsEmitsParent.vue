<script setup>
import { ref } from 'vue'
import PropsEmitsChild from './PropsEmitsChild.vue'

// 부모 컴포넌트가 관리하는 반응형 상태입니다.
const message = ref('Parent 초기 메시지')

// 자식이 보낸 update-request 이벤트와 payload를 전달받습니다.
const handleUpdateRequest = (newValue) => {
  message.value = newValue
}
</script>

<template>
  <div class="practice-section">
    <h2>Props & Emits</h2>

    <div class="parent-container">
      <h2>상위 컴포넌트 (Parent)</h2>
      <p>
        현재 로컬 데이터(State):
        <strong>{{ message }}</strong>
      </p>

      <br />

      <PropsEmitsChild :parent-data="message" @update-request="handleUpdateRequest" />
    </div>
  </div>
</template>

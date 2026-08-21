<script setup>
import { ref } from 'vue'

const message = ref('현재 서버 상태 정상')
const userCount = ref(150)
</script>

<template>
  <div class="slot-card">
    <h3>하위 컴포넌트 (Child)</h3>
    <slot :text="message" :count="userCount">
      <p>부모가 마크업을 주입하지 않았을 때의 디폴트 화면</p>
    </slot>
  </div>
</template>

<style scoped>
.slot-card {
  padding: 18px;
  border: 1px solid #cbd8e6;
  border-radius: 12px;
  background: #fff;
}
</style>

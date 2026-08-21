<script setup>
// 부모 컴포넌트로부터 받을 데이터의 이름과 규격을 선언합니다.
defineProps({
  parentData: {
    type: String,
    required: true,
  },
})

// 부모 컴포넌트로 보낼 사용자 정의 이벤트를 등록합니다.
const emit = defineEmits(['update-request'])

const sendNotification = () => {
  const payload = 'Child에서 가공한 새로운 데이터'
  emit('update-request', payload)
}
</script>

<template>
  <div class="child-container">
    <h2>하위 컴포넌트 (Child)</h2>
    <p>
      수신된 Props 데이터:
      <strong>{{ parentData }}</strong>
    </p>

    <br />

    <button type="button" @click="sendNotification">상위 컴포넌트로 갱신 요청 (Emit)</button>
  </div>
</template>

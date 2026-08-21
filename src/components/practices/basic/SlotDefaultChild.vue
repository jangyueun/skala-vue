<template>
  <div class="slot-card">
    <slot>
      <p>기본 콘텐츠 영역입니다.</p>
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

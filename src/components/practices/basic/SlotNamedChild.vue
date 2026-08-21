<template>
  <div class="slot-card">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
  </div>
</template>

<style scoped>
.slot-card {
  padding: 18px;
  border: 1px solid #cbd8e6;
  border-radius: 12px;
  background: #fff;
}
header {
  padding-bottom: 10px;
  border-bottom: 1px solid #e1e8f0;
}
</style>

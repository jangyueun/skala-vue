<template>
  <section class="dashboard-card">
    <slot></slot>
  </section>
</template>

<style scoped>
.dashboard-card {
  padding: 22px;
  border: 1px solid rgb(255 255 255 / 72%);
  border-radius: 20px;
  background: rgb(255 255 255 / 82%);
  box-shadow: 0 18px 46px rgb(36 76 116 / 10%);
}
</style>

<template>
  <section class="dashboard-card">
    <slot></slot>
  </section>
</template>

<style scoped>
.dashboard-card {
  padding: 22px;
  border: 1px solid #eadfd7;
  border-radius: 20px;
  background: rgb(255 253 250 / 90%);
  box-shadow: 0 18px 46px rgb(86 45 47 / 7%);
}
</style>

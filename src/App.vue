<script setup>
import UnitToggler from './components/exercise/UnitToggler.vue'
</script>

<template>
  <header class="app-header">
    <RouterLink class="brand" to="/">
      <span>W</span>
      <div>
        <strong>WEATHER SCENE</strong>
        <small>날씨가 고른 오늘의 드라마</small>
      </div>
    </RouterLink>
    <nav aria-label="주요 메뉴">
      <RouterLink to="/">오늘의 추천</RouterLink>
      <RouterLink to="/tips">추천 기준</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <UnitToggler />
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.app-header {
  position: sticky;
  z-index: 10;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
  padding: 12px max(20px, calc((100% - 1120px) / 2));
  border-bottom: 1px solid #eadfd7;
  background: rgb(255 253 250 / 94%);
  backdrop-filter: blur(14px);
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #152238;
  text-decoration: none;
}
.brand > span {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 12px;
  color: #fff8ef;
  background: #6f293a;
  font-family: Georgia, serif;
  font-size: 23px;
}
.brand div,
.brand strong,
.brand small {
  display: block;
}
.brand strong {
  color: #392b31;
  font-size: 14px;
  letter-spacing: 0.08em;
}
.brand small {
  color: #8b7876;
  font-size: 10px;
}
nav {
  display: flex;
  gap: 6px;
  white-space: nowrap;
}
nav a {
  padding: 8px 12px;
  border-radius: 9px;
  color: #52647b;
  text-decoration: none;
}
nav a.router-link-active {
  color: #6f293a;
  background: #f5e9e2;
  font-weight: 750;
}
@media (max-width: 560px) {
  .app-header {
    align-items: flex-start;
    flex-direction: column;
  }
  nav {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 3px;
  }
  nav a {
    flex: 0 0 auto;
  }
  .brand small {
    display: none;
  }
}
</style>

<template>
  <header class="app-header">
    <RouterLink class="brand" to="/">🌤️ Weather</RouterLink>
    <nav aria-label="주요 메뉴">
      <RouterLink to="/">날씨 홈</RouterLink>
      <RouterLink to="/tips">생활 팁</RouterLink>
      <RouterLink to="/about">서비스 소개</RouterLink>
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
  border-bottom: 1px solid #dbe5ef;
  background: rgb(255 255 255 / 92%);
  backdrop-filter: blur(14px);
}
.brand {
  color: #152238;
  font-size: 19px;
  font-weight: 850;
  text-decoration: none;
}
nav {
  display: flex;
  gap: 6px;
}
nav a {
  padding: 8px 12px;
  border-radius: 9px;
  color: #52647b;
  text-decoration: none;
}
nav a.router-link-active {
  color: #1d5f9f;
  background: #e2f0ff;
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
  }
}
</style>

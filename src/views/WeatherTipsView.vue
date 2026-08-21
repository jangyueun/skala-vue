<template>
  <main class="tips-page">
    <section>
      <p>TODAY'S TIPS</p>
      <h1>날씨별 생활 팁</h1>
      <ul>
        <li>기온이 높은 날에는 물을 자주 마셔 주세요.</li>
        <li>비가 오는 날에는 우산과 미끄럼 사고를 확인하세요.</li>
        <li>미세먼지가 나쁜 날에는 야외 활동을 줄여 주세요.</li>
      </ul>
      <RouterLink to="/">날씨 확인하러 가기</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.tips-page {
  min-height: calc(100vh - 70px);
  display: grid;
  place-items: center;
  padding: 24px;
  background: #edf3f9;
  color: #152238;
}
section {
  width: min(680px, 100%);
  padding: 40px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 20px 50px rgb(36 76 116 / 12%);
}
section > p {
  color: #2874c6;
  font-weight: 800;
  letter-spacing: 0.14em;
}
li + li {
  margin-top: 12px;
}
a {
  display: inline-block;
  margin-top: 20px;
  color: #2874c6;
  font-weight: 700;
}
</style>

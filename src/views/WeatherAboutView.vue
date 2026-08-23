<template>
  <main class="about-page">
    <section>
      <p class="label">ABOUT WEATHER SCENE</p>
      <h1>날씨가 한 편의<br />드라마를 고르는 순간</h1>
      <p class="description">
        Weather Scene은 지역별 날씨를 확인하고, 그날의 분위기에 어울리는 한국 드라마를
        추천하는 Vue 웹사이트입니다. 날씨가 맑으면 기분 좋은 코미디를, 비가 오면 천천히
        몰입할 수 있는 감성 드라마를 소개합니다.
      </p>

      <div class="feature-grid">
        <article><span>01</span><strong>Weather</strong><p>지역별 현재 날씨와 예보를 확인합니다.</p></article>
        <article><span>02</span><strong>Mood</strong><p>날씨 상태를 오늘의 감상 분위기로 바꿉니다.</p></article>
        <article><span>03</span><strong>Drama</strong><p>TMDB에서 어울리는 한국 드라마를 추천합니다.</p></article>
      </div>

      <RouterLink to="/">오늘의 추천 시작하기 →</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  min-height: calc(100vh - 70px);
  display: grid;
  place-items: center;
  padding: 48px 20px;
  color: #392b31;
  background: radial-gradient(circle at 10% 0%, rgb(203 138 103 / 18%), transparent 30%), #f7f0ea;
}
section { width: min(920px, 100%); padding: 44px; border: 1px solid #eadfd7; border-radius: 26px; background: #fffdfb; box-shadow: 0 22px 56px rgb(86 45 47 / 8%); }
.label { margin: 0 0 8px; color: #a3543c; font-size: 12px; font-weight: 800; letter-spacing: 0.15em; }
h1 { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(36px, 5vw, 56px); font-weight: 500; line-height: 1.18; }
.description { max-width: 720px; margin: 20px 0 0; color: #786d72; font-size: 16px; line-height: 1.8; }
.feature-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 32px; }
article { padding: 20px; border-radius: 16px; background: #f8f3ef; }
article span { color: #b36b52; font-size: 12px; font-weight: 800; }
article strong { display: block; margin-top: 12px; color: #5d2938; font-size: 19px; }
article p { margin: 5px 0 0; color: #786d72; font-size: 13px; }
a { display: inline-block; margin-top: 28px; color: #6f293a; font-weight: 800; text-decoration: none; }
@media (max-width: 680px) { section { padding: 28px; } .feature-grid { grid-template-columns: 1fr; } }
</style>

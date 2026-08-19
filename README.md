# SKALA Vue Weather Mockup

Vue 3와 Vite로 만든 지역별 날씨 조회 Mockup입니다. 강의 116페이지의 배열 렌더링, 조건부 렌더링, 한글 입력 처리, 이벤트와 이벤트 수식어 요구사항을 구현했습니다.

## 실행 방법

```sh
npm install
npm run dev
```

기본 접속 주소는 `http://localhost:5173`입니다.

코드 검사와 배포 빌드는 다음 명령으로 실행합니다.

```sh
npm run lint
npm run build
```

## 요구사항 구현표

| 번호 | 요구사항 | 구현 내용 |
| --- | --- | --- |
| 1 | 배열 렌더링 | `weatherList`를 `v-for`로 반복하고 `:key="weather.id"`를 바인딩했습니다. |
| 2 | 조건부 렌더링 | `weather.temp >= 25` 조건에 따라 더움·선선함 라벨을 표시합니다. |
| 3 | 양방향 바인딩과 한글 처리 | 검색창에 `:value`와 `@input`을 적용하고 입력한 한글 도시명을 출력합니다. |
| 4 | 이벤트와 수식어 | 카드 클릭 시 상태바를 변경하고 상세보기에는 `@click.stop`을 적용했습니다. |
| 5 | 개인 데이터와 Mockup | 제주·대전, 날씨 아이콘, 습도, 풍속, 미세먼지, 평균 기온과 검색 필터를 추가했습니다. |

## 주요 기능

- 서울, 수원, 부산, 제주, 대전 날씨 카드 표시
- 한글 도시명 검색과 카드 필터링
- 검색어 초기화와 검색 결과 없음 안내
- 25℃ 기준 더움·선선함 라벨
- 카드 선택 상태바
- 상세보기 알림과 이벤트 버블링 차단
- 전체 도시 평균 기온 계산
- 화면 크기에 따른 3열·2열·1열 반응형 UI

## 프로젝트 구조

```text
src/
├─ App.vue
├─ main.js
├─ components/
│  └─ practices/basic/
│     ├─ WeatherMockup.vue
│     └─ ...이전 Vue 문법 실습 파일
├─ assets/
├─ router/
├─ stores/
└─ views/
```

`App.vue`는 과제 화면인 `WeatherMockup.vue`를 표시합니다. 이전 문법 실습 파일은 학습 기록으로 보존했습니다.

## 핵심 코드

### 배열 렌더링

```vue
<article v-for="weather in filteredWeatherList" :key="weather.id">
  {{ weather.name }}
</article>
```

각 날씨 데이터를 카드로 반복 출력하며, 고유한 `id`를 `:key`로 사용합니다.

### 조건부 렌더링

```vue
<p v-if="weather.temp >= 25">🔥 더움 (25도 이상)</p>
<p v-else>❄️ 선선함 (25도 미만)</p>
```

### 한글 검색 입력

```vue
<input :value="searchCity" @input="handleSearchInput" />
```

```js
const handleSearchInput = (event) => {
  searchCity.value = event.target.value
}
```

입력창의 현재 값을 반응형 변수에 저장하고, 입력한 도시명과 검색 결과에 사용합니다.

### 이벤트 버블링 차단

```vue
<article @click="selectCity(weather.name)">
  <button @click.stop="showDetail(weather.name, weather.status)">상세보기</button>
</article>
```

`.stop`이 상세보기 클릭 이벤트가 부모 카드까지 올라가는 것을 막습니다.

### 검색 결과 계산

```js
const filteredWeatherList = computed(() => {
  const keyword = searchCity.value.trim()
  if (!keyword) return weatherList.value
  return weatherList.value.filter((weather) => weather.name.includes(keyword))
})
```

`computed`는 검색어가 바뀔 때 표시할 날씨 목록을 다시 계산합니다.

## 검증 체크리스트

- [ ] 첫 화면에 다섯 도시 카드가 나타난다.
- [ ] 25℃ 이상은 더움, 미만은 선선함으로 표시된다.
- [ ] 검색창에서 한글 도시명이 정상적으로 입력되고 결과가 필터링된다.
- [ ] 카드를 클릭하면 선택한 도시가 상태바에 표시된다.
- [ ] 상세보기 버튼은 알림만 표시하고 카드 클릭 이벤트는 실행하지 않는다.
- [ ] 없는 도시를 검색하면 검색 결과 없음 안내가 나타난다.
- [ ] 모바일 화면에서 카드가 한 열로 나타난다.

## 사용 기술

- Vue 3 Composition API
- JavaScript
- Vite
- HTML5 / CSS3

## 학습 내용

- `ref`, `computed`
- `v-for`, `:key`
- `v-if`, `v-else`
- `:value`, `@input`
- `@click`, `@click.stop`
- `<style scoped>`

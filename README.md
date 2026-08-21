# 🌤️ 과제 1: 날씨 Mockup

Vue 3의 Composition API를 사용해 지역별 날씨 정보를 카드 형태로 보여주는 Mockup을 구현했습니다.

날씨 데이터 반복 렌더링, 기온에 따른 조건부 라벨, 한글 도시 검색, 카드 선택 이벤트, 상세보기 버튼의 이벤트 버블링 차단을 구현했습니다. 교재의 기본 요구사항에 도시 검색 필터, 평균 기온, 추가 날씨 정보와 반응형 레이아웃을 더했습니다.

## 실행 방법

### 1. 패키지 설치

```sh
npm install
```

### 2. 개발 서버 실행

```sh
npm run dev
```

기본 접속 주소는 다음과 같습니다.

```text
http://localhost:5173
```

### 3. 코드 검사 및 빌드

```sh
npm run lint
npm run build
```

## 과제 요구사항 구현

| 번호 | 요구사항 | 구현 방법 |
| --- | --- | --- |
| 1 | 날씨 배열 반복 출력 | `weatherList`를 `v-for`로 반복하고 `weather.id`를 `:key`로 사용했습니다. |
| 2 | 기온별 조건부 라벨 | `v-if`와 `v-else`로 25℃ 이상은 더움, 미만은 선선함을 표시했습니다. |
| 3 | 한글 도시 입력 | 입력창에 `:value`와 `@input`을 연결해 한글 검색어를 반응형 변수에 저장했습니다. |
| 4 | 카드 선택 이벤트 | 카드를 클릭하면 선택한 도시 이름이 상태바에 표시됩니다. |
| 4 | 이벤트 버블링 차단 | 상세보기 버튼에 `@click.stop`을 적용해 부모 카드 이벤트가 실행되지 않게 했습니다. |
| 5 | 개인 데이터와 Mockup | 제주·대전, 아이콘, 습도, 풍속, 미세먼지와 추가 UI를 구현했습니다. |

## 화면이 만들어지는 흐름

```text
npm run dev
→ Vite 개발 서버 실행
→ index.html이 main.js 실행
→ main.js가 App.vue를 #app에 마운트
→ App.vue가 WeatherParent.vue를 배치
→ WeatherParent.vue가 하위 컴포넌트를 조립
→ Vue가 날씨 데이터를 카드로 렌더링
```

`App.vue`는 Vue Router의 내비게이션과 현재 URL 화면이 표시되는 `RouterView`를 배치합니다.

```vue
<template>
  <RouterLink to="/">날씨 홈</RouterLink>
  <RouterLink to="/about">서비스 소개</RouterLink>
  <RouterView />
</template>
```

## Vue Router 확장

196페이지 Weather Router 과제에 맞춰 날씨 서비스를 URL별 View로 분리했습니다.

| URL | View | 역할 |
| --- | --- | --- |
| `/` | `WeatherHomeView.vue` | 검색과 지역별 날씨 대시보드 |
| `/weather/:cityId` | `WeatherDetailView.vue` | 동적 `cityId`에 해당하는 상세 기상관측 정보 |
| `/about` | `WeatherAboutView.vue` | 서비스 소개 |
| `/tips` | `WeatherTipsView.vue` | 직접 추가한 날씨별 생활 팁 |
| 그 외 | `NotFoundView.vue` | Catch-all 404 화면 |

라우트 컴포넌트는 동적 `import()`로 지연 로딩합니다. 날씨 카드의 상세보기 버튼은 `window.alert()` 대신 `router.push()`로 `/weather/도시ID`에 이동합니다. 상세 View는 `useRoute()`의 `route.params.cityId`를 읽어 공통 Mock Data에서 해당 도시를 찾습니다.

```text
상세보기 클릭
→ WeatherCard가 click-detail 이벤트 발생
→ WeatherHomeView의 goToDetail 실행
→ router.push('/weather/' + weather.id)
→ URL 변경
→ RouterView가 WeatherDetailView로 교체
→ route.params.cityId를 이용해 도시 정보 출력
```

## 컴포넌트 분리

178페이지 Weather Component 과제에 맞춰 기존 단일 날씨 컴포넌트를 역할별로 분리했습니다.

| 컴포넌트 | 역할 | 통신 방법 |
| --- | --- | --- |
| `WeatherParent.vue` | 전체 반응형 상태와 이벤트 처리 관리 | 하위 컴포넌트에 Props 전달 및 Emits 수신 |
| `BaseDashboardCard.vue` | 검색·목록 영역의 공통 카드 디자인 | Default Slot으로 화면 콘텐츠 수신 |
| `SearchBar.vue` | 검색어 표시와 입력 처리 | `searchQuery` Props, `update-query` Emits |
| `WeatherCard.vue` | 도시 한 곳의 날씨 정보 표시 | `weather` Props, `select-card`·`click-detail` Emits |
| `WeatherSummary.vue` | 제목·평균 기온·더운 도시 수 표시 | `averageTemp`·`hotCityCount` Props |

`WeatherParent.vue`가 모든 상태의 소유자입니다. 검색 입력은 `SearchBar`의 `update-query` 이벤트로 부모에게 올라가며, 변경된 검색 결과는 다시 Props로 하위 컴포넌트에 전달됩니다. 날씨 카드의 선택과 상세보기 역시 자식이 직접 부모 상태를 수정하지 않고 Emits로 부모에게 요청합니다.

```text
WeatherParent
├── WeatherSummary (Props)
├── BaseDashboardCard (Default Slot)
│   └── SearchBar (Props / Emits)
└── BaseDashboardCard (Default Slot)
    └── WeatherCard 여러 개 (Props / Emits)
```

각 컴포넌트의 디자인은 해당 `.vue` 파일의 `<style scoped>`에 배치해 다른 컴포넌트의 스타일에 영향을 주지 않도록 했습니다.

## 주요 구현 설명

### 1. 반응형 날씨 데이터

날씨 목록과 검색어, 카드 선택 메시지를 `ref`로 선언했습니다.

```js
const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const searchCity = ref('')
const selectedMessage = ref('지역별 날씨 카드를 선택해 주세요.')
```

`ref` 값이 변경되면 Vue가 변화를 감지하고 해당 값을 사용하는 화면을 갱신합니다. JavaScript 영역에서는 `.value`로 실제 값에 접근하고, `<template>`에서는 Vue가 `.value`를 자동으로 처리합니다.

```js
searchCity.value = event.target.value
```

```vue
<p>{{ searchCity }}</p>
```

### 2. 날씨 카드 반복 렌더링

`v-for`로 검색 결과 배열의 각 도시를 카드로 출력했습니다.

```vue
<article
  v-for="weather in filteredWeatherList"
  :key="weather.id"
>
  {{ weather.name }}
</article>
```

`weather`는 현재 반복 중인 도시 객체입니다. 배열에 도시가 5개 있으면 카드도 5개 만들어집니다. `:key`에는 배열 순서가 아닌 각 도시의 고유한 `id`를 사용했습니다.

### 3. 기온별 조건부 렌더링

현재 도시의 기온이 25℃ 이상인지 검사해 서로 다른 라벨을 표시합니다.

```vue
<p v-if="weather.temp >= 25">
  🔥 더움 (25도 이상)
</p>

<p v-else>
  ❄️ 선선함 (25도 미만)
</p>
```

서울은 28℃이므로 더움, 수원은 24℃이므로 선선함 라벨이 나타납니다.

### 4. 한글 도시 검색

교재 요구사항에 맞춰 `v-model` 대신 `:value`와 `@input`을 사용했습니다.

```vue
<input
  :value="searchCity"
  @input="handleSearchInput"
  placeholder="예: 서울, 부산, 제주"
/>
```

```js
const handleSearchInput = (event) => {
  searchCity.value = event.target.value
}
```

사용자가 입력하면 브라우저가 이벤트 객체를 전달하고, `event.target.value`에서 현재 입력값을 가져와 `searchCity`에 저장합니다.

```text
한글 도시명 입력
→ input 이벤트 발생
→ handleSearchInput 실행
→ searchCity 변경
→ Vue가 검색 결과와 화면 갱신
```

### 5. 도시 검색 필터

교재에서는 입력한 도시명을 출력하도록 요구했습니다. 이를 확장해 검색어가 포함된 도시 카드만 남도록 구현했습니다.

```js
const filteredWeatherList = computed(() => {
  const keyword = searchCity.value.trim()

  if (!keyword) {
    return weatherList.value
  }

  return weatherList.value.filter((weather) =>
    weather.name.includes(keyword),
  )
})
```

- `trim()`은 검색어 양쪽 공백을 제거합니다.
- `filter()`는 조건에 맞는 도시만 골라 새로운 배열을 만듭니다.
- `includes()`는 도시 이름에 검색어가 포함됐는지 확인합니다.
- `computed`는 검색어가 바뀔 때 검색 결과를 다시 계산합니다.

### 6. 카드 선택 이벤트

날씨 카드를 클릭하면 도시 이름을 함수에 전달합니다.

```vue
<article @click="selectCity(weather.name)">
```

```js
const selectCity = (cityName) => {
  selectedMessage.value = `${cityName}이(가) 선택되었습니다.`
}
```

`selectedMessage`가 `ref`이므로 값이 변경되면 상태바도 자동으로 갱신됩니다.

### 7. 상세보기와 이벤트 버블링 차단

상세보기 버튼은 클릭 가능한 날씨 카드 안에 있습니다.

```vue
<button
  @click.stop="showDetail(weather.name, weather.status)"
>
  상세보기
</button>
```

`.stop`이 없으면 상세보기 버튼을 클릭한 후 이벤트가 부모 카드까지 올라가 카드 선택 이벤트도 실행됩니다. `@click.stop`으로 이벤트 전파를 차단해 알림창만 표시되도록 했습니다.

```js
const showDetail = (cityName, status) => {
  window.alert(
    `${cityName}의 현재 날씨는 [${status}] 상태입니다.`,
  )
}
```

```text
상세보기 클릭
→ showDetail 실행
→ 날씨 알림 표시
→ .stop이 부모 카드로의 이벤트 전달 차단
```

### 8. 전체 평균 기온

`computed`와 JavaScript 배열의 `reduce()`를 이용해 전체 도시의 평균 기온을 계산했습니다.

```js
const averageTemp = computed(() => {
  const total = weatherList.value.reduce(
    (sum, weather) => sum + weather.temp,
    0,
  )

  return (total / weatherList.value.length).toFixed(1)
})
```

`reduce()`로 모든 도시의 기온을 더하고 도시 수로 나눈 뒤, `toFixed(1)`로 소수점 첫째 자리까지 표시했습니다.

## 기본 요구사항 외에 추가한 기능

- 제주와 대전 날씨 데이터
- 날씨 상태 아이콘
- 습도, 풍속, 미세먼지 정보
- 입력한 검색어에 따른 카드 필터링
- 검색어 초기화 버튼
- 검색 결과 없음 안내 화면
- 전체 도시 평균 기온
- 키보드 Enter를 이용한 카드 선택
- 화면 크기에 따른 3열·2열·1열 반응형 카드 배치

## Composition API 확장 구현

145페이지 Weather Composition 요구사항을 기존 날씨 Mockup에 확장했습니다.

### 검색 결과 `computed`

`searchQuery`가 변경되면 `filteredWeatherList`가 자동으로 다시 계산됩니다. 검색어가 없으면 원본 배열을 반환하고, 검색어가 있으면 도시 이름이 일치하는 항목만 반환합니다.

### 선택 도시 `watch`

카드를 클릭해 `selectedCityInfo`가 변경되면 `watch`가 이전 도시와 새로운 도시, 변경된 상태바 문구를 브라우저 Console에 출력합니다.

### 검색어 `watchEffect`

`watchEffect` 내부에서 `searchQuery`를 사용해 Vue가 검색어를 자동으로 감시하도록 했습니다. 컴포넌트 생성 시 한 번 실행되고, 검색어를 입력할 때마다 현재 검색어를 Console에 출력합니다.

### 개인 반응형 기능

- `showExtraInfo`: 습도·풍속·미세먼지 표시 여부를 관리하는 반응형 상태
- `hotCityCount`: 25℃ 이상인 도시 수를 계산하는 `computed`
- `watch(showExtraInfo)`: 추가 정보 표시 여부가 바뀔 때 Console 로그 출력

## 구현하면서 이해한 내용

### `ref`와 화면 갱신

검색어와 상태 메시지를 `ref`로 선언했습니다. 값이 변경되면 Vue가 연결된 화면을 다시 렌더링한다는 것을 확인했습니다.

### `computed`와 원본 데이터

검색 결과와 평균 기온은 원본 `weatherList`를 직접 변경하지 않고 `computed`로 계산했습니다. 의존하는 값이 변경될 때만 계산 결과가 갱신됩니다.

### `v-for`와 `:key`

`v-for`로 배열 데이터를 화면에 반복 출력하고, 각 카드의 고유한 `id`를 `:key`로 사용해 Vue가 항목을 구분하도록 했습니다.

### 조건부 렌더링

`v-if`와 `v-else`를 사용하면 JavaScript 조건 결과에 따라 서로 다른 HTML 요소를 렌더링할 수 있다는 것을 확인했습니다.

### 이벤트 버블링

자식 버튼의 클릭 이벤트가 부모 카드로 전달될 수 있으며, Vue의 `.stop` 수식어로 이를 간단하게 차단할 수 있다는 것을 확인했습니다.

### Vue 반응형과 반응형 웹의 차이

- Vue 반응형 데이터는 데이터 변경에 따라 화면이 갱신되는 것을 의미합니다.
- 반응형 웹 디자인은 화면 너비에 따라 카드 배치가 바뀌는 것을 의미합니다.

## 시행착오와 해결

### 날씨 화면이 왼쪽 절반에만 표시된 문제

Vue 기본 템플릿의 `main.css`에 `#app`을 2열 Grid로 만드는 설정이 남아 있어 날씨 화면이 첫 번째 열에만 표시됐습니다.

```css
#app {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```

`#app`이 화면 전체 너비를 사용하도록 다음과 같이 수정했습니다.

```css
#app {
  width: 100%;
  min-height: 100vh;
}
```

이 과정을 통해 컴포넌트 자체의 CSS뿐 아니라 부모 요소의 레이아웃도 화면 배치에 영향을 준다는 점을 확인했습니다.

## 프로젝트 구조

```text
src/
├─ App.vue
├─ main.js
├─ assets/
│  ├─ base.css
│  └─ main.css
└─ components/
   └─ practices/
      └─ basic/
         ├─ WeatherMockup.vue
         └─ 기타 수업 실습 파일
```

- `App.vue`: 제출용 날씨 컴포넌트를 연결하는 루트 컴포넌트
- `WeatherMockup.vue`: 날씨 데이터, 검색, 이벤트, 화면과 스타일 구현
- `main.css`: 프로젝트 전체 레이아웃 설정
- 기타 실습 파일: 수업에서 배운 Vue 문법을 연습한 코드이며 제출 화면에는 연결하지 않았습니다.

## 동작 확인 방법

1. 첫 화면에 서울, 수원, 부산, 제주, 대전 카드가 나타나는지 확인합니다.
2. 검색창에 `서울`을 입력해 서울 카드만 남는지 확인합니다.
3. 초기화 버튼을 눌러 전체 카드가 다시 나타나는지 확인합니다.
4. 날씨 카드를 클릭해 상태바에 선택한 도시가 표시되는지 확인합니다.
5. 상세보기 버튼을 눌러 날씨 알림만 나타나는지 확인합니다.
6. 존재하지 않는 도시를 검색해 결과 없음 화면을 확인합니다.
7. 브라우저 너비를 줄여 카드가 3열, 2열, 1열로 변경되는지 확인합니다.

## 사용 기술

- Vue 3 Composition API
- JavaScript
- Vite
- HTML5
- CSS3

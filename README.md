# Weather Scene

> 오늘 날씨엔, 이 드라마

날씨를 확인한 뒤 지금 분위기와 어울리는 한국 드라마를 추천해 주는 Vue 웹사이트입니다.

수업에서 만든 지역별 날씨 카드에서 시작해 제가 관심 있는 드라마 추천을 주제로 정했습니다. 처음에는 서울, 수원, 부산, 제주, 대전의 Mock Data만 보여 주었지만, 최종적으로 OpenWeather와 TMDB API를 연결했습니다. 이제 국내외 도시를 직접 검색하고, 해당 지역의 실제 날씨와 미세먼지를 확인한 뒤 날씨에 맞는 드라마를 볼 수 있습니다.

## 배포 주소

- [Weather Scene 바로가기](https://skala-vue-vert.vercel.app)

## 구현한 기능

- 기본 5개 도시의 현재 날씨 출력
- 국내외 도시 이름 검색
- 현재 기온, 날씨 상태, 습도, 풍속 표시
- PM2.5 미세먼지 수치와 단계 표시
- 날씨와 기온에 따른 추천 장르 결정
- 추천 장르에 맞는 한국 드라마 3편 조회
- 도시별 상세 페이지와 시간대별 예보
- 섭씨와 화씨 단위 변경
- 화면 크기에 따른 반응형 카드 배치
- API 요청 실패 시 Mock Data 표시

## 실행 방법

### 1. 패키지 설치

```sh
npm install
```

### 2. 환경 변수 설정

프로젝트 최상위 폴더에 `.env` 파일을 만들고 아래 값을 넣습니다.

```env
VITE_OPENWEATHER_API_KEY=OpenWeather_API_KEY
VITE_TMDB_ACCESS_TOKEN=TMDB_Read_Access_Token
```

API 키와 토큰이 들어 있는 `.env`는 GitHub에 올리지 않습니다.

### 3. 개발 서버 실행

```sh
npm run dev
```

터미널에 표시되는 주소로 접속합니다. 기본 주소는 `http://localhost:5173`입니다.

### 4. 빌드 확인

```sh
npm run build
```

## 사용한 기술

- Vue 3 Composition API
- Vue Router, Pinia
- Axios, Element Plus, Vite
- OpenWeather API, TMDB API

## 수업에서 배운 내용과 코드 연결

| 배운 내용            | 적용한 파일                                      | 적용 방법                                       |
| -------------------- | ------------------------------------------------ | ----------------------------------------------- |
| 반응형 상태 `ref`    | `WeatherHomeView.vue`                            | 날씨 목록, 검색어, 선택 도시, 로딩 상태 관리    |
| 계산된 값 `computed` | `WeatherHomeView.vue`, `WeatherCard.vue`         | 검색 결과, 평균 기온, 단위 변환, 추천 장르 계산 |
| 반복 렌더링 `v-for`  | `WeatherHomeView.vue`, `DramaRecommendation.vue` | 날씨 카드와 추천 드라마 반복 출력               |
| 조건부 렌더링 `v-if` | `WeatherHomeView.vue`, `WeatherCard.vue`         | 로딩, 빈 결과, 추가 정보, 기온 라벨 표시        |
| 이벤트와 수식어      | `SearchBar.vue`, `WeatherCard.vue`               | 입력, Enter 검색, 카드 선택, `@click.stop` 처리 |
| Props와 Emits        | `SearchBar.vue`, `WeatherCard.vue`               | 부모가 데이터를 전달하고 자식이 이벤트를 전달   |
| Slot                 | `BaseDashboardCard.vue`                          | 같은 카드 틀에 검색 영역과 목록 영역 삽입       |
| Vue Router           | `router/index.js`, `WeatherDetailView.vue`       | URL별 View 분리와 동적 상세 페이지 구성         |
| Pinia                | `configStore.js`                                 | 여러 화면에서 사용하는 섭씨·화씨 상태 관리      |
| Axios와 비동기 처리  | `WeatherHomeView.vue`, `WeatherDetailView.vue`   | 날씨, 미세먼지, 드라마 API 요청과 오류 처리     |

## 화면이 실행되는 순서

처음에는 Vue 프로젝트에서 어떤 파일부터 실행되는지 헷갈렸습니다. 이번 프로젝트를 만들면서 아래 순서로 화면이 만들어진다는 것을 이해했습니다.

```text
npm run dev
→ Vite 개발 서버 실행
→ index.html 로드
→ main.js 실행
→ Vue 앱, Router, Pinia, Element Plus 등록
→ App.vue를 #app에 연결
→ 현재 URL에 맞는 View를 RouterView에 출력
→ View가 필요한 컴포넌트를 조립
```

`index.html`은 Vue 화면이 들어갈 `<div id="app">`을 가지고 있습니다. `main.js`는 앱을 시작하는 파일이고, `App.vue`는 모든 페이지에서 공통으로 보이는 헤더와 `RouterView`를 가지고 있습니다.

## 폴더와 파일 역할

```text
src
├── App.vue                 # 공통 헤더와 RouterView
├── main.js                 # Vue 앱 시작
├── router/index.js         # URL과 View 연결
├── stores/configStore.js   # 섭씨/화씨 공통 상태
├── data
│   ├── weather.js          # 기본 날씨와 미세먼지 단계 함수
│   └── dramas.js           # 추천 기준과 Mock 드라마
├── views
│   ├── WeatherHomeView.vue
│   ├── WeatherDetailView.vue
│   ├── WeatherTipsView.vue
│   ├── WeatherAboutView.vue
│   └── NotFoundView.vue
└── components/exercise
    ├── SearchBar.vue
    ├── WeatherCard.vue
    ├── DramaRecommendation.vue
    ├── BaseDashboardCard.vue
    └── UnitToggler.vue
```

`views`에는 URL 하나를 담당하는 큰 화면을 넣고, `components`에는 View 안에서 조립해서 사용하는 작은 기능을 넣었습니다. 예를 들어 `/`에서는 `WeatherHomeView`가 나오고 그 안에서 `SearchBar`와 여러 개의 `WeatherCard`를 사용합니다.

## Vue에서 배운 내용을 적용한 부분

### 1. `ref`로 변하는 값 관리하기

검색어, 날씨 목록, 선택된 도시, 로딩 상태처럼 실행 중에 달라지는 값은 `ref`로 만들었습니다.

```js
const weatherList = ref(weatherData)
const searchQuery = ref('')
const selectedCity = ref(null)
const isLoading = ref(false)
```

JavaScript에서는 `.value`로 접근하고 template에서는 바로 사용합니다. `ref` 값이 달라지면 Vue가 해당 값을 사용하는 화면을 다시 그려 줍니다. 이것이 반응형이라는 뜻이라는 것을 알게 되었습니다.

### 2. `computed`로 계산된 값 만들기

검색 결과와 전체 평균 기온은 원본 데이터를 직접 바꾸지 않고 `computed`로 계산했습니다.

```js
const filteredWeatherList = computed(() => {
  const keyword = searchQuery.value.trim()
  if (!keyword) return weatherList.value
  return weatherList.value.filter((weather) => weather.name.includes(keyword))
})
```

검색어나 날씨 목록이 바뀌면 결과도 자동으로 다시 계산됩니다.

### 3. `v-for`와 `v-if`

`v-for`로 배열에 있는 도시 수만큼 `WeatherCard`를 반복했습니다. `:key`에는 각 도시의 고유한 `id`를 사용했습니다.

```vue
<WeatherCard v-for="weather in filteredWeatherList" :key="weather.id" :weather="weather" />
```

로딩 중, 검색 결과가 있을 때, 결과가 없을 때는 `v-if`, `v-else-if`, `v-else`로 서로 다른 화면을 보여 줍니다.

### 4. Props와 Emits

`WeatherHomeView`가 전체 날씨 목록을 가지고 있고 `WeatherCard`는 Props로 받은 도시 한 곳을 출력합니다. 자식은 부모 데이터를 직접 바꾸지 않고 카드 선택이나 상세보기 요청을 Emits로 부모에게 알려 줍니다.

```text
WeatherHomeView
→ weather 객체를 Props로 전달
→ WeatherCard가 화면 출력
→ 클릭 이벤트를 Emits로 전달
→ WeatherHomeView가 선택 또는 이동 처리
```

상세 버튼의 `@click.stop`은 버튼의 클릭이 부모 카드까지 올라가는 이벤트 버블링을 막습니다.

### 5. Slot

`BaseDashboardCard.vue`에는 공통 카드 모양과 `<slot />`만 만들었습니다. 부모에서 검색창 또는 날씨 목록을 태그 사이에 넣으면 Slot 위치에 표시됩니다. 같은 틀을 여러 번 재사용하면서 내용은 다르게 만들 수 있었습니다.

### 6. Vue Router

| URL                | 화면                    | 역할                    |
| ------------------ | ----------------------- | ----------------------- |
| `/`                | `WeatherHomeView.vue`   | 도시 검색과 날씨 카드   |
| `/weather/:cityId` | `WeatherDetailView.vue` | 날씨와 추천작 상세 정보 |
| `/tips`            | `WeatherTipsView.vue`   | 추천 기준 설명          |
| `/about`           | `WeatherAboutView.vue`  | 프로젝트 소개           |
| 그 외 주소         | `NotFoundView.vue`      | 404 화면                |

```text
상세 버튼 클릭
→ WeatherCard가 click-detail 이벤트 발생
→ WeatherHomeView의 goToDetail 실행
→ router.push()로 URL 변경
→ RouterView가 WeatherDetailView로 변경
→ route의 도시 정보로 API 호출
```

기본 도시는 URL의 `cityId`로 찾고, 새로 검색한 도시는 위도와 경도를 query로 전달해서 상세 페이지에서도 같은 위치의 날씨를 조회합니다.

### 7. Pinia

섭씨와 화씨는 홈과 상세 페이지에서 모두 사용하는 값이라 `configStore.js`에 넣었습니다. 헤더에서 단위를 바꾸면 Store의 값이 변경되고, Store를 사용하는 모든 화면의 단위가 함께 바뀝니다.

## API 연결 과정

### OpenWeather

```text
도시 이름 입력
→ Geocoding API로 위도와 경도 검색
→ 좌표로 현재 날씨 API 호출
→ 좌표로 대기오염 API 호출
→ 필요한 형태로 데이터를 정리
→ 검색 결과를 날씨 목록 맨 앞에 추가
```

같은 이름의 도시가 여러 나라에 있을 수 있어 카드에 국가 코드도 표시했습니다. 사용한 데이터는 다음과 같습니다.

- `main.temp`: 현재 기온
- `weather[0].description`: 날씨 상태
- `main.humidity`: 습도
- `wind.speed`: 풍속
- `components.pm2_5`: 초미세먼지 농도

PM2.5 값은 `weather.js`의 `getFineDustText()`에서 좋음부터 매우 나쁨까지 구분합니다.

### TMDB

```text
현재 날씨와 기온 확인
→ 추천 장르와 TMDB 장르 ID 결정
→ 한국 작품만 조회
→ 인기도순 결과 중 3편 표시
```

API 호출에는 Axios와 `async/await`를 사용했습니다. 호출 중에는 로딩 화면을 보여 주고, 요청이 실패하거나 토큰이 없으면 `catch`와 Mock Data를 이용해 화면이 비어 있지 않도록 했습니다.

## 드라마 추천 기준

날씨 설명과 현재 기온을 함께 사용해 장르를 결정합니다. 비와 눈처럼 분위기가 뚜렷한 날씨를 먼저 확인하고, 그다음 고온과 저온 조건을 반영했습니다.

| 날씨 또는 기온     | 추천 장르        |
| ------------------ | ---------------- |
| 눈                 | 판타지           |
| 비, 소나기, 이슬비 | 감성 드라마      |
| 28℃ 이상           | 액션 & 어드벤처  |
| 10℃ 이하           | 힐링 드라마      |
| 맑음               | 기분 좋은 코미디 |
| 구름, 흐림, 안개   | 미스터리         |
| 그 외 23℃ 이상     | 기분 좋은 코미디 |
| 나머지             | 감성 드라마      |

추천 기준은 `src/data/dramas.js`로 분리했습니다. 화면 코드와 규칙을 나누어 두면 나중에 기준을 수정하기 쉽다는 것을 알게 되었습니다.

## 기본 과제에서 추가한 부분

- 기본 날씨 카드 주제를 날씨별 드라마 추천으로 변경
- Mock Data에서 실제 API 데이터로 확장
- 기본 5개 도시 외 국내외 도시 검색
- PM2.5 대기오염 API 연결
- 날씨 상태와 기온을 함께 사용하는 추천 규칙
- TMDB 한국 드라마 추천
- Router를 이용한 홈/상세 화면 분리
- Pinia를 이용한 전체 화면 단위 변경
- 로딩, API 오류, 검색 결과 없음 화면
- 모바일 반응형 CSS

## Troubleshooting

Vue 실습과 프로젝트를 진행하면서 실제로 발생했던 문제를 원인과 해결 방법 중심으로 정리했습니다.

| 문제 | 원인 | 해결 방법 | 배운 점 |
| --- | --- | --- | --- |
| `Failed to resolve import` 오류 | `App.vue`에 작성한 경로에 `SampleOne.vue`가 없거나 파일명과 경로가 일치하지 않음 | 컴포넌트가 실제로 있는 폴더와 import 경로를 맞추고 대소문자까지 확인 | import 경로는 현재 파일을 기준으로 계산하며 실제 파일명과 정확히 같아야 함 |
| 단위 변경 버튼을 눌러도 기온이 그대로임 | 단위 상태만 변경하고 출력 기온의 계산식에는 연결하지 않음 | Pinia 상태를 카드, 평균 기온, 상세 예보의 `computed`에서 사용해 섭씨와 화씨를 변환 | 상태 변경과 그 상태를 사용하는 화면 계산이 모두 연결되어야 함 |
| 검색해도 기본 5개 도시만 나옴 | 기존 `weatherList` 배열을 `filter()`로 거르는 기능만 있었음 | Geocoding API로 도시 좌표를 찾고 좌표로 실제 날씨를 요청해 새 카드를 추가 | 배열 필터링과 서버에서 새로운 데이터를 검색하는 것은 다른 기능임 |
| 기온이 달라도 미스터리만 추천됨 | 추천 함수가 기온 없이 `구름`, `흐림` 같은 상태 문자열만 검사함 | 날씨와 기온을 함께 전달하고 비·눈, 고온·저온, 나머지 상태 순서로 조건을 검사 | 조건의 종류뿐 아니라 조건문의 검사 순서도 결과에 영향을 줌 |
| 미세먼지가 `API 미제공`으로 표시됨 | 현재 날씨 API에는 PM2.5가 없고 대기오염 API는 좌표를 요구함 | 날씨에서 위도·경도를 얻은 뒤 Air Pollution API를 호출해 PM2.5 수치와 단계를 표시 | 앞 API의 응답이 다음 API의 입력이 될 때는 비동기 실행 순서가 중요함 |

## 만들면서 알게 된 점

처음에는 `.js`와 `.vue` 파일을 언제 사용하는지 헷갈렸습니다. 화면이 필요한 코드는 `.vue`에 작성하고, 라우터 설정, 공통 데이터, 추천 규칙, Store처럼 화면 모양이 필요 없는 코드는 `.js`로 분리했습니다.

API 응답을 그대로 template에 모두 쓰기보다 화면에 필요한 `name`, `temp`, `status` 등의 형태로 정리한 뒤 컴포넌트에 전달하는 편이 이해하기 쉬웠습니다.

가장 중요하게 이해한 것은 반응형 데이터가 바뀌면 화면을 직접 다시 만드는 코드를 작성하지 않아도 Vue가 필요한 부분을 갱신해 준다는 점입니다.

## 앞으로 개선하고 싶은 점

- 같은 이름의 도시가 여러 개일 때 국가를 선택하는 기능
- 검색한 도시 즐겨찾기
- 날짜별 추천 기록 저장
- 강수 확률과 체감온도 추가
- API 오류 종류에 따른 자세한 안내

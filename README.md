# 맛집 관리 CRUD Service

## Service Topic

**맛집(음식점) 정보 관리 서비스**

사용자가 자주 가거나 기록해두고 싶은 음식점 정보를 등록·조회·수정·삭제(CRUD)할 수 있는 Multi-Page 웹 서비스입니다. 별도의 백엔드/DB 없이 브라우저의 `localStorage`(key: `matjip_list`)를 데이터 저장소로 사용하며, `app.js`에 데이터 CRUD 함수(`loadList`, `addItem`, `updateItem`, `deleteItem` 등)를 모아 각 페이지(`index.html`, `add.html`, `edit.html`, `view.html`)에서 공용으로 불러 씁니다.

## Data Fields

| Field | 설명 |
|---|---|
| `id` | 데이터 고유 식별자 (등록 시 자동 증가로 생성, 사용자 입력 불가) |
| `phone` | 가게 전화번호 (`02-1234-5678` 형식의 문자열) |
| `name` (storeName) | 상표명 / 가게 이름 (2~30자 문자열) |
| `category` | 음식 카테고리 (한식 / 중식 / 일식 / 양식 / 카페·디저트 / 기타 중 select) |
| `location` | 위치 / 주소 (문자열) |
| `rating` | 평점 (0.0 ~ 5.0, 0.1 단위 숫자) |
| `hours` | 영업시간 (예: `09:00 - 22:00`) |
| `regDate` | 등록일 (date 타입) |

→ `id`를 포함해 총 **8개**의 데이터 Field로 구성되어 있습니다.

## List Page

`index.html`의 목록 테이블(`.data-table`)에는 아래 **6개** Field를 표시합니다.

- 전화번호 (`phone`)
- 상표명 (`name`)
- 카테고리 (`category` → 한글 라벨로 변환하여 표시)
- 위치 (`location`)
- 평점 (`rating`, ⭐ 아이콘과 함께 표시)
- 영업시간 (`hours`)

행(row) 클릭 시 `view.html?id=...`로 이동해 상세 정보(등록일 포함)를 확인할 수 있고, 데이터가 하나도 없을 때는 빈 테이블 대신 안내 문구와 등록 페이지로 가는 링크를 보여줍니다.

## Validation

`add.html`, `edit.html`의 `validateForm()`에서 아래 **6개** 조건을 검사하며, 실패 시 각 입력창 하단 `.error-msg`에 메시지를 표시하고 `input.invalid` 클래스로 테두리를 빨간색으로 강조합니다.

1. **필수 입력 검사** — `phone, storeName, category, location, rating, hours, regDate` 7개 필드 모두 값이 비어 있으면 "필수 입력 항목입니다." 표시
2. **전화번호 형식 검사** — 정규식 `/^0\d{1,2}-\d{3,4}-\d{4}$/`로 `02-1234-5678` 같은 형식이 아니면 에러 처리
3. **문자열 길이 검사** — 상표명(`storeName`)은 2~30자를 벗어나면 에러 처리
4. **숫자 범위 검사** — 평점(`rating`)은 `input[min=0][max=5]`와 별개로 JS에서 0~5 범위를 재검증
5. **select 선택 여부 검사** — 카테고리(`category`)를 선택하지 않으면(`""`) 에러 처리
6. **날짜 입력 여부 검사** — 등록일(`regDate`)이 비어 있으면 에러 처리

## RWD (Responsive Web Design)

Bootstrap 프레임워크 대신 **순수 CSS Media Query**(`my.css`)로 Desktop/Mobile 레이아웃을 구성했습니다.

- **공통 레이아웃**: `.container`를 `max-width: 860px`로 중앙 정렬하고, `viewport` 메타 태그(`width=device-width, initial-scale=1.0`)로 모바일 초기 배율을 고정
- **Desktop (기본, 601px 이상)**: 목록 테이블 6개 컬럼을 전부 노출, 상세보기 화면의 `.detail-list`는 `grid-template-columns: 140px 1fr`로 라벨-값 2열 배치
- **Mobile (`@media (max-width: 600px)`)**:
  - 목록 테이블에서 우선순위가 낮은 3번째 컬럼(카테고리)을 `display: none`으로 숨겨 좁은 화면에서 가로 스크롤 없이 핵심 정보만 노출
  - 상세보기 `.detail-list`를 `grid-template-columns: 1fr`로 바꿔 라벨과 값이 세로로 쌓이도록 전환
- 입력창(`input`, `select`)은 `width: 100%`로 지정해 화면 크기에 관계없이 폭에 맞게 자동 조정되도록 처리

## Bootstrap

이번 CRUD 서비스(`index/add/edit/view.html`)는 실제 Bootstrap CDN을 불러오지 않고, `my.css`에서 Bootstrap의 네이밍 컨벤션을 참고한 **커스텀 클래스**로 UI를 구성했습니다.

- `.container`, `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger` : Bootstrap 스타일을 참고해 직접 정의한 버튼/레이아웃 클래스
- Flexbox(`display: flex`)와 CSS Grid(`display: grid`)로 헤더/네비게이션/상세보기 레이아웃 구성
- 반응형은 위 RWD 항목처럼 **CSS Media Query**로 구현 (과제 요구사항의 "Bootstrap 또는 Media Query" 중 Media Query 방식 선택)

별도로 STEP 0 실습 파일인 `example.html`에서는 실제 **Bootstrap 5.3**(jsDelivr CDN, `bootstrap.min.css` / `bootstrap.bundle.min.js`)을 적용해 공식 Heroes 예제를 재현했으며, Grid System(`container`, `row`, `col-lg-*`), 버튼(`btn btn-primary`, `btn-outline-secondary`), 폼(`form-floating`, `form-control`), `dropdown`, `display-*` / `lead` / `fw-bold` 등의 유틸리티 클래스를 학습 목적으로 사용했습니다.

## Problem & Solution

| 문제 | 해결 방법 |
|---|---|
| 최초 접속 시 `localStorage`가 비어 있어 빈 화면만 보임 | `loadList()`에서 저장된 값이 없으면 `SAMPLE_DATA`(5건)를 자동으로 채워 넣어 첫 화면부터 데이터 확인 가능하도록 처리 |
| 목록에 데이터가 하나도 없을 때 빈 테이블만 덩그러니 표시됨 | `list.length === 0`을 분기해 "등록된 맛집이 없습니다" 안내 문구와 등록 페이지 링크가 담긴 행을 보여줌 |
| 전화번호를 자유 형식으로 입력하면 표기가 제각각이 됨 | 정규식(`/^0\d{1,2}-\d{3,4}-\d{4}$/`)으로 형식을 강제하고, placeholder와 hint 문구로 입력 예시를 안내 |
| 좁은 화면에서 6개 컬럼 테이블이 잘리거나 가로 스크롤이 생김 | 미디어 쿼리로 상대적으로 덜 중요한 카테고리 컬럼을 숨겨 핵심 정보만 남도록 처리 |
| `edit.html`의 취소 버튼이 무조건 목록으로 이동해 원래 보던 상세 화면을 잃어버림 | 취소 버튼에 별도 클릭 이벤트를 걸어 수정 전 보고 있던 `view.html?id=...`로 되돌아가게 수정 |

## Reflection

- **새롭게 알게 된 점**: Bootstrap 프레임워크 없이도 클래스 네이밍 규칙과 CSS Media Query만으로 Desktop/Mobile 반응형 UI를 구성할 수 있다는 점을 확인했습니다. 또한 `app.js`에 데이터 접근 함수(`loadList`, `addItem`, `updateItem`, `deleteItem`)를 모아두니 각 페이지 스크립트는 화면 로직에만 집중할 수 있어 코드가 훨씬 정리됐습니다. `URLSearchParams`로 쿼리스트링(`?id=`)을 다루는 방법도 새로 익혔습니다.
- **궁금한 점**: 지금은 `localStorage`에 데이터를 저장하지만, 실제 서비스처럼 서버/DB와 연동하려면 `app.js`의 CRUD 함수들을 얼마나 그대로 재사용할 수 있을지 궁금합니다. 또한 `example.html`에서 사용한 실제 Bootstrap 프레임워크를 이번 CRUD 서비스에도 적용한다면, 지금 작성한 커스텀 CSS(`my.css`)와 충돌 없이 자연스럽게 통합하려면 어떤 순서로 리팩터링해야 할지 더 학습해보고 싶습니다.

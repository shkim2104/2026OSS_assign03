// 맛집 관리 CRUD - localStorage 기반 데이터 저장소
// key: matjip_list, value: JSON 배열
const STORAGE_KEY = "matjip_list";

const CATEGORY_LABELS = {
  korean: "한식",
  chinese: "중식",
  japanese: "일식",
  western: "양식",
  cafe: "카페/디저트",
  etc: "기타",
};

// 최초 접속 시 넣어줄 샘플 데이터
const SAMPLE_DATA = [
  {
    id: 1,
    phone: "02-1234-5678",
    name: "할매순대국",
    category: "korean",
    location: "서울시 마포구 합정동",
    rating: 4.5,
    hours: "09:00 - 21:00",
    regDate: "2026-01-10",
  },
  {
    id: 2,
    phone: "02-2345-6789",
    name: "런던베이글뮤지엄",
    category: "cafe",
    location: "서울시 종로구 안국동",
    rating: 4.2,
    hours: "08:00 - 20:00",
    regDate: "2026-02-03",
  },
  {
    id: 3,
    phone: "02-3456-7890",
    name: "육쌈냉면",
    category: "korean",
    location: "서울시 강남구 역삼동",
    rating: 4.0,
    hours: "11:00 - 22:00",
    regDate: "2026-02-20",
  },
  {
    id: 4,
    phone: "010-4567-8901",
    name: "스시오마카세 결",
    category: "japanese",
    location: "서울시 서초구 서초동",
    rating: 4.8,
    hours: "17:00 - 23:00",
    regDate: "2026-03-01",
  },
  {
    id: 5,
    phone: "02-5678-9012",
    name: "라뜰리에 파스타",
    category: "western",
    location: "서울시 용산구 이태원동",
    rating: 3.9,
    hours: "11:30 - 21:30",
    regDate: "2026-03-15",
  },
];

function loadList() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_DATA));
    return [...SAMPLE_DATA];
  }
  return JSON.parse(raw);
}

function saveList(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function getItemById(id) {
  return loadList().find((item) => item.id === Number(id));
}

function addItem(item) {
  const list = loadList();
  const nextId = list.length > 0 ? Math.max(...list.map((i) => i.id)) + 1 : 1;
  list.push({ id: nextId, ...item });
  saveList(list);
}

function updateItem(id, updated) {
  const list = loadList();
  const idx = list.findIndex((item) => item.id === Number(id));
  if (idx !== -1) {
    list[idx] = { id: Number(id), ...updated };
    saveList(list);
  }
}

function deleteItem(id) {
  const list = loadList().filter((item) => item.id !== Number(id));
  saveList(list);
}

function getCategoryLabel(value) {
  return CATEGORY_LABELS[value] || value;
}

function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

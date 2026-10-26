const themeToggle = document.querySelector(".theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const visibleCount = document.querySelector("#visible-count");
const currentYear = document.querySelector("#current-year");
const projectDialog = document.querySelector(".project-dialog");
const dialogTitle = projectDialog?.querySelector("#dialog-title");
const dialogYear = projectDialog?.querySelector(".dialog-year");
const dialogDescription = projectDialog?.querySelector(".dialog-description");
const dialogRole = projectDialog?.querySelector(".dialog-role");
const dialogTags = projectDialog?.querySelector(".dialog-tags");
const dialogHighlights = projectDialog?.querySelector(".dialog-highlights ul");
const dialogClose = projectDialog?.querySelector(".dialog-close");

const projectDetails = [
  {
    description: "동네의 취향 좋은 가게와 오래 곁에 둘 만한 물건을 발견하도록 돕는 로컬 큐레이션 서비스입니다. 지역 상점의 매력을 편안하게 둘러보고, 새로운 취향을 발견하는 경험을 만들었습니다.",
    role: "UX 리서치 · 프로덕트 디자인",
    scope: ["UX/UI", "UX research", "Figma"],
    highlights: [
      "지역과 취향을 중심으로 가게를 탐색하는 흐름 설계",
      "상품과 매장의 개성이 돋보이는 따뜻한 비주얼 디자인",
      "다양한 화면 크기에서도 자연스럽게 이어지는 반응형 경험 설계",
    ],
  },
  {
    description: "바쁜 하루 속에서 잠시 멈춰 오늘의 마음을 돌아보도록 돕는 모바일 기록 앱입니다. 사용자가 부담 없이 자신의 속도로 감정과 하루를 기록할 수 있도록 경험을 구성했습니다.",
    role: "UX 리서치 · 프로덕트 디자인",
    scope: ["UX research", "UI design", "Prototyping"],
    highlights: [
      "하루의 상태를 가볍게 돌아보는 짧은 기록 흐름 설계",
      "차분한 색과 여백을 활용해 기록에 집중할 수 있는 화면 구성",
      "핵심 사용자 흐름을 확인할 수 있는 인터랙티브 프로토타입 제작",
    ],
  },
  {
    description: "개인 사업자가 매출 흐름과 월별 성과를 한눈에 파악하도록 돕는 대시보드입니다. 흩어진 데이터를 명확한 시각 정보로 정리해 다음 의사결정에 활용할 수 있도록 했습니다.",
    role: "UX 리서치 · 프로덕트 디자인",
    scope: ["Dashboard", "Data visualization", "Figma"],
    highlights: [
      "매출 현황과 변화 추이를 빠르게 읽을 수 있는 정보 구조 설계",
      "복잡한 수치를 카드와 차트로 정리한 대시보드 UI 디자인",
      "일관된 화면 확장을 고려한 정보 구조와 디자인 시스템 설계",
    ],
  },
];

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

themeToggle?.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme !== "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-label", isDark ? "라이트 모드로 전환" : "다크 모드로 전환");
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let count = 0;

    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    projectCards.forEach((card) => {
      const categories = card.dataset.category?.split(" ") ?? [];
      const isVisible = filter === "all" || categories.includes(filter);
      card.hidden = !isVisible;
      if (isVisible) count += 1;
    });

    if (visibleCount) visibleCount.textContent = String(count);
  });
});

projectCards.forEach((card, index) => {
  const projectLink = card.querySelector(".project-visual");
  const details = projectDetails[index];

  projectLink?.addEventListener("click", (event) => {
    event.preventDefault();
    if (!projectDialog || !dialogTitle || !dialogYear || !dialogDescription || !dialogRole || !dialogTags || !dialogHighlights || !details) {
      return;
    }

    dialogTitle.textContent = card.querySelector(".project-title-row h3")?.textContent ?? "";
    dialogYear.textContent = card.querySelector(".project-year")?.textContent ?? "";
    dialogDescription.textContent = details.description;
    dialogRole.textContent = details.role;
    dialogTags.replaceChildren(...details.scope.map((label) => {
      const tag = document.createElement("span");
      tag.textContent = label;
      return tag;
    }));
    dialogHighlights.replaceChildren(...details.highlights.map((highlight) => {
      const item = document.createElement("li");
      item.textContent = highlight;
      return item;
    }));
    projectDialog.showModal();
  });
});

dialogClose?.addEventListener("click", () => projectDialog?.close());

projectDialog?.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

projectDialog?.querySelector(".dialog-contact")?.addEventListener("click", () => projectDialog.close());

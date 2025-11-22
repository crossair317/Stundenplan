const days = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];

const lessons = [
  {
    id: 1,
    class: "10A",
    week: "A",
    teacher: "Herr Müller",
    day: "Montag",
    startTime: "08:00",
    endTime: "09:30",
    subject: "Mathematik",
    room: "B201",
  },
  {
    id: 2,
    class: "10A",
    week: "A",
    teacher: "Frau Schmidt",
    day: "Montag",
    startTime: "09:45",
    endTime: "11:15",
    subject: "Deutsch",
    room: "A105",
  },
  {
    id: 3,
    class: "10B",
    week: "B",
    teacher: "Herr Lange",
    day: "Dienstag",
    startTime: "10:00",
    endTime: "11:30",
    subject: "Physik",
    room: "Labor 3",
  },
  {
    id: 4,
    class: "11",
    week: "A",
    teacher: "Frau Köhler",
    day: "Mittwoch",
    startTime: "12:00",
    endTime: "13:30",
    subject: "Geschichte",
    room: "C301",
  },
  {
    id: 5,
    class: "11",
    week: "B",
    teacher: "Herr Braun",
    day: "Donnerstag",
    startTime: "08:00",
    endTime: "09:30",
    subject: "Biologie",
    room: "Labor 1",
  },
  {
    id: 6,
    class: "10B",
    week: "A",
    teacher: "Frau Becker",
    day: "Freitag",
    startTime: "13:00",
    endTime: "14:30",
    subject: "Englisch",
    room: "Sprachlabor",
  },
];

const classFilter = document.querySelector("#classFilter");
const weekFilter = document.querySelector("#weekFilter");
const teacherFilter = document.querySelector("#teacherFilter");
const timetableGrid = document.querySelector("#timetableGrid");
const todayButton = document.querySelector("#todayButton");
const themeToggle = document.querySelector("#themeToggle");

const modal = document.querySelector("#detailModal");
const modalContent = document.querySelector("#modalContent");
const modalClose = document.querySelector("#modalClose");
const modalBackdrop = document.querySelector("#modalBackdrop");

const allTimes = Array.from(new Set(lessons.map((lesson) => lesson.startTime))).sort(sortTime);

init();

function init() {
  populateFilters();
  renderTimetable();
  attachEvents();
  applyStoredTheme();
}

function populateFilters() {
  const classes = ["Alle", ...new Set(lessons.map((l) => l.class))];
  const weeks = ["Alle", ...new Set(lessons.map((l) => l.week))];
  const teachers = ["Alle", ...new Set(lessons.map((l) => l.teacher))];

  classFilter.append(...classes.map(createOption));
  weekFilter.append(...weeks.map(createOption));
  teacherFilter.append(...teachers.map(createOption));
}

function createOption(value) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value;
  return option;
}

function attachEvents() {
  classFilter.addEventListener("change", renderTimetable);
  weekFilter.addEventListener("change", renderTimetable);
  teacherFilter.addEventListener("change", renderTimetable);

  todayButton.addEventListener("click", scrollToToday);

  themeToggle.addEventListener("click", () => {
    const isDark = document.body.dataset.theme === "dark";
    document.body.dataset.theme = isDark ? "light" : "dark";
    localStorage.setItem("theme", document.body.dataset.theme);
    themeToggle.textContent = `Thema: ${isDark ? "Hell" : "Dunkel"}`;
    themeToggle.setAttribute("aria-pressed", String(!isDark));
  });

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);
}

function renderTimetable() {
  timetableGrid.innerHTML = "";

  const headerRow = document.createDocumentFragment();
  headerRow.append(createHeaderCell("Zeit"));
  days.forEach((day) => headerRow.append(createHeaderCell(day)));
  timetableGrid.append(headerRow);

  const filteredLessons = lessons.filter((lesson) => {
    const matchesClass = classFilter.value === "Alle" || lesson.class === classFilter.value;
    const matchesWeek = weekFilter.value === "Alle" || lesson.week === weekFilter.value;
    const matchesTeacher = teacherFilter.value === "Alle" || lesson.teacher === teacherFilter.value;
    return matchesClass && matchesWeek && matchesTeacher;
  });

  const now = new Date();
  const todayIndex = now.getDay() - 1; // Monday as 0

  allTimes.forEach((time) => {
    const row = document.createDocumentFragment();
    row.append(createTimeCell(time));

    days.forEach((day, columnIndex) => {
      const lesson = filteredLessons.find((item) => item.day === day && item.startTime === time);
      if (lesson) {
        const cell = createLessonCell(lesson);
        const isToday = columnIndex === todayIndex;
        if (isToday && isCurrentTimeSlot(lesson, now)) {
          cell.classList.add("current-time");
        }
        row.append(cell);
      } else {
        const emptyCell = document.createElement("div");
        emptyCell.className = "cell empty";
        emptyCell.textContent = "—";
        row.append(emptyCell);
      }
    });

    timetableGrid.append(row);
  });
}

function createHeaderCell(text) {
  const div = document.createElement("div");
  div.className = "grid-header";
  div.textContent = text;
  div.setAttribute("role", "columnheader");
  return div;
}

function createTimeCell(time) {
  const div = document.createElement("div");
  div.className = "time-label";
  div.textContent = time;
  div.setAttribute("role", "rowheader");
  return div;
}

function createLessonCell(lesson) {
  const div = document.createElement("div");
  div.className = "cell";
  div.tabIndex = 0;
  div.setAttribute("role", "gridcell");
  div.innerHTML = `
    <div class="title">${lesson.subject}</div>
    <div class="meta">${lesson.startTime}–${lesson.endTime}</div>
    <div class="meta">${lesson.teacher} · Raum ${lesson.room}</div>
    <div class="meta">Klasse ${lesson.class} · Woche ${lesson.week}</div>
  `;
  div.addEventListener("click", () => openModal(lesson));
  div.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      openModal(lesson);
    }
  });
  return div;
}

function sortTime(a, b) {
  return toMinutes(a) - toMinutes(b);
}

function toMinutes(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

function isCurrentTimeSlot(lesson, referenceDate = new Date()) {
  const nowMinutes = referenceDate.getHours() * 60 + referenceDate.getMinutes();
  return nowMinutes >= toMinutes(lesson.startTime) && nowMinutes <= toMinutes(lesson.endTime);
}

function scrollToToday() {
  const dayIndex = new Date().getDay() - 1;
  if (dayIndex < 0 || dayIndex >= days.length) return;

  const headers = timetableGrid.querySelectorAll(".grid-header");
  const target = headers[dayIndex + 1];
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }
}

function openModal(lesson) {
  modalContent.innerHTML = `
    <p><strong>${lesson.subject}</strong></p>
    <p>${lesson.day}, ${lesson.startTime}–${lesson.endTime}</p>
    <p>${lesson.teacher}</p>
    <p>Raum: ${lesson.room}</p>
    <p>Klasse ${lesson.class} · Woche ${lesson.week}</p>
  `;
  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
}

function applyStoredTheme() {
  const stored = localStorage.getItem("theme");
  if (stored) {
    document.body.dataset.theme = stored;
    themeToggle.textContent = `Thema: ${stored === "dark" ? "Dunkel" : "Hell"}`;
    themeToggle.setAttribute("aria-pressed", String(stored === "dark"));
  }
}

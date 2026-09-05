```javascript
/* =====================================================
   QAZA NAMAZ TRACKER
   Complete 365-Day Tracking System
===================================================== */


/* =====================================================
   PRAYER INFORMATION
===================================================== */

const prayers = [
  {
    id: "fajr",
    en: "Fajr",
    gu: "ફજર",
    ur: "فجر",
    rakat: 2
  },

  {
    id: "zuhr",
    en: "Zuhr",
    gu: "ઝુહર",
    ur: "ظہر",
    rakat: 4
  },

  {
    id: "asr",
    en: "Asr",
    gu: "અસર",
    ur: "عصر",
    rakat: 4
  },

  {
    id: "maghrib",
    en: "Maghrib",
    gu: "મગરિબ",
    ur: "مغرب",
    rakat: 3
  },

  {
    id: "isha",
    en: "Isha",
    gu: "ઈશા",
    ur: "عشاء",
    rakat: 4
  }
];


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let tracker =
  JSON.parse(
    localStorage.getItem("qazaTracker")
  );

let language =
  localStorage.getItem("qazaLanguage") || "en";

let selectedDay = 1;

let calendarMonth;


/* =====================================================
   SCREEN FUNCTIONS
===================================================== */

function showLanguage() {

  document
    .getElementById("welcomeScreen")
    .classList.add("hidden");

  document
    .getElementById("languageScreen")
    .classList.remove("hidden");
}


function selectLanguage(lang) {

  language = lang;

  localStorage.setItem(
    "qazaLanguage",
    lang
  );

  document
    .getElementById("languageScreen")
    .classList.add("hidden");

  if (tracker) {

    openApp();

  } else {

    document
      .getElementById("setupScreen")
      .classList.remove("hidden");

  }
}


/* =====================================================
   SETUP PREVIEW
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    const yearsInput =
      document.getElementById("yearsInput");

    const daysInput =
      document.getElementById("planDaysInput");

    if (yearsInput && daysInput) {

      yearsInput.addEventListener(
        "input",
        updatePreview
      );

      daysInput.addEventListener(
        "input",
        updatePreview
      );

    }

    updatePreview();

    if (tracker) {

      openApp();

    }

  }
);


function updatePreview() {

  const years =
    Number(
      document.getElementById("yearsInput")?.value
    ) || 0;

  const days =
    Number(
      document.getElementById("planDaysInput")?.value
    ) || 1;


  const total =
    years * 365 * 5;


  const daily =
    Math.ceil(total / days);


  const previewTotal =
    document.getElementById("previewTotal");

  const previewDaily =
    document.getElementById("previewDaily");


  if (previewTotal) {

    previewTotal.textContent = total;

  }

  if (previewDaily) {

    previewDaily.textContent = daily;

  }
}


/* =====================================================
   CREATE PLAN
===================================================== */

function createPlan() {

  const years =
    Number(
      document.getElementById("yearsInput").value
    );

  const planDays =
    Number(
      document.getElementById("planDaysInput").value
    );


  if (
    !years ||
    years < 1 ||
    !planDays ||
    planDays < 1
  ) {

    alert(
      "Please enter valid numbers."
    );

    return;
  }


  const totalDays =
    years * 365;


  const totalQaza =
    totalDays * 5;


  const dailyTarget =
    Math.ceil(
      totalQaza / planDays
    );


  tracker = {

    years: years,

    planDays: planDays,

    totalDays: totalDays,

    totalQaza: totalQaza,

    dailyTarget: dailyTarget,

    startDate:
      getTodayISO(),

    days: {}

  };


  /*
     Create every day of the plan.
  */

  for (
    let day = 1;
    day <= planDays;
    day++
  ) {

    tracker.days[day] = {

      fajr: 0,

      zuhr: 0,

      asr: 0,

      maghrib: 0,

      isha: 0

    };

  }


  saveTracker();

  openApp();
}


/* =====================================================
   OPEN APP
===================================================== */

function openApp() {

  document
    .getElementById("welcomeScreen")
    .classList.add("hidden");

  document
    .getElementById("languageScreen")
    .classList.add("hidden");

  document
    .getElementById("setupScreen")
    .classList.add("hidden");

  document
    .getElementById("app")
    .classList.remove("hidden");


  selectedDay =
    Math.min(
      getCurrentPlanDay(),
      tracker.planDays
    );


  calendarMonth =
    getDateForPlanDay(
      selectedDay
    );


  updateEverything();
}


/* =====================================================
   GET TODAY
===================================================== */

function getTodayISO() {

  const date =
    new Date();

  return (
    date.getFullYear() +
    "-" +
    String(
      date.getMonth() + 1
    ).padStart(2, "0") +
    "-" +
    String(
      date.getDate()
    ).padStart(2, "0")
  );
}


/* =====================================================
   CURRENT PLAN DAY
===================================================== */

function getCurrentPlanDay() {

  const start =
    new Date(
      tracker.startDate + "T00:00:00"
    );

  const today =
    new Date();

  start.setHours(0,0,0,0);
  today.setHours(0,0,0,0);


  const difference =
    Math.floor(
      (
        today - start
      ) /
      (
        1000 * 60 * 60 * 24
      )
    );


  return Math.max(
    1,
    difference + 1
  );
}


/* =====================================================
   DATE FOR PLAN DAY
===================================================== */

function getDateForPlanDay(day) {

  const date =
    new Date(
      tracker.startDate + "T00:00:00"
    );

  date.setDate(
    date.getDate() + day - 1
  );

  return date;
}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(date) {

  return date.toLocaleDateString(
    undefined,
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  );
}


/* =====================================================
   UPDATE EVERYTHING
===================================================== */

function updateEverything() {

  updateSummary();

  updateSelectedDay();

  renderPrayerCounters();

  renderCalendar();

  updatePlanInformation();

}


/* =====================================================
   GET DAY TOTAL
===================================================== */

function getDayTotal(day) {

  if (!tracker.days[day]) {

    return 0;

  }


  return prayers.reduce(
    (total, prayer) => {

      return (
        total +
        Number(
          tracker.days[day][prayer.id] || 0
        )
      );

    },
    0
  );
}


/* =====================================================
   GET COMPLETED TOTAL
===================================================== */

function getCompletedTotal() {

  let total = 0;


  for (
    let day = 1;
    day <= tracker.planDays;
    day++
  ) {

    total +=
      getDayTotal(day);

  }


  return total;
}


/* =====================================================
   GET PRAYER TOTAL
===================================================== */

function getPrayerTotal(prayerId) {

  let total = 0;


  for (
    let day = 1;
    day <= tracker.planDays;
    day++
  ) {

    total +=
      Number(
        tracker.days[day]?.[prayerId] || 0
      );

  }


  return total;
}


/* =====================================================
   SUMMARY
===================================================== */

function updateSummary() {

  const completed =
    getCompletedTotal();


  const remaining =
    Math.max(
      tracker.totalQaza -
      completed,
      0
    );


  const percentage =
    tracker.totalQaza > 0

      ? Math.min(
          100,
          Math.round(
            (
              completed /
              tracker.totalQaza
            ) * 100
          )
        )

      : 0;


  document
    .getElementById("totalQaza")
    .textContent =
      tracker.totalQaza;


  document
    .getElementById("completedQaza")
    .textContent =
      completed;


  document
    .getElementById("remainingQaza")
    .textContent =
      remaining;


  document
    .getElementById("todayTarget")
    .textContent =
      tracker.dailyTarget;


  document
    .getElementById("progressBar")
    .style.width =
      percentage + "%";


  document
    .getElementById("progressPercentage")
    .textContent =
      percentage + "%";
}


/* =====================================================
   SELECTED DAY
===================================================== */

function updateSelectedDay() {

  const date =
    getDateForPlanDay(
      selectedDay
    );


  document
    .getElementById("selectedDateText")
    .textContent =
      formatDate(date);


  document
    .getElementById("selectedDayNumber")
    .textContent =
      selectedDay;


  const completed =
    getDayTotal(selectedDay);


  const percentage =
    tracker.dailyTarget > 0

      ? Math.min(
          100,
          Math.round(
            (
              completed /
              tracker.dailyTarget
            ) * 100
          )
        )

      : 0;


  document
    .getElementById("dailyProgressText")
    .textContent =
      completed +
      " / " +
      tracker.dailyTarget +
      " completed";


  document
    .getElementById("dailyProgressBar")
    .style.width =
      percentage + "%";
}


/* =====================================================
   PRAYER COUNTERS
===================================================== */

function renderPrayerCounters() {

  const container =
    document.getElementById(
      "prayerCounters"
    );


  container.innerHTML = "";


  prayers.forEach(
    prayer => {

      const count =
        Number(
          tracker.days[selectedDay][prayer.id] || 0
        );


      const name =
        prayer[language] ||
        prayer.en;


      const row =
        document.createElement("div");


      row.className =
        "prayer-row";


      row.innerHTML = `

        <div class="prayer-info">

          <h3>${name}</h3>

          <p>
            ${prayer.rakat} Rak'ah
          </p>

        </div>


        <div class="counter">

          <button
            onclick="
              changePrayer(
                '${prayer.id}',
                -1
              )
            "
          >
            −
          </button>


          <span class="counter-number">
            ${count}
          </span>


          <button
            onclick="
              changePrayer(
                '${prayer.id}',
                1
              )
            "
          >
            +
          </button>

        </div>

      `;


      container.appendChild(row);

    }
  );
}


/* =====================================================
   CHANGE PRAYER COUNT
===================================================== */

function changePrayer(
  prayerId,
  amount
) {

  if (
    !tracker.days[selectedDay]
  ) {

    tracker.days[selectedDay] = {
      fajr: 0,
      zuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    };

  }


  const current =
    Number(
      tracker.days[selectedDay][prayerId]
    ) || 0;


  const newValue =
    Math.max(
      0,
      current + amount
    );


  /*
     Do not allow more than the
     original Qaza count for that prayer.
  */

  const prayerTotal =
    tracker.totalDays;


  if (
    newValue >
    prayerTotal
  ) {

    return;

  }


  tracker.days[selectedDay][prayerId] =
    newValue;


  saveTracker();

  updateEverything();
}


/* =====================================================
   CALENDAR
===================================================== */

function renderCalendar() {

  const calendar =
    document.getElementById(
      "calendar"
    );


  calendar.innerHTML = "";


  const firstDay =
    new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      1
    );


  const lastDay =
    new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + 1,
      0
    );


  document
    .getElementById("calendarMonth")
    .textContent =
      firstDay.toLocaleDateString(
        undefined,
        {
          month: "long",
          year: "numeric"
        }
      );


  /*
     Empty spaces before first day.
  */

  for (
    let i = 0;
    i < firstDay.getDay();
    i++
  ) {

    const empty =
      document.createElement("div");

    empty.className =
      "calendar-day outside";

    calendar.appendChild(empty);

  }


  for (
    let dateNumber = 1;
    dateNumber <= lastDay.getDate();
    dateNumber++
  ) {

    const date =
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth(),
        dateNumber
      );


    const day =
      getPlanDayFromDate(date);


    const cell =
      document.createElement("div");


    cell.className =
      "calendar-day";


    if (
      day === selectedDay
    ) {

      cell.classList.add(
        "selected"
      );

    }


    if (
      day >= 1 &&
      day <= tracker.planDays
    ) {

      const completed =
        getDayTotal(day);


      if (
        completed >=
        tracker.dailyTarget
      ) {

        cell.classList.add(
          "complete"
        );

      }
      else if (
        completed > 0
      ) {

        cell.classList.add(
          "partial"
        );

      }


      cell.onclick =
        function () {

          selectedDay = day;

          updateEverything();

        };


      cell.innerHTML = `

        <span class="date-number">
          ${dateNumber}
        </span>

        <span class="day-status">
          Day ${day}
          <br>
          ${completed}/${tracker.dailyTarget}
        </span>

      `;

    }
    else {

      cell.innerHTML = `

        <span class="date-number">
          ${dateNumber}
        </span>

      `;

    }


    calendar.appendChild(cell);

  }
}


/* =====================================================
   GET PLAN DAY FROM DATE
===================================================== */

function getPlanDayFromDate(date) {

  const start =
    new Date(
      tracker.startDate + "T00:00:00"
    );


  start.setHours(0,0,0,0);
  date.setHours(0,0,0,0);


  const difference =
    Math.floor(
      (
        date - start
      ) /
      (
        1000 * 60 * 60 * 24
      )
    );


  return difference + 1;
}


/* =====================================================
   CALENDAR MONTH NAVIGATION
===================================================== */

function previousMonth() {

  calendarMonth.setMonth(
    calendarMonth.getMonth() - 1
  );


  renderCalendar();
}


function nextMonth() {

  calendarMonth.setMonth(
    calendarMonth.getMonth() + 1
  );


  renderCalendar();
}


/* =====================================================
   PLAN INFORMATION
===================================================== */

function updatePlanInformation() {

  document
    .getElementById("planYears")
    .textContent =
      tracker.years;


  document
    .getElementById("planDays")
    .textContent =
      tracker.planDays;


  document
    .getElementById("planDailyTarget")
    .textContent =
      tracker.dailyTarget;


  let completedDays = 0;


  for (
    let day = 1;
    day <= tracker.planDays;
    day++
  ) {

    if (
      getDayTotal(day) >=
      tracker.dailyTarget
    ) {

      completedDays++;

    }

  }


  document
    .getElementById("daysCompleted")
    .textContent =
      completedDays;
}


/* =====================================================
   SAVE
===================================================== */

function saveTracker() {

  localStorage.setItem(
    "qazaTracker",
    JSON.stringify(tracker)
  );
}


/* =====================================================
   RESET
===================================================== */

function resetTracker() {

  const answer =
    confirm(
      "Are you sure you want to delete your Qaza progress?"
    );


  if (!answer) {

    return;

  }


  localStorage.removeItem(
    "qazaTracker"
  );


  tracker = null;


  document
    .getElementById("app")
    .classList.add("hidden");


  document
    .getElementById("welcomeScreen")
    .classList.remove("hidden");
}


/* =====================================================
   EXTRA: PRAYER SUMMARY
===================================================== */

function getPrayerSummary() {

  return prayers.map(
    prayer => {

      return {

        name:
          prayer.en,

        completed:
          getPrayerTotal(
            prayer.id
          )

      };

    }
  );
}
```


// DOM targets
const month1Name = document.querySelector(".month1-name");

const month2Name = document.querySelector(".month2-name");

const navBackBtn = document.querySelector(".left");
const navNextBtn = document.querySelector(".right");

const checkInDetails = document.querySelector(".check-in-details");
const checkOutDetails = document.querySelector(".check-out-details");

const guestSelectDropdownCheckbox = document.querySelector(
  ".guest-select-dropdown-checkbox"
);
const guestSelectClose = document.querySelector(".guest-select-close");

const guestSelectCancelBtn = document.querySelector(".guest-select-cancel-btn");

const aMinus = document.querySelector(".a-minus");
const aPlus = document.querySelector(".a-plus");
const adultCount = document.querySelector(".adult-count");

const cMinus = document.querySelector(".c-minus");
const cPlus = document.querySelector(".c-plus");
const childCount = document.querySelector(".child-count");

const guestInfoDetails = document.querySelector(".guest-info-details");

const guestSelectApplyBtn = document.querySelector(".guest-select-apply-btn");

const dateSelectSearchBtn = document.querySelector(".date-select-search-btn");

// Guest Select Dropdown

guestSelectClose.addEventListener(
  "click",
  () => (guestSelectDropdownCheckbox.checked = false)
);

guestSelectCancelBtn.addEventListener(
  "click",
  () => (guestSelectDropdownCheckbox.checked = false)
);

aMinus.addEventListener("click", () => {
  if (parseInt(adultCount.value) > 1) {
    adultCount.value = parseInt(adultCount.value) - 1;
  }
});

aPlus.addEventListener("click", () => {
  if (parseInt(adultCount.value) < 10) {
    adultCount.value = parseInt(adultCount.value) + 1;
  }
});

cMinus.addEventListener("click", () => {
  if (parseInt(childCount.value) > 0) {
    childCount.value = parseInt(childCount.value) - 1;
  }
});

cPlus.addEventListener("click", () => {
  if (parseInt(childCount.value) < 10) {
    childCount.value = parseInt(childCount.value) + 1;
  }
});

guestSelectApplyBtn.addEventListener("click", () => {
  let aQty = adultCount.value;
  let cQty = childCount.value;
  guestInfoDetails.textContent = `${aQty} Adults, ${cQty} Children`;
  guestInfoDetails.id = "flash";
  setTimeout(() => (guestInfoDetails.id = ""), 1000);
  guestSelectDropdownCheckbox.checked = false;
});

// Date setup

const dates = {
  month1Dates: Array.from(document.querySelectorAll(".calendar-date-month1")),
  month2Dates: Array.from(document.querySelectorAll(".calendar-date-month2")),
};

const dayRef = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const monthRef = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const nowTime = new Date(Date.now());

let setDates = false;

const dateToday = {
  year: nowTime.getFullYear(),
  month: nowTime.getMonth(),
  date: nowTime.getDate(),
  day: nowTime.getDay(),
};

let currentMonth = dateToday.month;
let currentYear = dateToday.year;

// let copy = new Date(nowTime);
// copy.setMonth(nowTime.getMonth() + 1);

let selectedCheckIn,
  selectedCheckOut = undefined;

const setCalendar = (month, year) => {
  // clear calendar
  dates.month1Dates.forEach((el) => {
    el.textContent = "";
  });

  // find what day of week month1 starts on
  let firstDate = new Date(`${year}-${month + 1}-01`);
  firstDate.setHours(1);
  let startDay = firstDate.getDay();
  startDay === 0 ? (startDay = 6) : startDay--;

  // find how many days in month
  firstDate.setMonth(firstDate.getMonth() + 1);
  firstDate.setDate(firstDate.getDate() - 1);
  let monthLength = firstDate.getDate();

  // populate Calendar month1

  month1Name.textContent = `${monthRef[month]} ${year}`;

  for (let i = startDay, j = 1; i < monthLength + startDay; i++, j++) {
    dates.month1Dates[i].textContent = j;
    dates.month1Dates[i].style.color = "black";
    dates.month1Dates[i].id = `${year}${month > 9 ? month : "0" + month}${
      j > 9 ? j : "0" + j
    }`;
  }

  dates.month1Dates.forEach((el) => {
    if (el.textContent === "") {
      el.style.backgroundColor = "rgb(21, 40, 58)";
      el.id = "";
    } else {
      el.style.backgroundColor = "#eee";
    }

    if (
      parseInt(el.textContent) < dateToday.date &&
      month === dateToday.month &&
      year === dateToday.year
    ) {
      el.style.color = "grey";
      el.id = "";
    }
  });

  // do the same for month2;

  dates.month2Dates.forEach((el) => {
    el.textContent = "";
  });

  month2Name.textContent = `${monthRef[month === 11 ? 0 : month + 1]} ${
    month === 11 ? year + 1 : year
  }`;

  firstDate = new Date(
    `${month === 11 ? year + 1 : year}-${month === 11 ? 1 : month + 2}-01`
  );
  console.log(firstDate);
  firstDate.setHours(1);
  startDay = firstDate.getDay();
  startDay === 0 ? (startDay = 6) : startDay--;
  console.log(startDay);

  firstDate.setMonth(firstDate.getMonth() + 1);
  firstDate.setDate(firstDate.getDate() - 1);
  monthLength = firstDate.getDate();

  console.log(startDay);

  for (let i = startDay, j = 1; i < monthLength + startDay; i++, j++) {
    dates.month2Dates[i].textContent = j;
    dates.month2Dates[i].style.color = "black";
    dates.month2Dates[i].id = `${firstDate.getFullYear()}${
      firstDate.getMonth() > 9
        ? firstDate.getMonth()
        : "0" + firstDate.getMonth()
    }${j > 9 ? j : "0" + j}`;
  }

  dates.month2Dates.forEach((el) => {
    if (el.textContent === "") {
      el.style.backgroundColor = "rgb(21, 40, 58)";
      el.id = "";
    } else {
      el.style.backgroundColor = "#eee";
    }
  });

  // Fade back btn if month is current month

  if (month === dateToday.month && year === dateToday.year) {
    navBackBtn.style.color = "grey";
  } else {
    navBackBtn.style.color = "white";
  }

  // populate with current information

  if (
    selectedCheckIn !== undefined &&
    document.getElementById(selectedCheckIn.toString())
  ) {
    document.getElementById(selectedCheckIn.toString()).style.backgroundColor =
      "rgb(206, 174, 114)";
    document.getElementById(selectedCheckIn.toString()).style.color = "#eee";
  }

  if (
    selectedCheckOut !== undefined &&
    document.getElementById(selectedCheckOut.toString())
  ) {
    document.getElementById(selectedCheckOut.toString()).style.backgroundColor =
      "rgb(206, 174, 114)";
    document.getElementById(selectedCheckOut.toString()).style.color = "#eee";
  }

  if (selectedCheckOut !== undefined && selectedCheckIn !== undefined) {
    [...dates.month1Dates, ...dates.month2Dates].forEach((el) => {
      if (
        parseInt(el.id) > selectedCheckIn &&
        parseInt(el.id) < selectedCheckOut
      ) {
        el.style.backgroundColor = "rgb(226, 211, 184)";
      }
    });
  }
};

setCalendar(dateToday.month, dateToday.year);

// set event listeners on nav buttons

navBackBtn.addEventListener("click", () => {
  if (currentMonth === dateToday.month && currentYear === dateToday.year)
    return;

  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  setCalendar(currentMonth, currentYear);
});

navNextBtn.addEventListener("click", () => {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;

  setCalendar(currentMonth, currentYear);
});

// set event listeners on calendar dates selection

const startListeningForDates = (e) => {
  if (
    e.target.id !== "" &&
    (selectedCheckIn === undefined ||
      (selectedCheckIn !== undefined && selectedCheckOut !== undefined))
  ) {
    [...dates.month1Dates, ...dates.month2Dates].forEach((el) => {
      if (el.style.color !== "grey" && el.textContent !== "") {
        el.style.backgroundColor = "white";
        el.style.color = "black";
      }
    });
    e.target.style.backgroundColor = "rgb(206, 174, 114)";
    e.target.style.color = "#eee";
    selectedCheckIn = parseInt(e.target.id);
    selectedCheckOut = undefined;
    checkOutDetails.textContent = "Please select...";
    setDates = false;
    dateSelectSearchBtn.disabled = true;
    let selectedYear = selectedCheckIn.toString().substring(0, 4);
    let selectedMonth = selectedCheckIn.toString().substring(4, 6);
    let selectedDate = selectedCheckIn.toString().substring(6);
    let selectedDay = new Date(
      `${selectedYear}-${parseInt(selectedMonth) + 1}-${selectedDate} 02:00`
    ).getDay();
    checkInDetails.textContent = `${
      dayRef[selectedDay === 0 ? 6 : selectedDay - 1]
    } ${selectedDate} ${monthRef[parseInt(selectedMonth)]} ${selectedYear}`;
    checkInDetails.id = "flash";
    setTimeout(() => (checkInDetails.id = ""), 1000);
    return;
  }

  if (selectedCheckIn && parseInt(e.target.id) <= selectedCheckIn) {
    return;
  }

  if (e.target.id !== "" && selectedCheckIn && selectedCheckOut === undefined) {
    e.target.style.backgroundColor = "rgb(206, 174, 114)";
    e.target.style.color = "#eee";
    selectedCheckOut = parseInt(e.target.id);
    selectedYearA = selectedCheckOut.toString().substring(0, 4);
    selectedMonthA = selectedCheckOut.toString().substring(4, 6);
    selectedDateA = selectedCheckOut.toString().substring(6);
    selectedDayA = new Date(
      `${selectedYearA}-${parseInt(selectedMonthA) + 1}-${selectedDateA} 02:00`
    ).getDay();
    checkOutDetails.textContent = `${
      dayRef[selectedDayA === 0 ? 6 : selectedDayA - 1]
    } ${selectedDateA} ${monthRef[parseInt(selectedMonthA)]} ${selectedYearA}`;
    checkOutDetails.id = "flash";
    setTimeout(() => (checkOutDetails.id = ""), 1000);
  }

  setDates = true;
  dateSelectSearchBtn.disabled = false;
};

// set event listeners on date elements for highlighting

[...dates.month1Dates, ...dates.month2Dates].forEach((el) => {
  el.addEventListener("click", (e) => startListeningForDates(e));
});

[...dates.month1Dates, ...dates.month2Dates].forEach((el) => {
  el.addEventListener("mouseover", (e) => {
    [...dates.month1Dates, ...dates.month2Dates].forEach((el) => {
      if (
        setDates === false &&
        parseInt(el.id) > selectedCheckIn &&
        parseInt(el.id) <= parseInt(e.target.id)
      ) {
        el.style.backgroundColor = "rgb(226, 211, 184)";
      } else {
        if (
          setDates === false &&
          el.style.backgroundColor !== "rgb(206, 174, 114)" &&
          el.style.color !== "grey" &&
          el.textContent !== ""
        ) {
          el.style.backgroundColor = "white";
        }
      }
    });
  });
});

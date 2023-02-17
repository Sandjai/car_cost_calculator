import "./styles/main.sass";

function getPersentages(par) {
  switch (par) {
    case "cost":
      return (
        Math.floor((costCurrent - costMin) / ((costMax - costMin) / 100)) + "%"
      );

    case "fee":
      return (
        Math.floor((feeCurrent - feeMin) / ((feeMax - feeMin) / 100)) + "%"
      );

    case "time":
      return (
        Math.floor((timeCurrent - timeMin) / ((timeMax - timeMin) / 100)) + "%"
      );
    default:
      throw new Error("param in getPersentages is wrong");
  }
}

function sumAndPay() {
  const sumVal = +feeCurrent + +timeCurrent * +getPayCurrent();
  const payVal = getPayCurrent();
  sum.innerHTML = Number(sumVal).toLocaleString("ru-RU") + " ₽";

  pay.innerHTML = getPayCurrent().toLocaleString("ru-RU") + " ₽";

  document.getElementById("js-totalsum").value = sumVal;
  document.getElementById("js-paymonth").value = payVal;
}

function changePercentages() {
  document.querySelector(".num-field_persantages").dataset.perc =
    Math.round((feeCurrent * 100) / costCurrent) + "%";
}

//Стоимость автомобиля
const cost = document.querySelector(".js-cost");
const cost_show = document.querySelector(".js-cost_show");

const costMin = 1500000; //минимальная стоимость автомобиля
const costMax = 10000000; //максимальная стоимость автомобиля
let costCurrent = 3300000; // тек. значение стоимости авто

cost.setAttribute("min", costMin);
cost.setAttribute("max", costMax);

cost.value = costCurrent;
cost_show.value = costCurrent.toLocaleString("ru-RU");

let costPercentages = getPersentages("cost");

document.querySelector(".slider__progress1").style.width = costPercentages;

//Первоначальный взнос
const fee = document.querySelector(".js-fee");
const fee_show = document.querySelector(".js-fee_show");

const feeMin = Math.round(0.1 * costCurrent); //минимальный первоначальный взнос
const feeMax = Math.round(0.6 * costCurrent); //максимальный первоначальный взнос
let feeCurrent = Math.round(0.13 * costCurrent); // тек. значение первоначального взноса

fee.setAttribute("min", feeMin);
fee.setAttribute("max", feeMax);

fee.value = feeCurrent;
fee_show.value = Number(feeCurrent).toLocaleString("ru-RU");

let feePercentages = getPersentages("fee");

document.querySelector(".slider__progress2").style.width = feePercentages;

//Срок лизинга
const time = document.querySelector(".js-time");
const time_show = document.querySelector(".js-time_show");

const timeMin = 6; //минимальное значение лизинга
const timeMax = 120; //максимальное значение лизинга
let timeCurrent = 50; // тек. значение лизинга

time.setAttribute("min", timeMin);
time.setAttribute("max", timeMax);

time.value = timeCurrent;
time_show.value = timeCurrent;

let timePercentages = getPersentages("time");

document.querySelector(".slider__progress3").style.width = timePercentages;

//Ежемесячный платеж
let pay = document.querySelector(".js-pay");
function getPayCurrent() {
  let payCurrent = (
    ((costCurrent - feeCurrent) * (0.05 * Math.pow(1 + 0.05, timeCurrent))) /
      Math.pow(1 + 0.05, timeCurrent) -
    1
  ).toFixed(0);

  return Number(payCurrent);
}

pay.innerHTML = Number(getPayCurrent()).toLocaleString("ru-RU") + " ₽";

//Сумма договора лизинга
let sum = document.querySelector(".js-sum");

sum.innerHTML =
  (+feeCurrent + +timeCurrent * getPayCurrent()).toLocaleString("ru-RU") + " ₽";

/**
 * Events *
 */

function onMousedown(e) {
  e.target.addEventListener("pointermove", onMouseMove);

  e.target.onmouseup = function () {
    e.target.removeEventListener("pointermove", onMouseMove);
    e.target.onpointerup = null;
  };

  function onMouseMove(e) {
    if (e.target.dataset.par === "cost") {
      cost_show.value = Number(e.target.value).toLocaleString("ru-RU");
      costCurrent = e.target.value;
      costPercentages = getPersentages("cost");
      document.querySelector(".slider__progress1").style.width =
        costPercentages;
      changePercentages();
    }

    if (e.target.dataset.par === "fee") {
      fee_show.value = Number(e.target.value).toLocaleString("ru-RU");
      feeCurrent = e.target.value;
      feePercentages = getPersentages("fee");
      document.querySelector(".slider__progress2").style.width = feePercentages;
      changePercentages();
    }

    if (e.target.dataset.par === "time") {
      time_show.value = e.target.value;
      timeCurrent = e.target.value;
      pay.innerHTML = Number(getPayCurrent()).toLocaleString("ru-RU") + " ₽";
      timePercentages = getPersentages("time");
      document.querySelector(".slider__progress3").style.width =
        timePercentages;
    }

    sumAndPay();
  }
}

const sliders = document.querySelectorAll(".js-slider");

for (let slider of sliders) {
  slider.addEventListener("pointerdown", (e) => onMousedown(e));
  slider.ondragstart = function () {
    return false;
  };
}

document.getElementById("carleasing_request").onsubmit = (e) => {
  e.preventDefault();
  if (document.getElementById("submitBtn").classList.contains("btn_disabled")) {
    return;
  }
  document.getElementById("submitBtn").classList.remove("btn_enabled");
  document.getElementById("submitBtn").classList.add("btn_disabled");

  let fData = new FormData(document.getElementById("carleasing_request"));

  const entries = [];
  for (const pair of fData.entries()) {
    entries.push([`${pair[0]}, ${pair[1]}`]);
  }

  alert(
    "Форма отправлена. Вот Ваши данные: " +
      JSON.stringify(Object.fromEntries(fData.entries()))
  );
};

document.querySelector(".js-cost_show").addEventListener("keyup", (e) => {
  const val =
    e.target.value > costMax
      ? costMax
      : e.target.value < costMin
      ? costMin
      : e.target.value;
  cost.value = val;

  costCurrent = val;

  document.querySelector(".slider__progress1").style.width =
    getPersentages("cost");

  sumAndPay();
  changePercentages();
});

document.querySelector(".js-fee_show").addEventListener("keyup", (e) => {
  const val =
    +e.target.value > feeMax
      ? feeMax
      : +e.target.value < feeMin
      ? feeMin
      : +e.target.value;
  fee.value = val;

  feeCurrent = val;

  document.querySelector(".slider__progress2").style.width =
    getPersentages("fee");

  sumAndPay();
  changePercentages();
});

document.querySelector(".js-time_show").addEventListener("change", (e) => {
  time_show.value = feeCurrent;
});

document.querySelector(".js-time_show").addEventListener("keyup", (e) => {
  const val =
    e.target.value > timeMax
      ? timeMax
      : e.target.value < timeMin
      ? timeMin
      : e.target.value;
  time.value = val;

  timeCurrent = val;

  document.querySelector(".slider__progress3").style.width =
    getPersentages("time");

  sumAndPay();
});

document.querySelector(".js-time_show").addEventListener("change", (e) => {
  time_show.value = timeCurrent;
});

document.querySelector(".js-cost_show").addEventListener("focus", (e) => {
  e.target.value = e.target.value.replace(/\s/g, "");
});

document.querySelector(".js-fee_show").addEventListener("focus", (e) => {
  e.target.value = e.target.value.replace(/\s/g, "");
});

document.querySelector(".js-cost_show").addEventListener("blur", (e) => {
  cost_show.value = Number(costCurrent).toLocaleString("ru-RU");
});

document.querySelector(".js-fee_show").addEventListener("blur", (e) => {
  fee_show.value = Number(feeCurrent).toLocaleString("ru-RU");
});

document.querySelector(".js-cost").addEventListener("pointerup", (e) => {
  cost_show.value = Number(e.target.value).toLocaleString("ru-RU");
  costCurrent = e.target.value;

  document.querySelector(".slider__progress1").style.width =
    getPersentages("cost");

  sumAndPay();
  changePercentages();
});

document.querySelector(".js-fee").addEventListener("pointerup", (e) => {
  fee_show.value = Number(e.target.value).toLocaleString("ru-RU");
  feeCurrent = e.target.value;

  document.querySelector(".slider__progress2").style.width =
    getPersentages("fee");

  sumAndPay();
  changePercentages();
});

document.querySelector(".js-time").addEventListener("pointerup", (e) => {
  time_show.value = e.target.value;
  timeCurrent = e.target.value;
  pay.innerHTML = Number(getPayCurrent()).toLocaleString("ru-RU") + " ₽";

  document.querySelector(".slider__progress3").style.width =
    getPersentages("time");

  sumAndPay();
});

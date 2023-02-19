import "./styles/main.sass";

import { InputItem } from "./components/InputItem";
import { FeeItem } from "./components/FeeItem";
import { SumItem } from "./components/SumItem";
import { PayItem } from "./components/PayItem";
import { CONSTANTS } from "./utils/constants";

const Cost = new InputItem({
  name: "cost",
  curVal: CONSTANTS.cost,
  minVal: CONSTANTS.cost__minVal,
  maxVal: CONSTANTS.cost__maxVal,
  progressBar: document.querySelector(".slider__progress1"),
  rangeInput: document.querySelector(".js-cost"),
  txtInput: document.querySelector(".js-cost_show"),
});

const Time = new InputItem({
  name: "time",
  curVal: CONSTANTS.time,
  minVal: CONSTANTS.time__minVal,
  maxVal: CONSTANTS.time__maxVal,
  progressBar: document.querySelector(".slider__progress3"),
  rangeInput: document.querySelector(".js-time"),
  txtInput: document.querySelector(".js-time_show"),
});

const Fee = new FeeItem({
  name: "fee",
  curVal: CONSTANTS.fee,
  minVal: CONSTANTS.fee__minVal,
  maxVal: CONSTANTS.fee__maxVal,
  progressBar: document.querySelector(".slider__progress2"),
  rangeInput: document.querySelector(".js-fee"),
  txtInput: document.querySelector(".js-fee_show"),
  currentFeePercent: CONSTANTS.feePercent,
  carCost: CONSTANTS.cost,
});

const Sum = new SumItem({
  name: "sum",
  defaultValue: CONSTANTS.sum,
  el: document.querySelector(".js-sum"),
  fee: CONSTANTS.fee,
  time: CONSTANTS.time,
  carCost: CONSTANTS.cost,
  pay: CONSTANTS.pay,
  feePercent: CONSTANTS.feePercent,
});

const Pay = new PayItem({
  name: "pay",
  defaultValue: CONSTANTS.pay,
  el: document.querySelector(".js-pay"),
  fee: CONSTANTS.fee,
  time: CONSTANTS.time,
  carCost: CONSTANTS.cost,
  feePercent: CONSTANTS.feePercent,
});

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

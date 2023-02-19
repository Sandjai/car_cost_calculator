import { InputItem } from "./InputItem";

export class FeeItem extends InputItem {
  constructor({
    currentFeePercent,
    rangeInput,
    txtInput,
    progressBar,
    curVal,
    minVal,
    maxVal,
    name,
    carCost,
    time,
  }) {
    super({
      rangeInput,
      txtInput,
      progressBar,
      curVal,
      minVal,
      maxVal,
      name,
      currentFeePercent,
    });
    this.rangeInput = rangeInput;
    this.txtInput = txtInput;
    this.progressBar = progressBar;

    this.minFeePercent = 0.1;
    this.maxFeePercent = 0.6;
    this.carCost = carCost;
    this.time = time;
    this.initFeeEvents();
  }

  showFeePercent() {
    const fee = this.currentFeePercent.toLocaleString("ru-RU", {
      style: "percent",
      minimumFractionDigits: 0,
      minimumIntegerDigits: 1,
    });
    document.querySelector(".js-perc").dataset.perc = fee.replace(/\s/g, "");
  }

  initFeeEvents() {
    this.showFeePercent();
    document.addEventListener("cost/updated", (e) => {
      this.carCost = +e.detail.value;
      this.minVal = Math.round(this.minFeePercent * this.carCost);
      this.maxVal = Math.round(this.maxFeePercent * this.carCost);

      this.curVal = this.getfeeCurrent();

      this.render();
    });

    document.addEventListener("fee/updated", (e) => {
      // if (this.txtInput <= this.maxVal && this.txtInput >= this.minVal) {
      this.currentFeePercent = +this.curVal / this.carCost;
      // }

      this.showFeePercent();
    });
  }

  getfeeCurrent() {
    return Math.round(this.currentFeePercent * this.carCost);
  }
}

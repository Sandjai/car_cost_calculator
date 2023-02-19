import { CountedValue } from "./CountedValue";

export class SumItem extends CountedValue {
  constructor({ defaultValue, el, carCost, pay, fee, feePercent, time, name }) {
    super({ defaultValue, el, fee, feePercent, carCost, time, pay, name });

    this.initSumEvents();
  }

  get sumCurrent() {
    return (this.fee + this.time * this.pay).toFixed();
  }

  initSumEvents() {
    document.addEventListener("pay/updated", (e) => {
      this.pay = e.detail.value;
      document.getElementById("js-paymonth").value = e.detail.value;
      this.render();
    });

    document.addEventListener("sum/updated", (e) => {
      document.getElementById("js-totalsum").value = e.detail.value;
    });

    document.addEventListener("cost/updated", (e) => {
      this.carCost = +e.detail.value;

      this.fee = this.carCost * this.feePercent;

      this.curVal = Number(this.sumCurrent);

      this.render();
    });

    document.addEventListener("fee/updated", (e) => {
      this.fee = +e.detail.value;

      if (e.detail.feePercent != null) {
        this.feePercent = Math.round(+e.detail.feePercent);
      }
      this.curVal = Number(this.sumCurrent);

      this.render();
    });

    document.addEventListener("time/updated", (e) => {
      this.time = +e.detail.value;

      this.curVal = Number(this.sumCurrent);

      this.render();
    });
  }
}

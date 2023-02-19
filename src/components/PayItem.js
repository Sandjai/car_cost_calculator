import { CountedValue } from "./CountedValue";

export class PayItem extends CountedValue {
  constructor({ defaultValue, el, carCost, time, fee, feePercent, pay, name }) {
    super({ defaultValue, el, fee, feePercent, carCost, time, pay, name });
    this.constructor.pay = defaultValue;
    this.initPayEvents();
  }

  get payCurrent() {
    return (
      ((this.carCost - this.fee) * (0.05 * Math.pow(1 + 0.05, this.time))) /
        Math.pow(1 + 0.05, this.time) -
      1
    ).toFixed(0);
  }

  initPayEvents() {
    document.addEventListener("cost/updated", (e) => {
      this.carCost = +e.detail.value;

      this.fee = this.carCost * this.feePercent;

      this.curVal = Number(this.payCurrent);
      this.constructor.pay = this.curVal;

      this.render();
    });

    document.addEventListener("fee/updated", (e) => {
      this.fee = +e.detail.value;

      if (e.detail.feePercent !== null) {
        this.feePercent = Math.round(+e.detail.feePercent);
      }

      this.curVal = Number(this.payCurrent);
      this.constructor.pay = this.curVal;
      this.render();
    });

    document.addEventListener("time/updated", (e) => {
      this.time = +e.detail.value;
      this.curVal = Number(this.payCurrent);
      this.constructor.pay = this.curVal;
      this.render();
    });
  }
}

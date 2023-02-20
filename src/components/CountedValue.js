export class CountedValue {
  constructor({ defaultValue, el, fee, feePercent, carCost, time, pay, name }) {
    this.curVal = defaultValue;
    this.el = el;
    this.time = time;
    this.fee = fee;
    this.feePercent = feePercent;
    this.carCost = carCost;
    this.pay = pay;
    this.name = name;

    this.render();
  }

  _trigger(eventName, eventData) {
    const eve = new CustomEvent(eventName, {
      detail: eventData,
      bubbles: true,
    });
    this.el.dispatchEvent(eve);
  }

  render() {
    this.curVal = Number(this.curVal).toFixed(0);
    this._trigger(`${this.name}/updated`, {
      value: this.curVal,
    });

    this.el.innerHTML = Number(this.curVal).toLocaleString("ru-RU", {
      minimumFractionDigits: 0,
      style: "currency",
      currency: "RUB",
    });
  }
}

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
    this._trigger(`${this.name}/updated`, {
      value: this.curVal,
    });

    this.el.innerHTML = this.curVal.toLocaleString("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    });
  }
}

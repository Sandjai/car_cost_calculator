export class InputItem {
  constructor({
    curVal,
    minVal,
    maxVal,
    progressBar,
    rangeInput,
    txtInput,
    name,
    currentFeePercent,
  }) {
    this.name = name;
    this.curVal = curVal;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.rangeInput = rangeInput;
    this.txtInput = txtInput;
    this.progressBar = progressBar;
    this.currentFeePercent = currentFeePercent;

    this.initEvents();
    this.render();
  }

  static pay;

  render() {
    this.txtInput.value = this.curVal.toLocaleString("ru-RU");

    this.rangeInput.setAttribute("min", this.minVal);
    this.rangeInput.setAttribute("max", this.maxVal);
    this.rangeInput.value = +this.curVal;
    this.updateProgress();
  }

  get _progress() {
    return Math.round(
      ((this.curVal - this.minVal) * 100) / (this.maxVal - this.minVal)
    );
  }

  updateProgress() {
    this.progressBar.style.width = this._progress + "%";
  }

  numOnly(event) {
    // Разрешаем: backspace, delete, tab и escape
    if (
      event.keyCode == 46 ||
      event.keyCode == 8 ||
      event.keyCode == 9 ||
      event.keyCode == 27 ||
      // Разрешаем: Ctrl+A
      (event.keyCode == 65 && event.ctrlKey === true) ||
      // Разрешаем: home, end, влево, вправо
      (event.keyCode >= 35 && event.keyCode <= 39)
    ) {
      // Ничего не делаем
      return;
    } else {
      // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
      if (
        (event.keyCode < 48 || event.keyCode > 57) &&
        (event.keyCode < 96 || event.keyCode > 105)
      ) {
        event.preventDefault();
      }
    }
  }

  initEvents() {
    this.txtInput.addEventListener("keydown", (e) => {
      this.numOnly(e);
    });

    this.txtInput.addEventListener("keyup", (e) => {
      const val =
        e.target.value > this.maxVal
          ? this.maxVal
          : e.target.value < this.minVal
          ? this.minVal
          : e.target.value;
      this.rangeInput.value = val;
      this.curVal = val;
      this._trigger(`${this.name}/updated`, {
        value: this.curVal,
        feePercent: this.currentFeePercent || null,
      });

      this.updateProgress();
    });
    this.rangeInput.addEventListener("pointerdown", (e) =>
      this._onPointerdown(e)
    );

    this.rangeInput.addEventListener("pointerup", (e) => {
      this.rangeInput.value = e.target.value;
      this.txtInput.value = Number(e.target.value).toLocaleString("ru-RU");
      this.curVal = e.target.value;
      this._trigger(`${this.name}/updated`, {
        value: this.curVal,
        feePercent: this.currentFeePercent || null,
      });

      this.rangeInput.value = e.target.value;
      this.updateProgress();
    });

    this.rangeInput.ondragstart = function () {
      return false;
    };
    this.txtInput.addEventListener("focus", () => {
      this.txtInput.value = this.txtInput.value.replace(/\s/g, "");
    });

    this.txtInput.addEventListener("blur", (e) => {
      this.txtInput.value = Number(this.txtInput.value).toLocaleString("ru-RU");
    });
  }

  _onPointerdown = (e) => {
    document.addEventListener("pointermove", this._onPointerMove);

    this.rangeInput.onpointerup = () => {
      document.removeEventListener("pointermove", this._onPointerMove);
      this.rangeInput.onpointerup = null;
    };
  };

  _onPointerMove = (e) => {
    this.rangeInput.value = e.target.value;
    this.txtInput.value = Number(e.target.value).toLocaleString("ru-RU");
    this.curVal = e.target.value;
    this._trigger(`${this.name}/updated`, {
      value: this.curVal,
      feePercent: this.currentFeePercent || null,
    });

    this.rangeInput.value = e.target.value;
    this.updateProgress();
  };

  _trigger(eventName, eventData) {
    const eve = new CustomEvent(eventName, {
      detail: eventData,
      bubbles: true,
    });
    this.txtInput.dispatchEvent(eve);
  }
}

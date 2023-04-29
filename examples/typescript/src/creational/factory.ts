interface Button {
  render(): string;
}

interface Dialog {
  createButton(): Button;
  render(): string;
}

class BaseDialog implements Dialog {
  createButton() {
    return {
      render() {
        return "****\nSome button\n****"
      }
    }
  }

  render() {
    let button = this.createButton();
    return button.render()
  }
}

class ADialog extends BaseDialog {
  createButton() {
    return {
      render() {
        return "****\nSome A button\n****"
      }
    }
  }
}

class BDialog extends BaseDialog {
  createButton() {
    return {
      render() {
        return "=====\nSome B button\n====="
      }
    }
  }
}

export default function main([btnType]: string[]) {
  let dialog: Dialog;

  if (btnType === "a") {
    dialog = new ADialog();
  } else if (btnType === "b") {
    dialog = new BDialog();
  } else {
    dialog = new BaseDialog();
  }

  console.log(dialog.render());
}

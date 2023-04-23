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

const env = process.env.ENVIRONMENT || "";
let dialog: Dialog;

if (env === "a") {
  dialog = new ADialog(); 
} else if (env === "b") {
  dialog = new BDialog(); 
} else {
  dialog = new BaseDialog();
}

console.log(dialog.render());

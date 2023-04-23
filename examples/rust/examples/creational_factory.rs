use std::env;

trait Button {
    fn render(&self) -> String;
}

trait Dialog {
    fn create_button(&self) -> Box<dyn Button>;

    fn render(&self) -> String {
        let btn = self.create_button();
        btn.render()
    }
}

struct AButton {
    text: String,
}

impl Button for AButton {
    fn render(&self) -> String {
        format!("*******\n{}\n*******", self.text)
    }
}

struct ADialog;

impl Dialog for ADialog {
    fn create_button(&self) -> Box<dyn Button> {
        Box::new(AButton {
            text: "My A Button".to_string(),
        })
    }
}

struct BButton {
    text: String,
    size: usize,
}

struct BDialog;

impl Dialog for BDialog {
    fn create_button(&self) -> Box<dyn Button> {
        Box::new(BButton {
            text: "My B Button".to_string(),
            size: 20,
        })
    }
}

impl Button for BButton {
    fn render(&self) -> String {
        let wall: String = "=".repeat(self.size);
        format!("{}\n{}\n{}", &wall, self.text, &wall)
    }
}

fn main() {
    let args = env::args();
    if args.len() < 2 {
        panic!("Expects type of program: either a or b or c");
    }
    let program_type = args.last().unwrap();

    let dialog: Box<dyn Dialog> = match program_type.as_str() {
        "a" => Box::new(ADialog {}),
        "b" => Box::new(BDialog {}),
        _ => {
            panic!(
                "Expects type of program: either a or b or c, got {}",
                program_type
            );
        }
    };

    println!("{}", dialog.render())
}

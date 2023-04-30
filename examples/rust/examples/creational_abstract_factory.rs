trait KitchenFurnitureCreator {
    type C: Chair;
    type T: Table;
    fn chair(&self) -> Self::C;
    fn table(&self) -> Self::T;

    fn description(&self) -> String {
        let c = self.chair();
        let t = self.table();

        format!(
            "Description of Kitchen Furniture:\nChair: {}\n{}",
            c.describe_sitting(),
            t.describe_eating()
        )
    }
}

trait Chair {
    fn describe_sitting(&self) -> String;
}
trait Table {
    fn describe_eating(&self) -> String;
}

#[derive(Clone)]
struct ModernChair {
    year: u64,
    designer: String,
}

impl Chair for ModernChair {
    fn describe_sitting(&self) -> String {
        format!(
            "a wonderfully sleek chair from {} designed by {}",
            self.year, self.designer
        )
    }
}

#[derive(Clone)]
struct RusticChair {
    year: u64,
    wood_type: String,
}
impl Chair for RusticChair {
    fn describe_sitting(&self) -> String {
        format!(
            "a sturdy chair from {} made of {} wood",
            self.year, self.wood_type
        )
    }
}

#[derive(Clone)]
struct ModernTable {
    year: u64,
    designer: String,
}
impl Table for ModernTable {
    fn describe_eating(&self) -> String {
        format!(
            "a sleek table from {} made by world-renowned designer {}",
            self.year, self.designer
        )
    }
}

#[derive(Clone)]
struct RusticTable {
    year: u64,
    wood_type: String,
}
impl Table for RusticTable {
    fn describe_eating(&self) -> String {
        format!(
            "a sturdy table from {} made of {} wood",
            self.year, self.wood_type
        )
    }
}

struct ModernKitchenFurniture {
    chair_template: ModernChair,
    table_template: ModernTable,
}

impl KitchenFurnitureCreator for ModernKitchenFurniture {
    type C = ModernChair;
    type T = ModernTable;
    fn chair(&self) -> Self::C {
        self.chair_template.clone()
    }
    fn table(&self) -> Self::T {
        self.table_template.clone()
    }
}

struct RusticKitchenFurniture {
    chair_template: RusticChair,
    table_template: RusticTable,
}

impl KitchenFurnitureCreator for RusticKitchenFurniture {
    type C = RusticChair;
    type T = RusticTable;
    fn chair(&self) -> Self::C {
        self.chair_template.clone()
    }
    fn table(&self) -> Self::T {
        self.table_template.clone()
    }
}

fn render(factory: impl KitchenFurnitureCreator) {
    println!("{}", factory.description());
}

fn main() {
    let args = std::env::args();
    if args.len() < 2 {
        panic!("Expects type of program: either 'modern' or 'rustic'");
    }
    let program_type = args.last().unwrap();

    match program_type.as_str() {
        "modern" => {
            let fac = ModernKitchenFurniture {
                chair_template: ModernChair {
                    year: 2023,
                    designer: "Zelna Quaf".to_string(),
                },
                table_template: ModernTable {
                    year: 2023,
                    designer: "Beatrice LeQuinn".to_string(),
                },
            };
            render(fac);
        }
        "rustic" => {
            let fac = RusticKitchenFurniture {
                chair_template: RusticChair {
                    year: 1973,
                    wood_type: "Mohogany".to_string(),
                },
                table_template: RusticTable {
                    year: 1987,
                    wood_type: "Oak".to_string(),
                },
            };
            render(fac);
        }
        _ => panic!("invalid furniture type, should be 'modern' or 'rustic'"),
    };
}

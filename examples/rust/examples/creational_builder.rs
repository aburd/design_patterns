use std::default::Default;

#[derive(Debug)]
struct Car {
    doors: u64,
    make: String,
    model: String,
    gps: Option<Gps>,
}

#[derive(Debug)]
struct Gps {
    make: String,
    model: String,
}

impl Default for Gps {
    fn default() -> Self {
        Gps {
            make: "Location Knowers".to_string(),
            model: "GPSex".to_string(),
        }
    }
}

impl Default for Car {
    fn default() -> Self {
        Car {
            doors: 4,
            make: "Honda".to_string(),
            model: "Accord".to_string(),
            gps: None,
        }
    }
}

impl Car {
    fn build() -> Car {
        Car::default()
    }

    fn doors(self, n: u64) -> Car {
        Self { doors: n, ..self }
    }

    fn gps(self, gps: Option<Gps>) -> Car {
        Self { gps, ..self }
    }

    fn make(self, make: &str) -> Car {
        Self {
            make: make.into(),
            ..self
        }
    }

    fn model(self, model: &str) -> Car {
        Self {
            model: model.into(),
            ..self
        }
    }
}

fn main() {
    let car = Car::build()
        .doors(10)
        .make("Ford")
        .model("Shittari")
        .gps(Some(Gps::default()));

    println!("Car: {:?}", car);
}

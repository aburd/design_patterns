type Gps = {
  model: string,
  make: string,
}

type TripComputer = {
  cpu: number,
}

type Manual = {
  gps?: Gps,
  tripComputer?: TripComputer,
  seats: number,
  engine: number,
}

interface CarBuilder {
  reset(): Car
  setSeats(seats: number): Car
  setEngine(engine: number): Car
  setTripComputer(comp: TripComputer): Car
  setGPS(gps: Gps): Car
}

class Car implements CarBuilder {
  gps?: Gps;
  tripComputer?: TripComputer
  seats: number
  engine: number
  manual: Manual

  private constructor() {
    this.seats = 4;
    this.engine = 10;
    this.manual = {
      seats: 4,
      engine: 10,
    };
  }

  static build(): Car {
    return new Car();
  }

  reset(): Car {
    return Car.build();
  }

  setSeats(seats: number): Car {
    this.seats = seats;
    return this;
  }

  setEngine(engine: number): Car {
    this.engine = engine;
    return this;
  }

  setTripComputer(comp: TripComputer): Car {
    this.tripComputer = comp;
    return this;
  }

  setGPS(gps: Gps): Car {
    this.gps = gps;
    return this;
  }

  report() {
    console.log(JSON.stringify(this, null, 2));
  }
}

export default function main(_argv: string[]) {
  const settings = [{model: 'GPS Master', make: 'King Shyt'}, {model: 'GPSex', make: 'Location Knowers'}]

  for (const setting of settings) {
    const {model, make} = setting;
    console.log(`Building car with model: ${model} and make: ${make}...`)
    const car = Car.build()
      .setGPS({model, make})
      .setTripComputer({cpu: 1_000_000})
    car.report();
  }
}

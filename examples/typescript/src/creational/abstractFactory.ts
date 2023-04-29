import * as readline from 'node:readline/promises'

interface Chair {
  showSitting(): string;
}

interface Table {
  showEating(): string;
}

interface DiningFurnitureSet {
  chair(): Chair;
  table(): Table;
}

class ModernChair implements Chair {
  showSitting() {
    return `photo: a chair which a black frame and tasteful leather padding, a gentleman in a cardigan sits in it smiling`
  }
}
class OrdinaryChair implements Chair {
  showSitting() {
    return `photo: a light-toned wooden chair, there is no padding`
  }
}
class ModernTable implements Table {
  showEating() {
    return `photo: a family eating some sort of meal with kale on a countertop made of glass with a marble base`
  }
}
class OrdinaryTable implements Table {
  showEating() {
    return `photo: a family eating hot dogs, etc laughing at a table made of plain light-colored wood`
  }
}

class ModernDiningFurnitureSet implements DiningFurnitureSet {
  chair(): Chair {
    return new ModernChair();
  }
  table(): Table {
    return new ModernTable();
  }
}
class OrdinaryDiningFurnitureSet implements DiningFurnitureSet {
  chair(): Chair {
    return new OrdinaryChair();
  }
  table(): Table {
    return new OrdinaryTable();
  }
}

export default async function main(_: string[]) {
  console.log('Abstract factory example')
  const {stdin, stdout} = process;
  const rl = readline.createInterface({input: stdin, output: stdout})

  const mainLoop = async (): Promise<void> => {
    let furnitureSet: DiningFurnitureSet = {} as DiningFurnitureSet;
    const answer = await rl.question("What kind of dining set would you like? modern or ordinary?\n");

    switch (answer.toLowerCase()) {
      case "modern":
        furnitureSet = new ModernDiningFurnitureSet();
        break;
      case "ordinary":
        furnitureSet = new OrdinaryDiningFurnitureSet();
        break;
      case "exit":
        console.log("See you later.");
        process.exit(0);
      default:
        console.log(`Sorry, "${answer} is not one of the choices. Try "modern" or "ordinary"."`);
        return mainLoop();
    }

    const chair = furnitureSet.chair();
    const table = furnitureSet.table();

    console.log('A description of your furniture set:');
    console.log(`Chair: ${chair.showSitting()}`);
    console.log(`Table: ${table.showEating()}`);

    mainLoop();
  }
  await mainLoop();
}

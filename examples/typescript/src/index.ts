import path from 'node:path'
import fs from 'node:fs'

type Example = {path: string, name: string}

// NOTE: impl limitation, regardless of dir nesting, 
// we need to have unique file names or else we don't know which example to run
function getAllExampleFilePaths(rootPath = './', examplePaths: string[] = []): string[] {
  const files = fs.readdirSync(rootPath);
  for (const file of files) {
    const fullPath = path.join(rootPath, file)
    if (fs.lstatSync(fullPath).isDirectory()) {
      return getAllExampleFilePaths(fullPath, examplePaths);
    }
    examplePaths.push(fullPath)
  }
  return examplePaths;
}

const examples: Example[] = getAllExampleFilePaths('./src')
  .map(p => ({
    path: p,
    name: path.parse(p).name
  }));


function printExamples(examples: Example[]) {
  console.log(`Examples:\n${examples.map(e => `- ${e.name}`).join('\n')}`)
}

function printUsage() {
  return console.log(`design_patterns <example_name> (-- <...example_args>)
    example_name: name of example to run, e.g.factory
    example_args: one or more args to pass to the example should it be required`)
}

function errorExit() {
  console.error('need an example to run');
  printUsage();
  console.log();
  printExamples(examples);
  process.exit(1);
}

(async function main() {
  const [, , exampleName, ...rest] = process.argv;
  if (!exampleName) errorExit();

  const example = examples.find(({name}) => name === exampleName);
  if (!example) {
    printExamples(examples);
    process.exit(1);
  }

  const mod = await import(path.resolve('.', example.path))
  await mod.default(rest)
})()


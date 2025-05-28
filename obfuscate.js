const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');

const obfuscationOptions = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  debugProtection: true,
  debugProtectionInterval: 2000,
  disableConsoleOutput: true,
  identifierNamesGenerator: 'hexadecimal',
  log: false,
  numbersToExpressions: true,
  renameGlobals: false,
  selfDefending: true,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 10,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayCallsTransformThreshold: 0.75,
  stringArrayEncoding: ['base64'],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 2,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 4,
  stringArrayWrappersType: 'function',
  stringArrayThreshold: 0.75,
  transformObjectKeys: true,
  unicodeEscapeSequence: false
};

function obfuscateFile(filePath) {
  try {
    const code = fs.readFileSync(filePath, 'utf8');
    const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, obfuscationOptions).getObfuscatedCode();

    const outputPath = filePath.replace('.js', '.obf.js');
    fs.writeFileSync(outputPath, obfuscatedCode);
    console.log(`Obfuscated ${filePath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

const jsFiles = [
  'js/basesetting.js',
  'js/loader.js'
];

jsFiles.forEach(file => obfuscateFile(file)); 
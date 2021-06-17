import BarcodeScanner from './mod.ts'

const scanner = new BarcodeScanner({
  endKeys: 'Intro'
});

let count = 0;
scanner.on('code', code => {
  count++
  console.log(code)
  if (count === 3) scanner.off();
})

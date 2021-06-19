import BarcodeScanner from '../mod.ts'

const scanner = new BarcodeScanner({
  endKeys: 'Return'
});

let count = 0;

for await (const code of scanner.reader()) {
  count++
  console.log(code)
  if (count === 3) scanner.off();
}
import Readable from 'https://deno.land/std@0.99.0/node/_stream/readable.ts';
import BarcodeScanner from '../mod.ts'

const scanner = Readable.from(new BarcodeScanner({
  endKeys: ['Intro', 'Enter']
}).reader());

scanner.on('data', (code: string) => {
  console.log(code)
});
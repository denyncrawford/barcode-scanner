import { isEndKey, isValid, formatKey } from './helpers.ts'
import type { InitOptions } from './types.ts'
import BarcodeScanner from './mod.ts'

let lastTime = 0;
let code = "";
let uppercase = false;

export default function (this: BarcodeScanner, options: InitOptions, key: string)  {

 // Prepare event

  const { 
    endKeys, 
    validKey,
    minLength, 
    devicePrefix,
    latency
  } = options

  const timeStamp = new Date().getTime();
  const timeDiff = timeStamp - lastTime;
  lastTime = timeStamp;

  if (key.includes("Shift")) return uppercase = true;
  
  if (timeDiff > latency) {
    
    // Maybe a normal key press or start of barcode

    if (!isEndKey(endKeys, key) && isValid(validKey, key)){
      code = formatKey(uppercase, key)
      uppercase = false
    } else code = "";

  } else if (isValid(validKey, key)) {
    // Still scanning
    code += formatKey(uppercase, key);
    uppercase = false

  } else {
    if (isEndKey(endKeys, key)) {
      // End of barcode
      if (code.length >= minLength && !devicePrefix) {
        this.emit('code', code);
      } else if (code.length >= minLength && devicePrefix) {
        // Check for device prefix
        if (code.includes(devicePrefix)) this.emit("code", code.slice(devicePrefix.length))
      }
    }
    // Invalid scan, reset
    code = "";
  }
}
# Barcode Scanner 

It is a simple utility inspired by [simple-barcode-scanner](https://github.com/hadeeb/simple-barcode-scanner) but made as a native and global keyboard scanner driver for Deno, this means that it doesn't depend on any browser and it listens even when no GUI/UI/TERMINAL (stdin) is focused. 

Most barcode scanners act like a keyboard, Barcode Scanner handles this by listening for native events without using the DOM API. This is useful for scanning without focusing on any screen and works for multiple devices.

### Why?

I needed a way to use multiple scanners on a PC without depending on one window being focused. It is not viable / reliable to use on GUIs and browser running on machines used by several users at time.

**Don't be scare!** Barcode Scanner is pretty simple too and it can be used with a single scanner on a simple app :D, but with the security that data is not getting lost anymore.

### How?

Barcode scanners are HID devices also, but there's one trick, they are **FORBIDEN** by some systems... Basically they doesn't allow HID connections for keyboards and mouses for security reasons. So while looking for a solution I found that it is not that useful and we can't take a direct connection from the device. 

**So, how it is native?**: **We use [GKM](https://github.com/denyncrawford/deno-gkm)** to capture native/global keys and keybindings events. This is because neither Node or Deno support native events for keyboards and mouses. Anyway, it is incredibly fast as well. 

##  📦 Import

```javascript
import BarcodeScanner from "https://deno.land/x/barcode_scanner@1.0.0/mod.ts";
```

## 🖥️ Usage

You can use NBS as a global listener or as a dedicated device listener.

### Basic (global):

> This will listen to all devices and will catch all codes from the multiple emitting devices. This is the way if you have just one device or if your device doesn't allow prefixing. 

```javascript
import BarcodeScanner from "./mod.ts";

const options = {...foo}

const scanner = new BarcodeScanner(options);

// Add a global listener

for await (const code of scanner.reader()) {
  console.log(code)
}

// Stop the listener
scanner.off();
```

### Dedicated device:

As I said before, some devices allow code prefixing functions and you can use it to scope the NBS events.

To do this, you have to prefix your device with your chosen device ID string and then specify it at `options.devicePrefix`.

> **Note**: NBS doesn't prefix your device, you must use one that does. Please read your device user guide. 

```javascript
import BarcodeScanner from "./mod.ts";

const options = {
  devicePrefix: 'id1'
}

const scanner = new BarcodeScanner(options);

// Add a global device scoped listener
for await (const code of scanner.reader()) {
  // This only works for the device(s) prefixed with id
  console.log(code)
}
// Remove the listener
scanner.off();
```

> **Note**: We un-prefix the code for you ;) you can log it as clean as it is on the paper.

# EventEmitter API deprecation

**Please note** that node and browser versións uses an EventEmitter like API, it is deprecated now and we are aiming the usage of Deno's way. It is compatible just with the deno stream API, out of the box. **If you want to use it as before (with the events API) you must see the next example**:

```typescript
import Readable from 'https://deno.land/std@0.99.0/node/_stream/readable.ts';
import BarcodeScanner from '../mod.ts'

const scanner = Readable.from(new BarcodeScanner({
  endKeys: ['Intro', 'Enter']
}).reader());

scanner.on('data', (code: string) => {
  console.log(code)
});
```

# 🧰 API

### BarcodeScanner
Creates an instance of Scanner to use the code events.

**Parameters**

- `Options?` **Object**

  - `latency` **Number** Max time duration (in ms) between consecutive inputs

    _default: `50`_

  - `minLength` **Number** Min length of a valid barcode

    _default: `3`_

  - `endKeys` **string** | **Array<string>** Key name indicating end of barcode

    Refer [Key Values | MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

    _default: `["Return"]`_

  - `validKey` **RegExp** Regular expression to check for a valid key in barcode

    Refer [Key Values | MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

    _default: `/^\w$/`_
  
  - `devicePrefix` **string** Prefix ID for device scoped events

    _default: `null`

  > **Please note**: `options.endKeys` is always "Return", if you know that your device or one of them have a different endKey, you must add those endKeys into the array. Eg: `['L', 'F1', ...]`.

Returns **Scanner**

### Scanner

- `reader` **Async iterator**: Starts listening for barcode scans.
  
  _yields: Event Object

- `off` **Function**: Stop listening for barcode scans and remove the listener.
  _returns: `void`
  
# 🌐 Using on web and node

Please if you are on browser use [simple-barcode-scanner](https://github.com/hadeeb/simple-barcode-scanner)

If you want the multi-device update use my fork [@denyncrawford/simple-barcode-scanner](https://github.com/denyncrawford/simple-barcode-scanner/tree/device-instance)

Please check [native-barcode-scanner](https://github.com/denyncrawford/native-barcode-scanner) for using in node.

# 🔥 Spam

This modules uses [GKM](https://github.com/denyncrawford/deno-gkm): If you want to listen global input events, go check it out!.

# 👥 Credits

Developer: [denyncrawford](https://github.com/denyncrawford/)

This idea couln't be possible without [simple-barcode-scanner](https://github.com/hadeeb/simple-barcode-scanner), thanks.

# 🏗️ Contributing

1. Create an issue related to the problem or idea and check if it is viable
2. Fork it :D
3. Create a new branch with your changes.
4. Make a PR.

# 📜 License

MIT License

Copyright (c) 2020 Miguel Rangel

[See full licese](https://github.com/denyncrawford/barcode-scanner/tree/main/LICENSE)
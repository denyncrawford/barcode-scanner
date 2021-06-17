import EventEmitter from 'https://deno.land/x/eventemitter@1.2.1/mod.ts';
import type { InitOptions, Inner, Options } from './types.ts'
import { wildcard } from 'https://deno.land/x/gkm@1.0.0/mod.ts';
import _enventHandler from './eventHandler.ts'

/**
 * @class Represents the Scanner instance.
 */

export default class BarcodeScanner extends EventEmitter <{
  code (key: string): void
  }>{
  
  options: InitOptions = {
    latency: 50,
    minLength: 3,
    endKeys: ['Enter'],
    validKey: /^\w$/,
    devicePrefix: null
  };
  state = false;

  /**
 * Creates an instance of Scanner.
 *
 * @constructor
 * @param {object} options The options to configure the instance
 * @param {number} otions.latency Max time duration (in ms) between consecutive inputs
 * @param {number} option.minLength Min length of a valid barcode
 * @param {string} option.endKey key string indicating end of barcode
 * @param {RegExp} options.endKey Regular expression to check for a valid key in barcode
 * @param {string | null} options.devicePrefix Prefix for device scoped events
 */

  constructor(options: { [K in keyof Options]?: Inner<Options[K]> } = {}) {
    super()
    Object.assign(this.options, options);
    this.initHandler()
  }

  /**
   * Starts the main activity.
   *
   * @returns {void} void.
   */

  initHandler = async () => {
    this.state = true;
    const enventHandler = _enventHandler.bind(this, this.options)
    for await (const evt of wildcard('key.pressed')) {
      if (this.state) enventHandler(evt.data)
    }
  }

  /**
 * Stop listening the events.
 *
 * @returns {void} void
 */

  kill() {
    this.state = false;
  }

}
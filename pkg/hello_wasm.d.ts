/* tslint:disable */
/* eslint-disable */
/**
* @param {number} arg
* @returns {string}
*/
export function wasmLoop(arg: number): string;
/**
* @param {number} arg
* @returns {BigInt64Array}
*/
export function wasmArrayLoop(arg: number): BigInt64Array;
/**
* @param {number} n
* @returns {number}
*/
export function wasmFib(n: number): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly wasmLoop: (a: number, b: number) => void;
  readonly wasmArrayLoop: (a: number, b: number) => void;
  readonly wasmFib: (a: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;

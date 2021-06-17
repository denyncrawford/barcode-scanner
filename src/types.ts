export interface InitOptions<T = unknown> {
  latency: number,
  minLength: number,
  endKeys: string | Array<string>,
  validKey: RegExp,
  devicePrefix: string | null
}

export type Options = Record<string, InitOptions<unknown>>

export type Inner<T extends InitOptions<unknown>> = T extends InitOptions<infer X> ? X
  : never;
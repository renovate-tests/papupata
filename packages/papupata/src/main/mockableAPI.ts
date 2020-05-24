export type MockableAPI<Arg, Ret> = {
  (arg: any): Promise<Ret>
  implementation?: (...args: any[]) => any
  CallArgsType: Arg
  apiUrlParameters: {
    boolQuery: any
  }
  apiDeclaration: any
}
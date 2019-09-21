export interface Interactor<P, R> {
  execute(param: P): Promise<R>
}

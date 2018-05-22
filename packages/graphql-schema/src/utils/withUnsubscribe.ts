import { $$asyncIterator } from 'iterall';
import * as Rx from 'rxjs';

// @TODO: https://github.com/apollographql/graphql-subscriptions/pull/147
function withUnsubscribe<T, V>(
  observable$: Rx.Observable<T>,
  iterator: AsyncIterator<V>,
  publish: (value: T) => void,
): AsyncIterator<T> {
  const end$ = new Rx.Subject<boolean>();
  observable$.takeUntil(end$).subscribe(publish);

  // @ts-ignore: $$asyncIterator is considered the same as Symbol.asyncIterator by TypeScript.
  return {
    ...iterator,
    return(value) {
      end$.next(true);
      return iterator.return
        ? iterator.return(value)
        : {
            done: true,
            value,
          };
    },
    throw(error) {
      end$.error(error);
      return iterator.throw
        ? iterator.throw(error)
        : {
            done: true,
            value: undefined,
          };
    },
    [$$asyncIterator]() {
      return this;
    },
  };
}

export default withUnsubscribe;

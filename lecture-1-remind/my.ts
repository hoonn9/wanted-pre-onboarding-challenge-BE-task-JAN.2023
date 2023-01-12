namespace FP {
  export const filter = <T>(predicate: (element: T) => boolean, list: T[]) => {
    const result: T[] = [];

    for (const element of list) {
      if (predicate(element)) {
        result.push(element);
      }
    }

    return result;
  };

  export const map = <T>(predicate: (element: T) => T, list: T[]) => {
    const result: T[] = [];

    for (const element of list) {
      result.push(predicate(element));
    }

    return result;
  };

  export const forEach = <T>(predicate: (element: T) => any, list: T[]) => {
    for (const element of list) {
      predicate(element);
    }
  };

  export const reduce = <T>(predicate: (prev: T, curr: T) => T, acc: T, list: T[]) => {
    for (const element of list) {
      acc = predicate(acc, element);
    }

    return acc;
  };

  export const pipe = <T>(list: T, ...functions: ((v: any) => any)[]) => {
    for (const func of functions) {
      list = func(list);
    }

    return list;
  };

  export const curry = (func: (...args: any[]) => any) => {
    return (a: any, ...args: any[]) => {
      if (args.length > 0) {
        // 인수가 한개 이상이면 일반 함수로 취급하고 들어온 인수대로 실행
        return func(a, ...args);
      }
      // 인수가 한개일 경우 Curry하는 것으로 간주하고 추가 인수받는 함수 반환
      return (...args: any[]) => func(a, ...args);
    };
  };

  // Curry를 적용하기 위해 list값이 없어도 동작하게 함
  // Iterator 사용
  export const iteratorReduce = <T>(predicate: (prev: T, curr: T) => T, acc: T, list?: T[]) => {
    if (list === undefined) {
      const iterator = (acc as T[])[Symbol.iterator]();
      acc = iterator.next().value;

      // iterator가 generator의 iterator일 경우 yield 됐을 때만 값을 반환함
      for (const el of iterator) {
        acc = predicate(acc, el);
      }

      return acc;
    }
    return reduce(predicate, acc, list);
  };

  // 지연평가
  // 지연 평가가 없으면 파이프의 모든 함수를 리스트 개수만큼 수행해야 한다.
  // 성능에 비효율적이므로 지연평가를 도입하여 해결한다.
  // 제네레이터 적용
  // 지연평가 적용시 평가의 순서가 횡단에서 종단으로 변경된다.
  export const lazyFilter = curry(function* <T>(func: (v: T) => boolean, list: T[]) {
    for (const el of list) {
      console.log(`Lazy Filter: ${el}`);

      if (func(el)) {
        yield el;
      }
    }
  });

  export const lazyMap = curry(function* <T>(func: (v: T) => T, list: T[]) {
    for (const el of list) {
      console.log(`Lazy Map: ${el}`);

      yield func(el);
    }
  });
}

export default FP;

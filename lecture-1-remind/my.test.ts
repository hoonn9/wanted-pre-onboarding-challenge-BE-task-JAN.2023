import FP from "./my";

describe("My FP", () => {
  it("filter", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = FP.filter((el) => el % 2 === 1, arr);

    expect(result).toStrictEqual([1, 3, 5]);
  });

  it("map", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = FP.map((el) => el * 2, arr);

    expect(result).toStrictEqual([2, 4, 6, 8, 10]);
  });

  it("forEach", () => {
    const arr = [1, 2, 3, 4, 5];
    const mockFn = jest.fn();
    const func = (el: number) => {
      console.log(el);
    };

    const boundMockFn = mockFn.bind(func);
    FP.forEach(boundMockFn, arr);

    arr.forEach((el, i) => {
      expect(mockFn.mock.calls[i][0]).toBe(el);
    });
  });

  it("reduce", () => {
    const arr = [1, 2, 3, 4, 5];

    expect(FP.reduce((prev, curr) => prev + curr, 0, arr)).toBe(15);
  });

  it("함수 조합 (중첩)", () => {
    const arr = [1, 2, 3, 4, 5];

    const result = FP.reduce(
      (prev, curr) => prev + curr,
      0,
      FP.map(
        (el) => el * 2,
        FP.filter((el) => el % 2 === 1, arr)
      )
    );

    expect(result).toBe(18);
  });

  it("함수 조합 (파이프)", () => {
    const arr = [1, 2, 3, 4, 5];

    const result = FP.pipe(
      arr,
      (arr) => FP.filter((el: number) => el % 2 === 1, arr),
      (arr) => FP.map((el: number) => el * 2, arr),
      (arr) => FP.reduce((prev: number, curr: number) => prev + curr, 0, arr)
    );

    expect(result).toBe(18);
  });

  it("Currying", () => {
    const add = FP.curry((a: number, b: number) => a + b);

    expect(add(1, 2)).toBe(3);
    expect(add(1)(2)).toBe(3);
    expect(() => add(1)(2)(3)).toThrow(TypeError);
  });

  it("Currying 적용", () => {
    const arr = [1, 2, 3, 4, 5];
    const curryFilter = FP.curry(FP.filter);
    expect(curryFilter((el: number) => el % 2 === 1)(arr)).toStrictEqual([1, 3, 5]);

    const curryMap = FP.curry(FP.map);
    expect(curryMap((el: number) => el * 2)(arr)).toStrictEqual([2, 4, 6, 8, 10]);

    const curryReduce = FP.curry(FP.iteratorReduce);
    expect(curryReduce((prev: number, curr: number) => prev + curr)(arr)).toStrictEqual(15);

    FP.pipe(
      arr,
      curryFilter((el: number) => el % 2 === 1),
      curryMap((el: number) => el * 2),
      curryReduce((prev: number, curr: number) => prev + curr),
      (v: number) => {
        expect(v).toBe(18);
      }
    );
  });

  it("지연 평가 (LazyFilter)", () => {
    const arr = [1, 2, 3, 4, 5];
    const lazyFilterGenerator = FP.lazyFilter((el: number) => el % 2 === 1)(arr);
    const result = [];

    // generator 내부를 실행하지만 yield 됐을 때만 값을 반환함
    for (const el of lazyFilterGenerator) {
      result.push(el);
    }
    expect(result).toStrictEqual([1, 3, 5]);
  });

  it("지연 평가 조합", () => {
    const arr = [1, 2, 3, 4, 5];
    FP.pipe(
      arr,
      FP.lazyFilter((el: number) => el % 2 === 1),
      FP.lazyMap((el: number) => el * 2),
      FP.curry(FP.iteratorReduce)((prev: number, curr: number) => prev + curr),
      (v: Number) => expect(v).toBe(18)
    );
  });
});

import { sum, makeObject } from "../test-nodeTypeScript/testComponent";

//테스트 간위를 묶는 가장 큰 단위 , 테스트 시 describe에 설명된 내용으로 테스트 단위를 크게 분류해준다.
describe("First Test ", () => {
  test("test adds a + b to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  //////////////////
  //toBe , toEqual >> toBe는 단순 비교(원시타입) ,toEqual은 배열이나 객체 내부까지 깊은 비교
  //expect 테스트 할 변수나 값ㅇ을 넣는다.이후 toBe toEqual을 이용해 예측값과 비교한다.
  ///////

  it("test code", () => {
    expect(makeObject(1)).toEqual({ params: 1 });
  });
});

let temp = 0;
describe("beforeEach , AfterEach", () => {
  //beforeEach가 test()가 실행할 때마다 실행해주는 전처리기
  beforeEach(() => {
    temp = 1;
  });
  //afterEach가 test()가 종료될따마다 실행하는 후처리기
  afterEach(() => {
    temp = 0;
  });

  test("temp is 1 ", () => {
    expect(temp).toBe(1);
  });

  test("temp is 1", () => {
    expect(temp).toBe(1);
  });
});

import { reactive } from "./../reactive";
import { effect } from './../effect';
describe('effect', () => {
  it('happy path', () => {
    const user = reactive({
      age: 23,
    });
    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });
    expect(nextAge).toBe(24);

    // update
    user.age++;
    expect(nextAge).toBe(25);
  });

  it('effect should return runner', () => {
    let foo = 10;
    const runner = effect(() => {
      foo++;
      return 'foo';
    });
    expect(foo).toBe(11);
    const res = runner();
    expect(foo).toBe(12);
    expect(res).toBe('foo');
  });

  it('scheduler', () => {
    let dummy;
    let run: any;
    const scheduler = jest.fn(() => {
      run = runner;
    });
    const obj = reactive({
      foo: 1,
    });
    const runner = effect(() => {
      dummy = obj.foo;
    }, {
      scheduler,
    });
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);
    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(dummy).toBe(1);
    run();
    expect(dummy).toBe(2);
  })
});
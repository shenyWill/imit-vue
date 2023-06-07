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
});
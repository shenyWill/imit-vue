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
});
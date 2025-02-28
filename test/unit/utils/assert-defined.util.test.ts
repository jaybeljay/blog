import { AssertDefinedException } from 'src/lib/exceptions/assert-defined.exception';
import { assertDefined } from 'src/lib/utils/assert-defined.util';

describe(assertDefined.name, () => {
  test('value is defined', async () => {
    expect(assertDefined(process.env.NODE_ENV)).toBe('testing');
  });

  test('value is undefined', async () => {
    expect(() => assertDefined(process.env.PORT)).toThrow(
      new AssertDefinedException('Value must be defined.'),
    );
  });
});

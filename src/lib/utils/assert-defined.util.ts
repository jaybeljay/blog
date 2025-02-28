import { AssertDefinedException } from '../exceptions/assert-defined.exception';

/**
 * Проверка значения на undefined, в случае undefined бросаем ошибку
 * @param val Значение
 * @returns Значение, которое было на входе
 */
export const assertDefined = <T>(val: T): T => {
  if (val === undefined) {
    throw new AssertDefinedException('Value must be defined.');
  }

  return val;
};

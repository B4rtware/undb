import { ValueObject } from '@egodb/domain'
import type { IDateFieldValue } from './date-field.type'

export class DateFieldValue extends ValueObject<IDateFieldValue> {
  constructor(value: IDateFieldValue) {
    super({ value })
  }
}

import { ValueObject } from '@egodb/domain'
import { isNumber, isString } from '@fxts/core'
import { isDate } from 'date-fns'
import { None, Option, Some } from 'oxide.ts'
import type { FieldValue, ICreateFieldsSchema_internal, IFieldValue, UnpackedFieldValue } from '../../field'
import { FieldValueFactory } from '../../field/field-value.factory'

export class RecordValues extends ValueObject<Map<string, FieldValue>> {
  static fromArray(inputs: ICreateFieldsSchema_internal): RecordValues {
    const values = new Map(inputs.map((v) => [v.field.name.value, v.field.createValue(v.value as never)]))
    return new RecordValues(values)
  }

  static empty(): RecordValues {
    return new RecordValues(new Map())
  }

  public get value() {
    return this.props
  }

  set(fieldName: string, value: IFieldValue) {
    const fieldValue = FieldValueFactory.from(value)

    // TODO: handler is none value
    if (fieldValue.isSome()) {
      this.value.set(fieldName, fieldValue.unwrap())
    }
  }

  toObject() {
    const obj: Record<string, IFieldValue> = {}
    for (const [key, value] of this.value) {
      obj[key] = value.unpack()
    }
    return obj
  }

  /**
   * get unpacked field value
   *
   * @param name - field name
   * @returns unpacked field value
   */
  private getUnpackedValue(name: string): Option<UnpackedFieldValue> {
    return Option.nonNull(this.value.get(name)).map((v) => v.unpack())
  }

  /**
   * get field string value by field name
   * - if field not exists returns option none
   * - if value is not stirng returns option none
   *
   * @param name - field name
   * @returns unpacked string value
   */
  getStringValue(name: string): Option<string> {
    return this.getUnpackedValue(name)
      .map((v) => (isString(v) ? Some(v) : None))
      .flatten()
  }

  /**
   * get field number value by field name
   * - if field not exists returns option none
   * - if value is not number returns option none
   *
   * @param name - field name
   * @returns unpacked number value
   */
  getNumberValue(name: string): Option<number> {
    return this.getUnpackedValue(name)
      .map((v) => (isNumber(v) ? Some(v) : None))
      .flatten()
  }

  getDateValue(name: string): Option<Date> {
    return this.getUnpackedValue(name)
      .map((v) => (isDate(v) ? Some(v as Date) : None))
      .flatten()
  }
}

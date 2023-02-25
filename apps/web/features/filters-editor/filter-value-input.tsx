import type { Field, IDateFilterOperator, IFieldQueryValue, IOperator } from '@egodb/core'
import { DateRangeField } from '@egodb/core'
import { SelectField } from '@egodb/core'
import { StringField } from '@egodb/core'
import { dateBuiltInOperators } from '@egodb/core'
import { DateField } from '@egodb/core'
import { NumberField } from '@egodb/core'
import type { IDateRangeFieldValue } from '@egodb/core/field/date-range-field.type'
import { DatePicker, DateRangePicker, NumberInput, TextInput } from '@egodb/ui'
import { useCurrentTable } from '../../hooks/use-current-table'
import { OptionPicker } from '../option/option-picker'

interface IProps {
  field: Field | null
  operator: IOperator | null
  value: IFieldQueryValue
  onChange: (v: IFieldQueryValue) => void
}

export const FilterValueInput: React.FC<IProps> = ({ operator, field, value, onChange }) => {
  const table = useCurrentTable()

  if (!field) {
    return null
  }

  if (field instanceof StringField) {
    return (
      <TextInput
        size="xs"
        variant="filled"
        value={(value ?? '') as string}
        onChange={(event) => onChange(event.target.value)}
      />
    )
  }

  if (field instanceof NumberField) {
    return (
      <NumberInput size="xs" variant="filled" value={value as number} onChange={(number) => onChange(number || null)} />
    )
  }

  if (field instanceof DateField) {
    if (dateBuiltInOperators.has(operator as IDateFilterOperator)) {
      return null
    }
    return <DatePicker size="xs" variant="filled" value={value as Date} onChange={(date) => onChange(date || null)} />
  }

  if (field instanceof DateRangeField) {
    return (
      <DateRangePicker
        size="xs"
        variant="filled"
        value={(value as IDateRangeFieldValue) ?? undefined}
        onChange={(range) => {
          if (range.at(0) !== null && range.at !== null) {
            return onChange((range as IDateRangeFieldValue) || null)
          }
        }}
      />
    )
  }

  if (field instanceof SelectField) {
    return (
      <OptionPicker
        size="xs"
        variant="filled"
        value={value as string}
        field={field}
        onChange={(option) => onChange(option || null)}
      />
    )
  }

  return null
}
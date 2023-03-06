import { fieldIdSchema, tableIdSchema, viewIdSchema } from '@egodb/core'
import * as z from 'zod'

export const getRecordsTreeQueryInput = z.object({
  tableId: tableIdSchema,
  fieldId: fieldIdSchema,
  viewId: viewIdSchema.optional(),
})
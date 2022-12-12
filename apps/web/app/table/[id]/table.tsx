'use client'

import type { Table as CoreTable, QueryRecords } from '@egodb/core'
import { EGOTable } from '@egodb/table-ui'
import { Box, Space } from '@egodb/ui'
import { useUpdateAtom } from 'jotai/utils'
import { useState } from 'react'
import { CreateRecordFormDrawer } from '../../../components/create-record-form/create-record-form-drawer'
import { editRecordFormDrawerOpened } from '../../../components/edit-record-form/drawer-opened.atom'
import { EditRecordFormDrawer } from '../../../components/edit-record-form/edit-record-form-drawer'
import { TableHaeder } from '../../../components/table/table-header'
import { TableToolbar } from '../../../components/table/table-toolbar'

interface IProps {
  table: CoreTable
  records: QueryRecords
}

export default function Table({ table, records }: IProps) {
  const setOpened = useUpdateAtom(editRecordFormDrawerOpened)
  const [rowId, setRowId] = useState<string>()

  const onRowClick = (id: string) => {
    setRowId(id)
    setOpened(true)
  }

  return (
    <Box>
      <Box px="md">
        <TableHaeder table={table} />
        <TableToolbar table={table} />
      </Box>
      <Space h="md" />
      <EGOTable onRowClick={onRowClick} records={records} table={table} />
      <CreateRecordFormDrawer table={table} />
      <EditRecordFormDrawer table={table} rowId={rowId} />
    </Box>
  )
}

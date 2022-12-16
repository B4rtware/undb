import type { CommandProps } from '@egodb/domain'
import { Command } from '@egodb/domain'
import type { IRootFilter } from '../../filter'
import type { ISetFilterCommandInput } from './set-filters.command.interface'

export class SetFitlersCommand extends Command implements ISetFilterCommandInput {
  readonly tableId: string
  readonly viewName?: string
  readonly filter: IRootFilter | null

  constructor(props: CommandProps<ISetFilterCommandInput>) {
    super(props)
    this.tableId = props.tableId
    this.viewName = props.viewName
    this.filter = props.filter
  }
}
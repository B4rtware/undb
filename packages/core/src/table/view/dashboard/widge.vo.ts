import { ValueObject } from '@undb/domain'
import { VirsualizationFactory } from '../virsualization/virsualization.factory.js'
import { LayoutVO } from './layout.vo.js'
import { WidgeID } from './widge-id.vo.js'
import type { ICreateWidgeSchema } from './widge.schema.js'
import type { IWidge } from './widge.type.js'

export class Widge extends ValueObject<IWidge> {
  public get id() {
    return this.props.id
  }

  public get layout() {
    return this.props.layout
  }

  public get virsualization() {
    return this.props.virsualization
  }

  static create(input: ICreateWidgeSchema) {
    const layout = new LayoutVO(input.layout)
    const virsualization = VirsualizationFactory.create(input.virtualization)

    return new this({
      id: WidgeID.fromOrCreate(input.id),
      layout,
      virsualization,
    })
  }
}

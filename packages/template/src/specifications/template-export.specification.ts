import { CompositeSpecification } from '@undb/domain'
import { Ok, type Result } from 'oxide.ts'
import type { TemplateExport } from 'src/value-objects/template-export.vo.js'
import type { ITemplateVisitor } from '../interface.js'
import type { Template } from '../template.js'

export class WithTemplateExport extends CompositeSpecification<Template, ITemplateVisitor> {
  constructor(public readonly exp: TemplateExport) {
    super()
  }
  isSatisfiedBy(t: Template): boolean {
    return false
  }
  mutate(t: Template): Result<Template, string> {
    t.export = this.exp
    return Ok(t)
  }
  accept(v: ITemplateVisitor): Result<void, string> {
    v.withExports(this)
    return Ok(undefined)
  }
}

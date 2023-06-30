import { NestGetShareAggregateChartQueryHandler } from './get-share-aggregate-chart.query.handler.js'
import { NestGetShareAggregateNumberQueryHandler } from './get-share-aggregate-number.query.handler.js'
import { NestGetShareViewRecordQueryHandler } from './get-share-view-record.query.handler.js'
import { NestGetShareViewRecordsQueryHandler } from './get-share-view-records.query.handler.js'
import { NestGetShareViewTreeRecordsQueryHandler } from './get-share-view-tree-records.query.handler.js'
import { NestGetShareQueryHandler } from './get-share.query-handler.js'
import { NestGetSharedViewQueryHandler } from './get-shared-view.query.handler.js'

export const queries = [
  NestGetShareQueryHandler,
  NestGetSharedViewQueryHandler,
  NestGetShareViewRecordQueryHandler,
  NestGetShareViewRecordsQueryHandler,
  NestGetShareViewTreeRecordsQueryHandler,
  NestGetShareAggregateNumberQueryHandler,
  NestGetShareAggregateChartQueryHandler,
]

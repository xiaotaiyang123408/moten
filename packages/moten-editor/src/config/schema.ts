import { schema } from '@moten/ui'
import { type PageSchema as _PageSchema } from './page-schema'
import T from './page-schema'

export type BlockSchema = typeof schema
export type BlockSchemaKeys = keyof BlockSchema
export type PageSchema = _PageSchema
export const blockSchema = schema
export const pageSchema = T

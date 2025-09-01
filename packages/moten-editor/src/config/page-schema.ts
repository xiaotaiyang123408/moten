import { type Static, Type } from '@sinclair/typebox'
import { schemaAllViewport } from '@moten/ui'

const background = Type.String({
  code: 'config-color',
  title: '背景颜色',
  default: '',
})
const title = Type.String({
  code: 'config-input',
  title: '标题',
  placeholder: '请输入页面标题',
  default: '',
  minLength: 1,
  errorMessage: {
    required: '最少一个字符',
    minLength: '最少一个字符',
  },
  rules: [
    {
      required: true,
      min: 1,
      message: '最少一个字符',
      trigger: 'change',
    },
  ],
})
const keywords = Type.String({
  code: 'config-input',
  title: '关键词',
  placeholder: '请输入关键词',
  default: '',
  minLength: 1,
  errorMessage: {
    required: '最少一个字符',
    minLength: '最少一个字符',
  },
  rules: [
    {
      required: true,
      min: 1,
      message: '最少一个字符',
      trigger: 'change',
    },
  ],
})
const description = Type.String({
  code: 'config-input',
  title: '描述',
  placeholder: '请输入页面描述',
  default: '',
  minLength: 1,
  errorMessage: {
    required: '最少一个字符',
    minLength: '最少一个字符',
  },
  rules: [
    {
      required: true,
      min: 1,
      message: '最少一个字符',
      trigger: 'change',
    },
  ],
})

const T = Type.Object({
  background: schemaAllViewport(background),
  title: schemaAllViewport(title),
  keywords: schemaAllViewport(keywords),
  description: schemaAllViewport(description),
})
export type PageSchema = Static<typeof T>
export default T

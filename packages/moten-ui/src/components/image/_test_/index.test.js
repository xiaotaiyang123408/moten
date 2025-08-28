import Component from '..'
import CurrentComponent from '../index.vue'
import { expect, describe, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { createApp } from 'vue-demi'
import { COMPONENT_PREFIX } from '@/config/index'
const componentCode = 'image'

const componentClass = `.${COMPONENT_PREFIX}-${componentCode}`
describe(`${componentCode}基本测试`, () => {
    test('测试组件名', () => {
        const app = createApp({}).use(Component)
        expect(app.component(Component.name || '')).toBeTruthy()
    })
    test('测试组件classes', () => {
        const wrapper = mount(CurrentComponent)
        expect(wrapper.find(componentClass).classes()).toBeTruthy()
        wrapper.unmount()
    })
})
describe(`${componentCode}测试组件props`, () => {
    test('src', () => {
        const src = 'https://img.yzcdn.cn/vant/cat.jpeg'
        const width = '100px'
        const heigth = '100px'
        const wrapper = mount(CurrentComponent, {
            props: {
                data: {
                    src: {
                        desktop: src,
                        mobile: src
                    },
                    width: {
                        desktop: width,
                        mobile: width
                    },
                    height: {
                        desktop: heigth,
                        mobile: heigth
                    }
                }
            }
        })
        expect(wrapper.find(componentClass + ' .image').attributes('src')).toBe(src)
        wrapper.unmount()
    })
})
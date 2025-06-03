// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'node:util'

if (!global.TextEncoder) {
    global.TextEncoder = TextEncoder
}

if (!global.TextDecoder) {
    global.TextDecoder = TextDecoder
}
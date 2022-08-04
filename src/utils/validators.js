import { integersOnly } from './number'

/* eslint-disable consistent-return */
export function phone(value) {
    const integers = integersOnly(value)

    if (integers.length !== 9) {
        return 'validateOfPhone'
    }
}

/* eslint-disable consistent-return */
export function required(value) {
    if (value === '' || value === null || value === undefined || value.length === 0) {
        return 'required'
    }
}

export function card(value) {
    const firstNumber = value.slice(0, 1)
    const fourNumber = value.slice(0, 4)

    if (firstNumber !== '4' && firstNumber !== '5' && fourNumber !== '8600' && fourNumber !== '9860') {
        return 'Bunday karta raqamini qo`llab quvatlamaymiz!'
    }
}

/* eslint-disable consistent-return */
export function validator(...validators) {
    return (value) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const fn of validators) {
            const message = fn(value)
            if (message) return message
        }
    }
}

function isNumber(value) {
    return /^-?\d*(\.\d+)?$/.test(value)
}

/* eslint-disable consistent-return */
export function number(value) {
    if (!isNumber(value)) {
        return 'mustNumber'
    }
}

export function minLengthNumber(value) {
    if (value.length < 13) {
        return 'validateOfNumber'
    }
}

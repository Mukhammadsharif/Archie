export function format(number) {
    return (typeof number === 'number') ? number.toLocaleString('fr') : number
}

export function integersOnly(value) {
    return value.replace(/[^0-9]/gim, '')
}

export function range(start, end) {
    const number = []
    // eslint-disable-next-line no-plusplus
    for (let i = start; i <= end; i++) {
        number.push(i)
    }
    return number
}

const months = {
    1: 'Yanvar',
    2: 'Fevral',
    3: 'Mart',
    4: 'Aprel',
    5: 'May',
    6: 'Iyun',
    7: 'Iyul',
    8: 'Avgust',
    9: 'Sentabr',
    10: 'Oktabr',
    11: 'Noyabr',
    12: 'Dekabr',
}

export function getMonthName(month) {
    return months[month]
}

export function normalizePhone(value) {
    if (!integersOnly(value)) return ''

    const phone = integersOnly(value).replace(/[^\d]/g, '')

    if (phone.length === 12) {
        return phone.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5')
    }

    if (phone.length === 11) {
        return phone.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{1})/, '+$1 ($2) $3-$4-$5')
    }

    if (phone.length === 10) {
        return phone.replace(/(\d{3})(\d{2})(\d{3})(\d{2})/, '+$1 ($2) $3-$4-')
    }

    if (phone.length === 9) {
        return phone.replace(/(\d{3})(\d{2})(\d{3})(\d{1})/, '+$1 ($2) $3-$4')
    }

    if (phone.length === 8) {
        return phone.replace(/(\d{3})(\d{2})(\d{3})/, '+$1 ($2) $3-')
    }

    if (phone.length === 7) {
        return phone.replace(/(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3')
    }

    if (phone.length === 6) {
        return phone.replace(/(\d{3})(\d{2})(\d{1})/, '+$1 ($2) $3')
    }

    if (phone.length === 5) {
        return phone.replace(/(\d{3})(\d{2})/, '+$1 ($2)')
    }

    if (phone.length === 4) {
        return phone.replace(/(\d{3})(\d{1})/, '+$1 ($2')
    }

    if (phone.length === 3) {
        return phone.replace(/(\d{3})/, '+$1 ')
    }
    if (phone.length === 2) {
        return phone.replace(/(\d{2})/, '+$1')
    }

    if (phone.length === 1) {
        return phone.replace(/(\d{1})/, '+$1')
    }

    return '+998'
}

export function normalizeSecurePhone(value) {
    if (!integersOnly(value)) return ''

    const phone = integersOnly(value).replace(/[^\d]/g, '')

    if (phone.length === 12) {
        return phone.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 $2 ****$5')
    }

    return '+998'
}

export function onChangePhone(value, oldValue, setFieldValue, name = 'phone') {
    const isDeleting = value.length < oldValue.length
    const lastCharacter = oldValue.substr(oldValue.length - 1)
    const charactersOfPhone = [' ', '-', '(', ')']

    if (value.length <= 4 && isDeleting) {
        setFieldValue(name, '+998')
        return
    }

    if (isDeleting && charactersOfPhone.includes(lastCharacter)) {
        setFieldValue(name, normalizePhone(value.slice(0, -1)))
        return
    }

    setFieldValue(name, normalizePhone(value))
}

export function numberWithSpaces(x, offset) {
    let result = ''
    for (let i = 0; i < x.length; i += 1) {
        result += x[i]
        // eslint-disable-next-line no-continue
        if (i === 0) continue

        if ((i + 1) % offset === 0) {
            result += ' '
        }
    }
    if (x.length % 4 === 0) return result.trim()
    return result
}

export function formatDate(value) {
    let result = ''

    if (value.length > 2) {
        result += `${value.slice(0, 2)} / ${value.slice(2, value.length)}`
    } else {
        return value
    }

    return result
}

import { useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { languages } from '../translate'

export default function useTrans() {
    const { lang } = useContext(GlobalContext) || {}
    return (text) => languages[lang][text] || text
}

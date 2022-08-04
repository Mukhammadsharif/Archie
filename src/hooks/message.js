import { useContext } from 'react'
import { Context } from '../components/BaseContext'

export function useMessage() {
    const context = useContext(Context)

    return [
        (text) => {
            context?.setText(text)
            context?.setShowMessage(true)
        },
    ]
}

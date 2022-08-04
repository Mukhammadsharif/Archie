import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'

export function useTabBarHeader(options, dependencies = []) {
    const { setHeaderOptions } = useContext(GlobalContext)

    useFocusEffect(useCallback(() => {
        setHeaderOptions(options)
    }, dependencies))
}

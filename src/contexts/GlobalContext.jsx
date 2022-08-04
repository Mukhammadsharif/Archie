import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export const GlobalContext = createContext({})

export function GlobalProvider({ children }) {
    const [animation, setAnimation] = useState(true)
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [scaleSize, setScaleSize] = useState(0.05)
    const [rotateSize, setRotateSize] = useState(70)
    const [active, setActive] = useState(false)
    const [news, setNews] = useState({})
    const [load, setLoad] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('token').then(async (value) => {
            await setToken(value)
            // const { response } = await notifications.request({ headers: { Authorization: `Token ${value}` } })
            // setNotificationCount(response?.notificationsCount || 0)
        })
    }, [load])

    async function auth(newToken, newUser) {
        setToken(newToken)
        setUser(newUser)
        await AsyncStorage.setItem('token', newToken)
        await AsyncStorage.setItem('user', JSON.stringify(newUser))
    }

    async function signOut(navigationRoute) {
        setToken(null)
        setUser({})
        await AsyncStorage.removeItem('token')
    }

    async function setId(clinicId) {
        await AsyncStorage.setItem('id', JSON.stringify(clinicId))
    }

    async function setPro() {
        await AsyncStorage.setItem('pro', 'yes')
    }

    return (
        <GlobalContext.Provider value={{
            token,
            user,
            auth,
            signOut,
            setUser,
            setId,
            setPro,
            scaleSize,
            setScaleSize,
            rotateSize,
            setRotateSize,
            active,
            setActive,
            animation,
            setAnimation,
            news,
            setNews,
            load,
            setLoad,
            setToken,
            name,
            setName,
        }}>
            { children }
        </GlobalContext.Provider>
    )
}

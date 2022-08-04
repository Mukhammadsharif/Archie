import React, { useContext, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SplashBackground } from '../components/Svgs'
import { GlobalContext } from '../contexts/GlobalContext'

export default function ThirdSplash() {
    const navigation = useNavigation()
    const { setAnimation } = useContext(GlobalContext)

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('DrawerScreen', { screen: 'TabScreen' })
            setAnimation(false)
        }, 200)
    }, [])
    return (
        <>
            <SplashBackground />
            <SplashBackground />
        </>
    )
}

const styles = StyleSheet.create({

})

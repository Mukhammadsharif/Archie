import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { SplashLogo } from '../components/Svgs'

export default function Splash() {
    const navigation = useNavigation()
    const [show, setShow] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setShow(false)
            navigation.navigate('SecondSplash')
        }, 500)
    }, [])

    return (
        <LinearGradient colors={['#FFB272', '#ED6C00']} style={styles.container}>
            {show ? <SplashLogo /> : null}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

import React, { useEffect } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { SplashBackground, SplashLogo } from '../components/Svgs'

export default function SecondSplash() {
    const navigation = useNavigation()

    const spinValue = React.useState(new Animated.Value(0))[0]

    const onPressIn = () => {
        Animated.timing(spinValue, {
            duration: 600,
            toValue: 1,
            useNativeDriver: false,
        }).start()
    }

    const spinDeg = spinValue.interpolate({
        useNativeDriver: false,
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    })

    const animatedScaleStyle = {
        transform: [{ rotate: spinDeg }, { translateY: 120 }, { translateX: 40 }],
        top: '50%',
    }

    useEffect(() => {
        onPressIn()

        setTimeout(() => {
            navigation.navigate('ThirdSplash')
        }, 600)
    }, [])

    return (
        <View style={styles.main}>
            <View style={styles.figureContainer}>
                <SplashBackground />
                <SplashBackground />
            </View>
            <LinearGradient colors={['#FFB272', '#ED6C00']} style={styles.container}>
                <Animated.View style={[animatedScaleStyle]}>
                    <SplashLogo />
                </Animated.View>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '80%',
        paddingLeft: 20,
        alignItems: 'flex-start',
    },
    figureContainer: {
        height: '100%',
        width: '20%',
    },
    main: {
        height: '100%',
        width: '100%',
        flex: 1,
        flexDirection: 'row',
    },
})

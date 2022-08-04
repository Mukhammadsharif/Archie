import React, { useRef, useEffect } from 'react'

import { Modal as NativeModal, View, StyleSheet, Animated } from 'react-native'
import Container from './Container'

function Animate(ref, to) {
    Animated.timing(ref, {
        toValue: to,
        duration: 300,
        useNativeDriver: true,
    }).start()
}

export default function Modal({ visible, children }) {
    const scale = useRef(new Animated.Value(1.3)).current
    const opacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if (visible) {
            Animate(scale, 1)
            Animate(opacity, 1)
        }

        return () => {
            Animate(scale, 1.3)
            Animate(opacity, 0)
        }
    }, [visible])

    return (
        <NativeModal
            visible={visible}
            animationType="fade"
            transparent
        >
            <View
                style={styles.outterWrapper}>
                <Container style={{ width: '90%' }}>
                    <Animated.View style={[styles.wrapper, { transform: [{ scale }], opacity }]}>
                        {children}
                    </Animated.View>
                </Container>
            </View>
        </NativeModal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        opacity: 0,
        backgroundColor: '#fff',
        width: '100%',
        minHeight: 50,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    outterWrapper: {
        height: '100%',
        backgroundColor: '#00000030',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

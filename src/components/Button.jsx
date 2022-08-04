import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { COLORS } from '../utils/colors'

export default function Button(
    {
        text,
        color = COLORS.white,
        backgroundColor = COLORS.main,
        submit = () => {},
        margin,
        fontSize = 18,
        height = 54,
        shadow = false,
    },
) {
    return (
        <TouchableOpacity
            onPress={submit}
            style={[styles.container, { backgroundColor, marginTop: margin, height }, shadow ? styles.shadow : null]}>
            <Text style={[styles.text, { color, fontSize }]}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 54,
        width: '100%',
        backgroundColor: COLORS.main,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        lineHeight: 25,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
    },
    shadow: {
        shadowOffset: { width: 0, height: 4 },
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowRadius: 12,
        elevation: 20,
        shadowOpacity: 0.8,
    },
})

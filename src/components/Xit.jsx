import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { COLORS } from '../utils/colors'

export default function Xit() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>ХИТ</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 59.29,
        height: 15.98,
        backgroundColor: COLORS.main,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 8,
        lineHeight: 18,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
        marginTop: -1,
    },
})
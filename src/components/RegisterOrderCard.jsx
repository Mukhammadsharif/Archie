import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { COLORS } from '../utils/colors'

export default function RegisterOrderCard({ date, number, status, color }) {
    return (
        <View style={styles.container}>
            <Text style={styles.date}>{date}</Text>

            <Text style={styles.number}>{number}</Text>

            <Text style={[styles.status, { color }]}>{status}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 36,
        width: '100%',
        backgroundColor: COLORS.white,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    date: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
        width: '33%',
    },
    number: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
        width: '33%',
        textAlign: 'center',
    },
    status: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
        width: '33%',
        textAlign: 'right',
    },

})

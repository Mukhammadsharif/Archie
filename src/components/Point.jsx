import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { COLORS } from '../utils/colors'

export default function Point({ item }) {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={styles.title}>{item.name ? item.name.toUpperCase() : ''}</Text>

            <Text style={styles.description}>
                {item.address ? item.address : ''}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        paddingBottom: 13,
        borderBottomWidth: 1,
        borderColor: 'rgba(202, 202, 202, 1)',
    },
    title: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        paddingHorizontal: 20,
        color: COLORS.black,
    },
    description: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        paddingHorizontal: 20,
        marginTop: 14,
        color: 'rgba(91, 91, 91, 1)',
    },
})

import React from 'react'
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { COLORS } from '../utils/colors'

export default function SliderCard({ date, name, code }) {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.leftText}>Дата</Text>
                <Text style={styles.leftText}>Источник</Text>
                <Text style={styles.leftText}>Код</Text>
                <Text style={styles.leftText}>Количество баллов</Text>
            </View>

            <View style={styles.rightContainer}>
                <Text style={styles.rightText}>
                    {/* eslint-disable-next-line max-len */}
                    { date ? `${date.substring(8, 10)}.${date.substring(5, 7)}.20${date.substring(2, 4)}` : '' }
                </Text>
                <Text style={styles.rightText}>{name}</Text>
                <Text style={styles.rightText}>{code}</Text>

                <Text style={styles.score}>1 балл</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 280,
        borderRadius: 10,
        flexDirection: 'row',
        borderColor: 'rgba(0, 0, 0, 0.15)',
        borderWidth: 0.5,
        marginLeft: 10,
    },
    leftContainer: {
        height: '100%',
        width: '40%',
        backgroundColor: COLORS.main,
        paddingLeft: 12,
        paddingRight: 20,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        paddingVertical: 8,
    },
    rightContainer: {
        width: '60%',
        height: '100%',
        paddingLeft: 17,
        paddingTop: 7.5,

    },
    leftText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
    },
    rightText: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: '#5B5B5B',
    },
    score: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.main,
        marginTop: 4,
    },
})

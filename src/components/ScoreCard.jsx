import React from 'react'
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { COLORS } from '../utils/colors'
import { PdfIcon } from './Svgs'

export default function ScoreCard({ code, date, name, certificate }) {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.leftText}>Дата</Text>
                <Text style={styles.leftText}>Источник</Text>
                <Text style={styles.leftText}>Приз</Text>
                <Text style={styles.leftText}>Сертификат</Text>
                <Text style={styles.leftText}>Количество баллов</Text>
            </View>

            <View style={styles.rightContainer}>
                <Text style={styles.rightText}>
                    { date ? `${date.substring(8, 10)}.${date.substring(5, 7)}.20${date.substring(2, 4)}` : '' }
                </Text>
                <Text style={styles.rightText}>{name}</Text>
                <Text style={styles.rightText}>{certificate}</Text>
                <PdfIcon />

                <Text style={styles.score}>15 баллов</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        borderColor: 'rgba(0, 0, 0, 0.15)',
        borderWidth: 0.5,
        marginTop: 10,
    },
    leftContainer: {
        height: '100%',
        width: '30%',
        backgroundColor: '#FF9C49',
        paddingLeft: 12,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        paddingVertical: 13,
    },
    rightContainer: {
        width: '60%',
        height: '100%',
        paddingLeft: 17,
        paddingTop: 7.5,
    },
    leftText: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
    },
    rightText: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    score: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
        marginTop: 4,
    },
})

import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../utils/colors'
import { GlobalContext } from '../contexts/GlobalContext'

export default function NewsCard({ item }) {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('NewsDetail', { item })}
            style={styles.container}>
            <Image source={{ uri: `https://archie-club.ru${item.icon}` }} style={styles.image} />

            <View style={styles.right}>
                {/* eslint-disable-next-line max-len */}
                <Text style={styles.date}>{item.cdate.substring(8, 10)}.{item.cdate.substring(5, 7)}.{item.cdate.substring(2, 4)}</Text>

                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.description}>
                    {item.anonce}...
                </Text>

                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('NewsDetail', { item })
                    }}>
                    <Text style={styles.link}>ЧИТАТЬ</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 103,
        backgroundColor: COLORS.white,
        borderColor: '#D4D3D3',
        borderWidth: 0.5,
        borderRadius: 10,
        width: '100%',
        marginTop: 11,
        padding: 10,
        flexDirection: 'row',
    },
    image: {
        width: 82.87,
        height: 82.87,
    },
    date: {
        fontSize: 10,
        lineHeight: 12,
        color: '#FF9C49',
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
    },
    title: {
        fontSize: 14,
        lineHeight: 18,
        color: COLORS.black,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        marginTop: 2,
    },
    description: {
        fontSize: 12,
        lineHeight: 14,
        color: '#5B5B5B',
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        marginTop: 2,
    },
    link: {
        fontSize: 14,
        lineHeight: 18,
        color: COLORS.main,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        textDecorationLine: 'underline',
        marginTop: 2,
    },
    right: {
        paddingLeft: 12,
        paddingRight: 100,
    },
})

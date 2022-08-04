import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { COLORS } from '../utils/colors'

export default function TownDropDown({ setCity, setOpen, cities }) {
    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator
                scrollEnabled
                nestedScrollEnabled
                style={styles.container}>
                {cities ? cities.sort().map((item) => (
                    <TouchableOpacity
                        onPress={() => {
                            setCity(item)
                            setOpen(false)
                        }}
                        style={styles.block}>
                        <Text style={styles.text}>
                            {/* eslint-disable-next-line max-len */}
                            {item.replace('г.', '').charAt(0).toUpperCase() + item.replace('г.', '').substring(1).toLowerCase()}
                        </Text>
                    </TouchableOpacity>
                )) : null}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: COLORS.white,
        width: '100%',
        zIndex: 1,
        borderRadius: 1,
        borderColor: COLORS.main,
        borderWidth: 1,
    },
    block: {
        height: 24,
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
})

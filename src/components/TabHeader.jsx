import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, Platform } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { DrawerOpenIcon, ArrowLeft } from './Svgs'
import { COLORS } from '../utils/colors'

export default function TabHeader({ text, navigationRoute = null }) {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => {
                    if (navigationRoute) {
                        navigation.navigate(navigationRoute)
                    } else {
                        navigation.goBack()
                    }
                }}>
                    <ArrowLeft />
                </TouchableOpacity>

                <Text style={styles.title}>{text}</Text>

                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <DrawerOpenIcon />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        shadowColor: 'rgba(0, 0, 0, 0.07)',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    headerContainer: {
        height: 42,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        marginTop: Platform.OS === 'ios' ? 50 : 15,
    },
    title: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
})

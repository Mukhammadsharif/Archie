import React from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { DrawerHeaderIcon, DrawerOpenIcon } from './Svgs'

export default function MainScreenHeader() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={{ width: '8%' }} />
                <DrawerHeaderIcon />
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
        shadowOffset: { width: 0, height: 1 },
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
})

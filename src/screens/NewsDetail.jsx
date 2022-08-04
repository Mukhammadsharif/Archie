import React, { useContext, useEffect } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, View, Text, ImageBackground, BackHandler } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { COLORS } from '../utils/colors'
import BackgroundImage from '../assets/background.png'
import { GlobalContext } from '../contexts/GlobalContext'

export default function NewsDetail({ route }) {
    const { item } = route.params
    const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.navigate('News')
                // Return true to stop default back navigaton
                // Return false to keep default back navigaton
                return true
            }

            // Add Event Listener for hardwareBackPress
            BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress,
            )

            return () => {
                // Once the Screen gets blur Remove Event Listener
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    onBackPress,
                )
            }
        }, []),
    )
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.imageBackground}>
                <ScrollView>
                    <View style={styles.main}>
                        <View style={styles.card}>
                            <Image source={{ uri: `https://archie-club.ru${item.icon}` }} style={styles.image} />

                            <Text style={styles.date}>{item.cdate.substring(8, 10)}.{item.cdate.substring(5, 7)}.{item.cdate.substring(2, 4)}</Text>

                            <Text style={styles.title}>{item.title}</Text>

                            <Text style={styles.description}>
                                {item.anonce}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: COLORS.white,
    },
    main: {
        paddingHorizontal: 20,
        paddingTop: 9,
        width: '100%',
    },
    card: {
        width: '100%',
        backgroundColor: COLORS.white,
        borderWidth: 0.5,
        borderColor: '#D4D3D3',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 16,
        marginTop: 10,
    },
    image: {
        width: '100%',
        minHeight: 150,
    },
    date: {
        fontSize: 10,
        lineHeight: 12,
        color: '#FF9C49',
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        marginTop: 15,
    },
    title: {
        fontSize: 16,
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
        marginTop: 15,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
    },
})

import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, ImageBackground, View, SafeAreaView, ScrollView, BackHandler } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import NewsCard from '../components/NewsCard'
import { COLORS } from '../utils/colors'
import BackgroundImage from '../assets/background.png'
import { GlobalContext } from '../contexts/GlobalContext'
import { NEWS_LIST } from '../utils/urls'

export default function News() {
    const navigation = useNavigation()
    const { token } = useContext(GlobalContext)
    const [data, setData] = useState(null)

    const getNewsList = () => {
        const info = new FormData()
        info.append('token', token)
        fetch(NEWS_LIST, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: info,
        })
            .then((response) => response.json())
            .then((r) => {
                // console.log('Success::', r)
                setData(r)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    useEffect(() => {
        if (token) {
            getNewsList()
        }
    }, [token])

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.navigate('TabScreen')
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
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.image}>
                <ScrollView>
                    <View style={styles.main}>
                        {data ? data.sort((a, b) => new Date(a.cdate) - new Date(b.cdate)).reverse().map((item) => (
                            <NewsCard item={item} />
                        )) : null}
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
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
    },
})

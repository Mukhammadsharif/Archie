import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableOpacity, BackHandler } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { COLORS } from '../utils/colors'
import CatalogDetail from '../components/CatalogDetail'
import ScoresDetail from '../components/ScoresDetail'
import { GlobalContext } from '../contexts/GlobalContext'
import { PERSONAL_INFORMATION, PRIZE_LIST } from '../utils/urls'

export default function CatalogGifts() {
    const navigation = useNavigation()
    const { token } = useContext(GlobalContext)
    const [data, setData] = useState(null)
    const [information, setInformation] = useState(null)

    const getNewsList = () => {
        const info = new FormData()
        info.append('token', token)
        fetch(PRIZE_LIST, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: info,
        })
            .then((response) => response.json())
            .then((r) => {
                console.log('Success::', r)
                setData(r)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    const getUserInformation = () => {
        const info = new FormData()
        info.append('token', token)
        fetch(PERSONAL_INFORMATION, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: info,
        })
            .then((response) => response.json())
            .then((r) => {
                console.log('Success::', r)
                setInformation(r)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    useEffect(() => {
        if (token) {
            getNewsList()
            getUserInformation()
        }
    }, [token])

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.navigate('PersonalInformation')
                return true
            }

            BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress,
            )

            return () => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    onBackPress,
                )
            }
        }, []),
    )
    const [catalog, setCatalog] = useState(true)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.main}>
                    <TouchableOpacity
                        onPress={() => setCatalog(!catalog)}
                        style={catalog ? styles.buttonActive : styles.button}>
                        <Text style={catalog ? styles.buttonActiveText : styles.buttonText}>Каталог</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setCatalog(!catalog)}
                        style={catalog ? styles.secondButton : styles.secondButtonActive}>
                        <Text style={catalog ? styles.secondButtonText : styles.secondButtonActiveText}>
                            Мои баллы
                        </Text>
                    </TouchableOpacity>
                </View>

                {catalog
                    ? <CatalogDetail data={data} information={information} />
                    : (
                        <ScoresDetail
                            information={information}
                            catolog={catalog}
                            setCatalog={setCatalog} />
                    )}

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: COLORS.white,
    },
    main: {
        flexDirection: 'row',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: 47,
        backgroundColor: '#FFC18D',
    },
    buttonActive: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: 47,
    },
    secondButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: 47,
        backgroundColor: COLORS.main,
    },
    secondButtonActive: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        height: 47,
        backgroundColor: COLORS.white,
    },
    buttonActiveText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    secondButtonText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: '#FFD4AF',
    },
    buttonText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: '#FFEAD8',
    },
    secondButtonActiveText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    inputSmall: {
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.main,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginTop: 20,
        width: '80%',
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
    },
    inputSmallCity: {
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.main,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginTop: 20,
        width: '80%',
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
    },
    inputSmallActive: {
        height: 40,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 0,
        borderColor: COLORS.main,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginTop: 20,
        width: '80%',
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
    },
    chooseButton: {
        backgroundColor: COLORS.main,
        width: '20%',
        height: 40,
        marginTop: 20,
        marginLeft: '-20%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chooseButtonActive: {
        backgroundColor: COLORS.main,
        width: '20%',
        height: 40,
        marginTop: 20,
        marginLeft: '-20%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#CACACA',
        marginVertical: 30,
    },
})

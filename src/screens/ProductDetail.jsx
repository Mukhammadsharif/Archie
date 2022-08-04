import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, BackHandler } from 'react-native'
import { Card } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../utils/colors'
import ProductImage from '../assets/product-big.png'
import ProductScheme from '../assets/product-scheme.png'
import { DisLikedIcon, LikedIcon } from '../components/Svgs'
import Button from '../components/Button'
import ViroComponent from '../components/ViroComponent'
import { GlobalContext } from '../contexts/GlobalContext'

export default function ProductDetail({ route }) {
    const navigation = useNavigation()
    const { active, setActive } = useContext(GlobalContext)
    const { handle } = route.params
    const [like, setLike] = useState(false)

    function handleBackButtonClick() {
        navigation.navigate('Catalog')
        return true
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick)
        }
    }, [])

    console.log(handle)
    return (
        <>
            { active ? (
                <ViroComponent active={active} setActive={setActive} />
            ) : (
                <SafeAreaView style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.header}>
                            <Card style={styles.card}>
                                <Card.Content>
                                    <View style={styles.cardContainer}>
                                        <Image
                                            source={{ uri: `https://archie-club.ru/${handle.image}` }}
                                            style={styles.productImage} />
                                    </View>

                                    <View style={styles.productSort}>
                                        <Text style={styles.productSortName}>{handle.purpose}</Text>
                                        <Text style={styles.productSortNumber}>Арт: {handle.articul}</Text>
                                    </View>

                                    <Text style={styles.productSortTitle}>{handle.collectionname}</Text>

                                    <View style={styles.productFooter}>
                                        <Text style={styles.productFooterText}>{handle.color}</Text>

                                        <TouchableOpacity
                                            onPress={() => setLike(!like)}>
                                            {like
                                                ? <LikedIcon fill={COLORS.main} style={{ marginTop: -2 }} />
                                                : <DisLikedIcon style={{ marginTop: -2 }} />}
                                        </TouchableOpacity>

                                        {/* <DisLikedIcon style={{ marginTop: -2 }} /> */}
                                    </View>
                                </Card.Content>
                            </Card>

                            <View style={styles.buttonContainer}>
                                <Button
                                    text={'Примерить'.toUpperCase()}
                                    submit={() => {
                                        // navigation.navigate('ViroScreen')
                                        setActive(true)
                                    }}
                                    shadow
                                />
                            </View>
                        </View>

                        <View style={styles.main}>
                            <Text style={styles.mainTitle}>Описание</Text>

                            <Text style={styles.mainTitleDescription}>
                                {handle.collectiondescription}
                            </Text>

                            <Text style={styles.mainTitle}>Характеристики</Text>

                            <Text style={styles.mainDescriptionTitle}>
                                Артикул:
                                <Text style={styles.mainDescription}> {handle.articul}</Text>
                            </Text>

                            <Text style={styles.mainDescriptionTitle}>
                                Бренд:
                                <Text style={styles.mainDescription}> {handle.brandname}</Text>
                            </Text>

                            <Text style={styles.mainDescriptionTitle}>
                                Коллекция:
                                <Text style={styles.mainDescription}> {handle.collectionname}</Text>
                            </Text>

                            <Text style={styles.mainDescriptionTitle}>
                                Цвет:
                                <Text style={styles.mainDescription}> {handle.properties.color}</Text>
                            </Text>

                            <Text style={styles.mainDescriptionTitle}>
                                Тип:
                                <Text style={styles.mainDescription}> {handle.properties.lining}</Text>
                            </Text>

                            <Text style={styles.mainDescriptionTitle}>
                                Назначение:
                                <Text style={styles.mainDescription}> {handle.properties.purpose}</Text>
                            </Text>
                        </View>

                        <View style={styles.footer}>
                            <Card style={styles.footerCard}>
                                <Card.Content style={styles.footerCardContainer}>
                                    <Image
                                        source={{ uri: `https://archie-club.ru/${handle.image2}` }}
                                        style={styles.footerProductImage} />
                                </Card.Content>
                            </Card>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: COLORS.white,
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        height: 198,
        borderColor: '#D4D3D3',
        borderWidth: 0.5,
        borderRadius: 10,
    },
    cardContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#CACACA',
    },
    productImage: {
        width: 315,
        height: 178,
        marginTop: -5,
    },
    productSort: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
    },
    productFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 1,
    },
    productSortName: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: '#5B5B5B',
    },
    productSortNumber: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: '#5B5B5B',
    },
    productSortTitle: {
        fontSize: 22,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        marginTop: 2,
        color: COLORS.black,
    },
    productFooterText: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        marginTop: -3,
        color: COLORS.black,
    },
    buttonContainer: {
        marginTop: 106,
        shadowOffset: { width: 0, height: 40 },
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowRadius: 12,
        elevation: 5,
        shadowOpacity: 0.8,
    },
    main: {
        paddingTop: 15,
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    mainTitle: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        marginTop: 25,
        marginBottom: 14,
        color: COLORS.black,
    },
    mainTitleDescription: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: '#5B5B5B',
    },
    mainDescriptionTitle: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: '#5B5B5B',
    },
    mainDescription: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    footer: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    footerCard: {
        borderColor: '#D4D3D3',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingVertical: 20,
    },
    footerCardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerProductImage: {
        width: 315,
        height: 262,
    },
})

import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View, SafeAreaView, ScrollView, Image, BackHandler,
    Dimensions, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { BrandLogo, GenesisLogo, SillurLogo, VergeLogo } from '../components/Svgs'
import { COLORS } from '../utils/colors'
import GuaranteeImage from '../assets/garant.png'
import BackgroundImage from '../assets/background.png'

const dimension = Dimensions.get('window')

export default function Main() {
    const navigation = useNavigation()
    const [scrollEnabled, setScrollEnabled] = useState(true)
    const [position, setPosition] = useState(0)
    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {

    }, [position, scrollPosition])

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.image}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainContainer}>
                        <View style={{ paddingHorizontal: 20 }}>
                            <Text style={styles.title}>О БРЕНДЕ</Text>

                            <View style={{ paddingTop: 38 }}>
                                <View style={styles.imageContainer}>
                                    <BrandLogo />

                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>
                                            <Text style={{ fontWeight: '700' }}>Компания ARCHIE </Text>
                                            была основана в Испании в 1994 году путем слияния
                                            дизайн – студии ARCHIE DECORATIVE COMPANY LTD. и производственной компании
                                            JMA ALUMINIUM PROFILE FACTORY LTD
                                        </Text>

                                        <Text style={[styles.text, { marginTop: 15 }]}>
                                            На Российский рынок компания ARCHIE вышла в начале 1999 года и стала
                                            первой в России маркой дверной фурнитуры, которая предложила покупателям
                                            качественные эргономичные дверные ручки на круглых накладках.
                                        </Text>

                                        <Text style={[styles.text, { marginTop: 15 }]}>
                                            С тех пор ТМ ARCHIE стала самым узнаваемым брендом на российском рынке и
                                            эталоном качественной дверной фурнитуры. ARCHIE — это единственный
                                            производитель
                                            дверной фурнитуры, завоевавший две престижные награды: "Брэнд Года"
                                            и "Товар Года"
                                        </Text>

                                        <Text style={[styles.text, { marginTop: 15 }]}>
                                            Создавая уют и красоту вашему дому инженерами компании, были разработаны
                                            новые коллекции зонтичных брендов под любой стиль интерьера.
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.imageContainer}>
                                    <VergeLogo style={{ marginTop: 5 }} />

                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>
                                            <Text style={{ fontWeight: '700' }}>Компания VERGE </Text>
                                            включает в себя 14 вариантов исполнения дверных ручек на ультратонкой
                                            розетке, дополнительно в каждом можно найти разную цветовую гамму, а
                                            универсальный механизм ручки подходит для дверей с толщиной полотна
                                            от 38 до 55 мм.
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.imageContainer}>
                                    <GenesisLogo style={{ marginTop: 5 }} />

                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>
                                            <Text style={{ fontWeight: '700' }}>Компания GENESIS </Text>
                                            представляет собой дверные ручки в стиле барокко. Позвольте себе взглянуть
                                            по-новому на свой интерьер, превратите свой дом в пространство порождающее
                                            чувственное удовлетворение.
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.imageContainer}>
                                    <SillurLogo style={{ marginTop: 5 }} />

                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>
                                            <Text style={{ fontWeight: '700' }}>Компания SILLUR </Text>
                                            – это дверные ручки премиум-сегмента с инновационным декоративным покрытием.
                                            Поверхность изделия этой коллекции устойчива к воздействию окружающей среды,
                                            имеет уникальные потребительские свойства и защиту от механических повреждений.
                                            Гарантия на дверные ручки – 20 лет.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.line} />

                        <Text style={styles.subtitle}>Стиль и качество!</Text>

                        <Image source={GuaranteeImage} style={{ width: 256, height: 105 }} />

                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        height: '100%',
    },
    mainContainer: {
        // position: 'absolute',
        paddingTop: 50,
    },
    title: {
        fontSize: 22,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    imageContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    textContainer: {
        marginLeft: 10,
        width: '83%',
    },
    text: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    line: {
        width: dimension.width,
        borderWidth: 0.36,
        borderColor: COLORS.main,
        marginTop: 30,
    },
    subtitle: {
        fontSize: 19,
        lineHeight: 21,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        paddingVertical: 22,
        paddingLeft: 20,
        color: COLORS.black,
    },
    image: {
        width: '100%',
        height: '100%',
    },
})

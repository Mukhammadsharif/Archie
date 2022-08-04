import React from 'react'
import { ScrollView, SafeAreaView, View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import { BoxShadow } from 'react-native-shadow'
import { COLORS } from '../utils/colors'
import { AboutCircleIcon,
    AboutProductCardIcon,
    AboutProductHeaderIcon,
    AboutStarIcon,
    SplashBackground } from '../components/Svgs'
import BackgroundImage from '../assets/background.png'

const dimension = Dimensions.get('window')

export default function AboutProduct() {
    const shadowOpt = {
        width: dimension.width,
        height: 87,
        color: '#000',
        border: 1,
        radius: 3,
        opacity: 0.001,
        x: 0,
        y: 3,
        style: { marginVertical: 5 },
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.headerText}>
                        <Text style={styles.headerTitle}>Качество, которому доверяешь.</Text>
                        <Text style={styles.headerDescription}>Гарантия 10 лет</Text>
                    </View>

                    <AboutProductHeaderIcon />
                </View>

                <View style={styles.descriptionContainer}>
                    <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.image}>
                        <View style={styles.descriptionTextContainer}>
                            <Text style={styles.descriptionText}>
                                Вся выпускаемая продукция
                                <Text style={{ color: COLORS.main, fontWeight: '700' }}> ARCHIE </Text>
                                тщательно проверяется и тестируется на самом
                                современном оборудовании. Изделия проверяются на каждом этапе технологического процесса.
                                Выпускаемая партия товара проходит обязательную проверку, делается химический анализ на
                                стойкость покрытия в соляной ванне, проводятся механические испытания.
                            </Text>

                            <Text style={styles.descriptionText}>
                                Обязательным испытанием, которое проходят образцы из каждой партии, является тест
                                покрытия на воздействие соляным туманом (метод тестирования, используемый для
                                определения коррозионной стойкости защитных покрытий). Один час в соляном тумане
                                по интенсивности воздействия на покрытие соответствует 8 дням в обычных условиях.
                            </Text>

                            <Text style={styles.descriptionText}>
                                По ГОСТу для дверных ручек достаточно 48 часов нахождения в соляном тумане без
                                появления признаков коррозии. Покрытие дверной фурнитуры ARCHIE выдерживает в
                                данном тесте более 500 часов, что соответствует 10,9 годам интенсивной эксплуатации.
                            </Text>

                        </View>
                    </ImageBackground>
                </View>

                <View style={styles.cardContainer}>
                    <Text style={styles.cardText}>
                        Именно благодаря результатам данного испытания компания ARCHIE смогла предоставить
                        клиентам гарантию 10 лет на свою продукцию.
                    </Text>

                    <AboutProductCardIcon />

                    <View style={styles.shadowBox} />
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.textContainerText}>
                        По данным механических испытаний компания ARCHIE сертифицирует количество рабочих
                        циклов для каждого из механизмов изделий.
                        <Text style={{ fontWeight: '700' }}> Так, например, механизм ручек серии S010
                            сертифицирован на более чем 350 тысяч рабочих циклов, механизм замков - на более
                            чем 500 тысяч.
                        </Text>
                    </Text>

                    <Text style={styles.textContainerText}>
                        Применительно к жизни 350 тысяч рабочих циклов означают, что ручка, установленная
                        на межкомнатной двери, используемая по 30 раз в день, прослужит более
                        30 лет: 350 000:365:30*=32 года.
                        <Text style={{ fontWeight: '700' }}>
                            Каждая отгружаемая партия товара проходит контроль
                            качества по международной системе AQL
                        </Text> (ACCEPTABLE QUALITY LEVEL)
                    </Text>

                    <Text style={styles.textContainerText}>
                        При производстве своей продукции компания
                        <Text style={{ fontWeight: '700', color: COLORS.main }}> ARCHIE </Text>
                        использует свою запатентованную марку
                        сплава, который является одной из модификаций сплава ZAM. Это сплав ЦИНК – АЛЮМИНИЙ -
                        МЕДЬ с добавлением МАГНИЯ. На молекулярном уровне он имеет очень схожую структуру с
                        латунью, но обладает существенными преимуществами: сплав ZAM не окисляется на воздухе,
                        имеет высокую коррозийную стойкость, легче подвергается литьевой обработке и последующей
                        гальванизации.
                    </Text>

                    <View style={styles.textContainerCard}>
                        <Text style={styles.textContainerCardText}>
                            Компания ARCHIE – единственная, кто делает добровольную сертификацию своих изделий
                            у независимых европейских экспертов, тем самым дополнительно демонстрируя качество
                            выпускаемой продукции.
                        </Text>
                    </View>
                </View>
                <BoxShadow setting={shadowOpt}>
                    <View style={styles.iconContainer}>
                        <AboutCircleIcon style={{ marginTop: -90 }} />
                        <AboutStarIcon style={{ marginTop: -110 }} />
                    </View>
                </BoxShadow>

                <View style={styles.footer}>
                    <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.image}>
                        <Text style={styles.footerText}>
                            В качестве экспертов выступают известные швейцарские и немецкие лаборатории, опыт и
                            компетенция которых в вопросах экспертной оценки востребованы множеством компаний и
                            организаций во всем мире.
                        </Text>
                    </ImageBackground>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: COLORS.white,
    },
    header: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    headerDescription: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        marginTop: 15,
        color: COLORS.black,
    },
    headerText: {
        width: '50%',
    },
    descriptionContainer: {
        position: 'relative',
        paddingBottom: 10,
    },
    descriptionTextContainer: {
        paddingVertical: 24,
        paddingHorizontal: 20,
    },
    descriptionText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        marginBottom: 15,
        color: COLORS.black,
    },
    cardContainer: {
        paddingTop: 29,
        paddingHorizontal: 21,
        paddingBottom: 37,
        backgroundColor: COLORS.main,
        alignItems: 'center',
        borderTopRightRadius: 14,
        borderTopLeftRadius: 14,
    },
    cardText: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
        paddingBottom: 30,
    },
    shadowBox: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 15,
        width: '100%',
        height: 5,
    },
    textContainer: {
        paddingTop: 37,
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    textContainerText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        marginBottom: 15,
        color: COLORS.black,
    },
    textContainerCard: {
        paddingTop: 20,
        paddingBottom: 70,
        paddingLeft: 21,
        paddingRight: 24,
        backgroundColor: COLORS.main,
        borderRadius: 14,
    },
    textContainerCardText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
    },
    iconContainer: {
        flexDirection: 'row',
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    footerText: {
        position: 'absolute',
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        paddingTop: 27,
        paddingBottom: 12,
        paddingHorizontal: 20,
        color: COLORS.black,
    },
    footer: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: COLORS.white,
        marginBottom: 5,
        minHeight: 150,
    },
    image: {
        width: '100%',
        minHeight: 150,
    },
})

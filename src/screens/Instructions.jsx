import React from 'react'
import { View,
    StyleSheet,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    BackHandler } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { openComposer } from 'react-native-email-link'
import { COLORS } from '../utils/colors'

export default function Instructions() {
    const navigation = useNavigation()
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.navigate('Main')
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

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.main}>
                    <Text style={styles.text}>
                        Приложение разработано компанией
                        <Text style={{ fontWeight: '700' }}> ARCHIE </Text>
                        — самым узнаваемым брендом дверной фурнитуры и эталоном качества на
                        российском рынке с 20-тилетней историей.
                    </Text>

                    <Text style={[styles.text, { marginTop: 10 }]}>
                        Приложение
                        <Text style={{ fontWeight: '700' }}> ARCHIE </Text>
                        позволит принять решение, какая из дверных ручек подойдет вам.
                        Для этого необходимо выбрать понравившуюся ручку в Каталоге и примерить ее на дверь
                        в салоне или у вас дома. При нажатии на сердечко внутри карточки, ручка попадет в
                        раздел Избранное. В описании товара в каталоге вы найдете артикулы комплектующих:
                        фиксатор, сантехнический замок и другое.
                    </Text>

                    <Text style={[styles.text, { marginTop: 10 }]}>
                        Если вам понравилась дверная ручка на стенде нашей продукции, используйте камеру
                        внутри приложения для быстрого доступа к ней в каталоге.
                    </Text>

                    <Text style={[styles.text, { marginTop: 10 }]}>
                        Вы всегда можете найти ближайший к вам магазин в разделе Где купить.
                        Наши сотрудники с радостью помогут вам сделать выбор.
                    </Text>

                    <Text style={[styles.text, { marginTop: 10 }]}>
                        Стиль и качество! 10 лет гарантии!
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => openComposer(
                        {
                            to: 'support@example.com',
                            subject: 'I have a question',
                            body: 'Hi, can you help me with...',
                        },
                    )}
                    style={styles.link}>
                    <Text style={styles.linkText}>Сообщить о проблеме</Text>
                </TouchableOpacity>
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
        paddingTop: 44,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
        textAlign: 'justify',
    },
    link: {
        width: '100%',
        marginTop: 28,
        marginBottom: 30,
    },
    linkText: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.main,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
})

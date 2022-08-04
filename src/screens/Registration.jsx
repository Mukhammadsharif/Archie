import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableOpacity, BackHandler } from 'react-native'
import { Formik } from 'formik'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { COLORS } from '../utils/colors'
import InputLight from '../components/InputLight'
import { CheckBox,
    InputCalendarIcon, InputExploreIcon,
    InputHomeIcon, InputLocationIcon,
    InputPersonIcon,
    IphoneIcon,
    RadioIcon,
    RadioSelectedIcon, SelectedCheckBox } from '../components/Svgs'
import Button from '../components/Button'
import MaskedInputLight from '../components/MaskedInputLight'
import { SIGNUP } from '../utils/urls'
import CodeSentModal from '../components/CodeSentModal'

export default function Registration() {
    const [gender, setGender] = useState(true)
    const [rules, setRules] = useState(false)
    const [sale, setSale] = useState(false)
    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState('')
    const navigation = useNavigation()

    const onSubmit = async (data) => {
        const info = new FormData()
        info.append('fam', data.surname)
        info.append('im', data.name)
        info.append('ot', data.fatherName)
        info.append('phone', `${data.phone}`)
        info.append('sex', gender ? 't' : 'f')
        info.append('birthday', data.date)
        info.append('shopname', data.home)
        info.append('city', data.explore)
        info.append('shopaddr', data.location)
        info.append('confirm1', rules ? 'on' : 'off')
        info.append('confirm2', sale ? 'on' : 'off')
        info.append('country', '1')
        info.append('region', '1')
        info.append('settlement', '1')
        fetch(SIGNUP, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: info,
        })
            .then((response) => response.json())
            .then((r) => {
                console.log('Success:', r.message)
                if (r.message === 'Спасибо за регистрацию. Пароль отправлен по СМС на ваш телефон!') {
                    setMessage(r.message)
                    setModal(!modal)
                    setTimeout(() => {
                        navigation.navigate('Authorization')
                    }, 3000)
                } else {
                    setMessage('Заполните все поля')
                    setModal(!modal)
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.navigate('Authorization')
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Персональные данные</Text>

                    <Formik initialValues={{
                        phone: '',
                        surname: '',
                        name: '',
                        fatherName: '',
                        date: '',
                        home: '',
                        explore: '',
                        location: '',
                    }} onSubmit={onSubmit}>
                        {({ handleSubmit }) => (
                            <>
                                <View style={{ paddingHorizontal: 20 }}>
                                    <InputLight
                                        name="phone"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <IphoneIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Мобильный телефон*"
                                        placeholderTextColor={COLORS.placeholderTextColor} />

                                    <InputLight
                                        name="surname"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <InputPersonIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Фамилия*"
                                        placeholderTextColor={COLORS.placeholderTextColor} />

                                    <InputLight
                                        name="name"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <InputPersonIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Имя*"
                                        placeholderTextColor={COLORS.placeholderTextColor} />

                                    <InputLight
                                        name="fatherName"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <InputPersonIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Отчество"
                                        placeholderTextColor={COLORS.placeholderTextColor} />

                                    <View style={styles.genderContainer}>
                                        <Text style={styles.genderTitle}>Пол:*</Text>

                                        <TouchableOpacity
                                            onPress={() => setGender(!gender)}
                                            style={styles.genderTypeContainer}>
                                            {gender ? <RadioSelectedIcon /> : <RadioIcon />}
                                            <Text style={styles.genderTypeText}>Мужской</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => setGender(!gender)}
                                            style={styles.genderTypeContainer}>
                                            {!gender ? <RadioSelectedIcon /> : <RadioIcon />}
                                            <Text style={styles.genderTypeText}>Женский</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <InputLight
                                        name="date"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <InputCalendarIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Дата рождения*"
                                        placeholderTextColor={COLORS.placeholderTextColor} />
                                </View>

                                <View style={styles.line} />

                                <Text style={styles.headerTitle}>Данные о торговой точке</Text>

                                <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
                                    <InputLight
                                        name="home"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <InputHomeIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Наименование ТТ*"
                                        placeholderTextColor={COLORS.placeholderTextColor} />

                                    <InputLight
                                        name="explore"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <InputExploreIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Населенный пункт*"
                                        placeholderTextColor={COLORS.placeholderTextColor} />

                                    <InputLight
                                        name="location"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <InputLocationIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Адрес ТТ*"
                                        placeholderTextColor={COLORS.placeholderTextColor} />

                                    <View style={styles.ruleContainer}>
                                        <TouchableOpacity
                                            onPress={() => setRules(!rules)}>
                                            {rules ? <SelectedCheckBox /> : <CheckBox />}
                                        </TouchableOpacity>

                                        <View>
                                            <Text style={styles.ruleText}>
                                                Я ознакомлен(на) и согласен(на) с
                                            </Text>

                                            <TouchableOpacity>
                                                <Text style={styles.rulePush}>Правилами акции*</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={styles.ruleContainer}>
                                        <TouchableOpacity
                                            onPress={() => setSale(!sale)}>
                                            {sale ? <SelectedCheckBox /> : <CheckBox />}
                                        </TouchableOpacity>

                                        <View>
                                            <Text style={styles.ruleText}>
                                                Я согласен(на) на обработку моих
                                            </Text>

                                            <TouchableOpacity>
                                                <Text style={styles.rulePush}>Персональных данных</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <Text style={styles.ruleDescription}>
                                        * - данное поле обязательно для заполнения
                                    </Text>

                                    <Button
                                        text="Зарегистрироваться"
                                        backgroundColor="#FFD4AF"
                                        color={COLORS.main}
                                        margin={23}
                                        submit={handleSubmit}
                                    />
                                </View>
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>

            <CodeSentModal
                modalVisible={modal}
                setModalVisible={setModal}
                message={message}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: COLORS.main,
    },
    header: {
        paddingTop: 43,
        width: '100%',
    },
    headerTitle: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
        textAlign: 'center',
        marginBottom: 14,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#959595',
        borderRadius: 6,
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 14,
        lineHeight: 18,
        backgroundColor: COLORS.white,
        color: '#5B5B5B',
        marginTop: 10,
    },
    genderContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingBottom: 6,
        paddingTop: 16,
    },
    genderTitle: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
    },
    genderTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
    },
    genderTypeText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
        marginLeft: 10,
    },
    line: {
        height: 1,
        backgroundColor: '#FFA558',
        width: '100%',
        marginTop: 35,
        marginBottom: 25,
    },
    ruleContainer: {
        flexDirection: 'row',
        marginTop: 13,
        paddingRight: 40,
    },
    ruleText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
        marginLeft: 5,
    },
    rulePush: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
        textDecorationLine: 'underline',
        marginLeft: 5,
    },
    ruleDescription: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
        marginLeft: 35,
        marginTop: 10,
    },
})

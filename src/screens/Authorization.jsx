import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableOpacity, BackHandler, Alert } from 'react-native'
import { Formik } from 'formik'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import { COLORS } from '../utils/colors'
import { IphoneIcon, InputKeyIcon, AuthIcon } from '../components/Svgs'
import InputLight from '../components/InputLight'
import Button from '../components/Button'
import ResetPasswordModal from '../components/ResetPasswordModal'
import MaskedInputLight from '../components/MaskedInputLight'
import { SIGNIN } from '../utils/urls'
import { GlobalContext } from '../contexts/GlobalContext'

export default function Authorization() {
    const [resetPasswordModal, setResetPasswordModal] = useState(false)
    const { load, setLoad } = useContext(GlobalContext)
    const navigation = useNavigation()

    const onSubmit = async (data) => {
        const info = new FormData()
        info.append('login', data.phone)
        info.append('passwd', data.password)
        fetch(SIGNIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: info,
        })
            .then((response) => response.json())
            .then((r) => {
                console.log('Success:', r)
                AsyncStorage.setItem('token', r.data.token)
                setLoad(!load)
                if (r.data.token) {
                    navigation.navigate('PersonalInformation')
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.main}>
                    <Formik initialValues={{ phone: '', password: '' }}
                        onSubmit={onSubmit}>
                        {({ handleSubmit }) => (
                            <View>
                                <InputLight
                                    name="phone"
                                    type="text"
                                    keyboard="default"
                                    input={styles.input}
                                    button={() => <IphoneIcon />}
                                    placeholder="Мобильный телефон"
                                    placeholderTextColor={COLORS.placeholderTextColor} />

                                <InputLight
                                    name="password"
                                    type="text"
                                    keyboard="default"
                                    input={styles.input}
                                    button={() => <InputKeyIcon />}
                                    placeholder="Пароль"
                                    placeholderTextColor={COLORS.placeholderTextColor} />

                                <TouchableOpacity
                                    onPress={() => setResetPasswordModal(!resetPasswordModal)}
                                    style={styles.recoverPasswordContainer}>
                                    <Text style={styles.recoverPasswordText}>Восстановить пароль</Text>
                                </TouchableOpacity>

                                <Button
                                    text={'авторизироваться'.toUpperCase()}
                                    backgroundColor={COLORS.white}
                                    color={COLORS.main}
                                    margin={23}
                                    submit={handleSubmit}
                                />

                                <Button
                                    text="Зарегистрироваться"
                                    backgroundColor="#FFD4AF"
                                    color={COLORS.main}
                                    margin={23}
                                    submit={() => navigation.navigate('Registration')}
                                />
                            </View>
                        )}
                    </Formik>

                    <View style={{ alignItems: 'center', marginTop: 133 }}>
                        <AuthIcon />
                    </View>

                    <ResetPasswordModal
                        modalVisible={resetPasswordModal}
                        setModalVisible={setResetPasswordModal} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: COLORS.main,
    },
    main: {
        paddingTop: 37,
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#959595',
        borderRadius: 6,
        marginTop: 20,
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 14,
        lineHeight: 18,
        backgroundColor: COLORS.white,
        color: '#5B5B5B',
    },
    recoverPasswordContainer: {
        marginTop: 13,
    },
    recoverPasswordText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
        textDecorationLine: 'underline',
    },
})

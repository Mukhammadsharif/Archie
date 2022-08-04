import React, { useContext, useState } from 'react'
import { Modal, TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { Card } from 'react-native-paper'
import { Formik } from 'formik'
import { COLORS } from '../utils/colors'
import { CloseModalIcon, InputPhoneIcon } from './Svgs'
import Button from './Button'
import SuccessPasswordSentModal from './SuccessPasswordSentModal'
import MaskedInputLight from './MaskedInputLight'
import { GlobalContext } from '../contexts/GlobalContext'
import { RESET_PASSWORD } from '../utils/urls'
import InputLight from './InputLight'

export default function ResetPasswordModal({ modalVisible, setModalVisible }) {
    const [modal, setModal] = useState(false)
    const { token } = useContext(GlobalContext)

    const onSubmit = (data) => {
        const info = new FormData()
        info.append('login', data.phone)
        fetch(RESET_PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: info,
        })
            .then((response) => response.json())
            .then((r) => {
                console.log('Success::', r)
                setModal(!modal)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    return (
        <Modal
            onShow={() => setModalVisible(true)}
            onRequestClose={() => setModalVisible(false)}
            visible={modalVisible}
            animationType="fade"
            hardwareAccelerated
            transparent
            statusBarTranslucent>

            <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.modalContainer}
            >
                <Card style={{ borderRadius: 10 }}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.icon}>
                            <CloseModalIcon />
                        </TouchableOpacity>

                        <Text style={styles.title}>Восстановление пароля</Text>
                        <Formik initialValues={{ phone: '' }}
                            onSubmit={onSubmit}>
                            {({ handleSubmit }) => (
                                <View>
                                    <InputLight
                                        name="phone"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <InputPhoneIcon />}
                                        placeholder="Мобильный телефон"
                                        placeholderTextColor={COLORS.placeholderTextColor} />

                                    <Button
                                        text={'Получить новый пароль'.toUpperCase()}
                                        backgroundColor={COLORS.main}
                                        color={COLORS.white}
                                        fontSize={14}
                                        margin={23}
                                        height={47}
                                        submit={handleSubmit}
                                    />
                                </View>
                            )}
                        </Formik>
                    </View>
                </Card>
            </TouchableOpacity>

            <SuccessPasswordSentModal
                modalVisible={modal}
                setModalVisible={setModal} />
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: '50%',
        backgroundColor: 'rgba(237, 108, 0, 0.8)',
        paddingHorizontal: 20,
        marginTop: 90,
        paddingTop: 50,
    },
    modalContent: {
        height: 230,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 32,
        paddingTop: 25,
        paddingBottom: 32,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.main,
        borderRadius: 6,
        marginTop: 20,
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 14,
        lineHeight: 18,
        backgroundColor: COLORS.white,
        color: '#5B5B5B',
    },
    icon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    title: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        textAlign: 'center',
        marginTop: 10,
    },
})

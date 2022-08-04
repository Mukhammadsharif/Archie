import * as React from 'react'
import { Modal, TouchableOpacity, StyleSheet, View, Text } from 'react-native'
import { Card } from 'react-native-paper'
import { COLORS } from '../utils/colors'
import { CircleSuccessIcon, CloseModalIcon } from './Svgs'

export default function SuccessPasswordSentModal({ modalVisible, setModalVisible }) {
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

                        <CircleSuccessIcon />

                        <Text style={styles.title}>Ваш пароль успешно отправлен</Text>
                    </View>
                </Card>
            </TouchableOpacity>
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
        paddingTop: 150,
        borderRadius: 10,
    },
    modalContent: {
        height: 115,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
})

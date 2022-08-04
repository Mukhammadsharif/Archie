import * as React from 'react'
import { Modal, TouchableOpacity, StyleSheet, View, Text, Linking } from 'react-native'
import { Card } from 'react-native-paper'
import { COLORS } from '../utils/colors'
import { CircleSuccessIcon, CloseModalIcon, ErrorModalIcon } from './Svgs'

export default function GiftErrorModal({ modalVisible, setModalVisible, message }) {
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

                        <ErrorModalIcon />

                        <Text style={styles.title}>{message}</Text>

                        {/* <Text style={styles.subtitle}>необходимо предоставить</Text> */}

                        {/* <Text style={styles.subtitle}>персональные данные на сайте</Text> */}

                        {/* <View style={{ flexDirection: 'row' }}> */}
                        {/*    <TouchableOpacity onPress={() => Linking.openURL('https://archie-club.ru/')}> */}
                        {/*        <Text style={styles.link}>https://archie-club.ru/</Text> */}
                        {/*    </TouchableOpacity> */}

                        {/*    <Text style={styles.subtitle}> на экране</Text> */}
                        {/* </View> */}

                        {/* <Text style={styles.subtitle}> */}
                        {/*    «Каталог призов» */}
                        {/* </Text> */}
                    </View>
                </Card>
            </TouchableOpacity>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(237, 108, 0, 0.8)',
        paddingHorizontal: 20,
        marginTop: 90,
        paddingTop: 150,
        borderRadius: 10,
    },
    modalContent: {
        height: 230,
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
        color: COLORS.black,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        textAlign: 'center',
        color: COLORS.black,
    },
    link: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        textAlign: 'center',
        color: COLORS.main,
        textDecorationLine: 'underline',
    },
})

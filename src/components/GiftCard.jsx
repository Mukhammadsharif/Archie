import React, { useContext, useState } from 'react'
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native'
import { Card } from 'react-native-paper'
import { COLORS } from '../utils/colors'
import GiftOrderedModal from './GiftOrderedModal'
import GiftErrorModal from './GiftErrorModal'
import { ORDER, PRIZE_LIST } from '../utils/urls'
import { GlobalContext } from '../contexts/GlobalContext'

export default function GiftCard({ image, title, number, backgroundColor, score }) {
    const [modal, setModal] = useState(false)
    const [errorModal, setErrorModal] = useState(false)
    const [message, setMessage] = useState('')
    const { token } = useContext(GlobalContext)

    const order = () => {
        fetch(ORDER.replace('{{access_token}}', token).replace('239', score), {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => response.json())
            .then((r) => {
                console.log('Success::', r)
                if (r.message === 'Приз недоступен!') {
                    setMessage(r.message)
                    setErrorModal(!errorModal)
                } else {
                    setModal(!modal)
                }
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }
    return (
        <>
            <Card style={styles.card}>
                <Card.Content style={styles.container}>
                    <Image source={{ uri: image }} style={styles.image} />
                </Card.Content>

                <Card.Content style={[styles.secondCard, { backgroundColor }]}>
                    <Text style={styles.title}>{title}</Text>

                    <View style={styles.secondContainer}>
                        <View style={styles.scoresContainer}>
                            <View style={styles.numberEllipse}>
                                <Text style={styles.number}>{score}</Text>
                            </View>

                            <Text style={styles.ball}>баллов</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                order()
                                // setErrorModal(!errorModal)
                            }}
                        >
                            <Text style={styles.orderText}>ЗАКАЗАТЬ</Text>
                        </TouchableOpacity>
                    </View>
                </Card.Content>
            </Card>

            <GiftOrderedModal
                modalVisible={modal}
                setModalVisible={setModal} />

            <GiftErrorModal
                message={message}
                modalVisible={errorModal}
                setModalVisible={setErrorModal} />
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
        height: 198,
        borderColor: '#D4D3D3',
        borderWidth: 0.5,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginTop: 20,
        position: 'relative',
    },
    container: {
        height: 111,
        borderBottomWidth: 0.5,
        borderColor: '#CACACA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5,
        alignItems: 'center',
    },
    image: {
        marginTop: -10,
        width: 89,
        height: 90,
    },
    title: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        marginTop: 5,
        color: COLORS.black,
        textAlign: 'center',
    },
    numberEllipse: {
        backgroundColor: '#FF9C49',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        paddingHorizontal: 3,
        paddingVertical: 1.1,
    },
    number: {
        fontSize: 11,
        lineHeight: 18,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
    },
    scoresContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ball: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: '#5B5B5B',
        marginLeft: 1,
    },
    orderText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.main,
        marginLeft: 2,
    },
    secondCard: {
        height: 90,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 2,
        alignItems: 'center',
    },
})

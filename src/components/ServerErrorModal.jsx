import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { COLORS } from '../utils/colors'
// import ModalWrapper from './common/ModalWrapper'
// import { Error } from './common/Svgs'
// import Button from './common/Button'
// import { COLORS } from '../colors'

export default function ServerErrorModal({ text, onPress }) {
    const errorMessage = {
        400: 'Не удалось найти!',
        500: 'Сервер временно отключен, мы работаем над этим!',
    }

    return (
        <View>
            <View style={styles.errorIcon}>
                {/* <Error width={50} height={50} /> */}
            </View>

            <Text style={styles.center}>
                {errorMessage[text]}
            </Text>

            <View style={styles.row}>
                {/* <Button */}
                {/*    title="Возобновить" */}
                {/*    textStyle={{ marginLeft: 0 }} */}
                {/*    color={COLORS.MAIN} */}
                {/*    style={styles.button} */}
                {/*    onPress={onPress} /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        textAlign: 'center',
        color: COLORS.main,
        fontSize: 18,
    },
    row: {
        alignItems: 'center',
    },
    button: {
        margin: 10,
        width: 120,
        height: 55,
    },
    errorIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
})

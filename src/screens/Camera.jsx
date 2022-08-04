import React, { useEffect } from 'react'
import { Text, StyleSheet, SafeAreaView, ScrollView,
    Dimensions, View, TouchableOpacity, Linking, ImageBackground, BackHandler } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { RNCamera } from 'react-native-camera'
import { useNavigation } from '@react-navigation/native'
import { QRScanerIcon } from '../components/Svgs'
import { COLORS } from '../utils/colors'
import BackgroundImage from '../assets/background.png'

const screen = Dimensions.get('window')

export default function Camera() {
    const navigation = useNavigation()

    const onSuccess = (e) => {
        Linking.openURL(e.data).catch((err) => console.error('An error occured', err))
    }
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={BackgroundImage} resizeMode="cover" style={styles.image}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.main}>
                        <Text style={styles.text}>Поместите QR-код или</Text>
                        <Text style={styles.text}>интересующую вас дверную ручку</Text>
                        <Text style={styles.text}>внутрь рамок</Text>

                        <TouchableOpacity style={styles.qrContainer}>
                            <QRScanerIcon />
                            <QRCodeScanner
                                onRead={onSuccess}
                                flashMode={RNCamera.Constants.FlashMode.off}
                                cameraStyle={{
                                    width: '100%',
                                    height: 85,
                                    position: 'absolute',
                                    borderRadius: 50,
                                }}
                                containerStyle={{ width: 235,
                                    height: 20,
                                    position: 'absolute',
                                    borderRadius: 50 }}
                                cameraContainerStyle={{ }}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: COLORS.white,
        position: 'relative',
    },
    main: {
        // position: 'absolute',
        paddingTop: 44,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    qrContainer: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
    image: {
        width: '100%',
        height: '100%',
    },
})

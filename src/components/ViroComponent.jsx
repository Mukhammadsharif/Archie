import React, { useContext, useState, useEffect, useRef } from 'react'
import { StyleSheet, View, TouchableOpacity, Share, PermissionsAndroid, ScrollView } from 'react-native'
import { ViroARScene,
    ViroARSceneNavigator,
    ViroAmbientLight,
    Viro3DObject,
    ViroMaterials, ViroNode, ViroImage, ViroARTrackingTargets,
    ViroARImageMarker, ViroCamera } from '@viro-community/react-viro'
import Slider from '@react-native-community/slider'
import { useNavigation } from '@react-navigation/native'
import ViewShot, { captureScreen, captureRef } from 'react-native-view-shot'
import CameraRoll from '@react-native-community/cameraroll'
import { RNCamera } from 'react-native-camera'
import Button from './Button'
import { CameraCloseIcon } from './Svgs'
import { COLORS } from '../utils/colors'
import SliderImage from '../assets/sliderEllipse.png'
import { GlobalContext } from '../contexts/GlobalContext'

const HelloWorldSceneAR = () => {
    const { scaleSize, rotateSize } = useContext(GlobalContext)

    ViroMaterials.createMaterials({
        wood: {
            // eslint-disable-next-line global-require
            diffuseTexture: require('../assets/Skull.jpg'),
        },
    })

    return (
    /* eslint-disable global-require */

        <ViroARScene displayPointCloud>
            <ViroAmbientLight color="#ffffff" />
            <ViroCamera position={[0, 0, 0]} active>
                <ViroNode
                    position={[0, 0, -10]}
                    dragType="FixedDistance"
                    onDrag={() => {}}
                    onClick={(position, source) => console.log('Click', position, source)}
                >

                    <Viro3DObject
                        source={{ uri: 'https://soccerobj.herokuapp.com/media/prismLine.obj' }}
                        highAccuracyEvents
                        position={[0, 0, -50]}
                        scale={[scaleSize, scaleSize, scaleSize]}
                        rotation={[rotateSize, rotateSize, rotateSize]}
                        type="OBJ"
                        materials={['wood']}
                    // transformBehaviors={['billboard']}
                    />
                </ViroNode>
            </ViroCamera>
        </ViroARScene>
    )
}

export default function ViroComponent({ active, setActive }) {
    const { scaleSize, setScaleSize, rotateSize, setRotateSize } = useContext(GlobalContext)
    const navigation = useNavigation()
    const [flash, setFlash] = useState('off')
    const [zoom, setZoom] = useState(0)
    const cameraRef = useRef(null)

    async function hasAndroidPermission() {
        const perm = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE

        const hasPermission = await PermissionsAndroid.check(perm)
        if (hasPermission) {
            return true
        }

        const status = await PermissionsAndroid.request(perm)
        return status === 'granted'
    }

    useEffect(() => {
        hasAndroidPermission()

        return () => setActive(false)
    }, [])

    const takePhoto = () => {
        captureScreen({
            format: 'jpg',
            quality: 0.8,
        }).then(
            (uri) => {
                console.log('Image saved to', uri)
                CameraRoll.save(uri).then((r) => console.log(r))
            },
            (error) => console.error('Oops, snapshot failed', error),
        )
    }
    return (
        <View ref={cameraRef} style={{ flex: 1 }}>
            <RNCamera
                style={{ flex: 1, justifyContent: 'flex-end' }}
                type={RNCamera.Constants.Type.back}
                flashMode={flash}
                cameraId="0"
            >
                <ViroARSceneNavigator
                    initialScene={{
                        scene: HelloWorldSceneAR,
                    }}
                    style={styles.f1}
                    // viroAppProps={{ object }}
                />

                <TouchableOpacity
                    onPress={() => {
                        setActive(false)
                    }}
                    style={{
                        position: 'absolute',
                        top: 20,
                        left: 20,
                    }}>
                    <CameraCloseIcon />
                </TouchableOpacity>

                <View
                    style={{
                        paddingHorizontal: '5%',
                        position: 'absolute',
                        width: '100%',
                        bottom: 100,
                    }}>
                    <Slider
                        style={{ width: '100%', height: 60, borderWidth: 10 }}
                        minimumValue={0.05}
                        maximumValue={0.3}
                        minimumTrackTintColor={COLORS.main}
                        maximumTrackTintColor={COLORS.white}
                        thumbImage={SliderImage}
                        value={scaleSize}
                        onValueChange={(e) => setScaleSize(e)}
                        onSlidingComplete={(e) => setScaleSize(e)}
                        step={0.01}
                    />
                </View>

                <View
                    style={{
                        paddingHorizontal: '5%',
                        position: 'absolute',
                        width: '100%',
                        bottom: 150,
                    }}>
                    <Slider
                        style={{ width: '100%', height: 60, borderWidth: 10 }}
                        minimumValue={0}
                        maximumValue={360}
                        minimumTrackTintColor={COLORS.main}
                        maximumTrackTintColor={COLORS.white}
                        thumbImage={SliderImage}
                        value={rotateSize}
                        onValueChange={(e) => setRotateSize(e)}
                        onSlidingComplete={(e) => setRotateSize(e)}
                        step={10}
                    />
                </View>

                <View style={{
                    paddingHorizontal: '25%',
                    position: 'absolute',
                    width: '100%',
                    bottom: 20,
                }}>
                    <Button
                        text={'Сделать фото'.toUpperCase()}
                        submit={takePhoto}
                    />
                </View>
            </RNCamera>
        </View>
    )
}

const styles = StyleSheet.create({
    f1: { flex: 1 },
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
})

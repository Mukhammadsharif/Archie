import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { ViroARScene,
    ViroARSceneNavigator,
    ViroAmbientLight,
    Viro3DObject,
    ViroMaterials, ViroNode, Viro360Image, ViroImage, ViroARTrackingTargets, ViroARImageMarker, ViroCamera } from '@viro-community/react-viro'
import Slider from '@react-native-community/slider'
import { useNavigation } from '@react-navigation/native'
import Button from '../components/Button'
import { CameraCloseIcon } from '../components/Svgs'
import { COLORS } from '../utils/colors'
import SliderImage from '../assets/sliderEllipse.png'
import { GlobalContext } from '../contexts/GlobalContext'

const HelloWorldSceneAR = () => {
    const [ready, setReady] = useState('Initializing AR...')
    const { scaleSize, rotateSize } = useContext(GlobalContext)
    const [found, setFound] = useState(true)

    ViroMaterials.createMaterials({
        wood: {
            // eslint-disable-next-line global-require
            diffuseTexture: require('../assets/prismLine/prismLine.png'),
        },
    })

    return (
    /* eslint-disable global-require */

        <ViroARScene displayPointCloud>
            {/* <ViroAmbientLight color="#ffffff" /> */}
            <ViroCamera position={[0, 0, 0]} active>
                <ViroNode
                    position={[0, 0, -1]}
                    dragType="FixedDistance" onDrag={() => {}}
                    onClick={(position, source) => console.log('Click', position, source)}
                >
                    <ViroImage
                        height={2}
                        width={2}
                        placeholderSource={require('../assets/prismLine/prismLine.png')}
                        source={require('../assets/prismLine/prismLine.png')}
                        // position={[0, 0, -5]}
                        scale={[scaleSize, scaleSize, scaleSize]}
                        rotation={[0, 0, 0]}
                    />
                </ViroNode>
            </ViroCamera>
        </ViroARScene>
    )
}

export default function ViroScreen() {
    const { scaleSize, setScaleSize, rotateSize, setRotateSize } = useContext(GlobalContext)
    const navigation = useNavigation()
    return (
        <>
            <ViroARSceneNavigator
                initialScene={{
                    scene: HelloWorldSceneAR,
                }}
                style={styles.f1}
            />

            <TouchableOpacity
                onPress={() => {
                    // navigation.goBack()
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
                    minimumValue={0.1}
                    maximumValue={0.5}
                    minimumTrackTintColor={COLORS.main}
                    maximumTrackTintColor={COLORS.white}
                    thumbImage={SliderImage}
                    value={scaleSize}
                    onValueChange={(e) => setScaleSize(e)}
                    step={0.1}
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
                />
            </View>
        </>
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

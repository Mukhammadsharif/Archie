import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../utils/colors'
import Button from './Button'
import { GenderIcon,
    InputCalendarIcon,
    InputExploreIcon,
    InputHomeIcon,
    InputLocationIcon,
    InputPersonIcon,
    IphoneIcon } from './Svgs'
import { GlobalContext } from '../contexts/GlobalContext'

export default function PersonEdit({ setInformationToggle, data }) {
    const [address, setAddress] = useState(null)
    const navigation = useNavigation()
    const { setToken } = useContext(GlobalContext)
    useEffect(() => {
        if (data) {
            if (data.personal && data.personal.shop && data.personal.shop.address) {
                const townNameArray = data.personal.shop.address.split(',')
                setAddress(townNameArray)
            }
        }
    }, [data])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Персональные данные</Text>

                        <View style={styles.infoContainer}>
                            <IphoneIcon style={{ marginRight: -2 }} />

                            <Text style={styles.infoText}>
                                Мобильный телефон:
                                <Text style={{ fontWeight: '400' }}> {
                                    data && data.personal && data.personal.phone ? `+${data.personal.phone}` : ''
                                }
                                </Text>
                            </Text>
                        </View>

                        <View style={styles.infoContainer}>
                            <InputPersonIcon style={{ marginRight: -2 }} />

                            <Text style={styles.infoText}>
                                ФИО:
                                <Text style={{ fontWeight: '400' }}> {
                                    data && data.personal && data.personal.fio ? data.personal.fio : ''
                                }
                                </Text>
                            </Text>
                        </View>

                        <View style={styles.infoContainer}>
                            <GenderIcon />

                            <Text style={styles.infoText}>
                                Пол:
                                <Text style={{ fontWeight: '400' }}> {
                                    data && data.personal && data.personal.sex === 't' ? 'Мужской' : 'Женский'
                                }
                                </Text>
                            </Text>
                        </View>

                        <View style={styles.infoContainer}>
                            <InputCalendarIcon style={{ marginRight: -1 }} />

                            <Text style={styles.infoText}>
                                Дата рождения:
                                <Text style={{ fontWeight: '400' }}> {
                                    data && data.personal && data.personal.birthday ? data.personal.birthday : ''
                                }
                                </Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.line} />

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Данные о торговой точке</Text>

                        <View style={styles.infoContainer}>
                            <InputHomeIcon />

                            <Text style={styles.infoText}>
                                Наименование ТТ:
                                <Text style={{ fontWeight: '400' }}> {
                                    data && data.personal && data.personal.shop && data.personal.shop.name ? data.personal.shop.name : ''
                                }
                                </Text>
                            </Text>
                        </View>

                        <View style={styles.infoContainer}>
                            <InputExploreIcon />

                            <Text style={styles.infoText}>
                                Город:
                                <Text style={{ fontWeight: '400' }}> {
                                    address && address.length > 3 ? `${address[0]},${address[1]},${address[2]}` : ''
                                }
                                </Text>
                            </Text>
                        </View>

                        <View style={styles.infoContainer}>
                            <InputLocationIcon />

                            <Text style={styles.infoText}>
                                Адрес:
                                <Text style={{ fontWeight: '400' }}> {
                                    address && address.length > 3 ? `ул. ${address[3]}` : ''
                                }
                                </Text>
                            </Text>
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 73, marginTop: 70, marginBottom: 100 }}>
                        <Button
                            text={'Изменить'.toUpperCase()}
                            backgroundColor="#FFD4AF"
                            color={COLORS.main}
                            margin={23}
                            submit={() => setInformationToggle(false)}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 73 }}>
                        <Button
                            text={'выход'.toUpperCase()}
                            backgroundColor={COLORS.main}
                            color={COLORS.white}
                            margin={-30}
                            submit={async () => {
                                await setToken(null)
                                await AsyncStorage.removeItem('token')
                                await navigation.navigate('Authorization')
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.white,
    },
    header: {
        paddingTop: 43,
    },
    headerTitle: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: 26,
    },
    headerContainer: {
        paddingHorizontal: 36,
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    infoText: {
        marginLeft: 15,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    line: {
        height: 1,
        backgroundColor: '#CACACA',
        width: '100%',
        marginTop: 35,
        marginBottom: 25,
    },
})

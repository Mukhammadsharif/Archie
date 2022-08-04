import React, { useContext, useEffect, useState } from 'react'
import { Text, StyleSheet, ScrollView, SafeAreaView, View, TouchableOpacity, Image } from 'react-native'
import { Formik } from 'formik'
import { COLORS } from '../utils/colors'
import InputLight from '../components/InputLight'
import { ChooseChevronDown, ChooseChevronUp, InputSearchIcon } from '../components/Svgs'
import Guarantee from '../assets/garant-white.png'
import TownDropDown from '../components/TownDropDown'
import PointsContainer from '../components/PointsContainer'
import { GlobalContext } from '../contexts/GlobalContext'
import { SHOP_LIST } from '../utils/urls'

export default function Map() {
    const [open, setOpen] = useState(false)
    const [cities, setCities] = useState([])
    const [city, setCity] = useState('')

    const { token } = useContext(GlobalContext)
    const [data, setData] = useState(null)
    const [list, setList] = useState(null)
    const [search, setSearch] = useState('')

    const getShopList = () => {
        const info = new FormData()
        info.append('token', token)
        fetch(SHOP_LIST, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: info,
        })
            .then((response) => response.json())
            .then((r) => {
                console.log('Success::', r)
                setData(r)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    useEffect(() => {
        getShopList()
    }, [token])

    const setCitiesName = () => {
        const cityList = []
        data.forEach((item) => {
            if (cityList.includes(item.city) === false) {
                if (item.city !== '') {
                    cityList.push(item.city)
                }
            }
        })
        setCities(cityList)
    }
    useEffect(() => {
        if (data) {
            setCitiesName()
        }
    }, [data])

    useEffect(() => {
        if (city) {
            const selectedList = data.filter((item) => item.city === city)
            setList(selectedList)
        }
    }, [city])

    const setSearchCity = () => {
        const cityList = []
        data.forEach((item) => {
            if (cityList.includes(item) === false) {
                if (item.name.includes(search)) {
                    cityList.push(item)
                }
            }
        })
        setList(cityList)
    }

    useEffect(() => {
        if (data) {
            setSearchCity()
        }
    }, [search])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.inputsContainer}>
                    <Formik initialValues={{ name: '', town: '' }}
                        onSubmit={() => {}}>
                        {({ handleSubmit }) => (
                            <View>
                                <InputLight
                                    name="name"
                                    type="text"
                                    keyboard="default"
                                    input={styles.input}
                                    button={() => <InputSearchIcon />}
                                    placeholder="Поиск торговых точек..."
                                    placeholderTextColor={COLORS.placeholderTextColor}
                                    value={search}
                                    onChange={setSearch}
                                />

                                <View style={{ position: 'relative' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <InputLight
                                            value={city || ''}
                                            editable={false}
                                            name="town"
                                            type="text"
                                            keyboard="default"
                                            input={!city ? styles.inputSmallCity
                                                : open ? styles.inputSmallActive
                                                    : styles.inputSmall}
                                            placeholder="Выберите города из списка"
                                            placeholderTextColor={COLORS.placeholderTextColor} />

                                        <TouchableOpacity
                                            onPress={() => setOpen(!open)}
                                            style={open ? styles.chooseButtonActive : styles.chooseButton}>
                                            {open ? <ChooseChevronUp /> : <ChooseChevronDown />}
                                        </TouchableOpacity>
                                    </View>

                                    {open ? (
                                        <TownDropDown
                                            cities={cities}
                                            setCity={setCity}
                                            setOpen={setOpen} />
                                    ) : null}
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>

                {city || search && list && list.length ? (
                    <PointsContainer list={list} />
                ) : (
                    <View style={styles.promotion}>
                        <Text style={styles.title}>Стиль и качество</Text>

                        <Image source={Guarantee} style={styles.image} />
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: COLORS.main,
        flex: 1,
    },
    inputsContainer: {
        paddingVertical: 40,
        paddingHorizontal: 20,
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        backgroundColor: COLORS.white,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.main,
        borderRadius: 6,
        marginTop: 20,
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    inputSmall: {
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.main,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginTop: 20,
        width: '80%',
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    inputSmallCity: {
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.main,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginTop: 20,
        width: '80%',
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    inputSmallActive: {
        height: 40,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 0,
        borderColor: COLORS.main,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        marginTop: 20,
        width: '80%',
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    chooseButton: {
        backgroundColor: COLORS.main,
        width: '20%',
        height: 40,
        marginTop: 20,
        marginLeft: '-20%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chooseButtonActive: {
        backgroundColor: COLORS.main,
        width: '20%',
        height: 40,
        marginTop: 20,
        marginLeft: '-20%',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        paddingLeft: 20,
        paddingTop: 122,
        paddingRight: 110,
        color: COLORS.black,
    },
    image: {
        width: 256.81,
        height: 105,
        marginTop: 20,
    },
    promotion: {
        backgroundColor: COLORS.main,
        height: '100%',
    },
})

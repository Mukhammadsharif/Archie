import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import InputLight from './InputLight'
import { COLORS } from '../utils/colors'
import { ChooseChevronDown, ChooseChevronUp } from './Svgs'
import { categoriesType } from '../utils/data'
import GiftCard from './GiftCard'
import CategoryDropDown from './CategoryDropDown'

export default function CatalogDetail({ data, information }) {
    const [open, setOpen] = useState(false)
    const [categories, setCategories] = useState('')
    const [cities, setCities] = useState([])

    const setCitiesName = () => {
        const cityList = []
        data.forEach((item) => {
            if (cityList.includes(item.category) === false) {
                if (item.category !== '') {
                    cityList.push(item.category)
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

    // console.log(data, 'categories', cities)
    return (
        <View>
            <View style={{ paddingHorizontal: 20 }}>
                <Formik initialValues={{ name: '', town: '' }}
                    onSubmit={() => {}}>
                    {({ handleSubmit }) => (
                        <View style={{ position: 'relative' }}>
                            <View style={{ flexDirection: 'row', marginTop: 13 }}>
                                <InputLight
                                    value={categories || ''}
                                    editable={false}
                                    name="town"
                                    type="text"
                                    keyboard="default"
                                    input={!categories ? styles.inputSmallCity
                                        : open ? styles.inputSmallActive
                                            : styles.inputSmall}
                                    placeholder="Выберите категорию"
                                    placeholderTextColor={COLORS.placeholderTextColor} />

                                <TouchableOpacity
                                    onPress={() => setOpen(!open)}
                                    style={open ? styles.chooseButtonActive : styles.chooseButton}>
                                    {open ? <ChooseChevronUp /> : <ChooseChevronDown />}
                                </TouchableOpacity>
                            </View>

                            {open ? (
                                <CategoryDropDown
                                    cities={cities}
                                    setCity={setCategories}
                                    setOpen={setOpen} />
                            ) : null}

                        </View>
                    )}
                </Formik>
            </View>

            <View style={styles.line} />

            <View style={styles.main}>
                <View style={styles.titleContainer}>
                    <Text style={styles.scoreTitle}>БАЛАНС</Text>

                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreTitle}>У вас</Text>

                        <View style={styles.scoreBox}>
                            <Text style={styles.scoreNumber}>
                                {information && information.personal && information.personal.aballs ? information.personal.aballs : '0'} баллов
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.cardContainer}>
                    {data && data.length && categories ? data.filter((i) => i.category === categories).map((item) => (
                        <GiftCard
                            image={item.foto}
                            title={item.name}
                            number={150}
                            backgroundColor="#CACACA"
                            score={item.balls}
                        />
                    )) : data && data.length && !categories ? data.map((item) => (
                        <GiftCard
                            image={item.foto}
                            title={item.name}
                            number={150}
                            backgroundColor="#CACACA"
                            score={item.balls}
                        />
                    )) : null}
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
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
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#CACACA',
        marginVertical: 30,
    },
    main: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scoreContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scoreTitle: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    scoreNumber: {
        fontSize: 22,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.main,
    },
    scoreBox: {
        borderWidth: 1,
        borderColor: COLORS.main,
        borderRadius: 6,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginLeft: 15,
        borderStyle: 'dashed',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
})

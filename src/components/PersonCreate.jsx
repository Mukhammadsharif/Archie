import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import { COLORS } from '../utils/colors'
import InputLight from './InputLight'
import { CheckBox, CompleteIcon,
    InputCalendarIcon,
    InputExploreIcon,
    InputHomeIcon, InputLocationIcon,
    InputPersonIcon,
    IphoneIcon,
    RadioIcon,
    RadioSelectedIcon, SelectedCheckBox } from './Svgs'
import Button from './Button'

export default function PersonCreate({ setInformationToggle }) {
    const [gender, setGender] = useState(true)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Персональные данные</Text>

                    <Formik initialValues={{
                        phone: '+7 (999) 999-99-99',
                        surname: 'Иванов',
                        name: 'Иван',
                        fatherName: 'Иванович',
                        date: '10.03.1990',
                        home: 'Бауцентр',
                        explore: 'Красноярск',
                        location: 'Ул. Красная, 161',
                    }} onSubmit={() => {}}>
                        {({ handleSubmit, values }) => (
                            <>
                                <View style={{ paddingHorizontal: 20 }}>
                                    <InputLight
                                        name="phone"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <CompleteIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Мобильный телефон*"
                                        placeholderTextColor={COLORS.placeholderTextColor}
                                    />

                                    <InputLight
                                        name="surname"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <CompleteIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Фамилия*"
                                        placeholderTextColor={COLORS.placeholderTextColor} />

                                    <InputLight
                                        name="name"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <CompleteIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Имя*"
                                        placeholderTextColor={COLORS.placeholderTextColor} />

                                    <InputLight
                                        name="fatherName"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <CompleteIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Отчество"
                                        placeholderTextColor={COLORS.placeholderTextColor} />

                                    <View style={styles.genderContainer}>
                                        <Text style={styles.genderTitle}>Пол:*</Text>

                                        <TouchableOpacity
                                            onPress={() => setGender(!gender)}
                                            style={styles.genderTypeContainer}>
                                            {gender
                                                ? <RadioSelectedIcon stroke={COLORS.main} />
                                                : <RadioIcon stroke={COLORS.main} />}
                                            <Text style={styles.genderTypeText}>Мужской</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => setGender(!gender)}
                                            style={styles.genderTypeContainer}>
                                            {!gender
                                                ? <RadioSelectedIcon stroke={COLORS.main} />
                                                : <RadioIcon stroke={COLORS.main} />}
                                            <Text style={styles.genderTypeText}>Женский</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <InputLight
                                        name="date"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <CompleteIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Дата рождения*"
                                        placeholderTextColor={COLORS.placeholderTextColor} />
                                </View>

                                <View style={styles.line} />

                                <Text style={styles.headerTitle}>Данные о торговой точке</Text>

                                <View style={{ paddingHorizontal: 20 }}>
                                    <InputLight
                                        name="home"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <CompleteIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Наименование ТТ*"
                                        placeholderTextColor={COLORS.placeholderTextColor} />

                                    <InputLight
                                        name="explore"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <CompleteIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Населенный пункт*"
                                        placeholderTextColor={COLORS.placeholderTextColor} />

                                    <InputLight
                                        name="location"
                                        type="text"
                                        keyboard="default"
                                        input={styles.input}
                                        button={() => <CompleteIcon />}
                                        iconButton={{ top: 18, right: 15 }}
                                        placeholder="Адрес ТТ*"
                                        placeholderTextColor={COLORS.placeholderTextColor} />

                                    <View style={{ paddingHorizontal: 73 }}>
                                        <Button
                                            text={'сохранить'.toUpperCase()}
                                            backgroundColor={COLORS.main}
                                            color={COLORS.white}
                                            margin={20}
                                            submit={() => setInformationToggle(true)}
                                        />
                                    </View>
                                </View>
                            </>
                        )}
                    </Formik>
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
        paddingTop: 35,
        width: '100%',
    },
    headerTitle: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: 14,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.main,
        borderRadius: 6,
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 14,
        lineHeight: 18,
        backgroundColor: COLORS.white,
        color: '#5B5B5B',
        marginTop: 10,
    },
    genderContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingBottom: 6,
        paddingTop: 16,
    },
    genderTitle: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    genderTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
    },
    genderTypeText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
        marginLeft: 10,
    },
    line: {
        height: 1,
        backgroundColor: '#CACACA',
        width: '100%',
        marginTop: 35,
        marginBottom: 25,
    },
})

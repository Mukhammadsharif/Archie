import React, { useContext, useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { Formik } from 'formik'
import { COLORS } from '../utils/colors'
import InputLight from '../components/InputLight'
import { ChevronDown, ChevronUp, FilterIcon, InputBoldIcon } from '../components/Svgs'
import Button from '../components/Button'
import RegisterOrderCard from '../components/RegisterOrderCard'
import CodeSentModal from '../components/CodeSentModal'
import { GET_CODE_LIST, REGISTER_SALE } from '../utils/urls'
import { GlobalContext } from '../contexts/GlobalContext'

export default function RegisterOrder() {
    const { token } = useContext(GlobalContext)
    const [filter, setFilter] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)
    const [modal, setModal] = useState(false)
    const [code, setCode] = useState('')
    const [message, setMessage] = useState('')
    const [codeList, setCodeList] = useState(null)

    const sendCode = () => {
        const info = new FormData()
        info.append('token', token)
        info.append('code', code)
        fetch(REGISTER_SALE, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: info,
        })
            .then((response) => response.json())
            .then((r) => {
                console.log('Success:', r)
                setMessage(r.message)
                setModal(!modal)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    const getCodeList = () => {
        const info = new FormData()
        info.append('token', token)
        fetch(GET_CODE_LIST, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: info,
        })
            .then((response) => response.json())
            .then((r) => {
                console.log('Success:', r)
                setCodeList(r)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    useEffect(() => {
        if (token) {
            getCodeList()
        }
    }, [token])

    console.log(codeList)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Formik initialValues={{ phone: '', password: '' }}
                        onSubmit={() => {}}>
                        {({ handleSubmit }) => (
                            <View>
                                <InputLight
                                    name="phone"
                                    type="text"
                                    keyboard="default"
                                    input={styles.input}
                                    button={() => <InputBoldIcon />}
                                    placeholder="Уникальный код продукции"
                                    placeholderTextColor={COLORS.placeholderTextColor}
                                    value={code}
                                    onChange={setCode}
                                />

                                <Button
                                    text={'зарегистрировать'.toUpperCase()}
                                    backgroundColor={COLORS.main}
                                    color={COLORS.white}
                                    margin={38}
                                    submit={() => sendCode()}
                                />
                            </View>
                        )}
                    </Formik>
                </View>

                <View style={styles.main}>
                    <Text style={styles.title}>Ранее зарегистрированные продажи</Text>

                    <View style={styles.filterContainer}>
                        <View style={styles.filterTextContainer}>
                            <FilterIcon />
                            <Text style={styles.filterText}>ФИЛЬТР</Text>
                        </View>

                        <View style={filterOpen ? styles.filterDetailContainerActive : styles.filterDetailContainer}>
                            <View style={styles.newFilter}>
                                <TouchableOpacity onPress={() => {
                                    setFilter(!filter)
                                    setFilterOpen(false)
                                }}>
                                    {!filter ? (
                                        <Text style={styles.filterDetailText}>От новых к старым</Text>
                                    ) : <Text style={styles.filterDetailText}>От старых к новым</Text>}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setFilterOpen(!filterOpen)}>
                                    {filterOpen ? <ChevronUp /> : <ChevronDown />}
                                </TouchableOpacity>
                            </View>

                            {filterOpen ? (
                                <View style={styles.oldFilter}>
                                    <TouchableOpacity onPress={() => {
                                        setFilter(!filter)
                                        setFilterOpen(false)
                                    }}>
                                        {filter ? (
                                            <Text style={styles.filterDetailText}>От новых к старым</Text>
                                        ) : <Text style={styles.filterDetailText}>От старых к новым</Text>}
                                    </TouchableOpacity>
                                </View>
                            ) : null }
                        </View>
                    </View>

                    <View style={styles.infoContainer}>
                        <Text style={styles.infoTextTitle}>Дата</Text>

                        <Text style={styles.infoTextTitle}>Уникальный код</Text>

                        <Text style={styles.infoTextTitle}>Статус</Text>
                    </View>

                    <RegisterOrderCard
                        date="10.03.2022"
                        number="1324252"
                        status="Принят"
                        color="#005FED"
                    />

                    <RegisterOrderCard
                        date="10.03.2022"
                        number="1324252"
                        status="Принят"
                        color="#005FED"
                    />

                    <RegisterOrderCard
                        date="10.03.2022"
                        number="1324252"
                        status="Принят"
                        color="#005FED"
                    />

                    <RegisterOrderCard
                        date="10.03.2022"
                        number="1324252"
                        status="Принят"
                        color="#005FED"
                    />

                    <RegisterOrderCard
                        date="10.03.2022"
                        number="1324252"
                        status="Зарегистрирован ранее"
                        color="#09BB3B"
                    />

                    <RegisterOrderCard
                        date="10.03.2022"
                        number="1324252"
                        status="Принят"
                        color="#005FED"
                    />

                    <RegisterOrderCard
                        date="10.03.2022"
                        number="1324252"
                        status="Принят"
                        color="#005FED"
                    />

                    <RegisterOrderCard
                        date="10.03.2022"
                        number="1324252"
                        status="Зарегистрирован ранее"
                        color="#09BB3B"
                    />
                </View>

                <CodeSentModal
                    modalVisible={modal}
                    setModalVisible={setModal}
                    message={message}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: COLORS.main,
        paddingBottom: 20,
    },
    header: {
        height: 218,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingTop: 27,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.main,
        borderRadius: 6,
        marginTop: 20,
        fontFamily: 'RobotoCondensed-Regular',
        fontSize: 14,
        lineHeight: 18,
        backgroundColor: COLORS.white,
        color: '#5B5B5B',
    },
    main: {
        height: '100%',
        backgroundColor: COLORS.main,
        paddingTop: 30,
        paddingHorizontal: 20,
        marginTop: 5,
    },
    title: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
        textAlign: 'center',
    },
    filterContainer: {
        height: 40,
        marginTop: 33,
        flexDirection: 'row',
        marginBottom: 5,
    },
    filterTextContainer: {
        width: '30%',
        backgroundColor: '#F6790F',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 7,
        paddingRight: 20,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    filterText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
    },
    filterDetailContainer: {
        width: '70%',
        backgroundColor: COLORS.white,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingLeft: 20,
        paddingRight: 13,
        height: 40,
    },
    filterDetailContainerActive: {
        width: '70%',
        backgroundColor: COLORS.white,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingLeft: 20,
        paddingRight: 13,
        height: 70,
    },
    filterDetailText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    newFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 7,
    },
    oldFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    infoContainer: {
        height: 36,
        backgroundColor: '#FF9C49',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 27,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 11,
    },
    infoTextTitle: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.white,
    },
})

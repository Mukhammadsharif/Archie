import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native'
import { Formik } from 'formik'
import { COLORS } from '../utils/colors'
import InputLight from '../components/InputLight'
import { InputSearchIcon } from '../components/Svgs'
import CatalogCard from '../components/CatalogCard'
import { GlobalContext } from '../contexts/GlobalContext'
import { HANDLE_LIST } from '../utils/urls'
import Xit from '../components/Xit'

export default function Search() {
    const { token } = useContext(GlobalContext)
    const [data, setData] = useState(null)
    const [list, setList] = useState(null)
    const [search, setSearch] = useState('')

    const getHandleList = () => {
        const info = new FormData()
        info.append('token', token)
        fetch(HANDLE_LIST, {
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
        if (token) {
            getHandleList()
        }
    }, [token])

    const setSearchHandle = () => {
        const handleList = []
        data.forEach((item) => {
            if (handleList.includes(item) === false) {
                if (item.collectionname.includes(search)) {
                    handleList.push(item)
                }
            }
        })
        setList(handleList)
    }

    useEffect(() => {
        if (data) {
            setSearchHandle()
        }
    }, [search])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.inputContainer}>
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
                                    placeholder="Введите данные для поиска"
                                    placeholderTextColor={COLORS.placeholderTextColor}
                                    value={search}
                                    onChange={setSearch}
                                />
                            </View>
                        )}
                    </Formik>
                </View>

                <View style={styles.cardContainer}>
                    {list ? list.map((handle) => (
                        <CatalogCard
                            image={handle.image}
                            description={handle.purpose}
                            name={handle.collectionname}
                            sort={handle.color}
                            marc={`Арт: ${handle.articul}`}
                            liked
                            tag={<Xit />}
                            handle={handle}
                        />
                    )) : data ? data.map((handle) => (
                        <CatalogCard
                            image={handle.image}
                            description={handle.purpose}
                            name={handle.collectionname}
                            sort={handle.color}
                            marc={`Арт: ${handle.articul}`}
                            liked
                            tag={<Xit />}
                            handle={handle}
                        />
                    )) : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: COLORS.main,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: COLORS.main,
        borderRadius: 6,
        marginTop: 20,
        fontFamily: 'RobotoCondensed-Regular',
    },
    inputContainer: {
        height: 124,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    cardContainer: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
})

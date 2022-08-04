import React, { useContext, useEffect, useState } from 'react'
import { Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../utils/colors'
import CatalogCard from '../components/CatalogCard'
import Xit from '../components/Xit'
import { HANDLE_LIST } from '../utils/urls'
import { GlobalContext } from '../contexts/GlobalContext'

export default function Catalog() {
    const navigation = useNavigation()
    const { token } = useContext(GlobalContext)
    const [data, setData] = useState(null)

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
        getHandleList()
    }, [token])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Favorites')}
                    style={styles.titleContainer}>
                    <Text style={styles.title}>Избранное</Text>
                </TouchableOpacity>

                <View style={styles.cardContainer}>
                    {data ? data.map((handle) => (
                        <CatalogCard
                            image={handle.image}
                            description={handle.purpose}
                            name={handle.collectionname}
                            sort={handle.color}
                            marc={`Арт: ${handle.articul}`}
                            liked={false}
                            tag={data.indexOf(handle) === 0
                                || data.indexOf(handle) === 1
                                || data.indexOf(handle) === 2
                                ? <Xit /> : null}
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
        backgroundColor: COLORS.white,
        flex: 1,
        paddingHorizontal: 20,
    },
    titleContainer: {
        width: '100%',
        paddingTop: 40,
    },
    title: {
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.main,
        textDecorationLine: 'underline',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingBottom: 40,
    },
})

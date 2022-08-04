import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CatalogCard from '../components/CatalogCard'
import ProductImage from '../assets/product-small.png'
import { COLORS } from '../utils/colors'
import { GlobalContext } from '../contexts/GlobalContext'
import { HANDLE_LIST } from '../utils/urls'
import Xit from '../components/Xit'

export default function Favorites() {
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
        if (token) {
            getHandleList()
        }
    }, [token])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.cardContainer}>
                    {data ? data.map((handle) => (
                        <CatalogCard
                            image={handle.image}
                            description={handle.purpose}
                            name={handle.collectionname}
                            sort={handle.color}
                            marc={`Арт: ${handle.articul}`}
                            liked
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
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
})

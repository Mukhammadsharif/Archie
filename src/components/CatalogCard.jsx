import React, { useContext, useState } from 'react'
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native'
import { Card } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { COLORS } from '../utils/colors'
import { LikedIcon, DisLikedIcon } from './Svgs'
import { GlobalContext } from '../contexts/GlobalContext'

export default function CatalogCard({ image, description, name, marc, sort, liked, tag, handle }) {
    const [like, setLike] = useState(liked)
    const { setName } = useContext(GlobalContext)
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            style={{ width: '48%' }}
            onPress={() => {
                navigation.navigate('ProductDetail', { handle })
                const newName = marc.replace('Арт: ', '')
                setName(newName)
            }}>
            <Card style={styles.card}>

                <Card.Content style={styles.container}>
                    <Image source={{ uri: `https://archie-club.ru/${image}` }} style={styles.productImage} />

                    <Text style={styles.description}>{description}</Text>

                    <Text style={styles.name}>{name}</Text>

                    <Text style={styles.sort}>{sort}</Text>

                    <View style={styles.footer}>
                        <Text style={styles.marc}>{marc}</Text>

                        <TouchableOpacity
                            onPress={() => setLike(!like)}>
                            {like ? <LikedIcon fill={COLORS.main} /> : <DisLikedIcon />}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.tagContainer}>
                        { tag || null }
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderColor: '#D4D3D3',
        borderWidth: 0.5,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginTop: 20,
        position: 'relative',
        paddingBottom: 10,
    },
    productImage: {
        width: '100%',
        height: 87,
        marginVertical: 15,
    },
    container: {
        justifyContent: 'center',
    },
    description: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: '#5B5B5B',
    },
    name: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
        marginTop: 5,
    },
    sort: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
        marginTop: -5,
    },
    marc: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: '#5B5B5B',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    tagContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
})

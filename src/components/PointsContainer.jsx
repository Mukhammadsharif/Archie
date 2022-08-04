import React from 'react'
import { View, StyleSheet } from 'react-native'
import Point from './Point'
import { COLORS } from '../utils/colors'

export default function PointsContainer({ list }) {
    return (
        <View style={styles.container}>
            {list ? list.map((item) => (
                <Point item={item} />
            )) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
    },
})

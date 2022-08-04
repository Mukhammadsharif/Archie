import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    BackHandler } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { useFocusEffect } from '@react-navigation/native'
import { COLORS } from '../utils/colors'
import { ChevronDown, ChevronUp, FilterIcon } from './Svgs'
import SliderCard from './SliderCard'
import { cardInfo } from '../utils/data'
import ScoreCard from './ScoreCard'
import { GlobalContext } from '../contexts/GlobalContext'
import { USER_PRIZE_LIST } from '../utils/urls'

const { width } = Dimensions.get('window')

export default function ScoresDetail({ catolog, setCatalog, information }) {
    const [filter, setFilter] = useState(false)
    const [filterOpen, setFilterOpen] = useState(false)
    const [secondFilter, setSecondFilter] = useState(false)
    const [secondFilterOpen, setSecondFilterOpen] = useState(false)
    const { token } = useContext(GlobalContext)
    const [data, setData] = useState(null)

    const getNewsList = () => {
        const info = new FormData()
        info.append('token', token)
        fetch(USER_PRIZE_LIST, {
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
            getNewsList()
        }
    }, [token])

    const renderItem = ({ item, index }) => (
        <SliderCard
            code={item.id}
            date={item.cdate}
            name={item.name} />
    )

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                setCatalog(!catolog)
                // Return true to stop default back navigaton
                // Return false to keep default back navigaton
                return true
            }

            // Add Event Listener for hardwareBackPress
            BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress,
            )

            return () => {
                // Once the Screen gets blur Remove Event Listener
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    onBackPress,
                )
            }
        }, []),
    )
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Начисление баллов</Text>

                <View style={styles.scoresContainer}>
                    <Text style={styles.scoresContainerTitle}>Начислено всего:</Text>

                    <View style={styles.scoreBox}>
                        <Text style={styles.scoreNumber}>{information && information.personal && information.personal.aballs ? information.personal.aballs : '0'} баллов</Text>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 20 }}>
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
                </View>

                <View style={{ marginTop: 32, marginLeft: -(width / 1.8) }}>
                    <Carousel
                        data={data}
                        renderItem={renderItem}
                        sliderWidth={width + 350}
                        itemWidth={280}
                        activeSlideOffset={100}
                    />
                </View>

                <Text style={styles.title}>Списание баллов</Text>

                <View style={styles.scoresContainer}>
                    <Text style={styles.scoresContainerTitle}>Списано всего:</Text>

                    <View style={styles.scoreBox}>
                        <Text style={styles.scoreNumber}>{information && information.personal && information.personal.cballs ? information.personal.cballs : '0'} баллов</Text>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 20 }}>
                    <View style={styles.filterContainer}>
                        <View style={styles.filterTextContainer}>
                            <FilterIcon />
                            <Text style={styles.filterText}>ФИЛЬТР</Text>
                        </View>

                        <View style={secondFilterOpen ? styles.filterDetailContainerActive : styles.filterDetailContainer}>
                            <View style={styles.newFilter}>
                                <TouchableOpacity onPress={() => {
                                    setSecondFilter(!secondFilter)
                                    // setSecondFilterOpen(false)
                                }}>
                                    {!secondFilter ? (
                                        <Text style={styles.filterDetailText}>От новых к старым</Text>
                                    ) : <Text style={styles.filterDetailText}>От старых к новым</Text>}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setSecondFilterOpen(!secondFilterOpen)}>
                                    {secondFilterOpen ? <ChevronUp /> : <ChevronDown />}
                                </TouchableOpacity>
                            </View>

                            {secondFilterOpen ? (
                                <View style={styles.oldFilter}>
                                    <TouchableOpacity onPress={() => {
                                        setSecondFilter(!secondFilter)
                                        setSecondFilterOpen(false)
                                    }}>
                                        {secondFilter ? (
                                            <Text style={styles.filterDetailText}>От новых к старым</Text>
                                        ) : <Text style={styles.filterDetailText}>От старых к новым</Text>}
                                    </TouchableOpacity>
                                </View>
                            ) : null }
                        </View>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 20, marginTop: 25, paddingBottom: 20 }}>
                    {data && data.length && !filter ? data.map((item) => (
                        <ScoreCard
                            certificate={item.certificate}
                            code={item.id}
                            date={item.cdate}
                            name={item.name} />
                    )) : data && data.length && filter ? data.reverse().map((item) => (
                        <ScoreCard
                            certificate={item.certificate}
                            code={item.id}
                            date={item.cdate}
                            name={item.name} />
                    )) : null }
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingTop: 7,
    },
    title: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        textAlign: 'center',
        marginTop: 24,
        color: COLORS.black,
    },
    scoresContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 28,
        alignItems: 'center',
    },
    scoreNumber: {
        fontSize: 12,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.main,
    },
    scoreBox: {
        borderWidth: 1,
        borderColor: COLORS.main,
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 15,
        marginLeft: 15,
        borderStyle: 'dashed',
    },
    scoresContainerTitle: {
        fontSize: 12,
        lineHeight: 24,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    filterContainer: {
        height: 40,
        marginTop: 0,
        flexDirection: 'row',
    },
    filterTextContainer: {
        width: '30%',
        backgroundColor: COLORS.black,
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
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
    },
    filterDetailContainerActive: {
        width: '70%',
        backgroundColor: COLORS.white,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingLeft: 20,
        paddingRight: 13,
        height: 70,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
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
})

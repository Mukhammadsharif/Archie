import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { DrawerHeaderIcon, DrawerCloseIcon, ChevronDown, ChevronUp } from './Svgs'
import { COLORS } from '../utils/colors'
import { GlobalContext } from '../contexts/GlobalContext'

export default function CustomDrawerContent(props) {
    const navigation = useNavigation()
    const [archie, setArchie] = useState(false)
    const [sorting, setSorting] = useState(false)
    const [partner, setPartner] = useState(false)
    const { token } = useContext(GlobalContext)
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.headerContainer}>
                <View />
                <DrawerHeaderIcon />
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <DrawerCloseIcon />
                </TouchableOpacity>
            </View>

            <View style={styles.blockContainer}>
                <TouchableOpacity
                    onPress={() => setArchie(!archie)}
                    style={styles.block}>
                    <Text style={styles.blockText}>Archie</Text>
                    {archie ? <ChevronUp /> : <ChevronDown />}
                </TouchableOpacity>

                {archie ? (
                    <>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TabScreen', { screen: 'Main' })}
                            style={styles.menu}>
                            <Text style={styles.menuText}>О бренде</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('TabScreen', { screen: 'Map' })}
                            style={styles.menu}>
                            <Text style={styles.menuText}>Где купить</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('DrawerScreen', { screen: 'AboutProduct' })}
                            style={styles.menu}>
                            <Text style={styles.menuText}>О продукции</Text>
                        </TouchableOpacity>
                    </>
                ) : null}

                <TouchableOpacity
                    onPress={() => setSorting(!sorting)}
                    style={styles.block}>
                    <Text style={styles.blockText}>Подбор ручек</Text>
                    {sorting ? <ChevronUp /> : <ChevronDown />}
                </TouchableOpacity>

                {sorting ? (
                    <>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('TabScreen', { screen: 'Camera' })}
                            style={styles.menu}>
                            <Text style={styles.menuText}>Камера</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('TabScreen', { screen: 'Catalog' })}
                            style={styles.menu}>
                            <Text style={styles.menuText}>Каталог товаров</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Instructions')}
                            style={styles.menu}>
                            <Text style={styles.menuText}>Инструкция</Text>
                        </TouchableOpacity>
                    </>
                ) : null}

                <TouchableOpacity
                    onPress={() => setPartner(!partner)}
                    style={styles.block}>
                    <Text style={styles.blockText}>Партнерская программа</Text>
                    {partner ? <ChevronUp /> : <ChevronDown />}
                </TouchableOpacity>

                {partner ? (
                    <>
                        {!token ? (
                            <TouchableOpacity
                                onPress={() => {
                                    if (!token) {
                                        navigation.navigate('Authorization')
                                    } else {
                                        navigation.navigate('PersonalInformation')
                                    }
                                }}
                                style={styles.menu}>
                                <Text style={styles.menuText}>Авторизация</Text>
                            </TouchableOpacity>
                        ) : null}

                        {token ? (
                            <>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('PersonalInformation')}
                                    style={styles.menu}>
                                    <Text style={styles.menuText}>Личные данные</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate('RegisterOrder')}
                                    style={styles.menu}>
                                    <Text style={styles.menuText}>Зарегистрировать продажу</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate('CatalogGifts')}
                                    style={styles.menu}>
                                    <Text style={styles.menuText}>Каталог призов</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => navigation.navigate('News')}
                                    style={styles.menu}>
                                    <Text style={styles.menuText}>Новости</Text>
                                </TouchableOpacity>
                            </>
                        ) : null}
                    </>
                ) : null}

                <DrawerHeaderIcon style={{ marginTop: 20 }} />
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 42,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        borderBottomWidth: 1,
        borderColor: COLORS.main,
    },
    blockContainer: {
        paddingHorizontal: 20,
        paddingTop: 8,

    },
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 4,
    },
    blockText: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.black,
    },
    menu: {
        marginTop: 10,
    },
    menuText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'RobotoCondensed-Regular',
        color: COLORS.menuText,
    },
})

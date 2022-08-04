import React, { useContext } from 'react'
import 'react-native-gesture-handler'
import { Dimensions, LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Splash from './screens/Splash'
import SecondSplash from './screens/SecondSplash'
import ThirdSplash from './screens/ThirdSplash'
import Main from './screens/Main'
import Catalog from './screens/Catalog'
import Camera from './screens/Camera'
import Map from './screens/Map'
import Search from './screens/Search'
import AboutProduct from './screens/AboutProduct'
import { TabBarCatalogIcon, TabBarMainIcon, TabBarMapIcon, TabBarSearchIcon, TabBarThreeIcon } from './components/Svgs'
import { COLORS } from './utils/colors'
import CustomDrawerContent from './components/CustomDrawerContent'
import MainScreenHeader from './components/MainScreenHeader'
import TabHeader from './components/TabHeader'
import Favorites from './screens/Favorites'
import ProductDetail from './screens/ProductDetail'
import Instructions from './screens/Instructions'
import Authorization from './screens/Authorization'
import Registration from './screens/Registration'
import PersonalInformation from './screens/PersonalInformation'
import RegisterOrder from './screens/RegisterOrder'
import CatalogGifts from './screens/CatalogGifts'
import News from './screens/News'
import NewsDetail from './screens/NewsDetail'
import ViroScreen from './screens/ViroScreen'
import { GlobalContext } from './contexts/GlobalContext'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

// LogBox.ignoreAllLogs()
LogBox.ignoreLogs([
    'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
])

export default function Navigation() {
    const { animation, setAnimation } = useContext(GlobalContext)
    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 5000,
            mass: 3,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    gestureEnabled: true,
                    gestureDirection: 'horizontal-inverted',
                    transitionSpec: {
                        open: config,
                        close: config,
                    },
                    headerMode: false,
                }}
                animation="fade">
                {animation ? (
                    <>
                        <Stack.Screen
                            name="Splash"
                            component={Splash}
                            options={{ headerShown: false, gestureEnabled: false }} />
                        <Stack.Screen
                            name="SecondSplash"
                            component={SecondSplash}
                            options={{ headerShown: false, gestureEnabled: false }} />
                        <Stack.Screen
                            name="ThirdSplash"
                            component={ThirdSplash}
                            options={{ headerShown: false, gestureEnabled: false }} />
                    </>
                ) : null}
                <Stack.Screen
                    name="DrawerScreen"
                    component={DrawerScreen}
                    options={{ headerShown: false, gestureEnabled: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function TabScreen() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: true,
            tabBarStyle: {
                paddingBottom: 10,
                paddingTop: 8,
                height: 62,
                paddingHorizontal: 10,
            },
            tabBarLabelStyle: {
                fontFamily: 'RobotoCondensed-Regular',
                fontSize: 9,
                lineHeight: 10.27,
            },
            tabBarHideOnKeyboard: true,
            gestureEnabled: false,
        }}>
            <Tab.Screen
                name="Main"
                component={Main}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabBarMainIcon stroke={focused ? COLORS.main : COLORS.iconInactiveColor} />
                        </>
                    ),
                    tabBarLabel: 'Главная',
                    tabBarActiveTintColor: COLORS.main,
                    tabBarInactiveTintColor: COLORS.iconInactiveColor,
                    header: () => <MainScreenHeader />,
                }} />

            <Tab.Screen
                name="Catalog"
                component={Catalog}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabBarCatalogIcon stroke={focused ? COLORS.main : COLORS.iconInactiveColor} />
                        </>
                    ),
                    tabBarLabel: 'Каталог',
                    tabBarActiveTintColor: COLORS.main,
                    tabBarInactiveTintColor: COLORS.iconInactiveColor,
                    header: () => <TabHeader text={'каталог товаров'.toUpperCase()} />,
                }} />

            <Tab.Screen
                name="Camera"
                component={Camera}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabBarThreeIcon stroke={focused ? COLORS.main : COLORS.iconInactiveColor} />
                        </>
                    ),
                    tabBarLabel: 'Камера 3D ',
                    tabBarActiveTintColor: COLORS.main,
                    tabBarInactiveTintColor: COLORS.iconInactiveColor,
                    header: () => <TabHeader text={'камера 3d'.toUpperCase()} />,
                }} />

            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabBarMapIcon stroke={focused ? COLORS.main : COLORS.iconInactiveColor} />
                        </>
                    ),
                    tabBarLabel: 'Карта',
                    tabBarActiveTintColor: COLORS.main,
                    tabBarInactiveTintColor: COLORS.iconInactiveColor,
                    header: () => <TabHeader text={'Где купить'.toUpperCase()} />,
                }} />

            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabBarSearchIcon stroke={focused ? COLORS.main : COLORS.iconInactiveColor} />
                        </>
                    ),
                    tabBarLabel: 'Поиск',
                    tabBarActiveTintColor: COLORS.main,
                    tabBarInactiveTintColor: COLORS.iconInactiveColor,
                    header: () => <TabHeader text={'ПОИСК'.toUpperCase()} />,
                }} />
        </Tab.Navigator>
    )
}

function DrawerScreen() {
    const windowWidth = Dimensions.get('window').width
    const drawerWidth = (windowWidth / 100) * 100
    const { active, setActive, name } = useContext(GlobalContext)
    return (
        <Drawer.Navigator
            initialRouteName="SettingsScreen"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                gestureEnabled: false,
                drawerStyle: {
                    width: drawerWidth,
                },
            }}>
            <Drawer.Screen
                name="TabScreen"
                component={TabScreen}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="AboutProduct"
                component={AboutProduct}
                options={{
                    header: () => <TabHeader text={'О продукции'.toUpperCase()} />,
                }} />

            <Drawer.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    header: () => <TabHeader text={'избранное'.toUpperCase()} />,
                }} />

            <Drawer.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{
                    header: () => (active ? null : <TabHeader text={name ? name.toUpperCase() : ''} />),
                }} />

            <Drawer.Screen
                name="Instructions"
                component={Instructions}
                options={{
                    header: () => <TabHeader text={'инструкция'.toUpperCase()} />,
                }} />

            <Drawer.Screen
                name="Authorization"
                component={Authorization}
                options={{
                    header: () => <TabHeader text={'авторизация'.toUpperCase()} />,
                }} />

            <Drawer.Screen
                name="Registration"
                component={Registration}
                options={{
                    header: () => <TabHeader text={'Регистрация'.toUpperCase()} />,
                }} />

            <Drawer.Screen
                name="PersonalInformation"
                component={PersonalInformation}
                options={{
                    header: () => <TabHeader text={'личные данные'.toUpperCase()} />,
                }} />

            <Drawer.Screen
                name="RegisterOrder"
                component={RegisterOrder}
                options={{
                    header: () => <TabHeader text={'Зарегистрировать продажу'.toUpperCase()} />,
                }} />

            <Drawer.Screen
                name="CatalogGifts"
                component={CatalogGifts}
                options={{
                    header: () => (
                        <TabHeader
                            text={'Каталог призов'.toUpperCase()}
                            navigationRoute="PersonalInformation"
                        />
                    ),
                }} />

            <Drawer.Screen
                name="News"
                component={News}
                options={{
                    header: () => <TabHeader text={'НОВОСТИ'.toUpperCase()} />,
                }} />

            <Drawer.Screen
                name="NewsDetail"
                component={NewsDetail}
                options={{
                    header: () => <TabHeader text={'НОВОСТИ'.toUpperCase()} navigationRoute="News" />,
                }} />

            <Drawer.Screen
                name="ViroScreen"
                component={ViroScreen}
                options={{
                    headerShown: false,
                }} />
        </Drawer.Navigator>
    )
}

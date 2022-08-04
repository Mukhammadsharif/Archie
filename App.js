/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { StatusBar, LogBox, Platform } from 'react-native'
import Navigation from './src/Navigation'
import { GlobalProvider } from './src/contexts/GlobalContext'

LogBox.ignoreLogs([
    // eslint-disable-next-line max-len
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
])
console.reportErrorsAsExceptions = false
export default function App() {
    return (
        <GlobalProvider>
            <StatusBar
                backgroundColor="#000"
                barStyle={Platform.OS === 'ios' ? 'light-content' : null} />
            <Navigation />
        </GlobalProvider>

    )
}

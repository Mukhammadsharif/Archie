import React, { createContext, useState } from 'react'
import Modal from './Modal'
import ServerErrorModal from './ServerErrorModal'

export const Context = createContext()

export default function BaseContextWrapper({ children }) {
    const [text, setText] = useState('')
    const [showMessage, setShowMessage] = useState(false)
    const [routeNavigation, setNavigationRoute] = useState({})

    return (
        <Context.Provider value={{ setText, setShowMessage, setNavigationRoute }}>
            {children}

            {text ? (
                <Modal visible={null}>
                    <ServerErrorModal
                        text={text}
                        onPress={() => {
                            routeNavigation?.navigation.reset({
                                index: 0,
                                routes: [{ name: routeNavigation?.route?.name || 'TabScreen' }],
                            })
                            setShowMessage(false)
                        }} />
                </Modal>
            ) : null}
        </Context.Provider>
    )
}

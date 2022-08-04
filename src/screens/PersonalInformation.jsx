import React, { useContext, useState, useEffect } from 'react'
import PersonEdit from '../components/PersonEdit'
import PersonCreate from '../components/PersonCreate'
import { PERSONAL_INFORMATION } from '../utils/urls'
import { GlobalContext } from '../contexts/GlobalContext'

export default function PersonalInformation() {
    const [informationToggle, setInformationToggle] = useState(false)
    const { token } = useContext(GlobalContext)
    const [data, setData] = useState(null)

    const getUserInformation = () => {
        const info = new FormData()
        info.append('token', token)
        fetch(PERSONAL_INFORMATION, {
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
            getUserInformation()
        }
    }, [token])

    console.log(token, data)
    return (
        <>
            {token && data
                ? <PersonEdit setInformationToggle={setInformationToggle} data={data} />
                : <PersonCreate setInformationToggle={setInformationToggle} />}
        </>
    )
}

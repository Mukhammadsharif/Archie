import React from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import { Field } from 'formik'
// import TextInputMask from 'react-native-text-input-mask'
import { fontPixel, pixelSizeHorizontal } from '../utils/normalizeStyle'

export default function MaskedInputLight({
    label,
    name,
    validate,
    left,
    right,
    style,
    keyboard,
    onChange,
    placeholder,
    maxLength,
    colorIcon,
    iconButton,
    autoCapitalize,
    input,
    labelStyle,
    editable,
    masked,
    placeholderTextColor = '#b0b0b0',
    inputStyle,
    wrapperStyle,
    button: Icon,
    buttonFunc = () => { },
    textArea,
    multiline,
    top,
    ...attributes
}) {
    return (
        <View style={{ ...styles.wrapperStyle, ...wrapperStyle }}>
            {label ? <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text> : null}
            <Field name={name} validate={validate}>
                {({ field, form }) => (
                    <TextInput
                        style={{ ...styles.inputStyle, ...input }}
                        onChangeText={(formatted, extracted) => {
                            console.log(formatted) // +1 (123) 456-78-90
                            console.log(extracted) // 1234567890
                            form.setFieldValue(name, `7${extracted}`)
                            if (typeof onChange === 'function') onChange(`7${extracted}`)
                        }}
                        value={String(field.value || '') || ''}
                        mask="+7 ([000]) [000]-[00]-[00]"
                        keyboardType={keyboard}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        autoCapitalize={autoCapitalize}
                        editable={editable}
                        placeholderTextColor={placeholderTextColor}
                        multiline={multiline}
                        {...attributes} />
                )}
            </Field>

            {Icon && (
                <TouchableOpacity onPress={buttonFunc} style={{ ...styles.button, ...iconButton }}>
                    <Icon color={colorIcon} />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: fontPixel(12),
        marginBottom: pixelSizeHorizontal(0),
        letterSpacing: 0.5,
        color: 'black',
        position: 'absolute',
        left: 15,
        top: 9,
        fontFamily: 'Roboto-Regular',
    },
    inputStyle: {
        width: '100%',
        fontSize: fontPixel(16),
        color: 'black',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 15,
        borderColor: '#F2F2F2',
        flexGrow: 1,
        fontFamily: 'Roboto-Regular',
    },
    wrapperStyle: {
        width: '100%',
    },
    button: {
        position: 'absolute',
        right: 17,
        top: 28,
    },
})

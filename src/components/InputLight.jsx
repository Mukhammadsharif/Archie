import React from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native'
import { Field } from 'formik'
import { fontPixel, pixelSizeHorizontal } from '../utils/normalizeStyle'

export default function InputLight({
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
                        onChangeText={(value) => {
                            form.setFieldValue(name, value)
                            if (typeof onChange === 'function') onChange(value)
                        }}
                        value={String(field.value || '') || ''}
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

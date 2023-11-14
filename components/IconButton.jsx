import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const IconButton = ({icon, label , onPress}) => {
    return (
        <Pressable style={styles.IconButton} onPress={onPress}>
            <MaterialIcons name={icon} size={24} color={"#fff"} />
            <Text style={StyleSheet.IconButtonLabel}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    IconButton:{
        justifyContent:"center",
        alignItems:"center",
    },
    IconButtonLabel: {
        color:"#fff",
        marginTop:12,
    },
})

export default IconButton
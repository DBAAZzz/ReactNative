import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

const UselessTextInput = (props) => {
    return (
        <View style={styles.bodyStyle}> 
            <Text>111</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bodyStyle: {
        backgroundColor: 'red'
    }
})

export default UselessTextInput
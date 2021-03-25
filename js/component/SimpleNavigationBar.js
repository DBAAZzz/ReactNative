import React, { Component } from  'react'
import { StyleSheet, View, Text } from 'react-native'
import px2dp from '../util/px2dp'

export default class SimpleNavigationBar extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={styles.toolbar}>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: px2dp(80),
        fontWeight: '700',
        backgroundColor: '#f8f8f8',
    },
    title: {
        color: '#333',
        fontSize: px2dp(28)
    }
})
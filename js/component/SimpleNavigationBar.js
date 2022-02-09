import React, { Component } from  'react'
import { StyleSheet, View, Text, StatusBar, Platform } from 'react-native'
import theme from '../config/theme'
import px2dp from '../util/px2dp'
const statusBarHeight = StatusBar.currentHeight;

export default class SimpleNavigationBar extends Component{
    constructor(props){
        super(props)
        this.shandow = this.props.shandow || false;
    }
    render(){
        return(
            <View>
                <StatusBar translucent={true} 
                    backgroundColor='transparent' barStyle={'dark-content'}  >
                </StatusBar>
                {Platform.OS == 'android' ?
                    <View style={{
                        height: statusBarHeight,
                        backgroundColor: theme.pageBackgroundColor
                    }}></View> : <View></View>
                }
                <View style={
                    [styles.toolbar, 
                        this.shandow ? styles.shandowStyle : {}
                    ]
                }>
                    <Text style={styles.title}>{this.props.title}</Text>
                </View>
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
        backgroundColor: theme.pageBackgroundColor,
    },
    shandowStyle: {
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: px2dp(2),
    },  
    title: {
        color: '#333',
        fontSize: px2dp(28)
    }
})
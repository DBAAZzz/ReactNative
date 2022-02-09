import React, { Component } from 'react'
import { ImageBackground, Text, View, SafeAreaView, 
    ScrollView, StyleSheet, Image, TouchableHighlight, StatusBar } from 'react-native'
import DeviceStorage from '../util/deviceStorage'
import HttpUtil from '../fetch/fetch'
import theme from '../config/theme'
import px2dp from '../util/px2dp'

let bgImg = require('../../static/images/mine/bg.jpeg')
let icon1 = require('../../static/images/mine/icon1.png')
let icon2 = require('../../static/images/mine/icon2.png')
let icon3 = require('../../static/images/mine/icon3.png')
let icon4 = require('../../static/images/mine/icon4.png')
let manIcon = require('../../static/images/mine/sex_man.png') 
let womanIcon = require('../../static/images/mine/sex_woman.png')




export default class MinePage extends Component{
    constructor(props){
        super(props)
        this.state = {
            userInfo: {} 
        }
    }
    _renderFunc(){
        return (
            <View>
                <TouchableHighlight onPress={() => this.onPressFunc()} underlayColor='transparent'>
                    <View style={styles.funcBox}>
                        <Image
                            style={styles.image}
                            source={icon1}
                        />
                        <View style={styles.wordBox}>
                            <Text style={{color: '#333'}}>Fresh Something</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.funcBox}>
                    <Image
                        style={styles.image}
                        source={icon2}
                    />
                    <View style={styles.wordBox}>
                        <Text style={{color: '#333'}}>隐秘</Text>
                    </View>
                </View>
                <TouchableHighlight onPress={() => this.navToLogin()} underlayColor='transparent'>
                    <View style={styles.funcBox}>
                        <Image
                            style={styles.image}
                            source={icon3}
                        />
                        <View style={styles.wordBox}>
                            <Text style={{color: '#333'}}>破裂</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.funcBox}>
                    <Image
                        style={styles.image}
                        source={icon4}
                    />
                    <View style={styles.wordBox}>
                        <Text style={{color: '#333'}}>设置</Text>
                    </View>
                </View>
            </View>
        )
    }
    render(){
        let userHead = 'https://avatar-static.segmentfault.com/218/123/2181236988-5fa93a079c2d9_huge256';
        let { userInfo } = this.state;
        return (
            <SafeAreaView>
                <ScrollView >
                    <StatusBar translucent={true} backgroundColor="transparent"
                        barStyle={'dark-content'}
                    >
                    </StatusBar>
                    <View style={{height: px2dp(800)}}>
                        <ImageBackground style={styles.bgBox}
                            source={bgImg}
                        >
                            <View style={styles.userContainer} >
                                <View style={styles.userInfoBox}>
                                    <Image
                                        style={styles.userHead}
                                        source={{uri: userInfo.headImg || userHead}}
                                    ></Image>
                                    <View style={styles.userContent}>
                                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
                                            <Text numberOfLines={1} style={styles.userName}>{userInfo.userName}</Text> 
                                            <Image style={styles.sexIcon} 
                                            source={userInfo.sex === 1 ? manIcon : womanIcon} />
                                        </View>
                                        <Text numberOfLines={1} style={styles.userNew}>{userInfo.intro == '' ? '该用户很神秘～该用户很神秘～': userInfo.intro}</Text>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>   
                    </View>
                    {this._renderFunc()}
                </ScrollView>
            </SafeAreaView>
        )
    }
    componentDidMount(){
        this.getUserInfoNet();
    }
    getUserInfoNet(){
        HttpUtil.get('/user/getUserInfo').then((res) => {
            this.setState({
                userInfo: res.userInfo
            })  
        })
    }
    onPressFunc(){

    }
    async navToLogin(){
        await DeviceStorage.remove('token')
        let { navigation } = this.props;
        navigation.navigate('SignInPage')
    }
}

const styles = StyleSheet.create({
    bgBox: {
        position: 'relative',
        width: px2dp(640),
        height: px2dp(695),
    },
    userContainer: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        bottom: px2dp(-70),
        right: px2dp(0),
        height: px2dp(140),
        width: px2dp(540),
        borderTopLeftRadius: px2dp(20),
        borderBottomLeftRadius: px2dp(80),
        backgroundColor: '#f4faf4',
        shadowColor: '#e6fde6',
        shadowOffset:{
            width: px2dp(0),
            height: px2dp(8)
        },  
        shadowOpacity: 0.4,
    },
    userInfoBox: {
        display: 'flex',
        flexDirection: 'row',
        marginLeft: px2dp(60)
    },
    userHead: {
        width: px2dp(80),
        height: px2dp(80),
        borderRadius: px2dp(8)
    },
    userContent: {
        display: 'flex',
        justifyContent: 'space-between',
        width: px2dp(320),
        height: px2dp(80),
        marginLeft: px2dp(30)
    },
    userName: {
        color: '#333',
        fontWeight: '600',
        fontSize: px2dp(26),
        marginRight: px2dp(10)
    },
    userNew: {
        color: '#999',
        fontSize: px2dp(20)
    },
    sexIcon: {
        width: px2dp(24),
        height: px2dp(24)
    },
    funcBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(40),
        paddingRight: px2dp(40),
        height: px2dp(94),
        backgroundColor: '#fff',
        borderBottomColor: theme.pageBackgroundColor,
        borderBottomWidth: px2dp(2)
    },
    image: {
        width: px2dp(50),
        height: px2dp(50)
    },
    wordBox: {
        marginLeft: px2dp(20)
    }
})
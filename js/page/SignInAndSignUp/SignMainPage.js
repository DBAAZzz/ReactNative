import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableHighlight, ImageBackground } from 'react-native'
import SignUpPage from './SignUpPage'
import SignInPage from './SignInPage'
import px2dp from '../../util/px2dp'
import theme from '../../config/theme'
import { ifIphoneX } from '../../util/iphone-x-helper'



let logo = require('../../../static/images/sign/logo.png')

export default class SignMainPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            type: true,
            bgImg: null
        }
    }

    render(){
        let { type, bgImg } = this.state;
        return (
            <ImageBackground source={bgImg} style={ifIphoneX(styles.isPhoneXStyle, styles.normalStyle)}>
                <View style={styles.logoBox}>
                    <TouchableHighlight underlayColor='transparent' onPress={() => this.changeType()}>
                        <Image source={logo} style={styles.logo} >
                        </Image>
                    </TouchableHighlight>
                    <Text style={styles.logoText}>Forget's Dream</Text>
                </View>
                <View style={styles.buttonContainer} >
                    <TouchableHighlight underlayColor='transparent' style={[
                        styles.button, styles.loginButton,
                        { borderColor: type ? theme.themeColor : '#005457' }
                    ]} onPress={() => this.navToPage('signIn')}>
                        <Text style={[
                            styles.buttonText,
                            { color: type ? theme.themeColor: '#005457' }
                        ]}>Sign In</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='transparent' style={[
                        styles.button, styles.registerButton,
                        { borderColor: type ? theme.themeColor : '#005457' }
                    ]} onPress={() => this.navToPage('signUp')}>
                        <Text style={[
                            styles.buttonText,
                            { color: type ? theme.themeColor: '#005457' }
                        ]}>Sign Up</Text>
                    </TouchableHighlight>
                </View>
            </ImageBackground>
        )
    }
    changeType(){

        this.setState({
            type: !this.state.type,
            bgImg: this.state.type ? require('../../../static/images/sign/bg.jpg') : require('../../../static/images/sign/bg2.jpeg')
        })
    }
    navToPage(name){
        let { navigator } = this.props;
        navigator.push({
            component: name == 'signIn' ? SignInPage : SignUpPage
        })
    }
}

const styles = StyleSheet.create({
    isPhoneXStyle: {
        position: 'relative',
        flex: 1,
        paddingTop: px2dp(60),
        backgroundColor: theme.secondColor,
    },
    normalStyle: {
        position: 'relative',
        flex: 1,
        backgroundColor: theme.secondColor,
    },  
    logoBox: {
        display: 'flex',
        alignItems: 'center',
        marginTop: px2dp(100),
    },
    logo: {
        width: px2dp(350),
        height: px2dp(434)
    },
    logoText: {
        color: '#333',
        fontSize: px2dp(30),
        marginTop: px2dp(30),
        fontWeight: '700'
    },
    buttonContainer: {
        position: 'absolute',
        bottom: px2dp(200),
        paddingLeft: px2dp(60),
        paddingRight: px2dp(60)
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: px2dp(520),
        height: px2dp(72),
        borderWidth: px2dp(2),
        borderRadius: px2dp(8)
    },
    loginButton: {
        backgroundColor: '#fff',
        marginBottom: px2dp(20),
        borderColor: '#fff'
    },
    registerButton: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontSize: px2dp(26),
        fontWeight: '700',
    }
})
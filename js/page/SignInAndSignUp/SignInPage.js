import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import HttpUtil from '../../fetch/fetch'
import DeviceStorage from '../../util/deviceStorage'
import Toast from 'react-native-easy-toast'
import px2dp from '../../util/px2dp'
import theme from '../../config/theme'
import { ifIphoneX } from '../../util/iphone-x-helper'

let emailIcon = require('../../../static/images/sign/email_icon.png')
let emailAtvIcon = require('../../../static/images/sign/email_atvicon.png')
let passwordIcon = require('../../../static/images/sign/password_icon.png')
let passwordAtvIcon = require('../../../static/images/sign/password_atvicon.png')
let google = require('../../../static/images/sign/google.png')
let wechat = require('../../../static/images/sign/wechat.png')
let logo = require('../../../static/images/sign/logo.png')

export default class SignInPage extends Component{
    constructor(props){
        super(props)
        this._toastRef;
        this.state = {
            formEmailIcon: emailIcon,
            formPassWordIcon: passwordIcon,
            form: {
                email: '',
                passWord: '',
            }
        }
    }
    _renderFrom(){
        let { formEmailIcon, formPassWordIcon } = this.state;
        return (
            <View style={styles.fromBox}>
                <View style={styles.inputBox}>
                    <Image style={styles.icon} source={formEmailIcon}>
                    </Image>
                    <TextInput style={styles.input} maxLength={32} placeholder="email"
                        autoComplete="email" onChangeText={(text) => this.changeText(text, 'email')} 
                        onFocus={() => this.changeIcon({formEmailIcon: emailAtvIcon})}
                        onBlur={() => this.changeIcon({formEmailIcon: emailIcon})}
                        selectionColor={theme.themeColor}
                    >
                    </TextInput>
                </View>
                <View style={styles.inputBox}>
                    <Image style={styles.icon} source={formPassWordIcon}  ></Image>
                    <TextInput style={styles.input} maxLength={32} placeholder="passWord"
                        textContentType="password" secureTextEntry={true}
                        onChangeText={(text) => this.changeText(text, 'passWord')} 
                        onFocus={() => this.changeIcon({formPassWordIcon: passwordAtvIcon})}
                        onBlur={() => this.changeIcon({formPassWordIcon: passwordIcon})}
                        selectionColor={theme.themeColor}
                    >
                    </TextInput>
                </View>
                <TouchableOpacity underlayColor='transparent' onPress={() => this.signIn()}
                    style={[styles.button, styles.registerButton]}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <Text style={styles.protocol}>
                    Forget the password? foolish！There's no way to get the code back.
                </Text>
                <View style={styles.buttonBox}>
                    <TouchableOpacity underlayColor='transparent'
                        style={[styles.button, styles.wechatButton]}
                    >
                        <Image source={wechat} style={styles.buttonIcon} ></Image>
                        <Text style={styles.buttonText}>Sign In with Wechat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity underlayColor='transparent'
                        style={[styles.button, styles.googleButton]}
                    >
                        <Image source={google} style={styles.buttonIcon} ></Image>
                        <Text style={styles.buttonText}>Sign In with Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    render(){
        return (
            <ScrollView style={ifIphoneX(styles.isPhoneXStyle, styles.normalStyle)}>
                <View style={styles.logoBox}>
                    <Image source={logo} style={styles.logo} >
                    </Image>
                </View>
                {this._renderFrom()}
                <View style={styles.textBox}>
                    <Text style={{color: '#666'}}>
                        Already have an accout?
                    </Text>
                    <TouchableOpacity onPress={() => this.navToSignUp()} >
                        <Text style={styles.textButton}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <Toast ref={ref => (this._toastRef = ref)} 
                    position="top" opacity={0.8} 
                />
            </ScrollView>
        )
    }
    changeIcon(key){
        this.setState(key)
    }
    changeText(value, key){
        let { form } = this.state;
        form[key] = value;
    }
    navToSignUp(){
        let { navigation } = this.props;
        navigation.navigate('SingUpPage')
    }
    signIn(){
        let ruleCheck = {
            isNonEmpty: (value) => {
                if(value == '') return false;
                return true
            },
            isEmail: (value) => {
                let reg =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if(!reg.test(value)) return false;
                return true;
            },
        } 
        let { form } = this.state;

        if(!ruleCheck.isEmail(form.email)){
            this._toastRef.show("请输入正确的邮箱")
            return ;
        }
        if(!ruleCheck.isNonEmpty(form.passWord)){
            this._toastRef.show("密码不能为空")
            return ;
        }
        HttpUtil.post('/user/login', form).then(async (res) => {
            this._toastRef.show('登录成功');
            DeviceStorage.save('token', res.token);
            this.props.navigation.navigate('Home')
        }).catch(message => {
            this._toastRef.show(message)
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
        marginTop: px2dp(40),
    },
    logo: {
        width: px2dp(350),
        height: px2dp(434)
    },
    fromBox: {
        paddingLeft: px2dp(60),
        paddingRight: px2dp(60),
        marginTop: px2dp(40),
        
    }, 
    inputBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: px2dp(20),
    },  
    icon: {
        width: px2dp(40),
        height: px2dp(40),
        marginRight: px2dp(20)
    },
    input: {
        padding: 0,
        flex: 1,
        height: px2dp(70),
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        backgroundColor: '#fff',
        fontSize: px2dp(24),
        color: '#333',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginTop: px2dp(30),
        width: px2dp(520),
        height: px2dp(72),
        borderRadius: px2dp(8),
    },
    registerButton: {
        backgroundColor: theme.themeColor,
    },  
    wechatButton: {
        backgroundColor: '#35d96b',
    },
    googleButton: {
        backgroundColor: '#4285f4'
    },
    buttonText: {
        color: '#fff',
        fontSize: px2dp(26),
        fontWeight: '700',
    },
    protocol: {
        color: '#666',
        fontSize: px2dp(22),
        marginTop: px2dp(28)
    },
    buttonBox: {
        marginTop: px2dp(36),
    },
    buttonIcon: {
        width: px2dp(30),
        height: px2dp(30),
        marginRight: px2dp(60)
    },
    textBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: px2dp(40)
    },
    textButton: {
        fontSize: px2dp(24),
        color: theme.themeColor, 
        fontWeight: '700'
    }
})

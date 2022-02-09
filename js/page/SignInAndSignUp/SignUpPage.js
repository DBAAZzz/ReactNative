import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import Toast from 'react-native-easy-toast'
import HttpUtil from '../../fetch/fetch'
import SignInPage from './SignInPage'
import px2dp from '../../util/px2dp'
import theme from '../../config/theme'
import { ifIphoneX } from '../../util/iphone-x-helper'



let userIcon = require('../../../static/images/sign/user_icon.png')
let userAtvIcon = require('../../../static/images/sign/user_atvicon.png')
let emailIcon = require('../../../static/images/sign/email_icon.png')
let emailAtvIcon = require('../../../static/images/sign/email_atvicon.png')
let passwordIcon = require('../../../static/images/sign/password_icon.png')
let passwordAtvIcon = require('../../../static/images/sign/password_atvicon.png')
let codeIcon = require('../../../static/images/sign/code_icon.png')
let codeAtvIcon = require('../../../static/images/sign/code_atvicon.png')

let google = require('../../../static/images/sign/google.png')
let wechat = require('../../../static/images/sign/wechat.png')
let logo = require('../../../static/images/sign/logo.png')

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
    isPassWord: (value) => {
        if(value == '' || value.length < 6) return false;
        return true;
    }
}  

export default class SignUpPage extends Component{
    constructor(props){
        super(props)
        this._toastRef;
        this.state = {
            formUserIcon: userIcon,
            formEmailIcon: emailIcon,
            formPassWordIcon: passwordIcon,
            formCodeIcon: codeIcon,
            sendCode: false,
            codeText: '获取验证码',
            form: {
                userName: '',
                email: '',
                passWord: '',
                code: ''
            }
        }
    }
    _renderFrom(){
        let { formUserIcon, formEmailIcon, 
            formPassWordIcon, formCodeIcon, sendCode } =  this.state;
        return (
            <View style={styles.formBox}>
                <View style={styles.inputBox}>
                    <Image style={styles.icon} source={formUserIcon} ></Image>
                    <TextInput style={styles.input} maxLength={12} placeholder="userName"
                        onChangeText={(text) => this.changeText(text, 'userName')} 
                        onFocus={() => this.changeIcon({formUserIcon: userAtvIcon})}
                        onBlur={() => this.changeIcon({formUserIcon: userIcon})}
                        selectionColor={theme.themeColor}
                    >
                    </TextInput>
                </View>
                <View style={styles.inputBox}>
                    <Image style={styles.icon} source={formEmailIcon} ></Image>
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
                <View style={styles.inputBox}>
                    <Image style={styles.icon} source={formCodeIcon}  ></Image>
                    <TextInput style={styles.input} maxLength={6} placeholder="code"
                        onChangeText={(text) => this.changeText(text, 'code')} 
                        onFocus={() => this.changeIcon({formCodeIcon: codeAtvIcon})}
                        onBlur={() => this.changeIcon({formCodeIcon: codeIcon})}
                        selectionColor={theme.themeColor}
                    >
                    </TextInput>
                    <TouchableOpacity onPress={() => this.getVeriCode()}>
                        <Text style={[
                            styles.getCodeButton,
                            sendCode ? { color: theme.themeColor} : { color : '#666'}
                        ]}>{this.state.codeText}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity underlayColor='transparent' 
                    style={[styles.button, styles.registerButton]}
                    onPress={() => this.signUp()}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <Text style={styles.protocol}>
                    Registration is deemed to be agreement with《Forget’s Dream Unequal Agreement》
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
            <ScrollView style={{backgroundColor: theme.secondColor}} >
                <View style={ifIphoneX(styles.isPhoneXStyle, styles.normalStyle)}>
                    <View style={styles.logoBox}>
                        <Image source={logo} style={styles.logo} >
                        </Image>
                    </View>
                    {this._renderFrom()}
                    <View style={styles.textBox}>
                        <Text style={{color: '#666'}}>
                            Already have an accout?
                        </Text>
                        <TouchableOpacity onPress={() => this.navToSignIn()} >
                            <Text style={styles.textButton}> Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Toast ref={ref => (this._toastRef = ref)} 
                    position="top" opacity={0.8} 
                />
            </ScrollView>
        )
    }
    changeText(value, key){
        let { form } = this.state;
        form[key] = value;
        if(key == 'email'){
            if(ruleCheck.isEmail(value)){
                this.setState({
                    sendCode: true
                })
            }else {
                this.setState({
                    sendCode: false
                })
            }
        }
    }
    signUp(){
          
        let { form } = this.state;
        if(!ruleCheck.isNonEmpty(form.userName)){
            this._toastRef.show("用户名不能为空")
            return ;
        }  
        if(!ruleCheck.isEmail(form.email)){
            this._toastRef.show("请输入正确的邮箱")
            return ;
        }
        if(!ruleCheck.isPassWord(form.passWord)){
            this._toastRef.show("密码不能为空")
            return ;
        }
        if(!ruleCheck.isNonEmpty(form.code)){
            this._toastRef.show("验证码不能为空")
        }
        this.singUp(form);
    }
    changeIcon(key){
        this.setState(key)
    }
    navToSignIn(){
        let { navigation } = this.props;
        navigation.navigate('SignInPage')
    }
    getVeriCode(){
        let { sendCode } = this.state;
        if(!sendCode) return ;
        let time = 60, fn = null;
        HttpUtil.post('/auth/getCode', {
            email: this.state.form.email,
        }).then((res) => {
            this.setState({
                sendCode: false
            })
            fn = setInterval(() => {
                this.setState({
                    codeText: `${time}s重新获取`
                })
                time--;
                if(time <= 0) {
                    clearInterval(fn);
                    time = 60;
                    this.setState({
                        sendCode: true,
                        codeText: '获取验证码'
                    })
                }
            }, 1000);
        })
    }
    singUp(form){
        HttpUtil.post('/user/register',form).then((res) => {
            this._toastRef.show("注册成功")
            this.navToSignIn();
        })
    }
}

const styles = StyleSheet.create({
    isPhoneXStyle: {
        position: 'relative',
        flex: 1,
        paddingTop: px2dp(60),
        paddingBottom: px2dp(60),
        backgroundColor: theme.secondColor,
    },
    normalStyle: {
        position: 'relative',
        flex: 1,
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
    formBox: {
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
    getCodeButton: {
        fontSize: px2dp(24),
        marginLeft: px2dp(20),
        minWidth: px2dp(180),
        textAlign: 'center'
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

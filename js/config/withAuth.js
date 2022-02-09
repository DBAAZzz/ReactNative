import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import DeviceStorage from '../util/deviceStorage'
import px2dp from '../util/px2dp'
import theme from './theme'

let logo = require('../../static/images/redirect.png')

const withAuth = WrappedComponent => {
    class AuthenticationScreen extends Component{
        constructor(props){
            super(props)
            this.state = {
                isAuthenticated: false
            }
            props.navigation.addListener('willFocus', async () => {
                let token = await DeviceStorage.get('token');
                if(token != null){
                    this.setState({
                        isAuthenticated: true
                    });
                }else {
                    let { navigation } = this.props;
                    navigation.navigate('SignInPage');
                }
            })
        }
        render(){
            if(!this.state.isAuthenticated){
                return (
                    <View style={styles.container}>
                        <Image source={logo} style={styles.logo} >
                        </Image>
                    </View>
                )
            }
            return <WrappedComponent {...this.props} ></WrappedComponent>
        }
        
    }
    return AuthenticationScreen;
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        backgroundColor: theme.secondColor
    },
    logo: {
        marginTop: px2dp(300),
        width: px2dp(350),
        height: px2dp(420)
    },
})

export default withAuth;
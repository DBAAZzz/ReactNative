import React, { Component } from 'react'
import { BackHandler, SafeAreaView, StyleSheet, Text } from 'react-native';
import TabBar from '../component/TabBar'
import theme from '../config/theme';

export default class MainScene extends Component {
    constructor(props){
        super(props);
        this.state= {
            isAuth: false,
            login: this.login,
            logout: this.logout
        }
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <TabBar navigation={this.props.navigation}/>
            </SafeAreaView>
        )
    }

    componentDidMount(){
        // 监听android端的后退按钮事件
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }
    onBackAndroid(){
        BackHandler.exitApp(0);
        return true;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'flex-end',
        backgroundColor: theme.pageBackgroundColor
    }
})
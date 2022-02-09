import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, BackHandler } from 'react-native'
import theme from '../config/theme';
import px2dp from '../util/px2dp';


export default class UserInfoPage extends Component{
    constructor(props){
        super(props);
        let params = this.props.navigation.state.params;
        this.userInfo = params;
    }
    _rendUserInfo(){
        let userHead = 'https://avatar-static.segmentfault.com/218/123/2181236988-5fa93a079c2d9_huge256';
        return (
            <View style={styles.userBox}>
                <Image style={styles.userHead} source={{uri: this.userInfo.headImg}}  >
                </Image>
                <Text style={styles.userName}>{this.userInfo.name}</Text>
                <Text style={styles.description}>{this.userInfo.intro || '这是一个boring的人'}</Text>
                <TouchableOpacity onPress={() => this.navToChat()}>
                    <View style={styles.sendButton}>
                        <Text style={styles.buttonText}>传递电波</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    _renderSetting(){
        return (
            <View style={styles.settingBox}>
                <TouchableOpacity >
                    <View style={styles.settingItem}>
                        <Text style={{color: '#333', fontWeight: '700'}}>拉进黑洞</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.settingItem}>
                        <Text style={{color: '#333', fontWeight: '700'}}>删除</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    render(){
        return (
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor="transparent"
                    barStyle={'dark-content'}
                >
                </StatusBar>
                {this._rendUserInfo()}
                {this._renderSetting()}
            </View>
        )
    }
    componentDidMount(){;
        // 监听android端的后退按钮事件
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }
    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true
    }
    navToChat(){
        let { navigation } = this.props;
        navigation.navigate('chatPage',{
            id: this.userInfo.id,
            name: this.userInfo.name
        });
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#f3f3f3',
    },  
    userBox: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: px2dp(120),
        paddingBottom: px2dp(40),
        backgroundColor: '#fff',
        marginBottom: px2dp(12),
    },  
    description: {
        marginBottom: px2dp(20),
        marginTop: px2dp(10),
        color: '#666',
        fontSize: px2dp(22),
    },  
    sendButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: px2dp(72),
        width: px2dp(400),
        borderRadius: px2dp(12),
        backgroundColor: theme.themeColor
    },  
    buttonText: {
        color: '#333',
        fontSize: px2dp(24),
        fontWeight: '700',
        textAlign: 'center'
    },
    userName: {
        marginTop: px2dp(20),
        color: '#333',
        fontSize: px2dp(30),
        fontWeight: '700',
    },  
    userHead: {
        width: px2dp(140),
        height: px2dp(140),
        borderRadius: 70
    },
    settingBox: {
        position: 'absolute',
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        left: px2dp(120),
        right: px2dp(120),
        bottom: px2dp(100),
    },
    settingItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: px2dp(20),
        justifyContent: 'center',
        height: px2dp(70),
        borderRadius: px2dp(12),
        backgroundColor: theme.secondColor
    }
})
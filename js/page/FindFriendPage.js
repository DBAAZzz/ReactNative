import React, { Component, useState } from 'react'
import {
    SafeAreaView, View,
    Text, ScrollView, StyleSheet, TextInput,
    TouchableOpacity, Image, BackHandler
} from 'react-native'
import NavigationBar from '../component/SimpleNavigationBar'
import theme from '../config/theme';
import px2dp from '../util/px2dp';

export default class FindFrindPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    _renderSearch = () => {
        return (
            <View style={styles.searchBox}>
                <TextInput style={styles.inputStyle}
                    onChangeText={(text) => this.onChangeText(text)}
                    value={this.state.value} returnKeyType="search" placeholder="搜索好友的邮箱号"
                    onSubmitEditing={() => this._search()}
                />
                <TouchableOpacity>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchText}>搜索</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    _renderFriendList = () => {
        let userHead = 'https://avatar-static.segmentfault.com/218/123/2181236988-5fa93a079c2d9_huge256';
        return (
            <View>
                <View style={styles.applyTitle}>
                    <Text style={styles.title}>申请的好友列表</Text>
                </View>
                <View style={styles.friendItem} >
                    <Image
                        style={styles.userHead}
                        source={{ uri: userHead }}
                    ></Image>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>用户名</Text>
                        <Text style={styles.message}>用户验证信息</Text>
                    </View>
                    <TouchableOpacity>
                        <View style={[
                            styles.checkButton,
                            { color: theme.themeColor, borderColor: theme.themeColor }
                        ]}>
                            <Text style={[
                                styles.checkText,
                                { color: theme.themeColor }
                            ]}>同意</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={[
                            styles.checkButton,
                            { borderColor: 'red' }
                        ]}>
                            <Text style={[
                                styles.checkText,
                                { color: 'red' }
                            ]}>拒绝</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.friendItem} >
                    <Image
                        style={styles.userHead}
                        source={{ uri: userHead }}
                    ></Image>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>用户名</Text>
                        <Text style={styles.message}>用户验证信息</Text>
                    </View>
                    <View style={styles.checkOpeartion}>
                        <Text style={styles.opeartion}>已同意</Text>
                    </View>
                </View>
                <View style={styles.friendItem} >
                    <Image
                        style={styles.userHead}
                        source={{ uri: userHead }}
                    ></Image>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>用户名</Text>
                        <Text style={styles.message}>用户验证信息</Text>
                    </View>
                    <View style={styles.checkOpeartion}>
                        <Text style={styles.opeartion}>已拒绝</Text>
                    </View>
                </View>
                <View style={styles.friendItem} >
                    <Image
                        style={styles.userHead}
                        source={{ uri: userHead }}
                    ></Image>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>用户名</Text>
                        <Text style={styles.message}>用户验证信息</Text>
                    </View>
                </View>
            </View>
        )
    }
    render() {
        return (
            <SafeAreaView style={styles.scollBox}>
                <NavigationBar title='新的朋友'></NavigationBar>
                <ScrollView>
                    {this._renderSearch()}
                    {this._renderFriendList()}
                </ScrollView>
            </SafeAreaView>
        )
    }
    onChangeText(text) {
        this.setState({
            value: text
        })
    }
    _search() {
        console.log("开始搜索")
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }
    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true
    }
}

const styles = StyleSheet.create({
    scollBox: {
        flex: 1,
        backgroundColor: '#fff'
    },
    searchBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: px2dp(100),
        backgroundColor: theme.pageBackgroundColor,
    },
    inputStyle: {
        marginRight: px2dp(20),
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        width: px2dp(450),
        height: px2dp(60),
        fontSize: px2dp(18),
        borderRadius: px2dp(4),
        backgroundColor: '#fff'
    },
    searchButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: px2dp(100),
        height: px2dp(54),
        borderRadius: px2dp(6),
        backgroundColor: theme.themeColor
    },
    searchText: {
        color: theme.black1,
        fontSize: px2dp(20)
    },
    applyTitle: {
        display: 'flex',
        justifyContent: 'center',
        height: px2dp(60),
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        backgroundColor: theme.pageBackgroundColor
    },  
    title: {
        color: theme.black1,
        fontSize: px2dp(20)
    },
    friendItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        height: px2dp(100),
        backgroundColor: '#fff',
    },
    userHead: {
        width: px2dp(72),
        height: px2dp(72),
        borderRadius: px2dp(6)
    },
    userInfo: {
        paddingTop: px2dp(14),
        paddingBottom: px2dp(14),
        height: px2dp(100),
        marginLeft: px2dp(20),
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    userName: {
        color: theme.black1,
        fontSize: px2dp(20)
    },
    message: {
        color: theme.black2,
        fontSize: px2dp(18)
    },
    checkButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: px2dp(8),
        marginRight: px2dp(8),
        width: px2dp(80),
        height: px2dp(50),
        borderWidth: px2dp(1),
        borderRadius: px2dp(4)
    },
    checkText: {
        fontSize: px2dp(20),
        fontWeight: 'bold',
        letterSpacing: px2dp(4),
    },
    checkOpeartion: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: px2dp(80),
        height: px2dp(50),
    },
    opeartion: {
        fontSize: px2dp(20),
        color: theme.black2,
    }
})
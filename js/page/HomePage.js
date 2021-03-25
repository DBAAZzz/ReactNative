import React, { Component } from 'react'
import {Text, View, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import NavigationBar from '../component/SimpleNavigationBar'
import px2dp from '../util/px2dp'
export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing: true,
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        }
    }
    renderUserList(){
        let userHead = 'https://avatar-static.segmentfault.com/218/123/2181236988-5fa93a079c2d9_huge256';
        return (
            <View style={styles.userListBox} >
                {this.state.arr.map((item, index) => {
                    return (
                        <View style={styles.userItem} key={index} >
                            <Image
                                style={styles.userHead}
                                source={{uri: userHead}}
                            >
                                
                            </Image>
                            <View style={styles.userContainer}>
                                <Text numberOfLines={1} style={styles.userName} >我是id我是id我是id我是id我是id我是id我是id我是id我是id我是id我是id我是id</Text>
                                <Text numberOfLines={1} style={styles.userContent}>我是发送内容</Text>
                            </View>
                            <Text style={styles.messageTime}>晚上 12:00</Text>
                        </View>
                    )
                })}
            </View>
        )
    }
    render(){
        return (
            <SafeAreaView style={styles.scollBox} >
                <NavigationBar title='首页'></NavigationBar>
                <View style={styles.navBox}>
                    <View style={styles.navItem}>
                        <Text >私聊</Text>
                    </View>
                    <View style={styles.actItem}> 
                        <Text style={{color: '#fff'}}>聊天室</Text>
                    </View>
                </View>
                <ScrollView >
                    <View >
                        {this.renderUserList()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    scollBox: {
        flex: 1,
        backgroundColor: '#fff'
    },  
    navBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 2,
        shadowColor: '#f0f0f0',
        shadowOffset:{
            width: px2dp(0),
            height: px2dp(8)
        },  
        shadowOpacity: 0.4,
        height: px2dp(120),
        backgroundColor: '#fff'
    },
    navItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: px2dp(150),
        borderRadius: px2dp(40),
        height: px2dp(64),
        textAlign: 'center',
        backgroundColor: '#f7f7f7'
    },
    actItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: px2dp(150),
        borderRadius: px2dp(40),
        height: px2dp(64),
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#81c784'
    },
    userListBox: {
        paddingBottom: px2dp(40)
    },
    userItem: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: px2dp(120),
        paddingLeft: px2dp(30),
        paddingRight: px2dp(30),
    },
    userHead: {
        width: px2dp(70),
        height: px2dp(70),
        borderRadius: 50,
    },
    userContainer: {
        width: px2dp(400),
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: px2dp(18),
        height: px2dp(70),
    },
    userName: {
        color: '#333'
    },
    userContent: {
        color: '#666'
    },
    messageTime: {
        position: 'absolute',
        right: px2dp(30),
        top: px2dp(25),
        fontSize: px2dp(18),
        color: '#999'
    }
    
})

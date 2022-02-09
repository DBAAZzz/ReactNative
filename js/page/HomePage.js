import React, { Component } from 'react'
import {Text, View, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import NavigationBar from '../component/SimpleNavigationBar'
import computeTime from '../util/computeTime'
import HttpUtil from '../fetch/fetch'
import px2dp from '../util/px2dp'

export default class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: 1,
            refreshing: true,
            chatList: []
        }
    }
    _renderUserList(){
        let userHead = 'https://avatar-static.segmentfault.com/218/123/2181236988-5fa93a079c2d9_huge256';
        return (
            <View style={styles.userListBox} >
                {this.state.chatList.map((item, index) => {
                    return (
                        <TouchableOpacity activeOpacity={1} onPress={() => this.navToChat(item.id, item.userName)} style={styles.userItem} key={index} >
                            <Image
                                style={styles.userHead}
                                source={{uri: item.headImg || userHead}}
                            >
                            </Image>
                            <View style={styles.userContainer}>
                                <Text numberOfLines={1} style={styles.userName} >{item.userName}</Text>
                                <Text numberOfLines={1} style={styles.userContent}>{item.content}</Text>
                            </View>
                            <Text style={styles.messageTime}>{computeTime(Number(item.time))}</Text>
                        </TouchableOpacity>
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
                    <TouchableOpacity>
                        <View style={[
                            styles.navItem,
                            this.state.type == 1?styles.actItem : styles.normalItem
                        ]}>
                            <Text style={{color: this.state.type == 1 ? '#fff' : '#333'}} >私聊</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={[
                            styles.navItem, 
                            this.state.type == 2?styles.actItem : styles.normalItem
                        ]}> 
                            <Text style={{color: this.state.type == 2 ? '#fff' : '#333'}} >聊天室</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                <ScrollView >
                    <View >
                        {this._renderUserList()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
    navToChat(id, name){
        let { navigation } = this.props;
        navigation.navigate('chatPage',{
            id: id,
            name: name
        });
    }
    componentDidMount(){
        this.getChatListNet();
    }
    getChatListNet(){
        HttpUtil.get('/chat/getChatList').then((res) => {
            this.setState({
                chatList: res.list
            })  
        })
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
    },
    normalItem: {
        backgroundColor: '#f7f7f7'
    },
    actItem: {
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

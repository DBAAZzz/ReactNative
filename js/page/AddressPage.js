import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, 
    Text, View, Image, FlatList, TouchableHighlight,
    SectionList, TouchableOpacity, 
} from 'react-native'
import HttpUtil from '../fetch/fetch'
import px2dp from '../util/px2dp'
import NavigationBar from '../component/SimpleNavigationBar'
import theme from '../config/theme';

let icon1 = require('../../static/images/address/icon1.png')
let icon2 = require('../../static/images/address/icon2.png')
let icon3 = require('../../static/images/address/icon3.png')
let icon4 = require('../../static/images/address/icon4.png')

export default class AddressPage extends Component{
    constructor(props){
        super(props)
        this._sectionRef;
        this.state= {
            total: 0,
            sections: [],
        }
    }
    _renderUserList(){
        let { sections } = this.state;
        let userHead = 'https://avatar-static.segmentfault.com/218/123/2181236988-5fa93a079c2d9_huge256';
        return (
            <SectionList 
                ref={ref => (this._sectionRef = ref)}
                sections={sections}
                renderSectionHeader={(item) => {
                    return (
                        <View style={styles.lableBox}>
                            <Text>{item.section.title}</Text>
                        </View> 
                    )
                }}
                keyExtractor={(item, index) => index}
                numColumns={1}
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity  activeOpacity={0.8} onPress={() => this.navToInfo(item)} >
                            <View style={styles.userItem}>
                                <Image
                                    style={styles.userHead}
                                    source={{uri: item.headImg}}
                                ></Image>
                                <View style={styles.userContent}>
                                    <Text style={styles.userName} numberOfLines={1}>{item.userName}</Text>
                                    <Text style={styles.userNew} numberOfLines={1}>
                                        [我是你爹] 动态啥的
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                }}
            >
            </SectionList>
        )
    }
    _renderNavList(){
        let DATA = this.state.letterArr;
        return (
            <FlatList 
                style={styles.navListBox}    
                data={DATA}
                getItemLayout={this.renderItemLayout}
                keyExtractor={item => item}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        onPress={() => this._onSectionselect(index)}
                        underlayColor='transparent'    
                    >
                        <View style={styles.letterItem}>
                            <Text style={{textAlign: 'center', color: '#999'}}>{item}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            >
            </FlatList>
        )
    }
    _renderOpertation(){
        return (
            <View style={styles.operationBox} >
                <TouchableOpacity onPress={() => this._navToFindFriendPage()}>
                    <View style={styles.operationItem}>
                        <Image style={styles.imageIcon} source={icon1}>
                        </Image>
                        <View style={styles.textBox}><Text style={styles.text}>新的朋友</Text></View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.operationItem}>
                        <Image style={styles.imageIcon} source={icon2}>
                        </Image>
                        <View style={styles.textBox}><Text style={[
                            styles.text, { 'borderBottomColor':  '#fff'}
                        ]}>群聊</Text></View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.operationItem}>
                        <Image style={styles.imageIcon} source={icon3}>
                        </Image>
                        <View style={styles.textBox}><Text style={[
                            styles.text, { 'borderBottomColor':  '#fff'}
                        ]}>スライムの人生</Text></View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.operationItem}>
                        <Image style={styles.imageIcon} source={icon4}>
                        </Image>
                        <View style={styles.textBox}><Text style={[
                            styles.text, { 'borderBottomColor':  '#fff'}
                        ]}>未釈放の</Text></View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    render(){
        return(
            <SafeAreaView style={styles.addressBox}>
                <NavigationBar title='通讯录'></NavigationBar>
                <ScrollView >
                    {this._renderOpertation()}
                    <View >
                        {this._renderUserList()}
                    </View>
                    <View style={styles.numberBox}>
                        <Text style={{color: '#999'}}>{this.state.total}位联系人</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
    _onSectionselect(key){
        let offset = key * 50;      //点击了那个字母索引，没有section的header的高是50;key为0是即偏移0
        const { sections } = this.state;
        sections.map((item,index) => {
            if(key > index){        //要滚动的距离就是，点击的字母索引之前的所有内容，所以当 点击字母的索引 大于 sections（变量）的索引时；技术要滚动的高度
                //每个联系人的item高120;然后每个节点里面有length-1条分割线且高度为1
                offset = offset + item.data.length*120 + (item.data.length-1);      
             }
        });
        this._sectionRef.scrollToOffset({animated: true, offset: px2dp(offset)});
        
    }
    componentDidMount(){
        this.getAddressListNet();
    }
    getAddressListNet(){
        HttpUtil.get('/user/getFriendsList').then((res) => {
            this.setState({
                sections: res.friendsList,
                total: res.total
            })
        })
    }
    navToInfo(item){
        let { navigation } = this.props;
        navigation.navigate('UserInfoPage',{
            id: item.id,
            name: item.userName,
            headImg: item.headImg,
            intro: item.intro
        });
    }
    _navToFindFriendPage(){
        let { navigation } = this.props;
        navigation.navigate('FindFrindPage');
    }
}

const styles = StyleSheet.create({
    addressBox: {
        position: 'relative',
        flex: 1,
    },
    lableBox: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: px2dp(40),
        paddingRight: px2dp(40),
        height: px2dp(50),
        backgroundColor: '#f8f8f8'
    },
    userItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(40),
        paddingRight: px2dp(40),
        height: px2dp(120),
        backgroundColor: '#fff'
    },
    userHead: {
        width: px2dp(72),
        height: px2dp(72),
        borderRadius: px2dp(6)
    },
    userContent: {
        display: 'flex',
        flex: 1,
        paddingTop: px2dp(24),
        paddingBottom: px2dp(24),
        justifyContent: 'space-between',
        height: px2dp(120),
        marginLeft: px2dp(30),
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: px2dp(2)
    },
    userName: {
        color: '#333',
        fontWeight: '600',
        fontSize: px2dp(26)
    },
    userNew: {
        color: '#999',
        fontSize: px2dp(20)
    },
    numberBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: px2dp(80),
        backgroundColor: '#f8f8f8',
        fontSize: px2dp(22)
    },
    navListBox: {
        position: 'absolute',
        top: px2dp(160),
        right: px2dp(0),
        bottom: px2dp(100),
        width: px2dp(50),
    },
    letterItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: px2dp(50),
        height: px2dp(32),
        backgroundColor: 'transparent',
    },
    operationBox: {

    },
    operationItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(40),
        paddingRight: px2dp(40),
        height: px2dp(90),
        backgroundColor: '#fff'
    },
    imageIcon: {
        width: px2dp(60),
        height: px2dp(60)
    },
    textBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: px2dp(40),
        height: px2dp(90),
    },
    text: {
        width: px2dp(420),
        color: '#333',
        fontSize: px2dp(26)
    }
})
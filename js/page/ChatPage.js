import React, { Component } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, KeyboardAvoidingView, 
    TextInput, TouchableWithoutFeedback, TouchableOpacity, BackHandler  } from 'react-native';
    import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavigationBar from '../component/SimpleNavigationBar'
import AutoExpandingTextInput from '../component/AutoExpandingTextInput'
import EmotionsView from '../component/EmotionsView'
import RichTextWrapper from '../component/RichTextWrapper'
import HttpUtil from '../fetch/fetch'
import px2dp from '../util/px2dp';
import theme from '../config/theme'
import WebSocketClient from '../util/WebSocketClient'
import { EMOTIONS_ZHCN, invertKeyValues } from '../config/DataSource';

let emojiReg = new RegExp('\\[[^\\]]+\\]', 'g'); //表情符号正则表达式
let emojiIcon = require('../../static/images/emoji/icon.png')
let ws = new WebSocketClient();

export default class ChatPage extends Component{
    constructor(props){
        super(props);
        this.ScrollViewRef = null;
        let params = this.props.navigation.state.params;
        this.otherId =params.id;
        this.otherName =params.name;
        this.state = {
            cursorIndex: 0,
            message: '',
            finalMsg: '',
            emojiVisible: false,                                                                                                                                                     
            chatList: [],
            tempSendTxtArray: [],
            contentValue: ''
        }
    }
    _renderInputBox(){
        const { emojiVisible } = this.state;
        return (
            <View >
                <View style={styles.inputBox}>
                    <AutoExpandingTextInput onFocus={() => this._onFocus()} width={px2dp(400)} handleValue={this.handleValue.bind(this)}
                        backgroundColor='#fff' text={this.state.message} onSelectionChange={(event) => this._onSelectionChange(event)} 
                        onChangeText={(text) => this._onInputChangeText(text)}
                    >
                    </AutoExpandingTextInput>
                    <TouchableOpacity activeOpacity={1} onPress={() => this._changeEmojiVisible()} >
                        <Image style={styles.emoji} source={emojiIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.sendMessag()} >
                        <View style={styles.submitButton}>
                            <Text style={{color: '#fff'}}>发送</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    emojiVisible ? (
                        <View style={styles.otherContainer}>
                            <EmotionsView onSelected={(code) => this._onEmojiSelected(code)} />
                        </View>
                    ) : (<View></View>)
                }
            </View>
        )
    }
    render(){
        let userHead = 'https://avatar-static.segmentfault.com/218/123/2181236988-5fa93a079c2d9_huge256';
        return (
            <SafeAreaView style={styles.chatBody}>
                <NavigationBar title={this.otherName} shandow={true}></NavigationBar>
                <ScrollView ref={ref => (this.ScrollViewRef = ref)} 
                    onContentSizeChange={() => this.ScrollViewRef.scrollToEnd()}>
                    <View style={styles.chatBox}>
                        {this.state.chatList.map((item, index) => {
                            return (
                                item.identity == 0 ? 
                                <View key={index} style={styles.otherBox}  >
                                    <Image style={styles.head} source={{uri: userHead}}>
                                    </Image>
                                    <View style={styles.otherContent}>
                                        <RichTextWrapper textContent={item.content} color="#333">
                                        </RichTextWrapper>
                                    </View>
                                </View>
                                :
                                <View key={index} style={styles.ownBox}>
                                    <View style={styles.ownContent}>
                                        <RichTextWrapper textContent={item.content} color="#fff">
                                        </RichTextWrapper>
                                    </View>
                                    <Image style={styles.head} source={{uri: userHead}}>
                                    </Image>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
                {this._renderInputBox()}
            </SafeAreaView>
        )
    }
    componentDidMount(){
        
        ws.initWebSocket(this.getMessageCallback);
        this.getChatRecordNet();
        // 监听android端的后退按钮事件
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
    componentWillUnmount(){
        ws.close();
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }
    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true
    }
    getMessageCallback = (data) => {
        console.log('data', data)
        this.state.chatList.push({
            identity: 0,
            content: this._getFinalMsg(data)
        })
        this.setState({
            chatList: this.state.chatList,
        })
    }
    handleValue(value){
        this.setState({
            message: value
        })
    }
    _changeEmojiVisible() {
        this.setState({
            emojiVisible: !this.state.emojiVisible
        })
    }
    _onFocus() {
        this.setState({
            emojiVisible: false
        })
    }
    _getFinalMsg = (message) => {
        this.setState({
            tempSendTxtArray: [],
        });
        let finalMsg = '';
        if (message !== '' && message.length > 0) {
            this._matchContentString(message);
            for (let i = 0; i < this.state.tempSendTxtArray.length; i++) {
                finalMsg += this.state.tempSendTxtArray[i];
            }
            this._onInputChangeText('');
        }
        return finalMsg
    }
    sendMessag(){
        let finalMsg = this._getFinalMsg(this.state.message)
        ws.sendMessage(finalMsg, this.otherId)
        if(finalMsg == '') return ;
        this.state.chatList.push({
            identity: 1,
            content: finalMsg
        })
        this.setState({
            chatList: this.state.chatList,
            message: '',
            finalMsg: finalMsg
        })
    }
    _matchContentString(textContent) {
        // 匹配得到index并放入数组中
        let currentTextLength = textContent.length;
        let emojiIndex = textContent.search(emojiReg);
        let checkIndexArray = [];
        // 若匹配不到，则直接返回一个全文本
        if (emojiIndex === -1) {
            this.state.tempSendTxtArray.push(textContent.substring(0, currentTextLength));
        } else {
            if (emojiIndex !== -1) {
                checkIndexArray.push(emojiIndex);
            }
            // 取index最小者
            let minIndex = Math.min(...checkIndexArray);
            // 将0-index部分返回文本
            this.state.tempSendTxtArray.push(textContent.substring(0, minIndex));
            // 将index部分作分别处理
            this._matchEmojiString(textContent.substring(minIndex));
        }
    }
    _matchEmojiString(emojiStr) {
        let castStr = emojiStr.match(emojiReg);
        let emojiLength = castStr[0].length;
        let emotoins_code = invertKeyValues(EMOTIONS_ZHCN);
        this.state.tempSendTxtArray.push(emotoins_code[castStr[0]]);
        this._matchContentString(emojiStr.substring(emojiLength));
    }
    getChatRecordNet(){
        HttpUtil.get('/chat/getChatRecord', {
            id: this.otherId,
            type: 2
        }).then((res) => {
            this.setState({
                chatList: res.list
            })
        })
    }
    _onSelectionChange(event) {
        this.setState({
            cursorIndex: event.nativeEvent.selection.start,
        });
    }
    _onEmojiSelected(code) {
        if (code === '') {
            return;
        }
        let lastText = '';
        let currentTextLength = this.state.message.length;
        if (code === '/{del') { //删除键
            if (currentTextLength === 0) {
                return;
            }
            if (this.state.cursorIndex < currentTextLength) { //光标在字符串中间
                let emojiReg = new RegExp('\\[[^\\]]+\\]'); //表情符号正则表达式
                let emojiIndex = this.state.message.search(emojiReg); //匹配到的第一个表情符位置
                if (emojiIndex === -1) { //没有匹配到表情符
                    let preStr = this.state.message.substring(0, this.state.cursorIndex);
                    let nextStr = this.state.message.substring(this.state.cursorIndex);
                    lastText = preStr.substring(0, preStr.length - 1) + nextStr;
                    this.setState({
                        cursorIndex: preStr.length - 1,
                    });
                }
                else {
                    let preStr = this.state.message.substring(0, this.state.cursorIndex);
                    let nextStr = this.state.message.substring(this.state.cursorIndex);
                    let lastChar = preStr.charAt(preStr.length - 1);
                    if (lastChar === ']') {
                        let castArray = preStr.match(emojiReg);
                        if (!castArray) {
                            let cast = castArray[castArray.length - 1];
                            lastText = preStr.substring(0, preStr.length - cast.length) + nextStr;
                            this.setState({
                                cursorIndex: preStr.length - cast.length,
                            });
                        }
                        else {
                            lastText = preStr.substring(0, preStr.length - 1) + nextStr;
                            this.setState({
                                cursorIndex: preStr.length - 1,
                            });
                        }

                    } else {

                        lastText = preStr.substring(0, preStr.length - 1) + nextStr;
                        this.setState({
                            cursorIndex: preStr.length - 1,
                        });
                    }
                }

            }
            else {  //光标在字符串最后
                let lastChar = this.state.message.charAt(currentTextLength - 1);
                if (lastChar === ']') {
                    let castArray = this.state.message.match(emojiReg);
                    if (castArray) {
                        let cast = castArray[castArray.length - 1];
                        lastText = this.state.message.substring(0, this.state.message.length - cast.length);
                        this.setState({
                            cursorIndex: this.state.message.length - cast.length,
                        });
                    }
                    else {
                        lastText = this.state.message.substring(0, this.state.message.length - 1);
                        this.setState({
                            cursorIndex: this.state.message.length - 1,
                        });
                    }
                }
                else {
                    lastText = this.state.message.substring(0, currentTextLength - 1);
                    this.setState({
                        cursorIndex: currentTextLength - 1,
                    });
                }
            }
        }
        else {
            if (this.state.cursorIndex >= currentTextLength) {
                lastText = this.state.message + EMOTIONS_ZHCN[code];
                this.setState({
                    cursorIndex: lastText.length
                });
            }
            else {
                let preTemp = this.state.message.substring(0, this.state.cursorIndex);
                let nextTemp = this.state.message.substring(this.state.cursorIndex, currentTextLength);
                lastText = preTemp + EMOTIONS_ZHCN[code] + nextTemp;
                this.setState({
                    cursorIndex: this.state.cursorIndex + EMOTIONS_ZHCN[code].length
                });
            }
        }
        this.setState({
            message: lastText,
        });
    }
    _onInputChangeText(text) {
        this.setState({
            message: text,
        });
    }
}

const styles = StyleSheet.create({
    chatBody: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor,
   },
    chatBox: {
        paddingTop: px2dp(20),
    },
    otherBox: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: px2dp(30),
        paddingRight: px2dp(30),
        paddingTop: px2dp(16),
        paddingBottom: px2dp(16),
    },
    ownBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingLeft: px2dp(30),
        paddingRight: px2dp(30),
        paddingTop: px2dp(16),
        paddingBottom: px2dp(16),
    },
    head: {
        width: px2dp(74),
        height: px2dp(74),
        borderRadius: px2dp(10)
    },
    otherContent: {
        maxWidth: px2dp(450),
        marginLeft: px2dp(20),
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        paddingTop: px2dp(20),
        paddingBottom: px2dp(20),
        backgroundColor: '#fff',
        borderRadius: px2dp(10)
    },
    ownContent: {
        maxWidth: px2dp(450),
        marginRight: px2dp(20),
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        paddingTop: px2dp(20),
        paddingBottom: px2dp(20),
        backgroundColor: '#4BB17B',
        borderRadius: px2dp(10)
    },
    inputBox:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: px2dp(90),
        paddingTop: px2dp(10),
        paddingBottom: px2dp(10),
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        borderTopWidth: px2dp(2),
        borderTopColor: '#f2f2f2',
        backgroundColor: theme.pageBackgroundColor,
    },
    input: {
        height: px2dp(60),
        width: px2dp(400),
        color: '#fff'
    },
    submitButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: px2dp(100),
        height: px2dp(60),
        borderRadius: px2dp(8),
        backgroundColor: theme.themeColor
    },
    emoji: {
        width: px2dp(50),
        height: px2dp(50)
    }
})
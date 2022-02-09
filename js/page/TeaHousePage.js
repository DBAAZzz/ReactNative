import React, { Component } from 'react'
import {
    StyleSheet, Text, View, TouchableHighlight,
    ScrollView, Image, BackHandler, StatusBar
} from 'react-native'
import px2dp from '../util/px2dp';
import { ifIphoneX } from '../util/iphone-x-helper'
import Swiper from 'react-native-swiper'
import HttpUtil from '../fetch/fetch'
import theme from '../config/theme'
import computeTime from '../util/computeTime'

let likeIcon = require('../../static/images/teaHouse/like_icon.png')
let commitIcon = require('../../static/images/teaHouse/commit_icon.png')
let shareIcon = require('../../static/images/teaHouse/share_icon.png')
let nolikeIcon = require('../../static/images/teaHouse/nolike_icon.png')

export default class TeaHousePage extends Component {
    constructor(props) {
        super(props)
        this.queryForm = {
            pageNo: 0,
            pageSize: 10
        }
        this.loading = false;
        this.total = 0;
        this.state = {
            isBottom: false,
            swiperImgs: [
                'http://139.196.100.226/images/i-illust-nm0131-3-01.jpg',
                'http://139.196.100.226/images/i-illust-nm0131-3-03.jpg',
                'http://139.196.100.226/images/i-illust-nm0131-3-04.jpg',
                'http://139.196.100.226/images/i-illust-nm0131-3-07.jpg',
                'http://139.196.100.226/images/i-illust-nm0131-3-08.jpg',
                'http://139.196.100.226/images/i-illust-nm0131-3-09.jpg',
                'http://139.196.100.226/images/i-illust-nm0131-3-10.jpg'
            ],
            momentsArr: []
        }
    }
    _renderSwiperItem() {
        return (
            this.state.swiperImgs.map((item, index) => {
                return (
                    <Image key={index} style={styles.swiperItem} source={{ uri: item }}
                    ></Image>
                )
            })
        )
    }
    _renderNewItem() {
        let userHead = 'https://avatar-static.segmentfault.com/218/123/2181236988-5fa93a079c2d9_huge256';
        return (
            this.state.momentsArr.map((item, index) => {
                return (
                    <View key={index} style={styles.newItem}>
                        <View style={styles.userBox}>
                            <Image style={styles.userHead} source={{ uri: userHead }} />
                            <View style={styles.userContent}>
                                <Text numberOfLines={1} style={styles.userName}>{item.userName}</Text>
                                <Text numberOfLines={1} style={styles.time}>{computeTime(Number(item.publishTime))}</Text>
                            </View>
                        </View>
                        <View style={styles.newsContainer}>
                            <Text style={styles.content}>{item.content}</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            {item.imageList.map((imageItem, imageIndex) => {
                                return (
                                    <Image key={imageIndex} style={
                                        [
                                            item.imageList.length == 1 ? styles.imageOne : {},
                                            item.imageList.length == 2 ? styles.imageTwo : {},
                                            item.imageList.length == 3 ? styles.imageThree : {}
                                        ]
                                    } source={{ uri: imageItem }}>
                                    </Image>
                                )
                            })}
                        </View>
                        <View style={styles.operationBox}>
                            <TouchableHighlight onPress={() => this._likeNew(index, item._id)} underlayColor='transparent' >
                                <View style={[styles.operationItem, styles.width1]}>
                                    <Image style={styles.icon}
                                        source={item.like ? likeIcon : nolikeIcon}
                                    >
                                    </Image>
                                    <Text>Like</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight  >
                                <View style={[styles.operationItem, styles.width1]}>
                                    <Image style={styles.icon}
                                        source={commitIcon}
                                    >
                                    </Image>
                                    <Text>Commit</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight>
                                <View style={[styles.operationItem, styles.width2]} >
                                    <Image style={styles.icon}
                                        source={shareIcon}
                                    >
                                    </Image>
                                    <Text>Share</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                )
            })
        )
    }
    render() {
        let { isBottom } = this.state
        return (
            <ScrollView style={ifIphoneX(styles.isPhoneXStyle, styles.commonStyle)} 
                onMomentumScrollEnd={(event) => this._isCloseToBottom(event.nativeEvent)}
            >
                <StatusBar translucent={true} backgroundColor="transparent"
                    barStyle={'dark-content'}
                >
                </StatusBar>
                <Swiper style={styles.wrapper}
                    removeClippedSubviews={false}
                    autoplayTimeout={4}
                    showsPagination={false}
                    showsButtons={false}
                    autoplay={true}
                    loop={true}
                >
                    {this._renderSwiperItem()}
                </Swiper>
                {this._renderNewItem()}
                {isBottom ? <View style={styles.overBox} >
                    <Text style={styles.overText}>没有更多了~呜呜呜</Text>
                </View> : null}
            </ScrollView>
        )
    }
    componentDidMount() {
        this.getAllMomentList();
        // 监听android端的后退按钮事件
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }
    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true
    }
    async getAllMomentList() {
        if (!this.loading) {
            this.loading = true;
            this.queryForm.pageNo++;
            let { list, total } = await HttpUtil.get('/moments/getAllMoments', {
                pageNo: this.queryForm.pageNo,
                pageSize: this.queryForm.pageSize
            })
            this.loading = false;
            this.total = total;
            this.setState({
                momentsArr: this.state.momentsArr.concat(list)
            })
        }

    }
    // 喜欢该动态
    _likeNew(index, id) {
        let arr = this.state.momentsArr;
        arr[index].like = !arr[index].like;
        this.setState({
            momentsArr: arr
        })
        this.likeOrCancleMoment(id, arr[index].like ? 1 : 0);
    }
    // 滚动到底部了
    _isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
        const paddingToBottom = px2dp(20);
        let bool = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
        if (bool && this.state.momentsArr.length < this.total) {
            this.getAllMomentList();
        } else {
            this.setState({
                isBottom: true
            })
        }
    }
    async likeOrCancleMoment(id, type) {
        await HttpUtil.post('/moments/likes', {
            id: id,
            type: type
        })
    }
}

const styles = StyleSheet.create({
    isPhoneXStyle: {
        marginBottom: px2dp(30),
        backgroundColor: theme.pageBackgroundColor
    },
    commonStyle: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    wrapper: {
        height: px2dp(640),
    },
    swiperItem: {
        width: px2dp(640),
        height: px2dp(640),
    },
    newItem: {

    },
    userBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: px2dp(140),
        paddingLeft: px2dp(40),
        marginTop: px2dp(20),
        paddingRight: px2dp(40),
        backgroundColor: '#fff',
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: px2dp(2)
    },
    userHead: {
        width: px2dp(80),
        height: px2dp(80),
        borderRadius: px2dp(50)
    },
    userContent: {
        display: 'flex',
        justifyContent: 'space-between',
        width: px2dp(350),
        height: px2dp(72),
        marginLeft: px2dp(20)
    },
    userName: {
        color: '#333',
        fontWeight: '600',
        fontSize: px2dp(26),
        marginRight: px2dp(10)
    },
    time: {
        color: '#666',
        fontSize: px2dp(22)
    },
    newsContainer: {
        display: 'flex',
        paddingTop: px2dp(20),
        paddingBottom: px2dp(20),
        paddingLeft: px2dp(40),
        paddingRight: px2dp(40),
        color: theme.black1,
        backgroundColor: '#fff',

    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: px2dp(40),
        paddingRight: px2dp(40),
        paddingBottom: px2dp(40),
        backgroundColor: '#fff',
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: px2dp(2)
    },
    imageOne: {
        width: px2dp(560),
        height: px2dp(300),
    },
    imageTwo: {
        width: px2dp(270),
        height: px2dp(200),
    },
    imageThree: {
        width: px2dp(180),
        height: px2dp(200)
    },
    content: {
        fontSize: px2dp(24),
        lineHeight: px2dp(40)
    },
    operationBox: {
        display: 'flex',
        flexDirection: 'row',
        height: px2dp(120),
        paddingLeft: px2dp(40),
        paddingRight: px2dp(40),
        backgroundColor: '#fff'
    },
    operationItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: px2dp(120),
        paddingTop: px2dp(16),
        paddingBottom: px2dp(16),
        color: theme.black1,
    },
    width1: {
        width: px2dp(170)
    },
    width2: {
        width: px2dp(220),
    },
    icon: {
        width: px2dp(40),
        height: px2dp(40),
        marginRight: px2dp(20)
    },
    overBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: px2dp(100),
    },
    overText: {
        fontSize: px2dp(22),
        color: theme.black1
    }
})
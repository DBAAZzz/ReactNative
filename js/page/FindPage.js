import React, { Component } from 'react'
import { Text, View, SafeAreaView, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native'
import NavigationBar from '../component/SimpleNavigationBar'
import px2dp from '../util/px2dp'

let icon1 = require('../../static/images/find/icon1.png')
let icon2 = require('../../static/images/find/icon2.png')
let icon3 = require('../../static/images/find/icon3.png')
let icon4 = require('../../static/images/find/icon4.png')
let addIcon = require('../../static/images/find/add_icon.png')

export default class FindPage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <SafeAreaView style={styles.Body} >
                <NavigationBar title='发现'></NavigationBar>
                <ScrollView >
                    <TouchableOpacity onPress={() => this._navToTeaHouse()}>
                        <View style={styles.funcBox}>
                            <Image
                                style={styles.image}
                                source={icon1}
                            />
                            <View style={styles.wordBox}>
                                <Text style={{ color: '#333' }}>茶馆</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.funcBox}>
                        <Image
                            style={styles.image}
                            source={icon2}
                        />
                        <View style={styles.wordBox}>
                            <Text style={{ color: '#333' }}>星座</Text>
                        </View>
                    </View>
                    <View style={styles.funcBox}>
                        <Image
                            style={styles.image}
                            source={icon3}
                        />
                        <View style={styles.wordBox}>
                            <Text style={{ color: '#333' }}>地球</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => this._navToPublishPage()} >
                        <View style={styles.funcBox}>
                            <Image
                                style={styles.image}
                                source={icon4}
                            />
                            <View style={styles.wordBox}>
                                <Text style={{ color: '#333' }}>信号发射器</Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </ScrollView>

            </SafeAreaView>
        )
    }

    _navToPublishPage() {
        let { navigation } = this.props;
        navigation.navigate('PublishPage')
    }

    _navToTeaHouse() {
        let { navigation } = this.props;
        navigation.navigate('TeaHousePage')
    }
}

const styles = StyleSheet.create({
    Body: {
        position: 'relative',
        flex: 1,
        backgroundColor: '#f8f8f8'
    },
    funcBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(40),
        paddingRight: px2dp(40),
        height: px2dp(94),
        backgroundColor: '#fff',
        marginBottom: px2dp(24)
    },
    image: {
        width: px2dp(50),
        height: px2dp(50)
    },
    wordBox: {
        marginLeft: px2dp(20)
    }
})
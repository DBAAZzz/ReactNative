import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import px2dp from '../util/px2dp'

export default class TestPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dialogVisiable: true,
            fadeAnim: new Animated.Value(0),
        }
    }
    fadeIn = () => {
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start();
    }
    fadeOut = () => {
        // Will change fadeAnim value to 0 in 5 seconds
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 5000,
            useNativeDriver: true
        }).start();
    };
    render() {
        let { dialogVisiable } = this.state;
        return (
            <View style={styles.testBody}>
                <Text>1111</Text>
                <TouchableOpacity onPress={() => this._touchButton()}>
                    <View style={styles.buttonStyle} >
                        <Text>我这是按钮</Text>
                    </View>
                </TouchableOpacity>
                {
                    dialogVisiable ?
                        <Animated.View style={[
                            styles.dialog,
                            // {opacity: this.state.fadeAnim }
                        ]}>
                            <Text>我是一个弹窗</Text>
                        </Animated.View>
                        : null
                }
            </View>

        )
    }
    _touchButton() {
        console.log('点击了按钮')
        // if (this.state.dialogVisiable == true) {
        //     console.log('fadeIn')
        //     this.fadeIn()
        // } else {
        //     console.log('fadeOut')
        //     this.fadeOut()

        // }
        // this.setState({
        //     dialogVisiable: !this.state.dialogVisiable
        // })

    }
}

const styles = StyleSheet.create({
    testBody: {
        position: 'relative',
        flex: 1,
    },
    buttonStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: px2dp(150),
        height: px2dp(50),
        backgroundColor: 'red'
    },
    dialog: {
        position: 'absolute',
        bottom: 0,
        width: px2dp(400),
        height: px2dp(320),
        backgroundColor: 'blue',
        // transform: [
        //     {
        //         translateY: px2dp(-100)
        //     }
        // ]
    }
})
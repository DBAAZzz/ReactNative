/**
 * Desc: //富文本(表情)控件
 *
 * Created by WangGanxin on 2018/2/24
 * Email: mail@wangganxin.me
 */

import React, { Component, PureComponent } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
} from 'react-native';

import { EMOTIONS_DATA } from '../config/DataSource';
import PropTypes from 'prop-types';
import px2dp from '../util/px2dp';

let emojiReg = new RegExp('\\/\\{[a-zA-Z_]{1,14}\\}'); //表情符号正则表达式

export default class RichTextWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Views: [],
        };
        this.state.Views.length = 0;
        let textContent = props.textContent;
        this._matchContentString(textContent);   
    }

    _matchContentString(textContent) {
        // 匹配得到index并放入数组中
        let emojiIndex = textContent.search(emojiReg);
        let checkIndexArray = [];

        // 若匹配不到，则直接返回一个全文本
        if (emojiIndex === -1) {
            this.state.Views.push(<Text style={[styles.textStyle, {color: this.props.color}]} key={'emptyTextView' + (Math.random() * 100)}>{textContent}</Text>);
        } else {

            if (emojiIndex !== -1) {
                checkIndexArray.push(emojiIndex);
            }
            // 取index最小者
            let minIndex = Math.min(...checkIndexArray);
            // 将0-index部分返回文本
            this.state.Views.push(<Text style={[styles.textStyle, {color: this.props.color}]} key={'firstTextView' + (Math.random() * 100)}>{textContent.substring(0, minIndex)}</Text>);
            // 将index部分作分别处理
            this._matchEmojiString(textContent.substring(minIndex));
        }
    }
    _matchEmojiString(emojiStr) {
        let castStr = emojiStr.match(emojiReg);
        let emojiLength = castStr[0].length;
        let emojiImg = EMOTIONS_DATA[castStr[0]];
        if (emojiImg) {
            this.state.Views.push(<Image key={emojiStr} style={styles.subEmojiStyle} resizeMethod={'auto'} source={emojiImg} />);
        }
        this._matchContentString(emojiStr.substring(emojiLength));
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.Views}
            </View>
        );  
    }

}

RichTextWrapper.propTypes = {
    textContent: PropTypes.string,
    color: PropTypes.string
};

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },

    subEmojiStyle: {
        width: px2dp(32),
        height: px2dp(32),
    },
    textStyle: {
        fontSize: px2dp(24)
    }

});
/**
 * Desc: EmotionsChildView
 *
 * Created by WangGanxin on 2018/1/31
 * Email: mail@wangganxin.me
 */

import React, { Component, PureComponent } from 'react';
import {
    View,
    Image,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';

import PropTypes from 'prop-types';
import { EMOTIONS_DATA } from '../config/DataSource';
import px2dp from '../util/px2dp';

export default class EmotionsChildView extends PureComponent {

    constructor(props) {
        super(props);

    }

    _rednerItem = (item) => {

        if (item.item.value === '/{del') {
            return <TouchableWithoutFeedback onPress={() => this.props.onPress(item.item.value)}>
                <View key={item.item.key} style={styles.itemStyle}>
                </View>
            </TouchableWithoutFeedback>;
        }
        return <TouchableWithoutFeedback onPress={() => this.props.onPress(item.item.value)}>
            <View key={item.item.key} style={styles.itemStyle}>
                <Image style={styles.emojiStyle} source={EMOTIONS_DATA[item.item.value]} />
            </View>
        </TouchableWithoutFeedback>;

    }

    render() {
        return (
            <FlatList
                style={[styles.wrapper, this.props.style]}
                horizontal={false}
                numColumns={10}
                refreshing={false}
                scrollEnabled={false}
                data={this.props.dataSource}
                renderItem={this._rednerItem} />
        );
    }

}

EmotionsChildView.propTypes = {

    dataSource: PropTypes.array.isRequired,
    onPress: PropTypes.func,
};

EmotionsChildView.defaultProps = {
    dataSource: [],
};

const styles = StyleSheet.create({

    wrapper: {
        width:px2dp(640),
        height: px2dp(200),
        paddingLeft: px2dp(20),
        paddingRight: px2dp(20),
        backgroundColor: '#fff'
    },

    itemStyle: {
        width: px2dp(60),
        height: px2dp(64),
        justifyContent: 'center',
        alignItems: 'center',
    },

    emojiStyle: {
        width: px2dp(50),
        height: px2dp(50),
    },

    deleteStyle: {
        width: px2dp(50),
        height: px2dp(50),
    }
});
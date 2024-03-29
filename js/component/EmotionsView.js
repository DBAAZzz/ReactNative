/**
* Desc: 表情选择view
*
* Created by WangGanxin on 2018/1/31
* Email: mail@wangganxin.me
*/

import React, { Component, PureComponent } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper'
import PropTypes from 'prop-types';
// import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import EmotionsChildView from './EmotionsChildView';
import { EMOTIONS_DATA } from '../config/DataSource';
import px2dp from '../util/px2dp';

export default class EmotionsView extends PureComponent {
    constructor(props) {
        super(props);
        this.state = ({

        });
    }

    _objToStrMap(obj) {
        let strMap = new Map();
        for (let key of Object.keys(obj)) {
            strMap.set(key, obj[key]);
        }
        return strMap;
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={5} dotStyle={styles.dotStyle} selectedDotStyle={styles.selectedDotStyle} />;
    }

    _renderPagerView() {
        let viewItems = [];
        let dataMaps = this._objToStrMap(EMOTIONS_DATA);
        let dataKeys = [];

        //抽取代表符
        let index = 0;
        for (let data of dataMaps.keys()) {
            dataKeys.push({
                key: index,
                value: data,
            });
            index++;
        }

        //分页
        let page0 = dataKeys.slice(0, 30);
        let page1 = dataKeys.slice(20, 40);
        let page2 = dataKeys.slice(40, 60);
        let page3 = dataKeys.slice(60, 80);
        let page4 = dataKeys.slice(80, 100);

        viewItems.push(<View key={0}><EmotionsChildView key={0} dataSource={page0} onPress={(code) => this.props.onSelected(code)} /></View>);
        // viewItems.push(<View key={1}><EmotionsChildView key={1} dataSource={page1} onPress={(code) => this.props.onSelected(code)} /></View>);
        // viewItems.push(<View key={2}><EmotionsChildView key={2} dataSource={page2} onPress={(code) => this.props.onSelected(code)} /></View>);
        // viewItems.push(<View key={3}><EmotionsChildView key={3} dataSource={page3} onPress={(code) => this.props.onSelected(code)} /></View>);
        // viewItems.push(<View key={4}><EmotionsChildView key={4} dataSource={page4} onPress={(code) => this.props.onSelected(code)} /></View>);
        return viewItems;
    }

    render() {
        return (
            <View>
                {this._renderPagerView()}
                {/* <View key={0}><EmotionsChildView key={0} dataSource={page0} onPress={(code) => this.props.onSelected(code)} /></View> */}
            </View>
            // <IndicatorViewPager
            //     style={styles.wrapper}
            //     indicator={this._renderDotIndicator()}>
            //     {this._renderPagerView()}
            // </IndicatorViewPager>
        );
    }

}

EmotionsView.propTypes = {
    onSelected: PropTypes.func,
};

const styles = StyleSheet.create({

    wrapper: {
        width: '100%',
        backgroundColor: 'blue'
    },

    dotStyle: {
        backgroundColor: '#f5f5f5',
    },

    selectedDotStyle: {
        backgroundColor: '#BBBBBB',
    },

});
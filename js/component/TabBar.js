import React, { Component } from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
import px2dp from '../util/px2dp'
import HomePage from '../page/HomePage'
import AddressPage from '../page/AddressPage'
import FindPage from '../page/FindPage'
import MinePage from '../page/MinePage'
let home = require('../../static/images/home.png')
let address = require('../../static/images/address.png')
let find = require('../../static/images/find.png')
let my = require('../../static/images/my.png')

export default class TabBar extends Component{

    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'address',
            tabName: ['首页', '通信录', '发现', '我的']
        }
    }
    render(){
        let { tabName, selectedTab } = this.state;
        return (
            <TabNavigator
                tabBarStyle={styles.tabbar}
            >
                <TabNavigator.Item title={tabName[0]}
                    selected={selectedTab === 'home'}
                    selectedTitleStyle={styles.tabStyle}
                    renderIcon={() => <Image style={styles.tabIcon} source={home}/>}
                    renderSelectedIcon={() => <Image style={styles.tabIcon} source={home}/>}
                    onPress={() => {this.setState({ selectedTab: 'home' })}}
                >
                    {<HomePage navigation={this.props.navigation} ></HomePage>}
                </TabNavigator.Item>
                <TabNavigator.Item title={tabName[1]}
                    selected={selectedTab === 'address'}
                    selectedTitleStyle={styles.tabStyle}
                    renderIcon={() => <Image style={styles.tabIcon} source={address}/>}
                    renderSelectedIcon={() => <Image style={styles.tabIcon} source={address}/>}
                    onPress={() => {this.setState({ selectedTab: 'address' })}}
                >
                    {<AddressPage navigation={this.props.navigation} ></AddressPage>}
                </TabNavigator.Item>
                <TabNavigator.Item title={tabName[2]}
                    selected={selectedTab === 'find'}
                    selectedTitleStyle={styles.tabStyle}
                    renderIcon={() => <Image style={styles.tabIcon} source={find}/>}
                    renderSelectedIcon={() => <Image style={styles.tabIcon} source={find}/>}
                    onPress={() => {this.setState({ selectedTab: 'find' })}}
                >
                    {<FindPage navigation={this.props.navigation}></FindPage>}
                </TabNavigator.Item>
                <TabNavigator.Item title={tabName[3]}
                    selected={selectedTab === 'mine'}
                    selectedTitleStyle={styles.tabStyle}
                    renderIcon={() => <Image style={styles.tabIcon} source={my}/>}
                    renderSelectedIcon={() => <Image style={styles.tabIcon} source={my}/>}
                    onPress={() => {this.setState({ selectedTab: 'mine' })}}
                >
                    {<MinePage navigation={this.props.navigation}></MinePage>}
                </TabNavigator.Item>
            </TabNavigator>
        )
    }

    componentDidMount(){

    }

    
}

const styles = StyleSheet.create({
    tabbar: {
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
    },  
    tabStyle: {
        color: '#81c784',
    },
    tabIcon: {
        width: px2dp(40),
        height: px2dp(40)
    }
})
import React, { Component } from 'react'
import { Image, StyleSheet, Text } from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
import px2dp from '../util/px2dp'
import HomePage from '../page/HomePage'
import AddressPage from '../page/AddressPage'
let home = require('../../static/images/home.png')
let address = require('../../static/images/address.png')
let find = require('../../static/images/find.png')
let my = require('../../static/images/my.png')

export default class TabBar extends Component {

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
                    {<HomePage navigator={this.props.navigator} ></HomePage>}
                </TabNavigator.Item>
                <TabNavigator.Item title={tabName[1]}
                    selected={selectedTab === 'address'}
                    selectedTitleStyle={styles.tabStyle}
                    renderIcon={() => <Image style={styles.tabIcon} source={address}/>}
                    renderSelectedIcon={() => <Image style={styles.tabIcon} source={address}/>}
                    onPress={() => {this.setState({ selectedTab: 'address' })}}
                >
                    {<AddressPage navigator={this.props.navigator} ></AddressPage>}
                </TabNavigator.Item>
                <TabNavigator.Item title={tabName[2]}
                    selected={selectedTab === 'find'}
                    selectedTitleStyle={styles.tabStyle}
                    renderIcon={() => <Image style={styles.tabIcon} source={find}/>}
                    renderSelectedIcon={() => <Image style={styles.tabIcon} source={find}/>}
                    onPress={() => {this.setState({ selectedTab: 'find' })}}
                >
                    {<Text>333</Text>}
                </TabNavigator.Item>
                <TabNavigator.Item title={tabName[3]}
                    selected={selectedTab === 'my'}
                    selectedTitleStyle={styles.tabStyle}
                    renderIcon={() => <Image style={styles.tabIcon} source={my}/>}
                    renderSelectedIcon={() => <Image style={styles.tabIcon} source={my}/>}
                    onPress={() => {this.setState({ selectedTab: 'my' })}}
                >
                    {<Text>444</Text>}
                </TabNavigator.Item>
            </TabNavigator>
        )
    }

    UNSAFE_componentDidMount(){

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
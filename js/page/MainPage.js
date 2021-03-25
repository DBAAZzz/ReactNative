import React, { Component } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import TabBar from '../component/TabBar'

export default class MainScene extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            // flex:1则这个元素充满整个屏幕
            <SafeAreaView style={styles.container}>
                <TabBar navigator={this.props.navigator}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'flex-end',
        backgroundColor: '#f8f8f8'
    }
})
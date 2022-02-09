import React, { Component } from 'react'
import {Text, StyleSheet, View, ScrollView, RefreshControl} from 'react-native';

export default class HomeTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing: true
        }
    }
    render(){
        return (
            <Text>哈哈哈哈哈</Text>
        )
    }
}
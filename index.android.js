/**
 * @format
 */

 import React, { Component } from 'react';
 import { AppRegistry } from 'react-native';
 import Navigation from './js/config/entry'
 import {name as appName} from './app.json';

 export default class Client extends Component{
    render(){
        return (
            <Navigation />
        )
    };
 }
 
 AppRegistry.registerComponent(appName, () => Client);
 
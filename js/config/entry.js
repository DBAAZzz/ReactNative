import React, { Component } from 'react'
import MainPage from '../page/MainPage'
import SignInPage from '../page/SignInAndSignUp/SignInPage'
import SingUpPage from '../page/SignInAndSignUp/SignUpPage'
import PublishPage from '../page/PublishPage'
import chatPage from '../page/ChatPage'
import UserInfoPage from '../page/UserInfoPage'
import TeaHousePage from '../page/TeaHousePage'
import FindFrindPage from '../page/FindFriendPage'
import TestPage from '../page/TestPage'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'; //坑：安装版本1.9.4
import withAuth from './withAuth'

const redirectPage = withAuth(MainPage);

const StackNavigator = createStackNavigator(
    {
        redirectPage: {
            screen: redirectPage
        },
        Home: {
            screen: MainPage,
        },
        SignInPage: {
            screen: SignInPage
        },
        SingUpPage: {
            screen: SingUpPage
        },
        chatPage: {
            screen: chatPage
        },
        PublishPage: {
            screen: PublishPage
        },
        UserInfoPage: { 
            screen: UserInfoPage
        },
        TeaHousePage: {
            screen: TeaHousePage
        },
        FindFrindPage: {
            screen: FindFrindPage
        },
        TestPage: {
            screen: TestPage
        }
    },
    {
        initialRouteName: 'redirectPage',
        defaultNavigationOptions: {
            headerShown: false,
        },
    },
);


const AppContainer = createAppContainer(StackNavigator);

export default class App extends Component{
    constructor(){
        super()
    }
    render(){
        return (
            <AppContainer />
        )
    }
}
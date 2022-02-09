import React, { Component } from "react";
import { BackHandler, SafeAreaView, ScrollView, StyleSheet, 
    Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import NavigationBar from '../component/SimpleNavigationBar'
import { launchImageLibrary } from 'react-native-image-picker';
import HttpUtil from '../fetch/fetch'
import px2dp from "../util/px2dp";
import theme from '../config/theme'

let addIcon = require('../../static/images/publish/add.png')

export default class PublishPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            imgList: [],
            content: ''
        }
    }
    _renderTextInput(){
        return (
            <TextInput placeholder="What do you think" style={styles.inputBox}
                placeholderTextColor="#999" clearButtonMode="while-editing"
                maxLength={200} multiline={true} textAlign="left" textAlignVertical={'top'}
                underlineColorAndroid='transparent' onChangeText={(text) => this.getInputValue(text)}
            >
            </TextInput>
        )
    }
    _renderUpload(){
        return (
            <View>
                <View style={styles.ImageShowBox} >
                    {this.state.imgList.map((item, index) => {
                        return (
                            <Image key={index} style={styles.uploadImage}
                                source={{uri: item}}>
                            </Image>
                        )
                    })}
                    <TouchableOpacity onPress={() => this.selectImage()} >
                        <View style={styles.uploadBox}>
                            <Image source={addIcon} style={styles.addIcon}> 
                            </Image>
                        </View>
                    </TouchableOpacity>        
                </View>
            </View>
        )
    }
    _renderButton(){
        return (
            <TouchableOpacity onPress={() => this.publish()}>
                <View style={styles.publishButton}>
                    <Text style={styles.buttonText}>发散</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render(){
        return (
            <SafeAreaView style={styles.body}>
                <NavigationBar title="茶味"></NavigationBar>
                <ScrollView>
                    <View style={styles.container} >
                        {this._renderTextInput()}
                        {this._renderUpload()}
                        {this._renderButton()}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid)
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid)
    }
    onBackAndroid = () => {
        this.props.navigation.goBack();
        return true
    }
    getInputValue(text){
        this.state.content = text;
    }
    selectImage(){
        let options = {
            mediaType: 'photo',
            quality: 1,
        }
        launchImageLibrary(options, response => {
            if(response.didCancel){
                console.log('User cancelled photo picker');
            }else if(response.error){
                console.log('ImagePicker Error: ', response.error)
            }else if(response.customButton){
                console.log('User tapped custom button: ', response.customButton);
            }else{
                let source = { uri: response.uri }
                this.uploadImage(response)
            }
        })
    }
    async uploadImage(image){
        let formData = new FormData();
        let file = {uri: image.uri, type: 'multipart/form-data', name: 'image.png'};  
        formData.append('file',file);
        let data = await HttpUtil.upload('/file/upload', formData);
    }
    async publish(){
        let { navigation } = this.props;
        if(this.state.content == '') return ;
        HttpUtil.post('/moments/publish', {
            content: this.state.content,
            imageList: this.state.imgList,
        }).then((res) => {
            navigation.goBack();
        })
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: theme.pageBackgroundColor
    },
    container: {
        paddingLeft: px2dp(30),
        paddingRight: px2dp(30)
    }, 
    inputBox: {
        padding: px2dp(0),
        height: px2dp(300),
        fontSize: px2dp(26),
    },
    ImageShowBox: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: px2dp(40),
    }, 
    uploadBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: px2dp(170),
        height: px2dp(170),
        backgroundColor: '#f0f0f0',
        marginBottom: px2dp(22)
    },
    uploadImage: {
        width: px2dp(170),
        height: px2dp(170),
        marginRight: px2dp(22),
        marginBottom: px2dp(22)
    },  
    addIcon: {
        width: px2dp(60),
        height: px2dp(60),
    },
    publishButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: px2dp(80),
        marginTop: px2dp(40),
        backgroundColor: theme.themeColor,
        borderRadius: px2dp(10)
    },
    buttonText: {
        fontSize: px2dp(26),
        color: '#333'
    }
})
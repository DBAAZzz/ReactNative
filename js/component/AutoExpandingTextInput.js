import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import px2dp from '../util/px2dp';

export default class AutoExpandingTextInput  extends Component {
    constructor(props){
        super(props);
        this.state = {
            height: 0,
        };
    }   
    render(){
        return (
            <TextInput
                {...this.props}
                multiline={true} numberOfLines={3}
                onContentSizeChange={(event) => {
                    this.setState({height: event.nativeEvent.contentSize.height});
                }}
                onContentSizeChange={(event) => this.onChange(event)}
                onChangeText={(value) => this.changeText(value)}
                style={[styles.default, { height: Math.max(px2dp(40), this.state.height)}]}
                value={this.props.text}
            />
        );
    }
    onContentSizeChange(event) {
        let height = event.nativeEvent.contentSize.height;
        this.changeHeight(height);
    }

    changeText(value){
        this.props.handleValue(value);
    }

    onChange(event) {
        if (Platform.OS === 'android') {
            let height = event.nativeEvent.contentSize.height;
            console.log('height', height)
            this.changeHeight(height);
        }
    }
    changeHeight(height) {
        let {
          minHeight = px2dp(40),
          maxHeight = px2dp(120),
        } = this.props;
        if (height < minHeight) {
          height = minHeight;
        } else if (maxHeight && height > maxHeight) {
          height = maxHeight;
        }
        if (height !== this.state.height) {
          this.setState({height: height});
        }
        
    }
}


const styles = StyleSheet.create({
    default: {

    }
})
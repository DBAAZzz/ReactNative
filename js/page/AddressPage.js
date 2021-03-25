import React, { Component } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, 
    Text, View, Image, FlatList, TouchableHighlight,
    SectionList, 
} from 'react-native'
import px2dp from '../util/px2dp'
import NavigationBar from '../component/SimpleNavigationBar'

export default class AddressPage extends Component{
    constructor(props){
        super(props)
        this._sectionRef;
        this.state= {
            sections: [
                {
                    title: 'A',
                    data: [
                        {
                            name: '阿里云',
                        },
                        {
                            name: '矮个的将军'
                        },
                        {
                            name: '变态'
                        },
                        {
                            name: '贝蒂'
                        },
                        {
                            name: '背影'
                        }
                    ]
                },
                {
                    title: 'B',
                    data: [
                        {
                            name: '阿里云',
                        },
                        {
                            name: '矮个的将军'
                        },
                        {
                            name: '变态'
                        },
                        {
                            name: '贝蒂'
                        },
                        {
                            name: '背影'
                        }
                    ]
                },
                {
                    title: 'C',
                    data: [
                        {
                            name: '阿里云',
                        },
                        {
                            name: '矮个的将军'
                        },
                        {
                            name: '变态'
                        },
                        {
                            name: '贝蒂'
                        },
                        {
                            name: '背影'
                        }
                    ]
                },
                {
                    title: 'D',
                    data: [
                        {
                            name: '阿里云',
                        },
                        {
                            name: '矮个的将军'
                        },
                        {
                            name: '变态'
                        },
                        {
                            name: '贝蒂'
                        },
                        {
                            name: '背影'
                        }
                    ]
                },
                {
                    title: 'E',
                    data: [
                        {
                            name: '阿里云',
                        },
                        {
                            name: '矮个的将军'
                        },
                        {
                            name: '变态'
                        },
                        {
                            name: '贝蒂'
                        },
                        {
                            name: '背影'
                        }
                    ]
                },
                {
                    title: 'F',
                    data: [
                        {
                            name: '阿里云',
                        },
                        {
                            name: '矮个的将军'
                        },
                        {
                            name: '变态'
                        },
                        {
                            name: '贝蒂'
                        },
                        {
                            name: '背影'
                        }
                    ]
                },
                {
                    title: 'G',
                    data: [
                        {
                            name: '阿里云',
                        },
                        {
                            name: '矮个的将军'
                        },
                        {
                            name: '变态'
                        },
                        {
                            name: '贝蒂'
                        },
                        {
                            name: '背影'
                        }
                    ]
                },
                {
                    title: 'G',
                    data: [
                        {
                            name: '阿里云',
                        },
                        {
                            name: '矮个的将军'
                        },
                        {
                            name: '变态'
                        },
                        {
                            name: '贝蒂'
                        },
                        {
                            name: '背影'
                        }
                    ]
                },
                {
                    title: 'H',
                    data: [
                        {
                            name: '阿里云',
                        },
                        {
                            name: '矮个的将军'
                        },
                        {
                            name: '变态'
                        },
                        {
                            name: '贝蒂'
                        },
                        {
                            name: '背影'
                        }
                    ]
                },
                {
                    title: 'I',
                    data: [
                        {
                            name: '阿里云',
                        },
                        {
                            name: '矮个的将军'
                        },
                        {
                            name: '变态'
                        },
                        {
                            name: '贝蒂'
                        },
                        {
                            name: '背影'
                        }
                    ]
                },
                {
                    title: 'J',
                    data: [
                        {
                            name: '阿里云',
                        },
                        {
                            name: '矮个的将军'
                        },
                        {
                            name: '变态'
                        },
                        {
                            name: '贝蒂'
                        },
                        {
                            name: '背影'
                        }
                    ]
                }
            ],
            letterArr: [
                'A','B','C','D','E','F','G','H','I','J'
                // 'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z', '#'
            ]
        }
    }
    _renderUserList(){
        let { sections } = this.state;
        let userHead = 'https://avatar-static.segmentfault.com/218/123/2181236988-5fa93a079c2d9_huge256';
        return (
            <SectionList 
                ref={ref => (this._sectionRef = ref)}
                sections={sections}
                renderSectionHeader={(item) => {
                    return (
                        <View style={styles.lableBox}>
                            <Text>{item.section.title}</Text>
                        </View> 
                    )
                }}
                keyExtractor={(item, index) => index}
                numColumns={1}
                renderItem={({item, index}) => {
                    return (
                        <View style={styles.userItem}>
                            <Image
                                style={styles.userHead}
                                source={{uri: userHead}}
                            ></Image>
                            <View style={styles.userContent}>
                                <Text style={styles.userName} numberOfLines={1}>{item.name}</Text>
                                <Text style={styles.userNew} numberOfLines={1}>
                                    [我是你爹] 动态啥的
                                </Text>
                            </View>
                        </View>
                    )
                }}
            >
            </SectionList>
        )
    }
    _rendNavList(){
        let DATA = this.state.letterArr;
        return (
            <FlatList 
                style={styles.navListBox}    
                data={DATA}
                getItemLayout={this.renderItemLayout}
                keyExtractor={item => item}
                renderItem={({ item, index, separators }) => (
                    <TouchableHighlight
                        onPress={() => this._onSectionselect(index)}
                        underlayColor='transparent'    
                    >
                        <View style={styles.letterItem}>
                            <Text style={{textAlign: 'center', color: '#999'}}>{item}</Text>
                        </View>
                    </TouchableHighlight>
                )}
            >
            </FlatList>
        )
    }
    render(){
        return(
            <SafeAreaView style={styles.addressBox}>
                <ScrollView style={styles.body} >
                    <NavigationBar title='通讯录'></NavigationBar>
                    <View  >
                        {this._renderUserList()}
                    </View>
                    <View style={styles.numberBox}>
                        <Text style={{color: '#999'}}>142位联系人</Text>
                    </View>
                </ScrollView>
                {this._rendNavList()}
            </SafeAreaView>
        )
    }
    _onSectionselect(key){
        console.log("输出", key)
        let offset = key * 50;      //点击了那个字母索引，没有section的header的高是20;key为0是即偏移0
        const { sections } = this.state;
        sections.map((item,index) => {
            if(key > index){        //要滚动的距离就是，点击的字母索引之前的所有内容，所以当 点击字母的索引 大于 sections（变量）的索引时；技术要滚动的高度
                //每个联系人的item高是60，上下padding各为10;然后每个节点里面有length-1条分割线且高度为1
                offset = offset + item.data.length*120 + (item.data.length-1);      
             }
        });
        this._sectionRef.scrollToOffset({animated: true, offset: px2dp(offset)});
        
    }
}

const styles = StyleSheet.create({
    addressBox: {
        position: 'relative',
        flex: 1,
    },
    scollBox: {

    },
    addressBox: {
        
    },
    lableBox: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: px2dp(40),
        paddingRight: px2dp(40),
        height: px2dp(50),
        backgroundColor: '#f8f8f8'
    },
    userItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: px2dp(40),
        paddingRight: px2dp(40),
        height: px2dp(120),
        backgroundColor: '#fff'
    },
    userHead: {
        width: px2dp(72),
        height: px2dp(72),
        borderRadius: px2dp(6)
    },
    userContent: {
        display: 'flex',
        flex: 1,
        paddingTop: px2dp(24),
        paddingBottom: px2dp(24),
        justifyContent: 'space-between',
        height: px2dp(120),
        marginLeft: px2dp(30),
        borderBottomColor: '#f8f8f8',
        borderBottomWidth: px2dp(2)
    },
    userName: {
        color: '#333',
        fontWeight: '600',
        fontSize: px2dp(26)
    },
    userNew: {
        color: '#999',
        fontSize: px2dp(20)
    },
    numberBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: px2dp(80),
        backgroundColor: '#f8f8f8',
        fontSize: px2dp(22)
    },
    navListBox: {
        position: 'absolute',
        top: px2dp(160),
        right: px2dp(0),
        bottom: px2dp(100),
        width: px2dp(50),
    },
    letterItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: px2dp(50),
        height: px2dp(32),
        backgroundColor: 'transparent',
    }
})
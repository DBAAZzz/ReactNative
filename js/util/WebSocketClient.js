import { DeviceEventEmitter } from 'react'
import deviceStorage from '../util/deviceStorage'
import { wsUlr } from '../config/index'

export default class WebSocketClient {
    constructor(props){
        this.ws = null;
        this.callback = null
    }
    static getInstance(){
        if(this.instance == null){
            this.instance = new WebSocketClient();
        }
        return this.instance;
    }

    async initWebSocket(callback){
        try{
            
            this.timer && clearInterval(this.timer);
            this.ws = new WebSocket(wsUlr, [await deviceStorage.get('token')]);
            this.callback = callback;
            this.initWsEvent();
        }catch(e){
            console.log('websocket error:', e)
            // 重连
            this.reconnect()
        }
    }

    initWsEvent(){
        //建立WebSocket连接
        this.ws.onopen = () => {
            console.log('WebSocket:', 'connect to server');
            
        };
        //客户端接收服务端数据时触发
        this.ws.onmessage =  (evt) => {
            let message = JSON.parse(evt.data);
            console.log('接收到了信息', message.type);
            if(message.type == 'chat') {
                this.callback(message.data)
            }
        };
         //连接错误
        this.ws.onerror =  (err) => {
            console.log('WebSocket:connect to server error', err);
            //重连
            this.reconnect();
        };
        //连接关闭
        this.ws.onclose =  () => {
            console.log('WebSocket:', 'connect close');
            //重连
            // this.reconnect();
        };
    }

    sendMessage(msg, id) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            try {
                this.ws.send(JSON.stringify({
                    id: id,
                    message: `${msg.trim()}`
                }))
                console.log("message send success!")
            } catch (err) {
                console.warn('ws sendMessage', err.message);
            }
        } else {
            console.log('WebSocket:', 'connect not open to send message');
        }
    }
    close() {
        this.ws.close();
    }
    //重连
    reconnect() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(()=> {
            //重新连接WebSocket
            this.initWebSocket();
        }, 15000);
    }

}
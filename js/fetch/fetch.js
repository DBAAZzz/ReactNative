import config from '../config/index'
import DeviceStorage from '../util/deviceStorage'

function toQueryString(obj) {
    let str = '';
    if (obj) {
        let keys = [];
        for (let key in obj) {
            keys.push(key);
        }
        keys.forEach((key, index) => {
            str += key + '=' + obj[key];
            if (index !== keys.length - 1) {
                str += '&';
            }
        });
    }
    return str;
}

export default class HttpUtil {
    static get(url, data) {
        return new Promise(async (resolve, reject) => {
            fetch(`${config.RequestUrl}${url}?${toQueryString(data)}`,{
                headers: {
                    'Authorization':'Bearer ' + await DeviceStorage.get('token')
                },
            })
                .then(response => {
                    return response.json()
                })
                .then(result => {
                    if(result.code == 200) resolve(result.data)
                    else reject(result.message)
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    static post(url, data) {
        return new Promise(async (resolve, reject) => {
            fetch(`${config.RequestUrl}${url}`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json; charset=utf-8',
                    'content-type': 'application/json; charset=utf-8',
                    'Authorization': 'Bearer ' + await DeviceStorage.get('token')
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    return response.json()
                })
                .then(result => {
                    if(result.code == 200) resolve(result.data)
                    else reject(result.message)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    static upload(url, formData){
        return new Promise(async (resolve, reject) => {
            fetch(`${config.RequestUrl}${url}`, {
                method: 'POST',
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + await DeviceStorage.get('token')
                },
                body: formData
            })
                .then(response => response.json())
                .then(result => {
                    if(result.code == 200) resolve(result.data)
                    else reject(result.message)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

}
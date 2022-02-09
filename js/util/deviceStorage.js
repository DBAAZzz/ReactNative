
import AsyncStorage from '@react-native-community/async-storage';

export default class DeviceStorage{

    static save = async (key, value) => {
        try{
            const result = await AsyncStorage.setItem(key, value)
        } catch (e){
            console.log('error', e)
        }
    }
    static get = async (key) => {
        try{
            return await AsyncStorage.getItem(key);
        } catch(e){
            console.log('error', e)
        }
    }
    static remove = async (key) => {
        try {
            return AsyncStorage.removeItem(key);
        }catch (e){
            console.log('error', e)
        }
    }
}
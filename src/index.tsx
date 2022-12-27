import {View,Button} from '@tarojs/components'
import {useState} from 'react'
import Taro from '@tarojs/taro'
import styles from './index.scss'

export default ()=>{
    const [count,setCount]=useState(0)
    return <View>
        {/* <View>{count}</View> */}
        {/* <Button onClick={setCount.bind(null,v=>v+1)}>add</Button> */}
        <View className={styles.copyright} onClick={()=>{
            Taro.showToast({
                title:'Copyright © 2022 梨籽'
            })
        }}>Copyright © 2022 梨籽</View>
    </View>
}
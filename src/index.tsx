import {useState} from 'react'
import {View,Button} from '@tarojs/components'

export default ()=>{
    const [count,setCount]=useState(0)
    return <View>
        <View>{count}</View>
        <Button onClick={setCount.bind(null,v=>v+1)}>add</Button>
    </View>
}
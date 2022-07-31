import React from 'react'
import { ImageBackground, View } from 'react-native'

const AvatarIcon = (props) => {
    return (
        <View
            style={{
                opacity: props.focused ? 1 : 0.5,
            }}
        >
            <ImageBackground
                source={require('../../assets/images/exampleAvatar.png')}
                className='h-[23px] w-[23px] rounded-full overflow-hidden'
                resizeMode='center'
            ></ImageBackground>
            <View className='absolute bottom-[-4px] right-[-3px] z-10 h-[13px] w-[13px] rounded-full bg-green-500 border border-2 border-solid border-discord-gray-4'></View>
        </View>
    )
}

export default AvatarIcon

import React  from 'react'
import { ImageBackground, View } from 'react-native'


const AvatarIcon = (props) => {
  return (
    <View
      style={{
        width: 28,
        opacity: props.focused ? 1 : 0.5,
      }}
    >
      <ImageBackground
        source={require('../../assets/images/exampleAvatar.png')}
        className='h-[23px] w-[23px] rounded-full overflow-hidden'
        resizeMode='center'
      ></ImageBackground>
      <View
        className='absolute bottom-[0] right-[0] z-10 h-[13px] w-[13px] rounded-full bg-green-500  border-2 border-solid '
        style={{ borderColor: '#17191c' }}
      ></View>
    </View>
  )
}

export default AvatarIcon

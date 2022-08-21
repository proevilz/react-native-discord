import React from 'react'
import { View } from 'react-native'

interface IProps {
  bgVariant?: string
  status: number
}

const StatusIndicator = (props: IProps) => {
  const color = props.bgVariant ?? '2'
  if (props.status === 1) {
    return (
      <View className="absolute bottom-[-2px] right-[0px] z-10 h-[13px] w-[13px] rounded-full bg-green-500 border-2 border-solid border-discord-gray-2" />
    )
  } else if (props.status === 2) {
    return (
      <View className="absolute bottom-[-2px] right-[0px] z-10 h-[13px] w-[13px] rounded-full bg-[#747f8d] border-2 border-solid border-discord-gray-2 flex justify-center items-center">
        <View className="rounded-full bg-discord-gray-1 h-[4px] w-[4px]"></View>
      </View>
    )
  } else if (props.status === 3) {
    return (
      <View className="absolute bottom-[-2px] right-[0px] z-10 h-[13px] w-[13px] rounded-full bg-red-500 border-2 border-solid border-discord-gray-2 flex justify-center items-center">
        <View className="rounded bg-discord-gray-1 h-[2px] w-[4px]"></View>
      </View>
    )
  } else if (props.status === 4) {
    return (
      <View
        className={`absolute bottom-[-2px] right-[0px] z-10 h-[13px] w-[13px] rounded-full bg-discord-gray-2 border-2 border-solid border-discord-gray-${color} overflow-hidden flex items-center justify-center`}
      >
        <View className="rounded-full bg-[#faa81a] h-[8px] w-[8px]"></View>
        <View
          className={`rounded-full bg-discord-gray-${color} h-[8px] w-[8px] absolute bottom-[3px] left-[-2px]`}
        ></View>
      </View>
    )
  } else {
    return <></>
  }
}

export default StatusIndicator

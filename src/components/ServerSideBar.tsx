import React from 'react'
import { FlatList, ImageBackground, View } from 'react-native'
import { mockServers } from '../../mockdata'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const ServerSideBar = ({ rightSideBarVisible }) => {
    const servers = mockServers

    const ServerThumbnail = (props) => {
        return (
            <View className='flex items-center mb-3'>
                <ImageBackground
                    source={{ uri: props.avatar }}
                    className='h-[48px] w-[48px] rounded-full overflow-hidden '
                    resizeMode='center'
                />
            </View>
        )
    }
    return (
        <View className='w-[72px] bg-discord-gray-3 '>
            <View className='flex items-center mb-2'>
                <View className='flex items-center justify-center mb-2 h-[48px] w-[48px] rounded-2xl bg-[#4c5be5]'>
                    <MaterialCommunityIcons
                        name='comment'
                        size={24}
                        color='white'
                    />
                </View>
                <View className='bg-discord-gray-1 w-[35px] h-[1px]' />
            </View>
            <FlatList
                className='flex-1'
                data={servers}
                renderItem={({ item }) => <ServerThumbnail {...item} />}
            />
        </View>
    )
}

export default ServerSideBar

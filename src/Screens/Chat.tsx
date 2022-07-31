import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import StatusIndicator from '../components/StatusIndicator'
const Chat = ({ route, navigation }) => {
    const { username, status } = route.params
    return (
        <SafeAreaView>
            <View className='bg-discord-gray-3 h-full pb-3'>
                <View className='p-4 bg-discord-gray-1  border-solid border-gray-500 border-b flex flex-row items-center justify-between'>
                    <View className='items-center flex flex-row'>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons
                                name='ios-menu-sharp'
                                size={24}
                                color='gray'
                            />
                        </TouchableOpacity>
                        <Text className='text-white mb-1 ml-3 mr-5 font-bold'>
                            <Text className='text-discord-gray-4 font-bold'>
                                @{'  '}
                            </Text>
                            {username}
                        </Text>
                        <View className='flex items-center pt-2'>
                            <StatusIndicator bgVariant={'1'} status={status} />
                        </View>
                    </View>
                    <View className='items-center flex flex-row'>
                        <MaterialIcons
                            name='phone-in-talk'
                            size={20}
                            color='gray'
                        />
                        <View className='mx-1' />
                        <Ionicons name='md-videocam' size={20} color='gray' />
                    </View>
                </View>
                <View className='px-4 mt-1'></View>
            </View>
        </SafeAreaView>
    )
}

export default Chat

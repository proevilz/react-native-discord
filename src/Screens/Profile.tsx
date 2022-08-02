import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <SafeAreaView>
      <View className={' items-center'}>
        <View className={'bg-blue-200 px-3 py-1 rounded-full'}>
          <Text className={'text-blue-800 font-semibold'}>
            Profile Tailwind
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile

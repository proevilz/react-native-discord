import React from 'react'
import { View, Text, KeyboardAvoidingView, TextInput } from 'react-native'

import Layout from '../components/Layout'
import { SkeletonLoader } from '../components/Skeleton'

const Profile = () => {
  return (
    <Layout>
      <SkeletonLoader highlightColor={'gray'} backgroundColor="white">
        <View className="flex-1 p-4 justify-center items-center">
          <Text className="text-3xl text-white">Profile page</Text>
        </View>
      </SkeletonLoader>
    </Layout>
  )
}

export default Profile

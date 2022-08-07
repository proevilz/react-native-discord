import React from 'react'
import { View, Text, KeyboardAvoidingView, TextInput } from 'react-native'

import Layout from '../components/Layout'

const Profile = () => {
    return (
        <Layout>
            <View className='flex-1 p-4 justify-center items-center'>
                <Text className='text-3xl text-white'>Profile page</Text>
            </View>
        </Layout>
    )
}

export default Profile

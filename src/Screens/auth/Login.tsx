import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Layout from '../../components/Layout'

const Login = ({ route, navigation }) => {
  return (
    <Layout routeName={route.name} includeBottom>
      <View className="flex-1 bg-discord-gray-2 items-center justify-between">
        <View className="w-full  items-center">
          <Image
            className="w-1/2 h-[100px]"
            resizeMode="contain"
            source={require('../../../assets/images/Discord-Logo-long-White.png')}
          />
          <Image
            resizeMode="contain"
            className="w-full h-[200px] "
            source={require('../../../assets/images/Messages-cuate.png')}
          />
        </View>
        <View className="w-full">
          <View>
            <Text
              className="text-white text-4xl text-center mb-2"
              style={{
                fontFamily: 'Rubik_700Bold',
              }}
            >
              Welcome to LOGIN
            </Text>
            <Text className="text-gray-400 text-center">
              Join over 100 million people who use Discord to talk with
              communities and friends.
            </Text>
          </View>
          <View className="my-5 w-full px-4"></View>
        </View>
      </View>
    </Layout>
  )
}

export default Login

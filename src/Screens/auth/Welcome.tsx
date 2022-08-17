import React, { useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Layout from '../../components/Layout'

const Welcome = ({ route, navigation }) => {
  return (
    <Layout routeName={route.name} bottomInset>
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
              Welcome to Discord
            </Text>
            <Text className="text-gray-400 text-center">
              Join over 100 million people who use Discord to talk with
              communities and friends.
            </Text>
          </View>
          <View className="my-5 w-full px-4">
            <TouchableOpacity
              className="mb-2"
              onPress={() => navigation.navigate('Register')}
            >
              <View className="w-full bg-discord p-3 rounded ">
                <Text className="text-center text-white font-bold">
                  Register
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View className="w-full bg-gray-500 p-3 rounded ">
                <Text className="text-center text-white font-bold">Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  )
}

export default Welcome

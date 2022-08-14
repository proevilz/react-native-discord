import React from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import Layout from '../../components/Layout'
const { width } = Dimensions.get('window')
const Welcome = ({ route }) => {
  return (
    <Layout routeName={route.name}>
      <View className="flex-1 w-full bg-discord-gray-2">
        <Image
          style={{
            width,
          }}
          source={require('../../../assets/images/Messages-cuate.png')}
        />
        <Image
          className="w-full"
          resizeMode="center"
          source={require('../../../assets/images/Discord-Logo-long-White.png')}
        />

        <Text className="text-white text-4xl text-center"></Text>
      </View>
    </Layout>
  )
}

export default Welcome

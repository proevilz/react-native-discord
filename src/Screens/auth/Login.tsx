import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Text, Image, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import isEmail from 'validator/lib/isEmail'
import Layout from '../../components/Layout'
import { validateLoginField } from '../../utils'
import { Auth } from '@aws-amplify/auth'

const Login = ({ route, navigation }) => {
  const registrationData = useSelector(
    (state: RootState) => state.auth.registration
  )
  interface IFormState {
    email: {
      error: null | string
      value: null | string
      validate: (email: string) => boolean
    }
    password: {
      error: null | string
      value: null | string
      validate: (password: string) => boolean
    }
  }
  const [form, setForm] = useState<IFormState>({
    email: {
      error: null,
      value: 'ashley1212@live.co.uk',
      validate: (email: string) => isEmail(email),
    },
    password: {
      error: null,
      value: 'Qwerty1!',
      validate: (email: string) => email.length !== 0,
    },
  })

  const handleLogin = async () => {
    try {
      console.log(form.email.value, form.password.value)
      if (
        form.email.value &&
        form.password.value &&
        validateLoginField({ form, setForm })
      ) {
        const { user } = Auth.signIn(form.email.value, form.password.value)
      }
    } catch (error) {
      console.log('login error!', error)
    }
  }

  return (
    <Layout routeName={route.name} bottomInset>
      <TouchableOpacity
        className="flex flex-row items-center ml-1"
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="left" size={10} color="white" />
        <Text className="ml-1 text-white font-semibold">Back</Text>
      </TouchableOpacity>
      <View className=" bg-discord-gray-2 items-center">
        <Text
          className="text-white text-2xl text-center mt-5"
          style={{
            fontFamily: 'Rubik_700Bold',
          }}
        >
          Login
        </Text>
      </View>
      <View className="w-full px-4">
        <Text className="text-discord-gray-4 mb-2 font-bold">EMAIL</Text>
        <TextInput
          placeholder="Email"
          className={
            'p-4 bg-discord-gray-1 rounded text-white border ' +
            (form.email.error ? ' border-red-500' : '')
          }
          placeholderTextColor="gray"
          keyboardAppearance="dark"
          returnKeyType="next"
          defaultValue={form.email.value}
          onChangeText={(text: string) =>
            setForm((prev) => ({
              ...prev,
              email: { ...prev.email, value: text },
            }))
          }
        />
        <View className="flex-row">
          <Text
            className={
              'text-red-400 mt-1 ' + (!form.email.error ? ' opacity-0' : '')
            }
          >
            {form.email.error}
          </Text>
        </View>
      </View>
      <View className="w-full px-4 mt-3">
        <Text className="text-discord-gray-4 mb-2 font-bold">Password</Text>
        <TextInput
          placeholder="*******"
          className={
            'p-4 bg-discord-gray-1 rounded text-white border ' +
            (form.password.error ? ' border-red-500' : '')
          }
          placeholderTextColor="gray"
          keyboardAppearance="dark"
          secureTextEntry
          textContentType="password"
          defaultValue={form.password.value}
          returnKeyType="done"
          onChangeText={(text: string) =>
            setForm((prev) => ({
              ...prev,
              password: { ...prev.password, value: text },
            }))
          }
        />
        <Text
          className={
            'text-red-400 mt-1' + (!form.password.error ? ' opacity-0' : '')
          }
        >
          {form.password.error}
        </Text>
      </View>

      <View className="w-full px-4 mt-4">
        <TouchableOpacity onPress={handleLogin}>
          <View className="w-full bg-discord p-3 rounded ">
            <Text className="text-center text-white font-bold">Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Layout>
  )
}

export default Login

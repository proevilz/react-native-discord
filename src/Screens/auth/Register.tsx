import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { View, Text, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Layout from '../../components/Layout'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import isEmail from 'validator/es/lib/isEmail'
import isStrongPassword from 'validator/es/lib/isStrongPassword'
import validator from 'validator'
import { IFormState, validateField } from '../../utils'
import { updateRegistration } from '../../slices/authSlice'
import { useDispatch } from 'react-redux'
type RootStackParamList = {
  Registration: undefined
  RegisterSecond: undefined
}
type Props = NativeStackScreenProps<RootStackParamList, 'Registration'>

const Register = ({ route, navigation }: Props) => {
  const dispatch = useDispatch()
  const [form, setForm] = useState<IFormState>({
    email: {
      error: null,
      value: 'ashley1212@live.co.uk',
      validate: (email: string) => isEmail(email),
    },
    password: {
      error: null,
      value: 'Qwerty1!',
      validate: (password: string) =>
        isStrongPassword(password, {
          minLength: 8,
        }),
    },
    newPassword: {
      error: null,
      value: 'Qwerty1!',
      validate: (password: string) =>
        isStrongPassword(password, {
          minLength: 8,
        }),
    },
  })

  const handleNext = () => {
    if (validateField({ form, setForm })) {
      dispatch(
        updateRegistration({
          email: form.email.value,
          password: form.password.value,
          username: null,
        })
      )
      navigation.navigate('RegisterSecond')
    }
  }
  return (
    <Layout routeName={route.name} bottomInset>
      <TouchableOpacity className="flex flex-row items-center ml-1">
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
          Register
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
        <Text
          className={
            'text-red-400 mt-1 ' + (!form.email.error ? ' opacity-0' : '')
          }
        >
          {form.email.error}
        </Text>
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
      <View className="w-full px-4 mt-3">
        <Text className="text-discord-gray-4 mb-2 font-bold">
          Repeat password
        </Text>
        <TextInput
          placeholder="*******"
          className={
            'p-4 bg-discord-gray-1 rounded text-white border ' +
            (form.newPassword.error ? ' border-red-500' : '')
          }
          placeholderTextColor="gray"
          keyboardAppearance="dark"
          secureTextEntry
          textContentType="newPassword"
          defaultValue={form.newPassword.value}
          returnKeyType="next"
          onChangeText={(text: string) =>
            setForm((prev) => ({
              ...prev,
              newPassword: { ...prev.newPassword, value: text },
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
        <TouchableOpacity onPress={handleNext}>
          <View className="w-full bg-discord p-3 rounded ">
            <Text className="text-center text-white font-bold">Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Layout>
  )
}

export default Register

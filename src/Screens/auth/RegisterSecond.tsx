import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import Layout from '../../components/Layout'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import isAlphanumeric from 'validator/es/lib/isAlphanumeric'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsername } from '../../slices/authSlice'
import { Auth } from '@aws-amplify/auth'
import { RootState } from '../../store'
type RootStackParamList = {
  Registration: {}
}
type Props = NativeStackScreenProps<RootStackParamList, 'Registration'>
interface IFormState {
  error: string | null
  value: string
}
const RegisterSecond = ({ route, navigation }: Props) => {
  const registrationData = useSelector(
    (state: RootState) => state.auth.registration
  )
  const dispatch = useDispatch()
  const [form, setForm] = useState<IFormState>({
    error: null,
    value: '',
  })
  const [loading, setLoading] = useState(false)
  const handleNext = () => {
    if (!form.value || !form.value.length || form.value.length > 20) {
      setForm((prev) => ({
        ...prev,
        error: 'Username must be between 3 - 20 characters',
      }))
    } else if (form.value && !isAlphanumeric(form.value)) {
      setForm((prev) => ({
        ...prev,
        error: 'Username must only contain a-z and 0-9 type characters',
      }))
    } else {
      setLoading(true)
      dispatch(updateUsername(form.value))
      console.log(registrationData)
      if (registrationData.email && registrationData.password && form.value) {
        try {
          Auth.signUp({
            username: registrationData.email,
            password: registrationData.password,
            attributes: {
              nickname: form.value,
              updated_at: new Date().valueOf().toString(),
            },
            autoSignIn: {
              enabled: true,
            },
          })
          setLoading(false)
        } catch (error) {
          console.error(error)
          setLoading(false)
        }
      }
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
          Enter a username
        </Text>
      </View>
      <View className="w-full px-4 mt-5">
        <Text className="text-discord-gray-4 mb-2 font-bold">USERNAME</Text>
        <TextInput
          placeholder="Username"
          className={
            'p-4 bg-discord-gray-1 rounded text-white border ' +
            (form.error ? ' border-red-500' : '')
          }
          placeholderTextColor="gray"
          keyboardAppearance="dark"
          returnKeyType="next"
          defaultValue={form.value}
          onChangeText={(text: string) =>
            setForm((prev) => ({
              ...prev,
              value: text,
            }))
          }
        />
        <Text
          className={'text-red-400 mt-1 ' + (!form.error ? ' opacity-0' : '')}
        >
          {form.error}
        </Text>
      </View>

      <View className="w-full px-4 mt-4">
        <TouchableOpacity onPress={handleNext} disabled={loading}>
          <View
            className={
              'w-full bg-discord p-3 rounded' + (loading ? ' opacity-20' : '')
            }
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-center text-white font-bold">Next</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </Layout>
  )
}

export default RegisterSecond

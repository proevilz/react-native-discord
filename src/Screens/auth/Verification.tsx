import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
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
const Verification = ({ route, navigation }: Props) => {
  const registrationData = useSelector(
    (state: RootState) => state.auth.registration
  )
  const dispatch = useDispatch()
  const [form, setForm] = useState<IFormState>({
    error: null,
    value: '',
  })
  const [loading, setLoading] = useState(false)
  const handleNext = async () => {
    setLoading(true)
    if (form.value.trim() !== '') {
      try {
        await Auth.confirmSignUp(registrationData.email, form.value)

        setLoading(false)
      } catch (error) {
        console.log('Confirm error ', error)
        setLoading(false)
      }
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
          Verify your account
        </Text>
        <Text className="text-white mt-5">
          Check your email inbox for a verification code.
        </Text>
      </View>
      <View className="w-full px-4 mt-5">
        <Text className="text-discord-gray-4 mb-2 font-bold">
          Verfification code
        </Text>
        <TextInput
          placeholder="Code"
          className={
            'p-4 bg-discord-gray-1 rounded text-white border ' +
            (form.error ? ' border-red-500' : '')
          }
          placeholderTextColor="gray"
          keyboardAppearance="dark"
          returnKeyType="done"
          keyboardType="numeric"
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
              <Text className="text-center text-white font-bold">Confirm</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </Layout>
  )
}

export default Verification

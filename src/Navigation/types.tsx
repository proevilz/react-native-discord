/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
export type AuthStackParamsList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  Modal: undefined
  NotFound: undefined
  PaySomeoneScreen: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamsList {}
  }
}

export type RootStackScreenProps<Screen extends keyof AuthStackParamsList> =
  NativeStackScreenProps<AuthStackParamsList, Screen>

export type RootTabParamList = {
  DirectMessages: undefined
  Friends: undefined
  Search: undefined
  Mentions: undefined
  Profile: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<AuthStackParamsList>
  >

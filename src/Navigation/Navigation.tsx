import * as React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import {
    BottomTabBar,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import Profile from '../Screens/Profile'
import TabBarIcon from '../components/TabBarIcon'
import ChatStack from './ChatStack'
import Friends from '../Screens/Friends'
import { UiContext } from '../context/UiContext'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import Animated, {
    SlideInUp,
    SlideInDown,
    SlideOutDown,
    SlideOutUp,
    Layout,
    useAnimatedStyle,
    withSpring,
    withTiming,
} from 'react-native-reanimated'
const Tab = createBottomTabNavigator()

const Navigation = () => {
    const { bottomTabVisible, visible } = React.useContext(UiContext)
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withTiming(bottomTabVisible.value ? 0 : 80, {
                        duration: 200,
                    }),
                },
            ],
        }
    })
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={route.name}
                            color={color}
                            focused={focused}
                        />
                    ),
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: '#17191c',
                        borderTopColor: '#17191c',
                        position: 'absolute',
                    },

                    headerShown: false,
                })}
                tabBar={(props) => (
                    <Animated.View style={animatedStyles}>
                        <BottomTabBar {...props} />
                    </Animated.View>
                )}
            >
                <Tab.Screen name='Home' component={Friends} />
                <Tab.Screen name='friends' component={ChatStack} />
                <Tab.Screen name='search' component={ChatStack} />
                <Tab.Screen name='mentions' component={ChatStack} />
                <Tab.Screen name='Profile' component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Navigation

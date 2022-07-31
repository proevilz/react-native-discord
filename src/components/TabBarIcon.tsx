import * as React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import AvatarIcon from './AvatarIcon'

const TabBarIcon = (props) => {
    const icons = {
        home: 'discord',
        profile: 'user',
    }
    const iconName = icons[props.name.toLowerCase()]
    if (props.name.toLowerCase() === 'profile') {
        return <AvatarIcon focused={props.focused} />
    }
    return (
        <FontAwesome5
            name={iconName}
            size={20}
            color={props.color}
            style={{
                opacity: props.focused ? 1 : 0.7,
            }}
        />
    )
}

export default TabBarIcon

import * as React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import AvatarIcon from './AvatarIcon'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'
import { Octicons } from '@expo/vector-icons'
const DiscordIcon = (props) => {
  return (
    <Svg width="28" height="28" fill="none" {...props} viewBox="0 0 71 55">
      <G clipPath="url(#a)">
        <Path
          d="M60.105 4.898A58.55 58.55 0 0 0 45.653.415a.22.22 0 0 0-.233.11 40.784 40.784 0 0 0-1.8 3.697c-5.456-.817-10.886-.817-16.23 0-.485-1.164-1.201-2.587-1.828-3.697a.228.228 0 0 0-.233-.11 58.386 58.386 0 0 0-14.451 4.483.207.207 0 0 0-.095.082C1.578 18.73-.944 32.144.293 45.39a.244.244 0 0 0 .093.167c6.073 4.46 11.955 7.167 17.729 8.962a.23.23 0 0 0 .249-.082 42.08 42.08 0 0 0 3.627-5.9.225.225 0 0 0-.123-.312 38.772 38.772 0 0 1-5.539-2.64.228.228 0 0 1-.022-.378c.372-.279.744-.569 1.1-.862a.22.22 0 0 1 .23-.03c11.619 5.304 24.198 5.304 35.68 0a.219.219 0 0 1 .233.027c.356.293.728.586 1.103.865a.228.228 0 0 1-.02.378 36.384 36.384 0 0 1-5.54 2.637.227.227 0 0 0-.121.315 47.249 47.249 0 0 0 3.624 5.897.225.225 0 0 0 .249.084c5.801-1.794 11.684-4.502 17.757-8.961a.228.228 0 0 0 .092-.164c1.48-15.315-2.48-28.618-10.497-40.412a.18.18 0 0 0-.093-.084Zm-36.38 32.427c-3.497 0-6.38-3.211-6.38-7.156 0-3.944 2.827-7.156 6.38-7.156 3.583 0 6.438 3.24 6.382 7.156 0 3.945-2.827 7.156-6.381 7.156Zm23.593 0c-3.498 0-6.38-3.211-6.38-7.156 0-3.944 2.826-7.156 6.38-7.156 3.582 0 6.437 3.24 6.38 7.156 0 3.945-2.798 7.156-6.38 7.156Z"
          fill={props.focused ? '#fff' : 'gray'}
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill={props.focused ? '#fff' : 'gray'} d="M0 0h71v55H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
const FriendsIcon = (props) => (
  <Svg
    className="icon-2xnN2Y"
    aria-hidden="true"
    width={28}
    height={28}
    {...props}
  >
    <G fill="none" fillRule="evenodd">
      <Path
        fill={props.focused ? '#fff' : 'gray'}
        fillRule="nonzero"
        d="M2.5 4v1.5c0 4.15 2.21 7.78 5.5 9.8V20h15v-2c0-2.66-5.33-4-8-4h-.25C10 14 6 10 6 5.5V4H2.5ZM15 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      />
      <Path d="M0 0h24v24H0V0Zm0 0h24v24H0V0Zm0 0h24v24H0V0Z" />
    </G>
  </Svg>
)

const MentionsIcon = (props) => (
  <Octicons
    name="bell-fill"
    size={21}
    color={props.focused ? '#fff' : 'gray'}
  />
)

const TabBarIcon = (props) => {
  const name = props.name.toLowerCase()
  if (name === 'home') {
    return <DiscordIcon focused={props.focused} />
  }
  if (name === 'friends') {
    return <FriendsIcon focused={props.focused} />
  }
  if (name === 'search') {
    return (
      <MaterialIcons
        name="search"
        size={28}
        color={props.focused ? '#fff' : 'gray'}
      />
    )
  }
  if (name === 'mentions') {
    return <MentionsIcon focused={props.focused} />
  }
  if (name === 'profile') {
    return <AvatarIcon focused={props.focused} />
  }
  return <></>
}

export default TabBarIcon

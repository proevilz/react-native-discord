import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={36}
    viewBox="0 0 36 44"
    height={44}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.875 43.125A2.893 2.893 0 0 0 3 44h22c.833 0 1.542-.292 2.125-.875A2.893 2.893 0 0 0 28 41v-7.3h-3v2.8H3v-29h22v2.8h3V3c0-.833-.292-1.542-.875-2.125A2.893 2.893 0 0 0 25 0H3C2.167 0 1.458.292.875.875A2.893 2.893 0 0 0 0 3v38c0 .833.292 1.542.875 2.125ZM3 41v-1.5h22V41H3ZM25 4.5H3V3h22v1.5Z"
      fill="#b0b2b4"
    />
    <Path
      d="M27.017 14.405h2.973v6.005h6.005v2.973H29.99v6.005h-2.973v-6.005h-6.005V20.41h6.005v-6.005Z"
      fill="#b0b2b4"
    />
  </Svg>
)

export default SvgComponent

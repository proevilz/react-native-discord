import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'
import { memo } from 'react'

const SvgComponent = (props: SvgProps) => (
    <Svg aria-hidden='false' width={16} height={16} {...props}>
        <Path
            d='M8.274 8.492 2 9.1l-1.651 5.28a.82.82 0 0 0 1.14.982l13.75-6.658a.782.782 0 0 0 0-1.406L1.498.634a.818.818 0 0 0-1.14.982l1.65 5.28 6.262.607a.495.495 0 0 1 0 .985l.003.004Z'
            fill='white'
        />
    </Svg>
)

const SendMessage = memo(SvgComponent)
export default SendMessage

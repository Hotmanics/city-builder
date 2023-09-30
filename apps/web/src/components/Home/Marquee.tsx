import { Flex } from '@zoralabs/zord'
import React from 'react'

import { useLayoutStore } from 'src/stores'




const Marquee = () => {
  const { isMobile } = useLayoutStore()
  return (
    <Flex direction={'column'} align={'center'} mt={{ '@initial': 'x4', '@768': 'x32' }}>
      <h1>Empower your city. Revolutionize the world.</h1>
    </Flex>
  )
}

export default Marquee

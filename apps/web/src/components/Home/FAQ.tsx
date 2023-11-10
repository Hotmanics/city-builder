import { Box, Flex, Stack, Text } from '@zoralabs/zord'

import { Icon } from 'src/components/Icon'
import { homeSectionHeader, homeSectionWrapper } from 'src/styles/home.css'

import { defaultFileDownloadStyle } from '../Fields/styles.css'
import Accordion from './accordian'

const FAQ = () => {
  const items = [
    {
      title: 'What is City DAO Builder?',
      description: (
        <>
          <Flex mb={'x4'}>
            City DAO Builder is a tool that allows any city to form and govern completely onchain.
          </Flex>
          <Flex mb={'x4'}>
            City DAOs are organizations which seek to make progressive actions following Web3 ideaologies. This can take shape in many forms: decentralized governance, permissionless activity, and transparent operations.
          </Flex>
        </>
      ),
    },
    {
      title: 'How do I create my artwork?',
      description: (
        <>
          <Flex mb={'x4'}>
            To create NFTs with City DAO Builder, you will need a folder with the following subfolders: 0-backgrounds, 1-bodies, 2-accessories, 3-heads, 4-glasses.
            Within each subfolder will contain your image that will represent your NFT.
          </Flex>
          <Flex mb={'x4'}>
            600px x 600px minimum for pngs, 32px minimum for svgs and must be square
            images.
          </Flex>
          <Flex mb={'x4'}>Image layers can be reordered in the upload flow. </Flex>
          {/* <Flex mb={'x4'}>
            <a href={'/nouns.zip'} download className={defaultFileDownloadStyle}>
              <Icon id="download" />
              <Text ml="x2">Download demo folder</Text>
            </a>
          </Flex>
          <Flex mb={'x4'}>
            <a
              href={'https://www.figma.com/community/file/1166768320345172833'}
              download
              className={defaultFileDownloadStyle}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Icon id="newWindow" />
              <Text ml="x2">Artwork starter kit</Text>
            </a>
          </Flex> */}
        </>
      ),
    },
    {
      title: 'How does founder allocation work?',
      description: (
        <>
          <Flex mb={'x4'}>
            Founder allocations are a custom % of tokens over a custom period of time to
            specified wallet addresses.
          </Flex>

          <Flex mb={'x4'}>
            Founder distributions don't interfere with the cadence of auctions. Tokens are
            sent directly to the founder’s wallets and auctions continue on schedule with
            the next available ID.
          </Flex>
        </>
      ),
    },
    {
      title: 'How do auctions work?',
      description: (
        <>
          <Flex mb={'x4'}>
            Each auction is an NFT, created from your artwork layers.
          </Flex>
          <Flex mb={'x4'}>
            Once the auction is started by the founder, it will run forever. The DAO
            founder can set the auction schedule when they create the DAO. City DAO
            auction cadence is daily.
          </Flex>
          <Flex mb={'x4'}>
            100% of auction sales go to the DAO Treasury and is governed by your
            community.
          </Flex>
        </>
      ),
    },
  ]

  return (
    <Stack
      w={'100%'}
      mx={'auto'}
      mt={'x13'}
      justify={'flex-start'}
      className={homeSectionWrapper}
    >
      <Text fontWeight={'label'} className={homeSectionHeader}>
        FAQ
      </Text>

      <Box mt={'x3'}>
        <Accordion items={items} />
      </Box>
    </Stack>
  )
}

export default FAQ

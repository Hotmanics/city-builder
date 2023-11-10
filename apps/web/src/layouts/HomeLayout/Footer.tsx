import { Box, Flex, Grid, Stack } from '@zoralabs/zord'
import Link from 'next/link'
import React from 'react'

import { Icon } from 'src/components/Icon'

import { MadeWithZoraFooter } from '../DefaultLayout/MadeWithZoraFooter'
import {
  footerHeading,
  footerLeftWrapper,
  footerRightWrapper,
  getStartedButton,
  homeFooterInnerWrapper,
  homeFooterLinks,
} from './Footer.css'

export const Footer = () => {
  return (
    <Stack mt={'x13'} w={'100vw'} backgroundColor={'onNeutral'} pt={'x6'}>
      <Flex
        w={'100%'}
        style={{ maxWidth: 1144 + 64 }}
        mx={'auto'}
        justify={'space-between'}
        className={homeFooterInnerWrapper}
      >
        <Stack className={footerLeftWrapper}>
          <Flex
            as={'p'}
            fontWeight={'label'}
            fontSize={50}
            color={'onAccent'}
            className={footerHeading}
          >
            Unlock the possibilities of Web3. Start a City DAO. All onchain.
          </Flex>
          <Link href={'/create'} legacyBehavior>
            <Flex
              alignSelf={'flex-start'}
              py={'x6'}
              px={'x13'}
              color={'onAccent'}
              borderRadius={'curved'}
              mt={'x4'}
              className={getStartedButton}
            >
              Get Started
            </Flex>
          </Link>
        </Stack>
        <Stack gap={'x4'} className={footerRightWrapper}>
          <a
            href={'https://docs.zora.co/docs/smart-contracts/nouns-builder/intro'}
            target="_blank"
            rel="noreferrer"
          >
            <Box color={'onAccent'} fontSize={16} className={homeFooterLinks}>
              Documentation
            </Box>
          </a>
          <Link href={'/guidelines'} className={homeFooterLinks} legacyBehavior>
            <Box color={'onAccent'} fontSize={16} className={homeFooterLinks}>
              Proposal Guidelines
            </Box>
          </Link>
          <Link href={'/about'} className={homeFooterLinks} legacyBehavior>
            <Box color={'onAccent'} fontSize={16} className={homeFooterLinks}>
              About Builder
            </Box>
          </Link>
          <Link href={'/legal'} className={homeFooterLinks} legacyBehavior>
            <Box color={'onAccent'} fontSize={16} className={homeFooterLinks}>
              Terms of Service
            </Box>
          </Link>
          <Grid columns={3} gap="x3">
            <a href={'https://twitter.com/citydaonetwork'} target="_blank" rel="noreferrer">
              <Icon
                id="twitter"
                backgroundColor="background1"
                borderRadius="round"
                p="x2"
              />
            </a>
            <a href={'https://discord.gg/Vqapv5ME'} target="_blank" rel="noreferrer">
              <Icon
                id="discord"
                backgroundColor="background1"
                borderRadius="round"
                p="x2"
              />
            </a>
            <a
              href={'https://github.com/Hotmanics/city-builder'}
              target="_blank"
              rel="noreferrer"
            >
              <Icon
                id="github"
                backgroundColor="background1"
                borderRadius="round"
                p="x2"
              />
            </a>
          </Grid>
        </Stack>
      </Flex>
      <MadeWithZoraFooter
        backgroundColor={'primary'}
        color={'onAccent'}
        mb={{ '@initial': 'x4', '@768': 'x8' }}
      />
    </Stack>
  )
}

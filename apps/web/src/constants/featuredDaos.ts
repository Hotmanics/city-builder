import { CHAIN_ID } from 'src/typings'

export type TestnetChain = CHAIN_ID.GOERLI | CHAIN_ID.OPTIMISM_GOERLI

export const PUBLIC_FEATURED_DAOS = {
  [CHAIN_ID.GOERLI]: [
    {
      auctionAddress: '0xA21C52D91c3bEC132ac9eff52653845a18C29f47',
      tokenAddress: '0x9a99a59491E35a97Fc0776F9e6c3C209a75b6Ad9',
      name: 'PGH DAO',
    },
    {
      auctionAddress: '0x123bB0f159eb5dE02666252CfF203AEb2Bd067c5',
      tokenAddress: '0x6972E8525326053445c605969269c8174bF3a228',
      name: 'DC DAO',
    },
    {
      auctionAddress: '0xd11D8aFE303273151A3177E8f434c6f66976aFFa',
      tokenAddress: '0xC2Ac2885d7E4860FD98040606812912dAAfc54Ff',
      name: 'PDX DAO',
    },
  ],
  [CHAIN_ID.OPTIMISM_GOERLI]: [
    {
      auctionAddress: '0x0Ba1D0999C4EeBd55671dfB0daE2aaE5C6652Da4',
      tokenAddress: '0x29372170f43b13ca85eb0c17764f99e468739053',
      name: 'Another Test',
    },
    {
      auctionAddress: '0x0Ba1D0999C4EeBd55671dfB0daE2aaE5C6652Da4',
      tokenAddress: '0x29372170f43b13ca85eb0c17764f99e468739053',
      name: 'Another Test',
    },
    {
      auctionAddress: '0xD471e841e0EA469c315fE237a83C5952fA078138',
      tokenAddress: '0xc2047245f065ba2d4cc8276862723a159dd9d83b',
      name: 'Test',
    },
  ],
  [CHAIN_ID.BASE_GOERLI]: [
    {
      auctionAddress: '0x03855976Fcb91bF23110E2C425dCfb1BA0635b79',
      tokenAddress: '0x3b7626182aab7a70d4b2b254c4f19f5f48a7e6d8',
      name: 'Test base DAO',
    },
    {
      auctionAddress: '0x03855976Fcb91bF23110E2C425dCfb1BA0635b79',
      tokenAddress: '0x3b7626182aab7a70d4b2b254c4f19f5f48a7e6d8',
      name: 'Test base DAO',
    },
    {
      auctionAddress: '0x03855976Fcb91bF23110E2C425dCfb1BA0635b79',
      tokenAddress: '0x3b7626182aab7a70d4b2b254c4f19f5f48a7e6d8',
      name: 'Test base DAO',
    },
  ],
  [CHAIN_ID.ZORA_GOERLI]: [
    {
      auctionAddress: '0x8741AE7F44DFDEFaFC33b10D9FED9bd97ac8E972',
      tokenAddress: '0x65737024daf0ed2e2d86d67cdc3bc92fb903bd93',
      name: 'Test Zora',
    },
    {
      auctionAddress: '0x8741AE7F44DFDEFaFC33b10D9FED9bd97ac8E972',
      tokenAddress: '0x65737024daf0ed2e2d86d67cdc3bc92fb903bd93',
      name: 'Test Zora',
    },
    {
      auctionAddress: '0x8741AE7F44DFDEFaFC33b10D9FED9bd97ac8E972',
      tokenAddress: '0x65737024daf0ed2e2d86d67cdc3bc92fb903bd93',
      name: 'Test Zora',
    },
  ],
}

// import { ChainId } from '@pancakeswap-libs/sdk';
import { ChainId } from '@spookyswap/sdk';
import { Configuration } from './tomb-finance/config';
import { BankInfo } from './tomb-finance';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.MAINNET,
    networkName: 'Fantom Opera Mainnet',
    ftmscanUrl: 'https://ftmscan.com',
    defaultProvider: 'https://rpc.ftm.tools/',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18],
      USDC: ['0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', 6], // This is actually usdc on mainnet not fusdt
      ETH: ['0x74b23882a30290451A17c44f4F05243b6b58C76d', 18],
      'USDT-FTM-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      'LROAD-FTM-LP': ['0xBdEAD8F7292ee4782B24C65e2a3232376a06873E', 18],
      'SHIELD-FTM-LP': ['0x2b2877608A80773e1b8f79fD8a5066C558e862e0', 18],
      // 'LROAD-SHIELD-LP': ['0x1083A13213927Eb807C4BAE970E7E57a1E1b77B7', 18],
    },
    baseLaunchDate: new Date('2022-02-21 14:00:00Z'),
    bondLaunchesAt: new Date('2022-02-21T14:00:00Z'),
    masonryLaunchesAt: new Date('2022-02-21T14:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: ChainId.MAINNET,
    networkName: 'Fantom Opera Mainnet',
    ftmscanUrl: 'https://ftmscan.com',
    defaultProvider: 'https://rpc.ftm.tools/',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      WFTM: ['0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', 18],
      USDC: ['0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', 6], // This is actually usdc on mainnet not fusdt
      ETH: ['0x74b23882a30290451A17c44f4F05243b6b58C76d', 18],
      'USDT-FTM-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      'LROAD-FTM-LP': ['0xBdEAD8F7292ee4782B24C65e2a3232376a06873E', 18],
      'SHIELD-FTM-LP': ['0x2b2877608A80773e1b8f79fD8a5066C558e862e0', 18],
      // 'LROAD-SHIELD-LP': ['0x1083A13213927Eb807C4BAE970E7E57a1E1b77B7', 18],
    },
    baseLaunchDate: new Date('2022-02-21 14:00:00Z'),
    bondLaunchesAt: new Date('2022-02-21T14:00:00Z'),
    masonryLaunchesAt: new Date('2022-02-21T14:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding LROAD
        - 2 = LP asset staking rewarding SHIELD
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  LroadFtmRewardPool: {
    name: 'Earn LROAD by FTM',
    poolId: 0,
    sectionInUI: 0,
    contract: 'LroadFtmRewardPool',
    depositTokenName: 'WFTM',
    earnTokenName: 'LROAD',
    finished: false,
    sort: 1,
    closedForStaking: false,
  },
  LroadUsdcRewardPool: {
    name: 'Earn LROAD by USDC',
    poolId: 1,
    sectionInUI: 0,
    contract: 'LroadUsdcGenesisRewardPool',
    depositTokenName: 'USDC',
    earnTokenName: 'LROAD',
    finished: false,
    sort: 2,
    closedForStaking: false,
  },
  LroadethRewardPool: {
    name: 'Earn LROAD by ETH',
    poolId: 2,
    sectionInUI: 0,
    contract: 'LroadethGenesisRewardPool',
    depositTokenName: 'ETH',
    earnTokenName: 'LROAD',
    finished: false,
    sort: 4,
    closedForStaking: false,
  },
  LroadFtmLPShieldRewardPool: {
    name: 'Earn SHIELD by LROAD-FTM LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'LroadFtmLPShieldRewardPool',
    depositTokenName: 'LROAD-FTM-LP',
    earnTokenName: 'SHIELD',
    finished: false,
    sort: 5,
    closedForStaking: false,
  },
  ShieldFtmLPShieldRewardPool: {
    name: 'Earn SHIELD by SHIELD-FTM LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'ShieldFtmLPShieldRewardPool',
    depositTokenName: 'SHIELD-FTM-LP',
    earnTokenName: 'SHIELD',
    finished: false,
    sort: 6,
    closedForStaking: false,
  },
  // LroadShieldLPShieldRewardPool: {
  //   name: 'Earn SHIELD by LROAD-SHIELD LP',
  //   poolId: 2,
  //   sectionInUI: 2,
  //   contract: 'LroadShieldLPShieldRewardPool',
  //   depositTokenName: 'LROAD-SHIELD-LP',
  //   earnTokenName: 'SHIELD',
  //   finished: false,
  //   sort: 7,
  //   closedForStaking: false,
  // },
};

export default configurations[process.env.NODE_ENV || 'development'];

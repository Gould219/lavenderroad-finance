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
      fUSDT: ['0x049d68029688eAbF473097a2fC38ef61633A3C7A', 6],
      DAI: ['0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', 18],
      'USDT-FTM-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      'LROAD-FTM-LP': ['0x5d71CC8C9a0427A47FE1dbd762eB051364c16636', 18],
      'LCREAM-FTM-LP': ['0xfAc3CCA120dEFf710d6fBF1Cd1f7415AED261F41', 18],
      // 'LROAD-LCREAM-LP': ['0x1083A13213927Eb807C4BAE970E7E57a1E1b77B7', 18],
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
      fUSDT: ['0x049d68029688eAbF473097a2fC38ef61633A3C7A', 6],
      DAI: ['0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E', 18],
      'USDT-FTM-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      'LROAD-FTM-LP': ['0x5d71CC8C9a0427A47FE1dbd762eB051364c16636', 18],
      'LCREAM-FTM-LP': ['0xfAc3CCA120dEFf710d6fBF1Cd1f7415AED261F41', 18],
      // 'LROAD-LCREAM-LP': ['0x1083A13213927Eb807C4BAE970E7E57a1E1b77B7', 18],
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
        - 2 = LP asset staking rewarding LCREAM
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
 
  LroadFtmLpRewardPool: {
    name: 'Earn LROAD by LROAD-FTM LP',
    poolId: 4,
    sectionInUI: 0,
    contract: 'LroadFtmLpRewardPool',
    depositTokenName: 'LROAD-FTM-LP',
    earnTokenName: 'LROAD',
    finished: false,
    sort: 0,
    closedForStaking: false,
    depositFee: '1%',
    multiplier: '10X',
  },
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
    depositFee: '1%',
    multiplier: '20X',
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
    depositFee: '1%',
    multiplier: '25X',
  },
  LroadfusdtRewardPool: {
    name: 'Earn LROAD by fUSDT',
    poolId: 2,
    sectionInUI: 0,
    contract: 'LroadfusdtGenesisRewardPool',
    depositTokenName: 'fUSDT',
    earnTokenName: 'LROAD',
    finished: false,
    sort: 3,
    closedForStaking: false,
    depositFee: '1%',
    multiplier: '25X',
  },
  LroaddaiRewardPool: {
    name: 'Earn LROAD by DAI',
    poolId: 3,
    sectionInUI: 0,
    contract: 'LroaddaiGenesisRewardPool',
    depositTokenName: 'DAI',
    earnTokenName: 'LROAD',
    finished: false,
    sort: 4,
    closedForStaking: false,
    depositFee: '1%',
    multiplier: '20X',
  },
  LroadFtmLPLcreamRewardPool: {
    name: 'Earn LCREAM by LROAD-FTM LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'LroadFtmLPLcreamRewardPool',
    depositTokenName: 'LROAD-FTM-LP',
    earnTokenName: 'LCREAM',
    finished: false,
    sort: 5,
    closedForStaking: false,
    depositFee: '0%',
    multiplier: '60X',
  },
  LcreamFtmLPLcreamRewardPool: {
    name: 'Earn LCREAM by LCREAM-FTM LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'LcreamFtmLPLcreamRewardPool',
    depositTokenName: 'LCREAM-FTM-LP',
    earnTokenName: 'LCREAM',
    finished: false,
    sort: 6,
    closedForStaking: false,
    depositFee: '0%',
    multiplier: '40X',
  },
  // LroadLcreamLPLcreamRewardPool: {
  //   name: 'Earn LCREAM by LROAD-LCREAM LP',
  //   poolId: 2,
  //   sectionInUI: 2,
  //   contract: 'LroadLcreamLPLcreamRewardPool',
  //   depositTokenName: 'LROAD-LCREAM-LP',
  //   earnTokenName: 'LCREAM',
  //   finished: false,
  //   sort: 7,
  //   closedForStaking: false,
  // },
};

export default configurations[process.env.NODE_ENV || 'development'];

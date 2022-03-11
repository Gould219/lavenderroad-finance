import React from 'react';

//Graveyard ecosystem logos
import tombLogo from '../../assets/img/crypto_tomb_cash.svg';
import tShareLogo from '../../assets/img/crypto_tomb_share.svg';
import tBondLogo from '../../assets/img/crypto_tomb_bond.svg';

import tombFtmLpLogo from '../../assets/img/tomb_ftm_lp.png';
import tshareFtmLpLogo from '../../assets/img/tshare_ftm_lp.png';

import wftmLogo from '../../assets/img/fantom-ftm-logo.png';
import usdcLogo from '../../assets/img/USDC.png';
import ethLogo from '../../assets/img/weth.png';
import lroadshieldLogo from '../../assets/img/comet-meteor-lp.png';

const logosBySymbol: { [title: string]: string } = {
  //Real tokens
  //=====================
  LROAD: tombLogo,
  SHIELD: tShareLogo,
  LBURGER: tBondLogo,
  WFTM: wftmLogo,
  USDC: usdcLogo,
  ETH: ethLogo,
  'LROAD-FTM-LP': tombFtmLpLogo,
  'SHIELD-FTM-LP': tshareFtmLpLogo,
  'LROAD-SHIELD-LP': lroadshieldLogo,
};

type LogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<LogoProps> = ({ symbol, size = 110}) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid Token Logo symbol: ${symbol}`);
  }
  return <img src={logosBySymbol[symbol]} alt={`${symbol} Logo`} width={size} height={size} />;
};

export default TokenSymbol;

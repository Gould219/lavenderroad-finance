import React, { useMemo } from 'react';
import moment from 'moment';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/home.png';
import CashImage from '../../assets/img/crypto_tomb_cash.svg';
import Image from 'material-ui-image';
import { Alert } from '@material-ui/lab';
// import { useMediaQuery } from '@material-ui/core';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
import useTombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useGenesisPoolAllocationTimes from '../../hooks/useGenesisPoolAllocationTimes';
import useLcreamPoolAllocationTimes from '../../hooks/useLcreamPoolAllocationTimes';
import ProgressCountdown from '../Cemetery/ProgressCountdown';

import { tomb as tombTesting, tShare as tShareTesting } from '../../tomb-finance/deployments/deployments.testing.json';
import { tomb as tombProd, tShare as tShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';
import MetamaskFox from '../../assets/img/metamask-fox.svg';
import TwitterImage from '../../assets/img/twitter.svg';
import DiscordImage from '../../assets/img/discord.svg';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

// import { makeStyles } from '@material-ui/core/styles';
import useTombFinance from '../../hooks/useTombFinance';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;


const Home = () => {
  const TVL = useTotalValueLocked();
  const tombFtmLpStats = useLpStats('LROAD-FTM-LP');
  const tShareFtmLpStats = useLpStats('LCREAM-FTM-LP');
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const tombFinance = useTombFinance();
  const { wfrom, from, to } = useGenesisPoolAllocationTimes();
  const { from: mfrom, to: mto } = useLcreamPoolAllocationTimes();
  const isStart = Date.now() >= wfrom.getTime();
  const isOver = Date.now() >= to.getTime();
  const isMStart = Date.now() >= mfrom.getTime();
  const isMOver = Date.now() >= mto.getTime();

  let tomb;
  let tShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    tomb = tombTesting;
    tShare = tShareTesting;
  } else {
    tomb = tombProd;
    tShare = tShareProd;
  }

  const buyTombAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tomb.address;
  const buyTShareAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tShare.address;

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);
  const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(4) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombLpZap = useZap({ depositTokenName: 'LROAD-FTM-LP' });
  const tshareLpZap = useZap({ depositTokenName: 'LCREAM-FTM-LP' });

  const [onPresentTombZap, onDissmissTombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTombZap();
      }}
      tokenName={'LROAD-FTM-LP'}
    />,
  );

  const [onPresentTshareZap, onDissmissTshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTshareZap();
      }}
      tokenName={'LCREAM-FTM-LP'}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid container item xs={12} sm={4}>
          {/* <Paper>xs=6 sm=3</Paper> */}
          <Image color="none" style={{ width: '300px', paddingTop: '0px' }} src={CashImage} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box p={4} style={{paddingBottom: '20px'}}>
              <h1>Welcome to Lavender Road</h1>
              <p>The most sustainable algorithmic stable coin on Fantom Opera, pegged to the price of 1 FTM via seigniorage.</p>
              <p>
                Stake your LROAD-FTM LP in the Farm to earn LCREAM rewards.
                Then stake your earned LCREAM in the Boardroom to earn more LROAD!
              </p>
              { isStart && !isOver ? 
                <a href="/farm" style={{fontSize:"27px", fontWeight:"600"}}>Genesis Pools are live now!</a> : !isStart ?
                <div style={{display:'flex', fontSize:'20px'}}>
                  Genesis Pools Launch In: <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={wfrom} description="Pool Start" /> (<ProgressCountdown base={moment().toDate()} hideBar={true} deadline={from} description="Pool Start" />	&nbsp; For WL Users)
                </div> : null 
              }
              { isMStart && !isMOver ? 
                <a href="/farm" style={{fontSize:"27px", fontWeight:"600"}}>Lcream Reward Pools are live now!</a> : !isMStart ?
                <div style={{display:'flex', fontSize:'20px'}}>
                  Lcream Reward Pools Launch In: <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={mfrom} description="Pool Start" />
                </div> : null 
              }
              <Grid item xs={12} sm={12} align="center">
                <Button target="_blank" href="https://twitter.com/RoadLavender" style={{ margin: '15px 10px', marginBottom: '0', backgroundColor:'#1da1f2', padding:'10px 15px' }}>
                  <img alt="twitter" src={TwitterImage} style={{marginRight:'10px'}}/>
                  Twitter
                </Button>
                <Button target="_blank" href="https://discord.gg/pV2wSs7MK7" style={{ margin: '15px 10px', marginBottom: '0', background:'#5865f2', padding:'10px 15px' }}>
                  <img alt="discord" src={DiscordImage} style={{marginRight:'10px', width: '18px'}}/>
                  Discord
                </Button>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        <Grid container spacing={3}>
          <Grid item  xs={12} sm={12} style={{ margin: '12px', display: 'flex' }}>
            <Alert variant="filled" severity="warning" style={{width: '100%', background: '#963d9f', padding: '12px 20px'}}>
              <div> Do your own research before investing. Investing is risky and may result in monetary loss. Lavender Road is beta software and may contain bugs. By using Lavender Road, you agree that the Lavender Road team is not responsible for any financial losses from investing in Lavender Road.</div>
            </Alert>
        </Grid>
        </Grid>

        {/* TVL */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{ fontSize: '28px' }} end={TVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center" style={{padding: '32px' }}>
              <Button color="primary" href="/boardroom" variant="contained" style={{marginRight : "10px", marginTop : "10px", padding:'10px 25px' }}>
                Stake Now
              </Button>
              <Button color="primary" target="_blank" href={buyTombAddress} variant="contained" style={{marginRight : "10px", marginTop : "10px", padding:'10px 25px'}}>
                Buy LROAD
              </Button>
              <Button href="/farm" variant="contained" style={{marginRight : "10px", marginTop : "10px", padding:'10px 25px'}}>
                Farm Now
              </Button>
              <Button variant="contained" target="_blank" href={buyTShareAddress} style={{marginRight : "10px", marginTop : "10px", padding:'10px 25px'}}>
                Buy LCREAM
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* LROAD */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>LROAD</h2>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('LROAD');
                }}
                color="default"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '20px', borderTopRightRadius: '20px', borderBottomLeftRadius: '20px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="LROAD" size={200}/>
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '33px' }}>{tombPriceInFTM ? tombPriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '19px', alignContent: 'flex-start' }}>
                  ${tombPriceInDollars ? tombPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '16px' }}>
                Market Cap: ${(tombCirculatingSupply * tombPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tombCirculatingSupply} <br />
                Total Supply: {tombTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* LCREAM */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>LCREAM</h2>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('LCREAM');
                }}
                color="default"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '20px', borderTopRightRadius: '20px', borderBottomLeftRadius: '20px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="LCREAM" size={200}/>
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '33px' }}>{tSharePriceInFTM ? tSharePriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '19px' }}>${tSharePriceInDollars ? tSharePriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '17px' }}>
                Market Cap: ${(tShareCirculatingSupply * tSharePriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tShareCirculatingSupply} <br />
                Total Supply: {tShareTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* LBURGER */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>LBURGER</h2>
              <Button
                onClick={() => {
                  tombFinance.watchAssetInMetamask('LBURGER');
                }}
                color="default"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '20px', borderTopRightRadius: '20px', borderBottomLeftRadius: '20px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="LBURGER" size={200}/>
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '33px' }}>{tBondPriceInFTM ? tBondPriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '19px' }}>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '17px' }}>
                Market Cap: ${(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {tBondCirculatingSupply} <br />
                Total Supply: {tBondTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>LROAD-FTM Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="LROAD-FTM-LP" size={200}/>
                </CardIcon>
              </Box>
              <Box mt={2}>
                <Button color="primary" onClick={onPresentTombZap} variant="contained">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '29px' }}>
                  {tombLPStats?.tokenAmount ? tombLPStats?.tokenAmount : '-.--'} LROAD /{' '}
                  {tombLPStats?.ftmAmount ? tombLPStats?.ftmAmount : '-.--'} FTM
                </span>
              </Box>
              <Box>${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '17px' }}>
                Liquidity: ${tombLPStats?.totalLiquidity ? tombLPStats.totalLiquidity : '-.--'} <br />
                Total supply: {tombLPStats?.totalSupply ? tombLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>LCREAM-FTM Spooky LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="LCREAM-FTM-LP" size={200} />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <Button color="primary" onClick={onPresentTshareZap} variant="contained">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '29px' }}>
                  {tshareLPStats?.tokenAmount ? tshareLPStats?.tokenAmount : '-.--'} LCREAM /{' '}
                  {tshareLPStats?.ftmAmount ? tshareLPStats?.ftmAmount : '-.--'} FTM
                </span>
              </Box>
              <Box>${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '17px' }}>
                Liquidity: ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'}
                <br />
                Total supply: {tshareLPStats?.totalSupply ? tshareLPStats.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;

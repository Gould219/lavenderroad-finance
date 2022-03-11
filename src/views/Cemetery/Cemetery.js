import React from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';
import moment from 'moment';
import { Box, Container, Typography, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryCard from './CemeteryCard';
import useGenesisPoolAllocationTimes from '../../hooks/useGenesisPoolAllocationTimes';
import useShieldPoolAllocationTimes from '../../hooks/useShieldPoolAllocationTimes';
import ProgressCountdown from './ProgressCountdown';
import CemeteryImage from '../../assets/img/cemetery.png';
import { createGlobalStyle } from 'styled-components';

import useBanks from '../../hooks/useBanks';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${CemeteryImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const Cemetery = () => {
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const { from, to } = useGenesisPoolAllocationTimes();
  const { from:mfrom } = useShieldPoolAllocationTimes();
  const isOver = Date.now() >= to.getTime();
  const isStart = Date.now() >= mfrom.getTime();
  const activeBanks = banks.filter((bank) => !bank.finished);
  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <BackgroundImage />
          {!!account ? (
            <Container maxWidth="lg">
              <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
                Fortress
              </Typography>

              <Box mt={5}>
                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom>
                    Earn SHIELD by staking LP
                  </Typography>
                  <Alert variant="filled" style={{background: '#664b55', padding:'12px 20px', fontSize:'18px'}}>
                    {isStart ? 
                      <div>Pools are live now, Stake LPs to earn more SHIELD, No deposit fee</div> : 
                      <>
                        Pools starting at {mfrom.toUTCString()}, No deposit fee.<br/>
                        <div style={{display:'flex'}}>Shield reward pools start in: <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={mfrom} description="End Pool" />.</div>
                      </>
                    }
                  </Alert>
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 2)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>

                {/* <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 1).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Earn LROAD by staking LP
                  </Typography>
                  <Alert variant="filled" severity="warning" style={{background: '#664b55'}}>
                    All below pools have ended. Please unstake and collect your rewards.
                  </Alert>
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 1)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div> */}

                <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                  <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    Genesis Pools
                  </Typography>
                  <Alert variant="filled" severity={isOver ? 'info' : 'success'} style={{background: '#664b55', padding:'12px 20px', fontSize:'18px'}}>
                    {isOver ? 
                      <div>All below pools have ended. Please unstake and collect your rewards.</div> : 
                      <>
                        Pools starting at {from.toUTCString()} and will run for 2 days with a 1% deposit fee.<br/>
                        <div style={{display:'flex'}}>Time until genesis pools end: <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="End Pool" />. Please refer to &nbsp;<a target="_blank" href="https://lroad-finance88.gitbook.io/untitled/" rel="noopener noreferrer">documentation</a>&nbsp; docs to understand our protocol's fee model.</div>
                      </>
                    }
                  </Alert>
                  <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {activeBanks
                      .filter((bank) => bank.sectionInUI === 0)
                      .map((bank) => (
                        <React.Fragment key={bank.name}>
                          <CemeteryCard bank={bank} />
                        </React.Fragment>
                      ))}
                  </Grid>
                </div>
              </Box>
            </Container>
          ) : (
            <UnlockWallet />
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <BackgroundImage />
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

export default Cemetery;

import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core';
import { tomb , tShare } from '../../tomb-finance/deployments/deployments.mainnet.json';
import TokenSymbol from '../../components/TokenSymbol';
import useStatsForPool from '../../hooks/useStatsForPool';

const CemeteryCard = ({ bank }) => {
  const statsOnPool = useStatsForPool(bank);
  let getDepositTokenLink;
  if(bank.depositTokenName.endsWith('LP')) {
    if(bank.depositTokenName.includes('LROAD')) {
      getDepositTokenLink = 'https://spookyswap.finance/add/FTM/' + tomb?.address;
    } else {
      getDepositTokenLink = 'https://spookyswap.finance/add/FTM/' + tShare?.address;
    }
  } else {
    getDepositTokenLink = 'https://spookyswap.finance/swap?outputCurrency=' + bank.depositToken.address;
  }
  return (
    <Grid item xs={12} md={4} lg={4}>
      <Card variant="outlined">
        <CardContent>
          <Box style={{ position: 'relative' }}>
            <Box
              style={{
                position: 'absolute',
                right: '0px',
                top: '-5px',
                height: '48px',
                width: '48px',
                borderRadius: '40px',
                backgroundColor: 'white',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <TokenSymbol size={110} symbol={bank.depositTokenName} />
            </Box>
            <Typography variant="h5" component="h2">
              {bank.depositTokenName}
            </Typography>
            <Typography color="textSecondary">
              {/* {bank.name} */}
              Deposit: <span style={{color: '#00bcd4', fontWeight:'700'}}>{bank.depositTokenName.toUpperCase()}</span>
            </Typography>
            <Typography color="textSecondary">
              Earn: <span style={{color: '#00bcd4', fontWeight:'700'}}>{bank.earnTokenName.toUpperCase()} </span>
            </Typography>
            <Typography color="textSecondary">
              Daily APR: <span style={{color: '#00bcd4', fontWeight:'700'}}>{bank.closedForStaking || bank.genesisFinished ? '0.00' : statsOnPool?.dailyAPR}%</span>
            </Typography>
            {!bank.depositTokenName.endsWith('LP') && 
              <Typography color="textSecondary">
                Deposit Fee: <span style={{color: '#00bcd4', fontWeight:'700'}}>1%</span>
              </Typography>
            }
          </Box>
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <a style={{textDecoration: 'none'}} target="_blank" rel="noopener noreferrer" href={getDepositTokenLink} >
            <Button color="primary" size="small" variant="contained">
              {bank.depositTokenName.endsWith('LP') ? 'Add LP' : 'Buy'}
            </Button>
          </a>
          <Button color="primary" size="small" variant="contained" component={Link} to={`/farm/${bank.contract}`}>
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CemeteryCard;

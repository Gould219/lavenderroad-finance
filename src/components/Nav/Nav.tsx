import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
} from '@material-ui/core';
import ListItemLink from '../ListItemLink';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountButton from './AccountButton';
import Banner from '../../assets/img/banner_transp.svg';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    'background-color': '#973e9c',
    borderBottom: `1px solid #fff`,
    padding: '5px 0',
    marginBottom: '3rem',
    zIndex: 2,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    flexWrap: 'wrap',
    ['@media (min-width:1223px)']: { // eslint-disable-line no-useless-computed-key
      justifyContent: 'space-between',
    }
  },
  toolbarTitle: {
    // fontFamily: '"Amarante", cursive',
    fontSize: '30px',
    flexGrow: 1,
  },
  link: {
    textTransform: 'uppercase',
    color: '#fff',
    fontSize: '15px',
    margin: '2px 8px',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      color: '#ecc5d1',
    },
  },
  brandLink: {
    textDecoration: 'none',
    color: '#fff',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

const Nav = () => {
  const matches = useMediaQuery('(min-width:1223px)');
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="sticky" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {matches ? (
          <>
            
            {/* <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}> */}
              {/* <a className={ classes.brandLink } href="/">Lavender Road</a> */}
              <Link to="/" color="inherit" className={classes.brandLink}>
                <img src={Banner} alt='Lavender Road Logo' width={376} height={80} style={{verticalAlign:'middle'}}/>
              </Link>

            <Grid style={{display:'flex', alignItems : 'center'}}>
            {/* </Typography> */}
            <Box mr={3}>
              <Link color="textPrimary" to="/" className={classes.link}>
                Home
              </Link>
              <Link color="textPrimary" to="/farm" className={classes.link}>
                Farms
              </Link>
              <Link color="textPrimary" to="/boardroom" className={classes.link}>
                Boardroom
              </Link>
              <Link color="textPrimary" to="/bond" className={classes.link}>
                Bond
              </Link>
              {/* <a href="https://degenwhale.money" target="_blank" rel="noopener noreferrer" className={classes.link}>
                Vaults
              </a>
              <Link color="textPrimary" to="/sbs" className={classes.link}>
                SBS
              </Link>
              <Link color="textPrimary" to="/liquidity" className={classes.link}>
                Liquidity
              </Link>
              <Link color="textPrimary" to="/regulations" className={classes.link}>
                Regulations
              </Link> */}
              <a href="https://ctillerlvx.gitbook.io/lavender-road/" target="_blank" rel="noopener noreferrer" className={classes.link}>
                Docs
              </a>
              <a href="https://dexscreener.com/fantom/0x6C954Ffa827EAC9e2A222d27B28591E1777736a1" target="_blank" rel="noopener noreferrer" className={classes.link}>
                Lroad Chart
              </a>
              <a href="https://dexscreener.com/fantom/0x181794984bc4376348dca3a7989268c8aA734021" target="_blank" rel="noopener noreferrer" className={classes.link}>
                Lcream Chart
              </a>
            </Box>
            <AccountButton text="Connect" />
            </Grid>
          </>
        ) : (
          <>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <img src={Banner} alt='Lavender Road Logo' width={258} height={55} style={{verticalAlign:'middle'}}/>
            {/* <Typography variant="h6" noWrap>
              Lavender Road
            </Typography> */}

            <Drawer
              className={classes.drawer}
              onClose = {handleDrawerClose}
              variant="temporary"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItemLink primary="Home" to="/" />
                <ListItemLink primary="Farms" to="/farm" />
                <ListItemLink primary="Boardroom" to="/boardroom" />
                <ListItemLink primary="Bond" to="/bond" />
                {/* <ListItemLink primary="SBS" to="/sbs" />
                <ListItemLink primary="Liquidity" to="/liquidity" />
                <ListItemLink primary="Regulations" to="/regulations" />
                <ListItem button component="a" href="https://degenwhale.money">
                  <ListItemText>Vaults</ListItemText>
                </ListItem>
                 */}
                <ListItem button component="a" target="_blank" rel="noopener noreferrer" href="https://ctillerlvx.gitbook.io/lavender-road/">
                  <ListItemText>Docs</ListItemText>
                </ListItem>
                <ListItem button component="a" target="_blank" rel="noopener noreferrer" href="https://dexscreener.com/fantom/0x6C954Ffa827EAC9e2A222d27B28591E1777736a1">
                  <ListItemText>LROAD Chart</ListItemText>
                </ListItem>
                <ListItem button component="a" target="_blank" rel="noopener noreferrer" href="https://dexscreener.com/fantom/0x181794984bc4376348dca3a7989268c8aA734021">
                  <ListItemText>LCREAM Chart</ListItemText>
                </ListItem>
                <ListItem style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AccountButton text="Connect" />
                </ListItem>
              </List>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;

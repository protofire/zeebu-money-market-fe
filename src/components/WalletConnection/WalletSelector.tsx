import { Trans } from '@lingui/macro';
import { Box, Button, Grid, Stack, styled, Typography } from '@mui/material';
import { UnsupportedChainIdError } from '@web3-react/core';
import { NoEthereumProviderError } from '@web3-react/injected-connector';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { UserRejectedRequestError } from 'src/libs/web3-data-provider/WalletConnectConnector';
import { WalletType } from 'src/libs/web3-data-provider/WalletOptions';
import { useRootStore } from 'src/store/root';
import { AUTH } from 'src/utils/mixPanelEvents';

import SendArrowIcon from '../icons/SendArrowIcon';
import { Warning } from '../primitives/Warning';
import { TxModalTitle } from '../transactions/FlowCommons/TxModalTitle';

const WalletButton = styled(Button)(() => ({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 14,
  fontWeight: 'bold',
  padding: '6px 18px',
  border: '1px solid',
  lineHeight: 1.5,
  background:
    'linear-gradient(180deg, rgba(255, 255, 255, 0.25) 6.67%, rgba(255, 255, 255, 0.00) 100%)',
  borderColor: '#F5F5F5',
  color: 'white',
  height: 50,
  marginTop: 20,
  borderRadius: '30px',
  '&:hover': {
    backgroundColor: 'hsl(17, 100%, 68%)',
    borderColor: 'none',
    boxShadow: 'none',
    color: 'white',
    '& svg': {
      stroke: 'white',
    },
  },
  '&:active': {
    boxShadow: 'none',
    background: 'linear-gradient(180deg, #FFE3B5 32.17%, #D3390B 100%)',
    borderColor: 'none',
  },
  '&:focus': {
    boxShadow: 'none',
  },
}));

export type WalletRowProps = {
  walletName: string;
  walletType: WalletType;
};
const WalletRow = ({ walletName, walletType }: WalletRowProps) => {
  const { connectWallet, loading } = useWeb3Context();
  const trackEvent = useRootStore((store) => store.trackEvent);

  const getWalletIcon = (walletType: WalletType) => {
    switch (walletType) {
      case WalletType.INJECTED:
        return (
          <img
            src={`/icons/wallets/browserWallet.svg`}
            width="30px"
            height="30px"
            alt={`Browser wallet icon`}
          />
        );
      case WalletType.WALLET_LINK:
        return (
          <img
            src={`/icons/wallets/coinbase.svg`}
            width="30px"
            height="30px"
            alt={`wallet connect icon`}
          />
        );
      case WalletType.WALLET_CONNECT:
        return (
          <img
            src={`/icons/wallets/walletConnect.svg`}
            width="30px"
            height="30px"
            alt={`wallet connect icon`}
          />
        );
      default:
        return null;
    }
  };

  const connectWalletClick = () => {
    trackEvent(AUTH.CONNECT_WALLET, { walletType: walletType, walletName: walletName });
    connectWallet(walletType);
  };

  return (
    <Button
      disabled={loading}
      variant="outlined"
      sx={{
        width: '100%',
        height: '60px',
        borderRadius: '10px',
        border: '1px solid rgba(255, 255, 255, 0.20)',
        background:
          'linear-gradient(127.43deg, rgba(255, 255, 255, 0.15) 2.54%, rgba(153, 153, 153, 0.15) 97.47%)',
        backdropFilter: 'blur(6px)',
        padding: '10px',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        color: 'white',
        '&.Mui-disabled': {
          background: '#22222237',
          color: '#cacaca',
          boxShadow: 'none',
        },
      }}
      onClick={connectWalletClick}
      startIcon={getWalletIcon(walletType)}
    >
      {walletName}
    </Button>
  );
};

export enum ErrorType {
  UNSUPORTED_CHAIN,
  USER_REJECTED_REQUEST,
  UNDETERMINED_ERROR,
  NO_WALLET_DETECTED,
}

export const WalletSelector = () => {
  const { error } = useWeb3Context();

  let blockingError: ErrorType | undefined = undefined;
  if (error) {
    if (error instanceof UnsupportedChainIdError) {
      blockingError = ErrorType.UNSUPORTED_CHAIN;
    } else if (error instanceof UserRejectedRequestError) {
      blockingError = ErrorType.USER_REJECTED_REQUEST;
    } else if (error instanceof NoEthereumProviderError) {
      blockingError = ErrorType.NO_WALLET_DETECTED;
    } else {
      blockingError = ErrorType.UNDETERMINED_ERROR;
    }
  }

  const handleBlocking = () => {
    switch (blockingError) {
      case ErrorType.UNSUPORTED_CHAIN:
        return <Trans>Network not supported for this wallet</Trans>;
      case ErrorType.USER_REJECTED_REQUEST:
        return <Trans>Rejected connection request</Trans>;
      case ErrorType.NO_WALLET_DETECTED:
        return <Trans>Wallet not detected. Connect or install wallet and retry</Trans>;
      default:
        console.log('Uncatched error: ', error);
        return <Trans>Error connecting. Try refreshing the page.</Trans>;
    }
  };

  return (
    <Box>
      <TxModalTitle
        padding={4}
        borderBottom="1px solid rgba(255, 255, 255, 0.3)"
        marginBottom={0}
        title="Connect Wallet"
      />
      <Grid
        container
        flexDirection={{ xs: 'column-reverse', md: 'row' }}
        flexWrap={'nowrap'}
        gap={4}
      >
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            padding: '20px',
            margin: { xs: '8px', md: '20px 0 20px 20px' },
            borderRadius: '20px',
            border: '1px solid rgba(48, 58, 80, 0.4)',
            background:
              'linear-gradient(127.43deg, rgba(255, 255, 255, 0.15) 2.54%, rgba(153, 153, 153, 0.15) 97.47%)',
          }}
        >
          <img src="/walleticon.svg" alt="wallet icon" width={87} height={87} />
          <Typography variant="h4" mt={2} mb={2} color="white">
            Connect your Wallet
          </Typography>
          <Typography variant="main14" fontWeight={400} color="white">
            Start by connecting with one of the wallet from the given options. Be sure to store your
            private keys or seed phrase securely. Never share them with anyone.
          </Typography>
          <WalletButton
            onClick={() =>
              window.open(
                'https://learn.metamask.io/lessons/what-is-a-crypto-wallet',
                '_blank',
                'noreferrer noopener'
              )
            }
          >
            <Stack
              justifyContent="space-between"
              alignItems="center"
              direction="row"
              width="100%"
              lineHeight="30px"
            >
              <Typography mr={1} sx={{ fontSize: { xs: '12px', md: '14px' } }} fontWeight="bold">
                <Trans>What Is A Wallet?</Trans>
              </Typography>
              <SendArrowIcon />
            </Stack>
          </WalletButton>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            padding: '20px',
            margin: { xs: '8px', md: '20px 20px 20px 0' },
            borderRadius: '20px',
            border: '1px solid rgba(48, 58, 80, 0.4)',
            background:
              'linear-gradient(127.43deg, rgba(255, 255, 255, 0.15) 2.54%, rgba(153, 153, 153, 0.15) 97.47%)',
          }}
        >
          <Typography variant="h4" mb={4} color="white">
            Available Wallets
          </Typography>
          <Grid container direction="row" rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 2 }}>
            <Grid item xs={12} sm={6}>
              <WalletRow
                key="browser_wallet"
                walletName="Browser Wallet"
                walletType={WalletType.INJECTED}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <WalletRow
                key="walletlink_wallet"
                walletName="Coinbase Wallet"
                walletType={WalletType.WALLET_LINK}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <WalletRow
                key="walletconnect_wallet"
                walletName="WalletConnect"
                walletType={WalletType.WALLET_CONNECT}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {error && <Warning severity="error">{handleBlocking()}</Warning>}
    </Box>
  );
};

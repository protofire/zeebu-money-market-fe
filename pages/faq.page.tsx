import { Trans } from '@lingui/macro';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { MainLayout } from 'src/layouts/MainLayout';
import FaqContainer from 'src/modules/faq/FaqContainer';
import { useRootStore } from 'src/store/root';

export const marketContainerProps = {
  sx: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    pb: '39px',
    px: {
      xs: 2,
      xsm: 5,
      sm: 12,
      md: 5,
      lg: 0,
      xl: '96px',
      xxl: 0,
    },
    maxWidth: {
      xs: 'unset',
      lg: '1240px',
      xl: 'unset',
      xxl: '1440px',
    },
  },
};

export default function Faq() {
  const trackEvent = useRootStore((store) => store.trackEvent);

  useEffect(() => {
    trackEvent('Page Viewed', {
      'Page Name': 'Faq',
    });
  }, [trackEvent]);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Typography
          variant="display1"
          sx={{ margin: { xs: '2rem 1rem 0 1rem', sm: '4rem 2rem 0 2rem' } }}
        >
          <Trans>Understand ZBU MoneyMarket</Trans>
        </Typography>
        <FaqContainer />
      </Box>
    </>
  );
}

Faq.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

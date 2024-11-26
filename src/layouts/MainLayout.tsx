import { Box, useTheme } from '@mui/material';
import ZeebuBG_dark from 'public/bg-dark.png';
import ZeebuBG_light from 'public/bg-light.png';
import React, { ReactNode } from 'react';

import { AppFooter } from './AppFooter';
import { AppHeader } from './AppHeader';

export function MainLayout({ children }: { children: ReactNode }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundImage:
          theme.palette.mode === 'dark' ? `url(${ZeebuBG_dark.src})` : `url(${ZeebuBG_light.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
      }}
    >
      <AppHeader />
      <Box component="main" sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {children}
      </Box>
      <AppFooter />
    </Box>
  );
}

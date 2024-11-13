import { Trans } from '@lingui/macro';
import { Box, Typography, useTheme } from '@mui/material';
import { ReactNode } from 'react';

import { DarkTooltip } from './infoTooltips/DarkTooltip';

interface CircleIconProps {
  downToSM: boolean;
  tooltipText: string;
  children: ReactNode;
}

export const CircleIcon = ({ downToSM, tooltipText, children }: CircleIconProps) => {
  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';

  return (
    <DarkTooltip
      title={
        <Typography>
          <Trans>{tooltipText}</Trans>
        </Typography>
      }
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            bgcolor: isLightTheme ? '#e0e0e028' : '#f1f1f150',
            width: downToSM ? '18px' : '24px',
            height: downToSM ? '18px' : '24px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            ml: '8px',
            border: isLightTheme
              ? '0.5px solid rgba(0, 0, 0, 0.12)'
              : '0.5px solid rgba(235, 235, 237, 0.12)',
          }}
        >
          {children}
        </Box>
      </Box>
    </DarkTooltip>
  );
};

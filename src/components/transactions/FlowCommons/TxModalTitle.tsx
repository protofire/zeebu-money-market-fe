import { Typography } from '@mui/material';
import { ReactNode } from 'react';

export type TxModalTitleProps = {
  title: ReactNode;
  symbol?: string;
};

export const TxModalTitle = ({ title, symbol }: TxModalTitleProps) => {
  return (
    <Typography
      variant="h3"
      color="white"
      sx={{ p: 4, borderBottom: '1px solid rgba(255, 255, 255, 0.3)', flex: '0 0 auto' }}
    >
      {title} {symbol ?? ''}
    </Typography>
  );
};

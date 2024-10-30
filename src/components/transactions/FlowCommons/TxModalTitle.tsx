import { Typography } from '@mui/material';
import { ReactNode } from 'react';

export type TxModalTitleProps = {
  title: ReactNode;
  symbol?: string;
  padding?: number;
  borderBottom?: string;
};

export const TxModalTitle = ({ title, symbol, padding, borderBottom }: TxModalTitleProps) => {
  return (
    <Typography
      variant="h3"
      color="white"
      sx={{
        p: padding ?? undefined,
        borderBottom: borderBottom ?? undefined,
        flex: '0 0 auto',
      }}
    >
      {title} {symbol ?? ''}
    </Typography>
  );
};

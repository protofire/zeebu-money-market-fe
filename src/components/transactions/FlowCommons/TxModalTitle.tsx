import { Typography } from '@mui/material';
import { ReactNode } from 'react';

export type TxModalTitleProps = {
  title: ReactNode;
  symbol?: string;
  padding?: number;
  borderBottom?: string;
  marginBottom?: number;
};

export const TxModalTitle = ({
  title,
  symbol,
  padding,
  borderBottom,
  marginBottom,
}: TxModalTitleProps) => {
  return (
    <Typography
      variant="h3"
      color="white"
      sx={{
        p: padding ?? undefined,
        borderBottom: borderBottom ?? undefined,
        marginBottom: marginBottom ?? '20px',
        flex: '0 0 auto',
      }}
    >
      {title} {symbol ?? ''}
    </Typography>
  );
};

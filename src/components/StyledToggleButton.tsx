import { styled, ToggleButton, ToggleButtonProps } from '@mui/material';
import React from 'react';

const CustomToggleButton = styled(ToggleButton)<ToggleButtonProps>(({ theme }) => ({
  border: '0px',
  flex: 1,
  borderRadius: '6px',

  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: '#ffffff61',
    borderRadius: '4px !important',
  },

  '&.Mui-selected, &.Mui-disabled': {
    zIndex: 100,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',

    '.MuiTypography-subheader1': {
      background: theme.palette.gradients.newGradient,
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
    '.MuiTypography-secondary14': {
      background: theme.palette.gradients.newGradient,
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
  },
})) as typeof ToggleButton;

const CustomTxModalToggleButton = styled(ToggleButton)<ToggleButtonProps>(({ theme }) => ({
  border: '0px',
  flex: 1,
  color: theme.palette.common.white,
  borderRadius: '4px',

  '&.Mui-selected, &.Mui-selected:hover': {
    border: `1px solid ${theme.palette.other.standardInputLine}`,
    backgroundColor: '#ffffff2b',
    borderRadius: '4px !important',
  },

  '&.Mui-selected, &.Mui-disabled': {
    zIndex: 100,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
})) as typeof ToggleButton;

export function StyledTxModalToggleButton(props: ToggleButtonProps) {
  return <CustomTxModalToggleButton {...props} />;
}

export default function StyledToggleButton(props: ToggleButtonProps) {
  return <CustomToggleButton {...props} />;
}

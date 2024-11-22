import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import Popover from '@mui/material/Popover';
import Slider, { SliderProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { LTVTooltip } from 'src/components/infoTooltips/LTVTooltip';

const Input = styled(MuiInput)(() => ({
  width: '70px',
  height: '38px',
  background: '#ffffff28',
  padding: '0.3rem',
  borderRadius: '4px',
  color: 'white',
  '& .MuiInput-input': {
    padding: '0',
  },
  '&:before': {
    borderBottom: 'none',
  },
  '&:after': {
    borderBottom: 'none',
  },
}));

const WhiteSlider = styled(Slider)<SliderProps>(() => ({
  color: '#FFFFFF',
  margin: '8px 0 0 0',
  '& .MuiSlider-thumb': {
    backgroundColor: '#FFFFFF',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#FFFFFF',
    height: '18px',
  },
  '& .MuiSlider-track': {
    height: '18px',
    transition: 'background-image 0.3s ease',
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: '#FFFFFF',
    color: '#333333',
    borderRadius: '4px',
    fontWeight: 'bold',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  },
  '& .MuiSlider-markLabel': {
    color: '#FFFFFF',
  },
}));

type CDRSliderProps__Type = {
  minValue: number;
  maxValue: number;
  value: number;
  onChange: (_value: number) => void;
};

export default function CDRSlider(props: CDRSliderProps__Type) {
  const { maxValue, minValue, value, onChange } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const midValue = (minValue + maxValue) / 2;

  const marks = [
    { value: minValue, label: 'Low' },
    { value: midValue, label: 'Mid' },
    { value: maxValue, label: 'High' },
  ];

  const getTrackColor = () => {
    if (value <= midValue) {
      return value < (minValue + midValue) / 2
        ? 'linear-gradient(231deg,#00c2a1,#ffef79)'
        : 'linear-gradient(231deg,#ff895d,#ffcd4d)';
    }
    return 'linear-gradient(231deg,#d91838,#ff7881)';
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSliderChange = (_event: Event, newValue: number | number[], _activeThumb: number) => {
    const newValueNum = newValue as number;
    onChange(newValueNum);

    if (newValueNum > midValue) {
      setAnchorEl(document.getElementById('input-slider') as HTMLElement);
    } else {
      setAnchorEl(null);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? minValue : Number(event.target.value);
    onChange(newValue);

    if (newValue > midValue) {
      setAnchorEl(event.currentTarget as HTMLElement);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box mb={4}>
      <Box sx={{ display: 'flex', flexDirection: 'row', margin: '2rem 0 0' }}>
        <Typography id="input-slider" color="white">
          Loan to Value (LTV)
        </Typography>
        <LTVTooltip />
      </Box>
      <Grid container spacing={8} sx={{ alignItems: 'center' }}>
        <Grid item xs>
          <WhiteSlider
            value={typeof value === 'number' ? value : 0}
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            max={maxValue}
            min={minValue}
            marks={marks}
            sx={{
              '& .MuiSlider-track': {
                backgroundImage: getTrackColor(),
              },
            }}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step: 10,
              min: minValue,
              max: maxValue,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'rgba(189, 31, 31, 0.26)',
            boxShadow: 'none',
            backdropFilter: 'blur(5px)',
            borderRadius: '6px',
          },
        }}
      >
        <Box sx={{ padding: '1rem', maxWidth: '200px' }}>
          <Typography color="white" fontWeight="bold">
            Warning: High Risk!
          </Typography>
          <Typography variant="main12">
            You are entering a high-risk position. Please proceed with caution.
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
}

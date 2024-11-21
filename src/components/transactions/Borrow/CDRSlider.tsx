import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import Slider, { SliderProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const Input = styled(MuiInput)(() => ({
  width: '70px',
  height: '38px',
  background: '#ffffff28',
  padding: '0.3rem',
  borderRadius: '4px',
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
  '& .MuiSlider-thumb': {
    backgroundColor: '#FFFFFF',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#FFFFFF',
  },
  '& .MuiSlider-track': {
    backgroundColor: '#FFFFFF',
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: '#FFFFFF',
    color: '#333333',
    borderRadius: '4px',
    fontWeight: 'bold',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
  },
}));

type CDRSliderProps__Type = {
  minValue: number;
  maxValue: number;
  value: number;
  onChange: (_value: number) => void;
};
const marks = [
  { value: 100, label: 'Low' },
  { value: 6150, label: 'Mid' },
  { value: 12322, label: 'High' },
];

export default function CDRSlider(props: CDRSliderProps__Type) {
  const { maxValue, minValue, value, onChange } = props;

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    onChange(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value === '' ? 0 : Number(event.target.value));
  };

  return (
    <Box>
      <Typography id="input-slider" mt={6}>
        Collateral Ratio
      </Typography>
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
    </Box>
  );
}

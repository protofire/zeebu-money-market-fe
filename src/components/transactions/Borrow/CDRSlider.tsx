import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import Slider, { SliderProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const Input = styled(MuiInput)(() => ({
  width: '60px',
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

export default function CDRSlider() {
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
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
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

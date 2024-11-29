import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Popover from '@mui/material/Popover';
import Slider, { SliderProps } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { LTVTooltip } from 'src/components/infoTooltips/LTVTooltip';

const WhiteSlider = styled(Slider)<SliderProps>(() => ({
  color: '#FFFFFF',
  margin: '8px 0 0 0',
  '& .MuiSlider-thumb': {
    backgroundColor: '#FFFFFF',
  },
  '& .MuiSlider-mark': {
    width: 2,
    height: 18,
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
}));

type CDRSliderProps__Type = {
  value: number;
  lowerLimit: number;
  higherLimit: number;
  onChange: (_value: number) => void;
  onFocus: () => void;
};

export default function CDRSlider(props: CDRSliderProps__Type) {
  const { value, onChange, onFocus, lowerLimit, higherLimit } = props;

  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const marks = [
    { start: 0, end: 33, label: 'Conservative' },
    { start: 33, end: 56, label: 'Moderate' },
    { start: 56, end: 80, label: 'Aggressive' },
    { start: 80, end: 100, label: 'Liquidation' },
  ];

  const getTrackColor = () => {
    if (value < 33) return 'linear-gradient(231deg,#00c2a1,#ffef79)';
    if (value < 56) return 'linear-gradient(231deg,#ff895d,#ffcd4d)';
    return 'linear-gradient(231deg,#d91838,#ff7881)';
  };

  const renderMarks = () =>
    marks.map((mark, index) => (
      <Box
        key={index}
        sx={{
          position: 'absolute',
          left: `${mark.start}%`,
          width: `${mark.end - mark.start}%`,
          bottom: '-10px',
          color: 'white',
          textAlign: 'center',
          fontSize: '10px',
        }}
      >
        {mark.label}
      </Box>
    ));

  const renderSeparators = () =>
    marks.slice(1).map((mark, index) => (
      <Box
        key={index}
        sx={{
          position: 'absolute',
          left: `${mark.start}%`,
          height: '18px',
          width: '2px',
          top: '14px',
          backgroundColor: '#ffffff9e',
          transform: 'translateX(-50%)',
        }}
      />
    ));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSliderChange = (_event: Event, newValue: number | number[], _activeThumb: number) => {
    const newValueNum = newValue as number;

    if (newValueNum < lowerLimit || newValueNum > higherLimit) return;

    setInternalValue(newValueNum);
  };

  return (
    <Box mb={4}>
      <Box sx={{ display: 'flex', flexDirection: 'row', margin: '2rem 0 0' }}>
        <Typography id="input-slider" color="white">
          Loan to Value (LTV)
        </Typography>
        <LTVTooltip />
        <Typography sx={{ marginLeft: 'auto', fontWeight: 'bold', color: 'white' }}>
          {internalValue.toFixed(0)}%
        </Typography>
      </Box>
      <Grid container spacing={4} sx={{ alignItems: 'center' }}>
        <Grid item xs>
          <Box position="relative">
            <WhiteSlider
              onFocus={onFocus}
              value={internalValue}
              valueLabelDisplay="off"
              onChange={handleSliderChange}
              onMouseUp={() => onChange(internalValue)}
              aria-labelledby="input-slider"
              max={100}
              min={0}
              sx={{
                '& .MuiSlider-track': {
                  backgroundImage: getTrackColor(),
                },
              }}
            />
            {renderMarks()}
            {renderSeparators()}
          </Box>
        </Grid>
      </Grid>
      <Popover
        open={false}
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
          <Typography color="white" variant="main12">
            You are entering a high-risk position. Please proceed with caution.
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
}

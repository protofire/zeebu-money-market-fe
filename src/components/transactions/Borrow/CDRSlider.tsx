import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
    zIndex: '3',
  },
  '& .MuiSlider-mark': {
    width: 2,
    height: 18,
    backgroundColor: '#FFFFFF',
  },
  '& .MuiSlider-rail': {
    backgroundColor: '#ffffff84',
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

const renderLastRange = (higherLimit: number) => (
  <Box
    sx={{
      position: 'absolute',
      left: higherLimit.toString().concat('%'),
      width: (100 - higherLimit).toString().concat('%'),
      height: '18px',
      top: { xs: '21px', sm: '14px' },
      background: '#ff303047',
      backgroundImage:
        'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.3) 0px, rgba(255, 255, 255, 0.3) 5px, transparent 5px, transparent 10px)',
      zIndex: '1',
      borderRadius: '0 8px 8px 0',
    }}
  />
);

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
    { start: 0, end: 30, label: 'Safe' },
    { start: 30, end: 50, label: 'Moderate' },
    { start: 50, end: higherLimit, label: 'High' },
    { start: higherLimit, end: 100, label: 'Liquidation' },
  ];

  const getTrackColor = () => {
    if (value < 30) return 'linear-gradient(231deg,#00c2a1,#ffef79)';
    if (value < 50) return 'linear-gradient(231deg,#ff895d,#ffcd4d)';
    return 'linear-gradient(231deg,#d91838,#ff7881)';
  };

  const renderMarks = () =>
    marks.map((mark, index) => {
      const isSelected = value >= mark.start && value < mark.end;

      return (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: `${mark.start}%`,
            width: `${mark.end - mark.start}%`,
            bottom: '-12px',
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: isSelected ? 'bold' : 'normal',
            color: '#ffffff',
          }}
        >
          {mark.label}
        </Box>
      );
    });

  const renderSeparators = () =>
    marks.slice(1).map((mark, index) => (
      <Box
        key={index}
        sx={{
          position: 'absolute',
          left: `${mark.start}%`,
          height: '18px',
          width: '2px',
          top: { xs: '21px', sm: '14px' },
          backgroundColor: '#5050509e',
          transform: 'translateX(-50%)',
          zIndex: '1',
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
                  zIndex: '2',
                  border: '0',
                },
              }}
            />
            {renderMarks()}
            {renderSeparators()}
            {renderLastRange(higherLimit)}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

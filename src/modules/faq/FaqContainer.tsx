import { Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useState } from 'react';

const FaqContainer: React.FC = () => {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleAccordionChange =
    (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const renderExpandIcon = (isExpanded: boolean) => (
    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', marginRight: '10px' }}>
      {isExpanded ? '-' : '+'}
    </span>
  );

  return (
    <div style={{ width: '100%', maxWidth: '800px', margin: '4rem auto', padding: '20px' }}>
      {[...Array(3)].map((_, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleAccordionChange(index)}
          style={{
            marginBottom: '10px',
            color: '#ffffff',
            border: 0,
            borderBottom: '1px solid hsla(0,0%,100%,.2)',
            background: 'linear-gradient(127deg,hsla(0,0%,100%,.1) 2.54%,hsla(0,0%,60%,.1) 97.47%)',
            boxShadow: ' 0px 3px 4px 0px rgba(41, 127, 234, 0.15) inset',
            backdropFilter: 'blur(4px)',
            borderRadius: '30px 0 30px 0',
            overflow: 'hidden',
          }}
        >
          <AccordionSummary
            expandIcon={renderExpandIcon(expanded === index)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              // padding: '10px 20px',
              fontWeight: 'bold',
              color: '#ffffff',
              fontSize: '1.2rem',
            }}
          >
            <Typography>Accordion {index + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              padding: '15px 20px',
            }}
          >
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
              ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FaqContainer;

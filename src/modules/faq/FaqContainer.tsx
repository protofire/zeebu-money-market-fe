import { Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useState } from 'react';

const FaqContainer: React.FC = () => {
  const [expanded, setExpanded] = useState<number | false>(false);
  const [nestedExpanded, setNestedExpanded] = useState<number | false>(false);

  const handleAccordionChange =
    (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleNestedAccordionChange =
    (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setNestedExpanded(isExpanded ? panel : false);
    };

  const renderExpandIcon = (isExpanded: boolean) => (
    <span
      style={{
        fontSize: '1.5rem',
        fontWeight: 'normal',
        color: 'white',
        position: 'relative',
      }}
    >
      {isExpanded ? '-' : '+'}
    </span>
  );

  return (
    <div style={{ width: '100%', maxWidth: '850px', margin: '2rem auto', padding: '20px' }}>
      {[...Array(3)].map((_, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleAccordionChange(index)}
          style={{
            marginBottom: '20px',
            color: '#ffffff',
            background: 'linear-gradient(127deg,hsla(0,0%,100%,.1) 2.54%,hsla(0,0%,60%,.1) 97.47%)',
            boxShadow: '0 4px 34px 0 rgba(0,0,0,.08)',
            backdropFilter: 'blur(4px)',
            borderRadius: '30px 0 30px 0',
            overflow: 'hidden',
            padding: '0 8px',
          }}
        >
          <AccordionSummary
            expandIcon={renderExpandIcon(expanded === index)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: 'bold',
              color: '#ffffff',
              fontSize: '1.2rem',
              height: '57px',
            }}
          >
            <Typography sx={{ fontSize: '1.125rem' }}>Accordion {index + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              padding: '0 20px 20px 20px',
            }}
          >
            {index === 0 ? (
              <div>
                {[...Array(2)].map((_, nestedIndex) => (
                  <Accordion
                    key={nestedIndex}
                    expanded={nestedExpanded === nestedIndex}
                    onChange={handleNestedAccordionChange(nestedIndex)}
                    sx={{
                      background: 'transparent',
                      boxShadow: 'none',
                      borderRadius: '0',
                      padding: '0',
                      '&:before': {
                        display: 'none',
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={renderExpandIcon(nestedExpanded === nestedIndex)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontWeight: 'normal',
                        fontSize: '1.2rem',
                        height: '57px',
                      }}
                    >
                      <Typography sx={{ fontSize: '1.125rem' }}>
                        Nested Accordion {nestedIndex + 1}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Content for Nested Accordion {nestedIndex + 1}.</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            ) : (
              <Typography>Content for Accordion {index + 1}.</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FaqContainer;

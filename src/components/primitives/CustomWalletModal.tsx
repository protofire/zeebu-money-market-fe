import { XIcon } from '@heroicons/react/outline';
import { Box, IconButton, Modal, Paper, SvgIcon } from '@mui/material';
import React from 'react';

export interface BasicModalProps {
  open: boolean;
  children: React.ReactNode;
  setOpen: (value: boolean) => void;
  withCloseButton?: boolean;
  contentMaxWidth?: number;
}

export const CustomWalletModal = ({
  open,
  setOpen,
  withCloseButton = true,
  contentMaxWidth = 420,
  children,
  ...props
}: BasicModalProps) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(6px)',
        backgroundColor: 'rgba(0, 0, 0, 0.250)',
        '.MuiPaper-root': {
          outline: 'none',
        },
        '.MuiBackdrop-root': {
          backgroundColor: 'transparent',
        },
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      {...props}
      data-cy={'Modal'}
    >
      <Paper
        sx={{
          position: 'relative',
          margin: '10px',
          overflowY: 'auto',
          width: '100%',
          maxWidth: { xs: '359px', xsm: `${contentMaxWidth}px` },
          maxHeight: 'calc(100vh - 20px)',
          background:
            'linear-gradient(127.43deg, rgba(255, 255, 255, 0.175) 2.54%, rgba(153, 153, 153, 0.175) 97.47%)',
          border: '1px solid rgb(255, 138, 92)',
          boxShadow: 'rgba(42, 128, 234, 0.15) 0px 3px 4px 0px inset',
          borderRadius: '12px',
        }}
      >
        {children}

        {withCloseButton && (
          <Box sx={{ position: 'absolute', top: '16px', right: '50px', zIndex: 5 }}>
            <IconButton
              sx={{
                borderRadius: '50%',
                p: 0,
                minWidth: 0,
                position: 'absolute',
              }}
              onClick={handleClose}
              data-cy={'close-button'}
            >
              <SvgIcon sx={{ fontSize: '24px', color: 'text.primary' }}>
                <XIcon data-cy={'CloseModalIcon'} />
              </SvgIcon>
            </IconButton>
          </Box>
        )}
      </Paper>
    </Modal>
  );
};

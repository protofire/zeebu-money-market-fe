import { Trans } from '@lingui/macro';
import { Instagram, LinkedIn, Telegram, Twitter } from '@mui/icons-material';
import { Box, styled, SvgIcon, Typography } from '@mui/material';
import { Link } from 'src/components/primitives/Link';
import { useRootStore } from 'src/store/root';

interface StyledLinkProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const StyledLink = styled(Link)<StyledLinkProps>(({ theme }) => ({
  color: theme.palette.common.white,
  '&:hover': {
    color: theme.palette.text.primary,
  },
  display: 'flex',
  alignItems: 'center',
}));

const FOOTER_ICONS = [
  {
    href: 'https://x.com/zeebuofficial',
    icon: <Twitter />,
    title: 'Twitter',
  },
  {
    href: 'https://www.instagram.com/zeebu.official/',
    icon: <Instagram />,
    title: 'Instagram',
  },
  {
    href: 'https://www.linkedin.com/company/zeebuofficial/',
    icon: <LinkedIn />,
    title: 'Linkedin',
  },
  {
    href: 'https://t.me/+QdDCbYC_HsRhMjg0',
    icon: <Telegram />,
    title: 'Telegram',
  },
];

export function AppFooter() {
  const [setAnalyticsConfigOpen] = useRootStore((store) => [
    store.setAnalyticsConfigOpen,
    store.setFeedbackOpen,
  ]);

  const FOOTER_LINKS = [
    {
      href: 'https://www.zeebu.com/terms-conditions',
      label: <Trans>Terms</Trans>,
      key: 'Terms',
    },
    {
      href: 'https://www.zeebu.com/privacy-policy',
      label: <Trans>Privacy</Trans>,
      key: 'Privacy',
    },
    {
      href: 'https://zeebu.gitbook.io/zbu-protocol-1.0/hvKFvzLoONc5kSQNlboc',
      label: <Trans>Docs</Trans>,
      key: 'Docs',
    },
    {
      href: '/',
      label: <Trans>Manage analytics</Trans>,
      key: 'Manage analytics',
      onClick: (event: React.MouseEvent) => {
        event.preventDefault();
        setAnalyticsConfigOpen(true);
      },
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        padding: ['22px 0px 40px 0px', '0 22px 0 40px', '20px 80px'],
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '22px',
        flexDirection: ['column', 'column', 'row'],
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
          {FOOTER_LINKS.map((link) => (
            <StyledLink onClick={link.onClick} key={link.key} href={link.href}>
              <Typography variant="secondary16">{link.label}</Typography>
            </StyledLink>
          ))}
        </Box>
        <Typography variant="secondary14" sx={{ fontWeight: 'normal', opacity: '0.5' }}>
          Copyright ©Zeebu 2024
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {FOOTER_ICONS.map((icon) => (
          <StyledLink href={icon.href} key={icon.title}>
            <SvgIcon
              sx={{
                fontSize: [24, 24, 24],
                color: 'theme.palette.common.white',
              }}
            >
              {icon.icon}
            </SvgIcon>
          </StyledLink>
        ))}
      </Box>
    </Box>
  );
}

import { Trans } from '@lingui/macro';
import { Description, Instagram, LinkedIn, Telegram, Twitter } from '@mui/icons-material';
import { Box, styled, SvgIcon, Typography } from '@mui/material';
import { Link } from 'src/components/primitives/Link';

interface StyledLinkProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

function Copyright() {
  return (
    <Typography
      mt={1}
      variant="secondary14"
      sx={{ fontWeight: 'normal', opacity: '0.5', color: 'text.primary' }}
    >
      Copyright ©
      <Link href="https://www.zeebu.com/" target="_blank" color="text.primary">
        Zeebu&nbsp;
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const StyledLink = styled(Link)<StyledLinkProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.text.primary,
  },
  display: 'flex',
  alignItems: 'center',
}));

const FOOTER_ICONS = [
  {
    href: 'https://zeebu.gitbook.io/zbu-protocol-1.0/hvKFvzLoONc5kSQNlboc',
    icon: <Description />,
    title: 'Docs',
  },
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
  const FOOTER_LINKS = [
    {
      href: 'https://www.zeebu.com/privacy-policy',
      label: <Trans>Privacy Policy</Trans>,
      key: 'Privacy',
    },
    {
      href: 'https://www.zeebu.com/terms-conditions',
      label: <Trans>Terms of Service</Trans>,
      key: 'Terms',
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        padding: ['16px 8px', '0 22px 0 40px', '20px 80px'],
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
            <StyledLink key={link.key} href={link.href}>
              <Typography variant="secondary16">{link.label}</Typography>
            </StyledLink>
          ))}
        </Box>
        <Copyright />
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

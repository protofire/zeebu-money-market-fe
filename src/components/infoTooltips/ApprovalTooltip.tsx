import { Trans } from '@lingui/macro';

import { Link } from '../primitives/Link';
import { TextWithTooltip, TextWithTooltipProps } from '../TextWithTooltip';

export const ApprovalTooltip = ({ ...rest }: TextWithTooltipProps) => {
  return (
    <TextWithTooltip {...rest}>
      <Trans>
        To continue, you need to grant Zeebu smart contracts permission to move your funds from your
        wallet. This is done by submitting an approval transaction, which requires gas, depending on
        the asset and wallet you use.{' '}
        <Link href="https://eips.ethereum.org/EIPS/eip-20#approve" underline="always">
          Learn more
        </Link>
      </Trans>
    </TextWithTooltip>
  );
};

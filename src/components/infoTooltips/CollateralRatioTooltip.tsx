import { Trans } from '@lingui/macro';

import { TextWithTooltip, TextWithTooltipProps } from '../TextWithTooltip';

export const CollateralRatioTooltip = ({ ...rest }: TextWithTooltipProps) => {
  return (
    <TextWithTooltip {...rest}>
      <Trans>
        Proportion of collateral assets required to secure a loan relative to the loan amount.
      </Trans>
    </TextWithTooltip>
  );
};

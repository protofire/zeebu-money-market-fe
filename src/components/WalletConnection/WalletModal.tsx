import { useWalletModalContext } from 'src/hooks/useWalletModal';

import { CustomWalletModal } from '../primitives/CustomWalletModal';
import { WalletSelector } from './WalletSelector';

export const WalletModal = () => {
  const { isWalletModalOpen, setWalletModalOpen } = useWalletModalContext();

  return (
    <CustomWalletModal open={isWalletModalOpen} setOpen={setWalletModalOpen} contentMaxWidth={900}>
      <WalletSelector />
    </CustomWalletModal>
  );
};

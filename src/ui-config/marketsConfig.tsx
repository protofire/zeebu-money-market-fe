import { ChainId } from '@aave/contract-helpers';
import { AaveV2Ethereum } from '@bgd-labs/aave-address-book';
import { ReactNode } from 'react';

import { BaseSepolia, BNBTest, Sepolia } from './addresses';

export enum ExtraChainId {
  bnb_testnet = 97,
}

// Enable for premissioned market
// import { PermissionView } from 'src/components/transactions/FlowCommons/PermissionView';
export type MarketDataType = {
  v3?: boolean;
  marketTitle: string;
  market: CustomMarket;
  // the network the market operates on
  chainId: ChainId | ExtraChainId;
  enabledFeatures?: {
    liquiditySwap?: boolean;
    staking?: boolean;
    governance?: boolean;
    faucet?: boolean;
    collateralRepay?: boolean;
    incentives?: boolean;
    permissions?: boolean;
    debtSwitch?: boolean;
    withdrawAndSwitch?: boolean;
    switch?: boolean;
  };
  permitDisabled?: boolean; // intended to be used for testnets
  isFork?: boolean;
  permissionComponent?: ReactNode;
  disableCharts?: boolean;
  subgraphUrl?: string;
  logo?: string;
  addresses: {
    LENDING_POOL_ADDRESS_PROVIDER: string;
    LENDING_POOL: string;
    WETH_GATEWAY?: string;
    SWAP_COLLATERAL_ADAPTER?: string;
    REPAY_WITH_COLLATERAL_ADAPTER?: string;
    DEBT_SWITCH_ADAPTER?: string;
    WITHDRAW_SWITCH_ADAPTER?: string;
    FAUCET?: string;
    PERMISSION_MANAGER?: string;
    WALLET_BALANCE_PROVIDER: string;
    L2_ENCODER?: string;
    UI_POOL_DATA_PROVIDER: string;
    UI_INCENTIVE_DATA_PROVIDER?: string;
    COLLECTOR?: string;
    V3_MIGRATOR?: string;
    GHO_TOKEN_ADDRESS?: string;
    GHO_UI_DATA_PROVIDER?: string;
  };
};
export enum CustomMarket {
  proto_sepolia = 'proto_sepolia',
  proto_mainnet = 'proto_mainnet',
  proto_base_sepolia = 'proto_base_sepolia',
  proto_bnb_test = 'proto_bnb_test',
}

const apiKey = process.env.NEXT_PUBLIC_SUBGRAPH_API_KEY;

export const marketsData: {
  [key in keyof typeof CustomMarket]: MarketDataType;
} = {
  [CustomMarket.proto_mainnet]: {
    marketTitle: 'Ethereum',
    market: CustomMarket.proto_mainnet,
    chainId: ChainId.mainnet,
    enabledFeatures: {
      governance: true,
      staking: true,
      liquiditySwap: true,
      collateralRepay: false,
      incentives: true,
      debtSwitch: true,
      switch: true,
    },
    subgraphUrl: `https://gateway-arbitrum.network.thegraph.com/api/${apiKey}/subgraphs/id/8wR23o1zkS4gpLqLNU4kG3JHYVucqGyopL5utGxP2q1N`,
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: AaveV2Ethereum.POOL_ADDRESSES_PROVIDER,
      LENDING_POOL: AaveV2Ethereum.POOL,
      WETH_GATEWAY: AaveV2Ethereum.WETH_GATEWAY,
      REPAY_WITH_COLLATERAL_ADAPTER: AaveV2Ethereum.REPAY_WITH_COLLATERAL_ADAPTER,
      SWAP_COLLATERAL_ADAPTER: AaveV2Ethereum.SWAP_COLLATERAL_ADAPTER,
      WALLET_BALANCE_PROVIDER: AaveV2Ethereum.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: AaveV2Ethereum.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: AaveV2Ethereum.UI_INCENTIVE_DATA_PROVIDER,
      COLLECTOR: AaveV2Ethereum.COLLECTOR,
      V3_MIGRATOR: AaveV2Ethereum.MIGRATION_HELPER,
      DEBT_SWITCH_ADAPTER: AaveV2Ethereum.DEBT_SWAP_ADAPTER,
    },
  },
  [CustomMarket.proto_sepolia]: {
    marketTitle: 'Ethereum Sepolia',
    market: CustomMarket.proto_sepolia,
    chainId: ChainId.sepolia,
    enabledFeatures: {
      faucet: true,
    },
    subgraphUrl:
      'https://api.studio.thegraph.com/query/8290/zeebu-money-market-sepolia/version/latest',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: Sepolia.LENDING_POOL_ADDRESS_PROVIDER,
      LENDING_POOL: Sepolia.LENDING_POOL,
      WETH_GATEWAY: Sepolia.WETH_GATEWAY,
      FAUCET: Sepolia.FAUCET,
      WALLET_BALANCE_PROVIDER: Sepolia.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: Sepolia.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: Sepolia.UI_INCENTIVE_DATA_PROVIDER,
      GHO_TOKEN_ADDRESS: '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60',
      GHO_UI_DATA_PROVIDER: '0x69B9843A16a6E9933125EBD97659BA3CCbE2Ef8A',
    },
  },
  [CustomMarket.proto_base_sepolia]: {
    marketTitle: 'Base Sepolia',
    market: CustomMarket.proto_base_sepolia,
    chainId: ChainId.base_sepolia,
    enabledFeatures: {
      faucet: true,
    },
    subgraphUrl:
      'https://api.studio.thegraph.com/query/8290/zeebu-money-market-base-sepolia/version/latest',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: BaseSepolia.LENDING_POOL_ADDRESS_PROVIDER,
      LENDING_POOL: BaseSepolia.LENDING_POOL,
      WETH_GATEWAY: BaseSepolia.WETH_GATEWAY,
      FAUCET: BaseSepolia.FAUCET,
      WALLET_BALANCE_PROVIDER: BaseSepolia.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: BaseSepolia.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: BaseSepolia.UI_INCENTIVE_DATA_PROVIDER,
      GHO_TOKEN_ADDRESS: '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60',
      GHO_UI_DATA_PROVIDER: '0x69B9843A16a6E9933125EBD97659BA3CCbE2Ef8A',
    },
  },
  [CustomMarket.proto_bnb_test]: {
    marketTitle: 'BNB Testnet',
    market: CustomMarket.proto_bnb_test,
    chainId: ExtraChainId.bnb_testnet,
    enabledFeatures: {
      faucet: true,
    },
    subgraphUrl:
      'https://api.studio.thegraph.com/query/8290/zeebu-money-market-bsc-chapel/version/latest',
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: BNBTest.LENDING_POOL_ADDRESS_PROVIDER,
      LENDING_POOL: BNBTest.LENDING_POOL,
      WETH_GATEWAY: BNBTest.WETH_GATEWAY,
      FAUCET: BNBTest.FAUCET,
      WALLET_BALANCE_PROVIDER: BNBTest.WALLET_BALANCE_PROVIDER,
      UI_POOL_DATA_PROVIDER: BNBTest.UI_POOL_DATA_PROVIDER,
      UI_INCENTIVE_DATA_PROVIDER: BNBTest.UI_INCENTIVE_DATA_PROVIDER,
      GHO_TOKEN_ADDRESS: '0xc4bF5CbDaBE595361438F8c6a187bDc330539c60',
      GHO_UI_DATA_PROVIDER: '0x69B9843A16a6E9933125EBD97659BA3CCbE2Ef8A',
    },
  },
} as const;

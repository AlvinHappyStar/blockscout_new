import type { Block, BlocksResponse } from 'types/api/block';

export const base: Block = {
  base_fee_per_gas: '10000000000',
  burnt_fees: '5449200000000000',
  burnt_fees_percentage: 20.292245650793845,
  difficulty: '340282366920938463463374607431768211454',
  extra_data: 'TODO',
  gas_limit: '12500000',
  gas_target_percentage: -91.28128,
  gas_used: '544920',
  gas_used_percentage: 4.35936,
  hash: '0xccc75136de485434d578b73df66537c06b34c3c9b12d085daf95890c914fc2bc',
  height: 30146364,
  miner: {
    hash: '0xdAd49e6CbDE849353ab27DeC6319E687BFc91A41',
    implementation_name: null,
    is_contract: false,
    is_verified: null,
    name: 'Alex Emelyanov',
    private_tags: [],
    public_tags: [],
    watchlist_names: [],
  },
  nonce: '0x0000000000000000',
  parent_hash: '0x44125f0eb36a9d942e0c23bb4e8117f7ba86a9537a69b59c0025986ed2b7500f',
  priority_fee: '23211757500000000',
  rewards: [
    {
      reward: '500000000000000000',
      type: 'POA Mania Reward',
    },
    {
      reward: '1026853607500000000',
      type: 'Validator Reward',
    },
    {
      reward: '500000000000000000',
      type: 'Emission Reward',
    },
  ],
  size: 2448,
  state_root: 'TODO',
  timestamp: '2022-11-11T11:59:35Z',
  total_difficulty: '10258276095980170141167591583995189665817672619',
  tx_count: 5,
  tx_fees: '26853607500000000',
  type: 'block',
  uncles_hashes: [],
};

export const genesis: Block = {
  base_fee_per_gas: null,
  burnt_fees: null,
  burnt_fees_percentage: null,
  difficulty: '131072',
  extra_data: 'TODO',
  gas_limit: '6700000',
  gas_target_percentage: -100,
  gas_used: '0',
  gas_used_percentage: 0,
  hash: '0x39f02c003dde5b073b3f6e1700fc0b84b4877f6839bb23edadd3d2d82a488634',
  height: 0,
  miner: {
    hash: '0x0000000000000000000000000000000000000000',
    implementation_name: null,
    is_contract: false,
    is_verified: null,
    name: null,
    private_tags: [],
    public_tags: [],
    watchlist_names: [],
  },
  nonce: '0x0000000000000000',
  parent_hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
  priority_fee: null,
  rewards: [],
  size: 533,
  state_root: 'TODO',
  timestamp: '2017-12-16T00:13:24.000000Z',
  total_difficulty: '131072',
  tx_count: 0,
  tx_fees: '0',
  type: 'block',
  uncles_hashes: [],
};

export const base2: Block = {
  ...base,
  height: base.height - 1,
  size: 592,
  miner: {
    hash: '0xDfE10D55d9248B2ED66f1647df0b0A46dEb25165',
    implementation_name: null,
    is_contract: false,
    is_verified: null,
    name: 'Kiryl Ihnatsyeu',
    private_tags: [],
    public_tags: [],
    watchlist_names: [],
  },
  timestamp: '2022-11-11T11:46:05Z',
  tx_count: 253,
  gas_target_percentage: 23.6433,
  gas_used: '6333342',
  gas_used_percentage: 87.859504,
  burnt_fees: '232438000000000000',
  burnt_fees_percentage: 65.3333333333334,
  rewards: [
    {
      reward: '500000000000000000',
      type: 'Chore Reward',
    },
    {
      reward: '1017432850000000000',
      type: 'Miner Reward',
    },
    {
      reward: '500000000000000000',
      type: 'Emission Reward',
    },
  ],
};

export const baseListResponse: BlocksResponse = {
  items: [
    base,
    base2,
  ],
  next_page_params: null,
};

import type { UserInfo, CustomAbis, PublicTags, AddressTags, TransactionTags, ApiKeys, WatchlistAddress } from 'types/api/account';
import type {
  Address,
  AddressCounters,
  AddressTokenBalance,
  AddressTransactionsResponse,
  AddressTokenTransferResponse,
  AddressCoinBalanceHistoryResponse,
  AddressCoinBalanceHistoryChart,
  AddressBlocksValidatedResponse,
  AddressInternalTxsResponse,
  AddressTxsFilters,
  AddressTokenTransferFilters,
} from 'types/api/address';
import type { BlocksResponse, BlockTransactionsResponse, Block, BlockFilters } from 'types/api/block';
import type { ChartMarketResponse, ChartTransactionResponse } from 'types/api/charts';
import type { SmartContract } from 'types/api/contract';
import type { IndexingStatus } from 'types/api/indexingStatus';
import type { InternalTransactionsResponse } from 'types/api/internalTransaction';
import type { LogsResponseTx, LogsResponseAddress } from 'types/api/log';
import type { RawTracesResponse } from 'types/api/rawTrace';
import type { Stats, Charts, HomeStats } from 'types/api/stats';
import type { TokenCounters, TokenInfo, TokenHolders } from 'types/api/tokenInfo';
import type { TokenTransferResponse, TokenTransferFilters } from 'types/api/tokenTransfer';
import type { TransactionsResponseValidated, TransactionsResponsePending, Transaction } from 'types/api/transaction';
import type { TTxsFilters } from 'types/api/txsFilters';
import type ArrayElement from 'types/utils/ArrayElement';

import appConfig from 'configs/app/config';

export interface ApiResource {
  path: string;
  endpoint?: string;
  basePath?: string;
}

export const RESOURCES = {
  // ACCOUNT
  csrf: {
    path: '/api/account/v1/get_csrf',
  },
  user_info: {
    path: '/api/account/v1/user/info',
  },
  custom_abi: {
    path: '/api/account/v1/user/custom_abis/:id?',
  },
  watchlist: {
    path: '/api/account/v1/user/watchlist/:id?',
  },
  public_tags: {
    path: '/api/account/v1/user/public_tags/:id?',
  },
  private_tags_address: {
    path: '/api/account/v1/user/tags/address/:id?',
  },
  private_tags_tx: {
    path: '/api/account/v1/user/tags/transaction/:id?',
  },
  api_keys: {
    path: '/api/account/v1/user/api_keys/:id?',
  },

  // STATS
  stats_counters: {
    path: '/api/v1/counters',
    endpoint: appConfig.statsApi.endpoint,
    basePath: appConfig.statsApi.basePath,
  },
  stats_charts: {
    path: '/api/v1/charts/line',
    endpoint: appConfig.statsApi.endpoint,
    basePath: appConfig.statsApi.basePath,
  },

  // BLOCKS, TXS
  blocks: {
    path: '/api/v2/blocks',
    paginationFields: [ 'block_number' as const, 'items_count' as const ],
    filterFields: [ 'type' as const ],
  },
  block: {
    path: '/api/v2/blocks/:id',
  },
  block_txs: {
    path: '/api/v2/blocks/:id/transactions',
    paginationFields: [ 'block_number' as const, 'items_count' as const, 'index' as const ],
    filterFields: [],
  },
  txs_validated: {
    path: '/api/v2/transactions',
    paginationFields: [ 'block_number' as const, 'items_count' as const, 'filter' as const, 'index' as const ],
    filterFields: [ 'filter' as const, 'type' as const, 'method' as const ],
  },
  txs_pending: {
    path: '/api/v2/transactions',
    paginationFields: [ 'filter' as const, 'hash' as const, 'inserted_at' as const ],
    filterFields: [ 'filter' as const, 'type' as const, 'method' as const ],
  },
  tx: {
    path: '/api/v2/transactions/:id',
  },
  tx_internal_txs: {
    path: '/api/v2/transactions/:id/internal-transactions',
    paginationFields: [ 'block_number' as const, 'items_count' as const, 'transaction_hash' as const, 'index' as const, 'transaction_index' as const ],
    filterFields: [ ],
  },
  tx_logs: {
    path: '/api/v2/transactions/:id/logs',
    paginationFields: [ 'items_count' as const, 'transaction_hash' as const, 'index' as const ],
    filterFields: [ ],
  },
  tx_token_transfers: {
    path: '/api/v2/transactions/:id/token-transfers',
    paginationFields: [ 'block_number' as const, 'items_count' as const, 'transaction_hash' as const, 'index' as const ],
    filterFields: [ 'type' as const ],
  },
  tx_raw_trace: {
    path: '/api/v2/transactions/:id/raw-trace',
  },

  // ADDRESS
  address: {
    path: '/api/v2/addresses/:id',
  },
  address_counters: {
    path: '/api/v2/addresses/:id/counters',
  },
  address_token_balances: {
    path: '/api/v2/addresses/:id/token-balances',
  },
  address_txs: {
    path: '/api/v2/addresses/:id/transactions',
    paginationFields: [ 'block_number' as const, 'items_count' as const, 'index' as const ],
    filterFields: [ 'filter' as const ],
  },
  address_internal_txs: {
    path: '/api/v2/addresses/:id/internal-transactions',
    paginationFields: [ 'block_number' as const, 'items_count' as const, 'index' as const, 'transaction_index' as const ],
    filterFields: [ 'filter' as const ],
  },
  address_token_transfers: {
    path: '/api/v2/addresses/:id/token-transfers',
    paginationFields: [ 'block_number' as const, 'items_count' as const, 'index' as const, 'transaction_index' as const ],
    filterFields: [ 'filter' as const, 'type' as const ],
  },
  address_blocks_validated: {
    path: '/api/v2/addresses/:id/blocks-validated',
    paginationFields: [ 'items_count' as const, 'block_number' as const ],
    filterFields: [ ],
  },
  address_coin_balance: {
    path: '/api/v2/addresses/:id/coin-balance-history',
    paginationFields: [ 'items_count' as const, 'block_number' as const ],
    filterFields: [ ],
  },
  address_coin_balance_chart: {
    path: '/api/v2/addresses/:id/coin-balance-history-by-day',
  },
  address_logs: {
    path: '/api/v2/addresses/:id/logs',
    paginationFields: [ 'items_count' as const, 'transaction_index' as const, 'index' as const, 'block_number' as const ],
    filterFields: [ ],
  },

  // CONTRACT
  contract: {
    path: '/api/v2/smart-contracts/:id',
  },

  // TOKEN
  token: {
    path: '/api/v2/tokens/:hash',
  },
  token_counters: {
    path: '/api/v2/tokens/:hash/counters',
  },
  token_holders: {
    path: '/api/v2/tokens/:hash/holders',
    paginationFields: [ 'items_count' as const, 'value' as const ],
    filterFields: [],
  },

  // HOMEPAGE
  homepage_stats: {
    path: '/api/v2/stats',
  },
  homepage_chart_txs: {
    path: '/api/v2/stats/charts/transactions',
  },
  homepage_chart_market: {
    path: '/api/v2/stats/charts/market',
  },
  homepage_blocks: {
    path: '/api/v2/main-page/blocks',
  },
  homepage_txs: {
    path: '/api/v2/main-page/transactions',
  },
  homepage_indexing_status: {
    path: '/api/v2/main-page/indexing-status',
  },

  // DEPRECATED
  old_api: {
    path: '/api',
  },
};

export type ResourceName = keyof typeof RESOURCES;

export type ResourceFiltersKey<R extends ResourceName> = typeof RESOURCES[R] extends {filterFields: Array<unknown>} ?
  ArrayElement<typeof RESOURCES[R]['filterFields']> :
  never;

export type ResourcePaginationKey<R extends ResourceName> = typeof RESOURCES[R] extends {paginationFields: Array<unknown>} ?
  ArrayElement<typeof RESOURCES[R]['paginationFields']> :
  never;

export const resourceKey = (x: keyof typeof RESOURCES) => x;

export interface ResourceError<T = unknown> {
  payload?: T;
  status: Response['status'];
  statusText: Response['statusText'];
}

export type ResourceErrorAccount<T> = ResourceError<{ errors: T }>

export type PaginatedResources = 'blocks' | 'block_txs' |
'txs_validated' | 'txs_pending' |
'tx_internal_txs' | 'tx_logs' | 'tx_token_transfers' |
'address_txs' | 'address_internal_txs' | 'address_token_transfers' | 'address_blocks_validated' | 'address_coin_balance' |
'address_logs' |
'token_holders';

export type PaginatedResponse<Q extends PaginatedResources> = ResourcePayload<Q>;

/* eslint-disable @typescript-eslint/indent */
export type ResourcePayload<Q extends ResourceName> =
Q extends 'user_info' ? UserInfo :
Q extends 'custom_abi' ? CustomAbis :
Q extends 'public_tags' ? PublicTags :
Q extends 'private_tags_address' ? AddressTags :
Q extends 'private_tags_tx' ? TransactionTags :
Q extends 'api_keys' ? ApiKeys :
Q extends 'watchlist' ? Array<WatchlistAddress> :
Q extends 'homepage_stats' ? HomeStats :
Q extends 'homepage_chart_txs' ? ChartTransactionResponse :
Q extends 'homepage_chart_market' ? ChartMarketResponse :
Q extends 'homepage_blocks' ? Array<Block> :
Q extends 'homepage_txs' ? Array<Transaction> :
Q extends 'homepage_indexing_status' ? IndexingStatus :
Q extends 'stats_counters' ? Stats :
Q extends 'stats_charts' ? Charts :
Q extends 'blocks' ? BlocksResponse :
Q extends 'block' ? Block :
Q extends 'block_txs' ? BlockTransactionsResponse :
Q extends 'txs_validated' ? TransactionsResponseValidated :
Q extends 'txs_pending' ? TransactionsResponsePending :
Q extends 'tx' ? Transaction :
Q extends 'tx_internal_txs' ? InternalTransactionsResponse :
Q extends 'tx_logs' ? LogsResponseTx :
Q extends 'tx_token_transfers' ? TokenTransferResponse :
Q extends 'tx_raw_trace' ? RawTracesResponse :
Q extends 'address' ? Address :
Q extends 'address_counters' ? AddressCounters :
Q extends 'address_token_balances' ? Array<AddressTokenBalance> :
Q extends 'address_txs' ? AddressTransactionsResponse :
Q extends 'address_internal_txs' ? AddressInternalTxsResponse :
Q extends 'address_token_transfers' ? AddressTokenTransferResponse :
Q extends 'address_blocks_validated' ? AddressBlocksValidatedResponse :
Q extends 'address_coin_balance' ? AddressCoinBalanceHistoryResponse :
Q extends 'address_coin_balance_chart' ? AddressCoinBalanceHistoryChart :
Q extends 'address_logs' ? LogsResponseAddress :
Q extends 'token' ? TokenInfo :
Q extends 'token_counters' ? TokenCounters :
Q extends 'token_holders' ? TokenHolders :
Q extends 'contract' ? SmartContract :
never;
/* eslint-enable @typescript-eslint/indent */

/* eslint-disable @typescript-eslint/indent */
export type PaginationFilters<Q extends PaginatedResources> =
Q extends 'blocks' ? BlockFilters :
Q extends 'txs_validated' | 'txs_pending' ? TTxsFilters :
Q extends 'tx_token_transfers' ? TokenTransferFilters :
Q extends 'address_txs' | 'address_internal_txs' ? AddressTxsFilters :
Q extends 'address_token_transfers' ? AddressTokenTransferFilters :
never;
/* eslint-enable @typescript-eslint/indent */
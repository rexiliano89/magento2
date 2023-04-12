import { ApolloQueryResult } from '@apollo/client/core';
import {
  CustomQuery,
  AvailableStoresQuery,
} from '@vsf-enterprise/magento-api-types';
import type { CustomHeaders } from '@vsf-enterprise/magento-api-types';
import availableStores from './availableStores';
import { Context } from '../../types/context';
import getHeaders from '../getHeaders';

/**
 * Returns list of available stores
 */
export default async (
  context: Context,
  customQuery: CustomQuery = { availableStores: 'availableStores' },
  customHeaders: CustomHeaders = {},
): Promise<ApolloQueryResult<AvailableStoresQuery>> => {
  const { availableStores: availableStoresGQL } = context.extendQuery(
    customQuery,
    {
      availableStores: {
        query: availableStores,
      },
    },
  );

  return context.client.query<AvailableStoresQuery>({
    query: availableStoresGQL.query,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
};

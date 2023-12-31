import { useQuery } from '@tanstack/react-query';
import _pickBy from 'lodash/pickBy';
import _unique from 'lodash/uniq';
import { useRouter } from 'next/router';
import React from 'react';

import type { MarketplaceAppOverview } from 'types/client/marketplace';
import { MarketplaceCategory } from 'types/client/marketplace';

import appConfig from 'configs/app/config';
import type { ResourceError } from 'lib/api/resources';
import useDebounce from 'lib/hooks/useDebounce';
import useApiFetch from 'lib/hooks/useFetch';
import getQueryParamString from 'lib/router/getQueryParamString';
import { MARKETPLACE_APP } from 'stubs/marketplace';

const favoriteAppsLocalStorageKey = 'favoriteApps';

function getFavoriteApps() {
  try {
    return JSON.parse(localStorage.getItem(favoriteAppsLocalStorageKey) || '[]') as Array<string>;
  } catch (e) {
    return [];
  }
}

function isAppNameMatches(q: string, app: MarketplaceAppOverview) {
  return app.title.toLowerCase().includes(q.toLowerCase());
}

function isAppCategoryMatches(category: string, app: MarketplaceAppOverview, favoriteApps: Array<string>) {
  return category === MarketplaceCategory.ALL ||
      (category === MarketplaceCategory.FAVORITES && favoriteApps.includes(app.id)) ||
      app.categories.includes(category);
}

export default function useMarketplace() {
  const router = useRouter();
  const defaultCategoryId = getQueryParamString(router.query.category);
  const defaultFilterQuery = getQueryParamString(router.query.filter);

  const [ selectedAppId, setSelectedAppId ] = React.useState<string | null>(null);
  const [ selectedCategoryId, setSelectedCategoryId ] = React.useState<string>(MarketplaceCategory.ALL);
  const [ filterQuery, setFilterQuery ] = React.useState(defaultFilterQuery);
  const [ favoriteApps, setFavoriteApps ] = React.useState<Array<string>>([]);

  const apiFetch = useApiFetch();
  const { isPlaceholderData, isError, error, data } = useQuery<unknown, ResourceError<unknown>, Array<MarketplaceAppOverview>>(
    [ 'marketplace-apps' ],
    async() => apiFetch(appConfig.marketplaceConfigUrl || ''),
    {
      select: (data) => (data as Array<MarketplaceAppOverview>).sort((a, b) => a.title.localeCompare(b.title)),
      placeholderData: Array(9).fill(MARKETPLACE_APP),
      staleTime: Infinity,
    });

  const handleFavoriteClick = React.useCallback((id: string, isFavorite: boolean) => {
    const favoriteApps = getFavoriteApps();

    if (isFavorite) {
      const result = favoriteApps.filter((appId: string) => appId !== id);
      setFavoriteApps(result);
      localStorage.setItem(favoriteAppsLocalStorageKey, JSON.stringify(result));
    } else {
      favoriteApps.push(id);
      localStorage.setItem(favoriteAppsLocalStorageKey, JSON.stringify(favoriteApps));
      setFavoriteApps(favoriteApps);
    }
  }, [ ]);

  const showAppInfo = React.useCallback((id: string) => {
    setSelectedAppId(id);
  }, []);

  const debouncedFilterQuery = useDebounce(filterQuery, 500);
  const clearSelectedAppId = React.useCallback(() => setSelectedAppId(null), []);

  const handleCategoryChange = React.useCallback((newCategory: string) => {
    setSelectedCategoryId(newCategory);
  }, []);

  const displayedApps = React.useMemo(() => {
    return data?.filter(app => isAppNameMatches(debouncedFilterQuery, app) && isAppCategoryMatches(selectedCategoryId, app, favoriteApps)) || [];
  }, [ selectedCategoryId, data, debouncedFilterQuery, favoriteApps ]);

  const categories = React.useMemo(() => {
    return _unique(data?.map(app => app.categories).flat()) || [];
  }, [ data ]);

  React.useEffect(() => {
    setFavoriteApps(getFavoriteApps());
  }, [ ]);

  React.useEffect(() => {
    if (!isPlaceholderData && !isError) {
      const isValidDefaultCategory = categories.includes(defaultCategoryId);
      isValidDefaultCategory && setSelectedCategoryId(defaultCategoryId);
    }
    // run only when data is loaded
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isPlaceholderData ]);

  React.useEffect(() => {
    const query = _pickBy({
      category: selectedCategoryId === MarketplaceCategory.ALL ? undefined : selectedCategoryId,
      filter: debouncedFilterQuery,
    }, Boolean);
    router.replace(
      { pathname: '/apps', query },
      undefined,
      { shallow: true },
    );
  // omit router in the deps because router.push() somehow modifies it
  // and we get infinite re-renders then
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ debouncedFilterQuery, selectedCategoryId ]);

  return React.useMemo(() => ({
    selectedCategoryId,
    onCategoryChange: handleCategoryChange,
    filterQuery: debouncedFilterQuery,
    onSearchInputChange: setFilterQuery,
    isPlaceholderData,
    isError,
    error,
    categories,
    displayedApps,
    showAppInfo,
    selectedAppId,
    clearSelectedAppId,
    favoriteApps,
    onFavoriteClick: handleFavoriteClick,
  }), [
    selectedCategoryId,
    categories,
    clearSelectedAppId,
    selectedAppId,
    displayedApps,
    error,
    favoriteApps,
    handleCategoryChange,
    handleFavoriteClick,
    isError,
    isPlaceholderData,
    showAppInfo,
    debouncedFilterQuery,
  ]);
}

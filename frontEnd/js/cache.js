import { $isEmpty } from "@/assets/methods/globalMethods";
/**
 *
 * 请求缓存器
 */
function formatCacheData(config) {
  if (config.data.cache === false) {
    return {
      data: null,
      request: true,
      cacheKey: ""
    };
  }
  let cacheKey = JSON.stringify(config),
    data = window.CACHE ? window.CACHE[cacheKey] : null,
    currentCache = window.opener;
  if ($isEmpty(data)) {
    if (
      currentCache &&
      currentCache.CACHE &&
      !$isEmpty(currentCache.CACHE[cacheKey])
    ) {
      return {
        data: currentCache.CACHE[cacheKey],
        request: false,
        cacheKey
      };
    }
    return {
      data: null,
      request: true,
      cacheKey
    };
  } else {
    return {
      data,
      request: false,
      cacheKey
    };
  }
}
function requestData(params, options, $http) {
  let config = Object.assign(params, options);
  let { data, request, cacheKey } = formatCacheData(config);
  if (!request) {
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }
  delete config.data.cache;
  return $http(config).then(response => {
    window.CACHE[cacheKey] = response;
    return response;
  });
}
export { requestData };

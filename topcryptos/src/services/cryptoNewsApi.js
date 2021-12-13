import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "1ab5b58a05mshc1be2cc4bd89b3dp12178djsn71a2a02afe04",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com/news";

const cryptoNewsParams = {
  q: "<REQUIRED>",
  freshness: "Day",
  textFormat: "Raw",
  safeSearch: "Off",
};

const createRequest = (url) => ({
  url,
  params: cryptoNewsParams,
  headers: cryptoNewsHeaders,
});

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: (newsCategory, count) =>
        createRequest(`/search?q=${newsCategory}&count=${count}`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chartAPI = createApi({
  reducerPath: "chartAPI",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getXDaysChartData: builder.query<
      Record<string, any>[],
      { companyId: string; days?: number }
    >({
      query: ({ companyId, days }) => `/sensor/${companyId}${days ? `?days=${days}` : ''}`,
    }),
  }),
});

export const { useGetXDaysChartDataQuery } = chartAPI;

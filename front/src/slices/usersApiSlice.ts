import { apiSlice } from './apiSlice.js';
const AUTH_URL = '/authentication';

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${AUTH_URL}/login`,
				method: 'POST',
				body: data,
				withCredentials: true,
			}),
		}),
	}),
});

export const { useLoginMutation } = usersApiSlice;

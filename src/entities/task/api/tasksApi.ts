import { baseApi } from 'shared/api/baseApi';
import type { TaskType } from '../model/types';


export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<TaskType[], void>({
            query: () => '/todos',

            transformResponse: (response: TaskType[]): TaskType[] =>
                response,

            providesTags: ['Tasks'],
        }),
    }),

    overrideExisting: false,
});

export const { useGetTasksQuery } = tasksApi;
import { apiSlice } from '../api/apiSlice';

export const menuApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMenuItems: builder.query({
            query: (params) => ({
                url: 'menu/items',
                params,
            }),
            providesTags: ['Menu'],
        }),
        createMenuItem: builder.mutation({
            query: (itemData) => ({
                url: 'menu/items',
                method: 'POST',
                body: itemData,
            }),
            invalidatesTags: ['Menu'],
        }),
        updateMenuItem: builder.mutation({
            query: ({ itemId, ...updateData }) => ({
                url: `menu/items/${itemId}`,
                method: 'PUT',
                body: updateData,
            }),
            invalidatesTags: ['Menu'],
        }),
        deleteMenuItem: builder.mutation({
            query: (itemId) => ({
                url: `menu/items/${itemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Menu'],
        }),
        getCategories: builder.query({
            query: (params) => ({
                url: 'menu/categories',
                params,
            }),
            providesTags: ['Menu'],
        }),
        createCategory: builder.mutation({
            query: (categoryData) => ({
                url: 'menu/categories',
                method: 'POST',
                body: categoryData,
            }),
            invalidatesTags: ['Menu'],
        }),
        updateCategory: builder.mutation({
            query: ({ categoryId, ...updateData }) => ({
                url: `menu/categories/${categoryId}`,
                method: 'PUT',
                body: updateData,
            }),
            invalidatesTags: ['Menu'],
        }),
        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `menu/categories/${categoryId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Menu'],
        }),
    }),
});

export const {
    useGetMenuItemsQuery,
    useCreateMenuItemMutation,
    useUpdateMenuItemMutation,
    useDeleteMenuItemMutation,
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = menuApiSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getSession } from "next-auth/react";

import {
  Author,
  Book,
  CategoryWithParent,
  Publisher,
  Translator,
} from "@/types";

import { BASE_URL } from "@/constants";

export const bookParadiseApi = createApi({
  reducerPath: "bookParadiseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
      const session = await getSession();
      const token = session?.user?.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["books", "authors", "categories", "publishers", "translators"],
  endpoints: (builder) => ({
    //***************************Books******************************//
    getBooks: builder.query<Book[], void>({
      query: () => "Admin/Books",
      providesTags: ["books"],
    }),
    addBook: builder.mutation({
      query: (payload) => ({
        url: "Admin/Books",
        method: "POST",
        body: payload,
        headers: { accept: "*/*" },
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: ({ id }) => ({
        url: `Admin/Books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    //***************************Categories******************************//
    getCategories: builder.query<CategoryWithParent[], void>({
      query: () => "Admin/Categories",
      providesTags: ["categories"],
    }),
    addCategory: builder.mutation({
      query: (payload) => ({
        url: "Admin/Categories",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["categories"],
    }),
    editCategory: builder.mutation({
      query: (payload) => ({
        url: `Admin/Categories/${payload.id}`,
        method: "PUT",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["categories"],
    }),
    deleteCategory: builder.mutation({
      query: ({ id }) => ({
        url: `Admin/Categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
    //***************************Authors******************************//
    getAuthors: builder.query<Author[], void>({
      query: () => "Admin/Authors",
      providesTags: ["authors"],
    }),
    addAuthor: builder.mutation({
      query: (payload) => ({
        url: "Admin/Authors",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["authors"],
    }),
    editAuthor: builder.mutation({
      query: (payload) => ({
        url: `Admin/Authors/${payload.id}`,
        method: "PUT",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["authors"],
    }),
    deleteAuthor: builder.mutation({
      query: ({ id }) => ({
        url: `Admin/Authors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["authors"],
    }),
    //***************************Publishers******************************//
    getPublishers: builder.query<Publisher[], void>({
      query: () => "Admin/Publisher",
      providesTags: ["publishers"],
    }),
    addPublisher: builder.mutation({
      query: (payload) => ({
        url: "Admin/Publisher",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["publishers"],
    }),
    editPublisher: builder.mutation({
      query: (payload) => ({
        url: `Admin/Publisher/${payload.id}`,
        method: "PUT",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["publishers"],
    }),
    deletePublisher: builder.mutation({
      query: ({ id }) => ({
        url: `Admin/Publisher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["publishers"],
    }),
    //***************************Translators******************************//
    getTranslators: builder.query<Translator[], void>({
      query: () => "Admin/Translators",
      providesTags: ["translators"],
    }),
    addTranslator: builder.mutation({
      query: (payload) => ({
        url: "Admin/Translators",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["translators"],
    }),
    editTranslator: builder.mutation({
      query: (payload) => ({
        url: `Admin/Translators/${payload.id}`,
        method: "PUT",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["translators"],
    }),
    deleteTranslator: builder.mutation({
      query: ({ id }) => ({
        url: `Admin/Translators/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["translators"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetCategoriesQuery,
  useGetAuthorsQuery,
  useGetTranslatorsQuery,
  useGetPublishersQuery,
  useAddBookMutation,
  useAddAuthorMutation,
  useEditAuthorMutation,
  useDeleteAuthorMutation,
  useAddTranslatorMutation,
  useDeleteTranslatorMutation,
  useEditTranslatorMutation,
  useAddPublisherMutation,
  useDeletePublisherMutation,
  useEditPublisherMutation,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useDeleteBookMutation,
} = bookParadiseApi;

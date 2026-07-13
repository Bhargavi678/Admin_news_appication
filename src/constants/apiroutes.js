export const API_ROUTES = {
  AUTH: {
    LANGUAGE: "/auth/language",
    LOCATION: "/auth/location",
  },

  

  ADMIN_CATEGORIES: {
    GET_ALL: "/admin/categories/",
  },

  USER_CATEGORIES: {
    GET_ALL: "/categories/user/categories",
  },

  NOTIFICATIONS: {
    GET_ALL: "/notifications/",
    UPDATE_SETTINGS: "/notifications/settings",
  },

  NEWS: {
    GET_ALL: "/news/",
    GET_BY_ID: (id) => `/news/${id}`,
    SHARE: (id) => `/news/${id}/share`,
  },

  SEARCH: {
    NEWS: (keyword) => `/search/?keyword=${keyword}`,
  },

  USER_POST: {
    CREATE: "/admin/news/",
    MY_POSTS: "/admin/news/",
    PUBLISH: (id) => `/admin/news/publish/${id}`,
    DELETE: (id) => `/admin/news/${id}`,
  },

  COMMENTS: {
    CREATE: "/comments/",
    GET_BY_NEWS_ID: (id) => `/comments/${id}`,
  },

  LIKES: {
    LIKE: "/likes/",
    UNLIKE: (id) => `/likes/${id}`,
  },

  BOOKMARKS: {
    GET_ALL: "/bookmarks/",
    ADD: "/bookmarks/",
    DELETE: (id) => `/bookmarks/${id}`,
  },
};
export const urls = {
  import: '',
  users: {
    delete: 'users/delete',
    types: 'users/types',
    list: 'users/list',
    create: 'users/create',
    resetPassword: 'users/password/reset',
    update: 'users/edit',
    getOne: 'users'
  },
  auth: {
    login: 'auth/login',
    logout: 'auth/logout',
    account: 'auth/me',
    changePassword: 'auth/change-password',
  },
  blogs: {
    getOne: 'blog/',
    getCategories: 'categories',
    getSponsoredContent: 'blogs/sponsored',
    getRecentlyAdded: 'blogs/recent',
    getMostViewed: 'blogs/viewed',
    getRelatedArticles: 'blogs/related'
  },
  instagram: {
    list: 'instagram'
  },
  projects: {
    list: ''
  },
  agents: {
    contactAgent: '',
    becomeAgent: '',
  }
};

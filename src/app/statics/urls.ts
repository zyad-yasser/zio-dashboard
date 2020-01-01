export const urls = {
  import: '',
  users: {
    delete: 'user',
    list: 'user/',
    create: 'user',
    resetPassword: 'user/password',
    update: 'user',
    toggleActivity: 'user/activity',
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

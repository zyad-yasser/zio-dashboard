export const urls = {
  import: '',
  media: {
    list: 'media/',
    oneId: 'media/id/',
    oneUrl: 'media/store/',
    deleteOne: 'media/id/',
    deleteMany: 'media/multi',
    uploadOne: 'media',
    uploadMany: 'media/multi',
  },
  users: {
    delete: 'user',
    list: 'user/',
    create: 'user',
    resetPassword: 'user/password',
    update: 'user',
    toggleActivity: 'user/activity',
  },
  clients: {
    delete: 'client',
    list: 'client/',
    create: 'client',
    update: 'client',
    toggleVisibility: 'client/visibility',
  },
  categories: {
    delete: 'category',
    list: 'category/',
    create: 'category',
    update: 'category',
    toggleVisibility: 'category/visibility',
  },
  cities: {
    delete: 'city',
    list: 'city/',
    create: 'city',
    update: 'city',
  },
  agents: {
    delete: 'agent',
    list: 'agent/',
    create: 'agent',
    update: 'agent',
    toggleVisibility: 'agent/visibility',
  },
  partners: {
    delete: 'partner',
    list: 'partner/',
    create: 'partner',
    update: 'partner',
    toggleVisibility: 'partner/visibility',
  },
  types: {
    delete: 'type',
    oneId: 'type',
    list: 'type/',
    create: 'type',
    update: 'type',
    toggleVisibility: 'type/visibility',
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
  sections: {
    oneType: 'section',
    findCreateOrUpdate: 'section',
    list: 'section',
  },
  instagram: {
    list: 'instagram'
  },
  projects: {
    delete: 'project',
    list: 'project',
    create: 'project',
    update: 'project',
    toggleVisibility: 'project/visibility',
    getOneBySlug: 'project/slug',
    slugCheck: 'project/slug/check',
    getOneById: 'project/id',
  }
};

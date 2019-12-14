import { Sidenav } from '../models/sidenav';

export const sidenavItems: Sidenav[] = [
  {
    name: 'SIDENAV.UPLOADS',
    icon: '',
    activeIcon: '',
    link: 'uploads',
    permission: 'all'
  },
  {
    name: 'SIDENAV.BOARDS',
    icon: '',
    activeIcon: '',
    link: 'boards',
    permission: 'all'
  },
  {
    name: 'SIDENAV.USERS',
    icon: '',
    activeIcon: '',
    link: 'users',
    permission: 'superAdmin'
  }
];

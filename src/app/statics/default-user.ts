import { User } from '../models/user';

export const defaultUser: User = {
  email: 'zyadyasser@gmail.com',
  id: 1,
  isSuper: true,
  isActive: true,
  firstName: 'Zyad',
  lastName: 'Yasser',
  typeId: 1,
  token: '',
  image: '/assets/images/user.png'
};

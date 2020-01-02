import { environment } from 'src/environments/environment';
export const appName = 'lartquitecte-dashboard-';
export const defaultPhoto = '/assets/images/user-photo.png';
export const baseUrl = environment.baseUrl;
export const serverip = '/';
export const version = '0.0.1';
export const loadingTimeout = 1000;
export const debug = false;
export const tableDateFormat = 'DD.MM.YYYY';
export const uploadFileSize = 7 * 1024 * 1024;
export const modalConfig = {
  width: '550px',
  disableClose: false,
  id: 'generalModal',
  data: {}
};
export const toastrConfig = {
  timeOut: 3000,
  positionClass: 'toast-bottom-center'
};

export const appLogo = '/assets/images/logo.png';
export const appStringName = 'LART-QUI-TECTE board';

export const fakeLoaderPeriod = 1000;

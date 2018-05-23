import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Menú',
    group: true,
  },
  {
    title: 'Dashboard',
    icon: 'ion-ios-home',
    children:[
      {
        title: 'Reportes',
        link: '/globaltv/dashboard',
        icon: 'ion-ios-pie'
      }
    ]
  },
  {
    title: 'Clientes',
    icon: 'ion-ios-people',
    children: [
      {
        title: 'Detalles',
        link: '/globaltv/clients/details',
        icon: 'ion-person-stalker'
      }
    ],
  },
  {
    title: 'Configuraciones',
    icon: 'ion-settings',
    children: [
      {
        title: 'Roles',
        link: '/globaltv/setting/roles',
        icon: 'ion-ios-person'
      },
      {
        title: 'Usuarios',
        link: '/globaltv/setting/users',
        icon: 'ion-ios-contact'
      }
    ],
  }
];

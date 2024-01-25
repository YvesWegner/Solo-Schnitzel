import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'quest1',
    loadComponent: () => import('./quest1/quest1.page').then(m => m.Quest1Page),
  },
  {
    path: 'quests-info',
    loadComponent: () => import('./quests-info/quests-info.page').then( m => m.QuestsInfoPage)
  },
  {
    path: 'quest3',
    loadComponent: () => import('./quest3/quest3.page').then( m => m.Quest3Page)
  },
  {
    path: 'quest2',
    loadComponent: () => import('./quest2/quest2.page').then( m => m.Quest2Page)
  },
  {
    path: 'quest4',
    loadComponent: () => import('./quest4/quest4.page').then( m => m.Quest4Page)
  },

];

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

];

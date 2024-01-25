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
    loadComponent: () => import('./quest1/quest1.page').then( m => m.Quest1Page)
  },
  {
    path: 'quests-info',
    loadComponent: () => import('./quests-info/quests-info.page').then( m => m.QuestsInfoPage)
  },
  {
    path: 'quests-info',
    loadComponent: () => import('./quests-info/quests-info.page').then( m => m.QuestsInfoPage)
  },
  {
    path: 'quests-info',
    loadComponent: () => import('./quests-info/quests-info.page').then(m => m.QuestsInfoPage),
    // Beachten Sie, dass 'standalone: true' hier nicht notwendig ist, da es im Component-Decorator in der quests-info.page.ts-Datei definiert wird.
  },

];

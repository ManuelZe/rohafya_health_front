import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Devis } from './devis/devis';
import { langResolver } from './shared/lang/lang.resolver';

/**
 * Site de présentation : français à la racine, anglais sous /en (deux pages pré-rendues
 * par destination). /devis est une page distincte de la demande de démonstration.
 */
export const routes: Routes = [
  { path: '', component: Home, resolve: { lang: langResolver('fr') } },
  { path: 'devis', component: Devis, resolve: { lang: langResolver('fr') } },
  { path: 'en', component: Home, resolve: { lang: langResolver('en') } },
  { path: 'en/devis', component: Devis, resolve: { lang: langResolver('en') } },
  { path: '**', redirectTo: '' },
];

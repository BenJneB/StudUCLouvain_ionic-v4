import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TutoPage } from './pages/tuto/tuto';
import { HomePage } from './home/home.page';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'credits', loadChildren: () => import('./pages/credits/credits.module').then(m => m.CreditPageModule)},
    {path: 'events', loadChildren: () => import('./events/events.module').then(m => m.EventsPageModule)},
    {path: 'guindaille', loadChildren: () => import('./pages/guindaille2-0/guindaille2-0.module').then(m => m.GuindaillePageModule)},
    {path: 'home', component: HomePage},
    {path: 'libraries', loadChildren: () => import('./libraries/libraries.module').then(m => m.LibrariesPageModule)},
    {path: 'map', loadChildren: () => import('./pages/map/map.module').then(m => m.MapPageModule)},
    {path: 'mobility', loadChildren: () => import('./pages/mobility/mobility.module').then(m => m.MobilityPageModule)},
    {path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsPageModule)},
    {path: 'resto', loadChildren: () => import('./pages/restaurant/restaurant.module').then(m => m.RestaurantPageModule)},
    {path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)},
    {path: 'sports', loadChildren: () => import('./pages/sports/sports.module').then(m => m.SportsPageModule)},
    {path: 'studies', loadChildren: () => import('./studies/studies.module').then(m => m.StudiesPageModule)},
    {path: 'support', loadChildren: () => import('./support/support.module').then(m => m.SupportPageModule)},
    {path: 'tutos', component: TutoPage},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

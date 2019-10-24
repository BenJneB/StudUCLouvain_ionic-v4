import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'credits', loadChildren: './pages/credit/credit.module#CreditPageModule'},
    {path: 'events', loadChildren: () => import('./pages/events/events.module').then(m => m.EventsPageModule)},
    {path: 'guindaille', loadChildren: './pages/guindaille2-0/guindaille2-0.module#GuindaillePageModule'},
    {path: 'home', loadChildren: './home/home.module#HomePageModule'},
    {path: 'libraries', loadChildren: () => import('./pages/library/libraries.module').then(m => m.LibrariesPageModule)},
    {path: 'map', loadChildren: './pages/map/map.module#MapPageModule'},
    {path: 'mobility', loadChildren: './pages/mobility/mobility.module#MobilityPageModule'},
    {path: 'news', loadChildren: () => import('./pages/news/news.module').then(m => m.NewsPageModule)},
    {path: 'resto', loadChildren: './pages/restaurant/restaurant.module#RestaurantPageModule'},
    {path: 'settings', loadChildren: './pages/param/param.module#ParamPageModule'},
    {path: 'sports', loadChildren: './pages/sports/sports.module#SportsPageModule'},
    {path: 'studies', loadChildren: () => import('./pages/studies/studies.module').then(m => m.StudiesPageModule)},
    {path: 'support', loadChildren: () => import('./pages/support/support.module').then(m => m.SupportPageModule)},
    {path: 'tutos', loadChildren: './pages/tuto/tuto.module#TutoPageModule'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

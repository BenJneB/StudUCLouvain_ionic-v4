import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'news', loadChildren: './pages/news/news.module#NewsPageModule' },
  { path: 'news/details', loadChildren: './pages/news/news-details/news-details.module#NewsDetailsPageModule' },
  { path: 'events', loadChildren: './pages/events/events.module#EventsPageModule' },
  { path: 'events/details', loadChildren: './pages/events/events-details/events-details.module#EventsDetailsPageModule' },
  { path: 'sports', loadChildren: './pages/sports/sports.module#SportsPageModule' },
  { path: 'guindaille', loadChildren: './pages/guindaille2-0/guindaille2-0.module#GuindaillePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

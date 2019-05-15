import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'course', loadChildren: './pages/studies/course/course.module#CoursePageModule' },
  { path: 'credits', loadChildren: './pages/credit/credit.module#CreditPageModule' },
  { path: 'employee', loadChildren: './pages/support/employee-details/employee-details.module#EmployeeDetailsPageModule' },
  { path: 'events', loadChildren: './pages/events/events.module#EventsPageModule' },
  { path: 'events/details', loadChildren: './pages/events/events-details/events-details.module#EventsDetailsPageModule' },
  { path: 'guindaille', loadChildren: './pages/guindaille2-0/guindaille2-0.module#GuindaillePageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'libraries', loadChildren: './pages/library/libraries.module#LibrariesPageModule' },
  { path: 'libraries/details', loadChildren: './pages/library/library-details/library-details.module#LibraryDetailsPageModule' },
  { path: 'map', loadChildren: './pages/map/map.module#MapPageModule' },
  { path: 'mobility', loadChildren: './pages/mobility/mobility.module#MobilityPageModule' },
  { path: 'news', loadChildren: './pages/news/news.module#NewsPageModule' },
  { path: 'news/details', loadChildren: './pages/news/news-details/news-details.module#NewsDetailsPageModule' },
  { path: 'resto', loadChildren: './pages/restaurant/restaurant.module#RestaurantPageModule' },
  { path: 'settings', loadChildren: './pages/param/param.module#ParamPageModule' },
  { path: 'sports', loadChildren: './pages/sports/sports.module#SportsPageModule' },
  { path: 'studies', loadChildren: './pages/studies/studies.module#StudiesPageModule' },
  { path: 'support', loadChildren: './pages/support/support.module#SupportPageModule' },
  { path: 'tutos', loadChildren: './pages/tuto/tuto.module#TutoPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

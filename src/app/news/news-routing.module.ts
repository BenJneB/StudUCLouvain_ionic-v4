import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsPage } from './pages/news';
import { NewsDetailsPage } from './pages/news-details/news-details';

const routes: Routes = [
    {path: '', component: NewsPage},
    {path: 'details', component: NewsDetailsPage},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class NewsRoutingModule {
}

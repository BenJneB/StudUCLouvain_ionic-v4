import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrariesPage } from './pages/libraries';
import { LibraryDetailsPage } from './pages/library-details/library-details';

const routes: Routes = [
    {path: '', component: LibrariesPage},
    {path: 'details', component: LibraryDetailsPage},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class LibrariesRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibrariesPage } from './libraries';
import { LibraryDetailsPage } from './library-details/library-details';

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
export class LibraryRoutingModule {
}

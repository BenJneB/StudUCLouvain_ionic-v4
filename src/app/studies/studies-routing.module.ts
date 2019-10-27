import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudiesPage } from './pages/studies';
import { CoursePage } from './pages/course/course';

const routes: Routes = [
    {path: '', component: StudiesPage},
    {path: 'course', component: CoursePage},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class StudiesRoutingModule {
}

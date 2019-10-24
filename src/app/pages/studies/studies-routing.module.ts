import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudiesPage } from './studies';
import { CoursePage } from './course/course';

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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportPage } from './support';
import { EmployeeDetailsPage } from './employee-details/employee-details';

const routes: Routes = [
    {path: '', component: SupportPage},
    {path: 'employee', component: EmployeeDetailsPage},
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class SupportRoutingModule {
}

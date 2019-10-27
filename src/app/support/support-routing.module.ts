import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupportPage } from './pages/support';
import { EmployeeDetailsPage } from './pages/employee-details/employee-details';

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

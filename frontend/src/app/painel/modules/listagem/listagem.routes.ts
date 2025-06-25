import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListagemViewComponent } from './listagem-view/component/ts/listagem-view.component';

const routes: Routes = [
    {
        path: '',
        component: ListagemViewComponent,
        children: [
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListagemRoutingModule { }
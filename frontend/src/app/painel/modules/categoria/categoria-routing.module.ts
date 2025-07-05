import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'listagem',
        loadChildren: () => import('./listagem/listagem.routes.js').then(m => m.ListagemRoutingModule)
    },
    {
        path: 'cadastro',
        loadChildren: () => import('./cadastro/cadastro.routes.js').then(m => m.CadastroRoutingModule)
    },
    {
        path: '**',
        redirectTo: 'listagem'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoriaRoutingModule { }

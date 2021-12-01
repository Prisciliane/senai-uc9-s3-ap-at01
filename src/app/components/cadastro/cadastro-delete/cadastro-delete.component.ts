import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { Cadastro } from '../cadastro.model';
import { CadastroService } from '../cadastro.service';

@Component({
  selector: 'app-cadastro-delete',
  templateUrl: './cadastro-delete.component.html',
  styleUrls: ['./cadastro-delete.component.css']
})
export class CadastroDeleteComponent implements OnInit {

  cadastro!: Cadastro;

  constructor(private cadastroService: CadastroService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +Number(this.route.snapshot.paramMap.get('id'))
    this.cadastroService.readById(id).subscribe(cadastro => {
      this.cadastro = cadastro
    });
  }

  deleteCadastro(): void{
    this.cadastroService.deleteCadastro(Number(this.cadastro.id)).subscribe(() =>{
      this.cadastroService.showMessege('Cadastro deletado');
      this.tabelaCadastro();
    });

  }
candelarCadastro(): void{
  this.router.navigate(["/cadastro"]);
}
  tabelaCadastro(): void{
    this.router.navigate(["/cadastro/tabela"]);

  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Cadastro } from './cadastro.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  baseurl = "http://localhost:3001/cadastro"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { 

  }
  showMessege(msg: string): void{
    this.snackBar.open(msg, 'X',{
      duration: 6000,
      verticalPosition: "bottom"
    });
  }
  create(cadastro: Cadastro): Observable<Cadastro>{
    return this.http.post<Cadastro>(this.baseurl, cadastro)
  }
  read(): Observable<Cadastro[]>{
    return this.http.get<Cadastro[]>(this.baseurl)
  }
  readById(id: number): Observable<Cadastro> {
    const url = `${this.baseurl}/${id}`
    return this.http.get<Cadastro>(url)
  }
  updateCadastro(cadastro: Cadastro): Observable<Cadastro>{
    const url = `${this.baseurl}/${cadastro.id}`
    return this.http.put<Cadastro>(url, cadastro)
  }
  deleteCadastro(id: number): Observable<Cadastro>{
    const url =`${this.baseurl}/${id}`
    return this.http.delete<Cadastro>(url)
  }
  
}

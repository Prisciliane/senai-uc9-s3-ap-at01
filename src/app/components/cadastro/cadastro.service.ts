import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { Cadastro } from './cadastro.model';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  baseurl = "http://localhost:3001/cadastro"

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { 

  }
  showMessege(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg, 'X',{
      duration: 6000,
      verticalPosition: "bottom",
      panelClass: isError ? ['errorMsg'] : ['successMsg']
    });
  }
  create(cadastro: Cadastro): Observable<Cadastro>{
    return this.http.post<Cadastro>(this.baseurl, cadastro).pipe(
      map((obj) =>obj),
      catchError(e => this.errorMsg(e))
    );;
  }
  errorMsg(e: any): Observable<any>{
    console.log(e);
    this.showMessege('Error', true);
    return EMPTY
  }
  read(): Observable<Cadastro[]>{
    return this.http.get<Cadastro[]>(this.baseurl).pipe(
      map((obj) =>obj),
      catchError(e => this.errorMsg(e))
    );;
    
  }
  readById(id: number): Observable<Cadastro> {
    const url = `${this.baseurl}/${id}`
    return this.http.get<Cadastro>(url).pipe(
      map((obj) =>obj),
      catchError(e => this.errorMsg(e))
      );;
    
  }
  updateCadastro(cadastro: Cadastro): Observable<Cadastro>{
    const url = `${this.baseurl}/${cadastro.id}`
    return this.http.put<Cadastro>(url, cadastro).pipe(
      map((obj) =>obj),
      catchError(e => this.errorMsg(e))
      );;
  }
  deleteCadastro(id: number): Observable<Cadastro>{
    const url =`${this.baseurl}/${id}`
    return this.http.delete<Cadastro>(url).pipe(
      map((obj) =>obj),
      catchError(e => this.errorMsg(e))
      );;
  }
  
}

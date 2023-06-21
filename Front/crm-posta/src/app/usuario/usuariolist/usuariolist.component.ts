import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuariolist',
  templateUrl: './usuariolist.component.html',
  styleUrls: ['./usuariolist.component.css']
})
export class UsuariolistComponent implements OnInit{
  usuarios:Usuario[]=[];
  ngOnInit(): void {
this.usuarioService.usuarioFindAll().subscribe(data=>{
  this.usuarios=data;
})
  }
  constructor(private usuarioService:UsuarioService){

  }

}

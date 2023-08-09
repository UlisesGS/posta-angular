import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from './../usuario.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  actual:string;
  nueva:string;
  repita:string;
  condicion:boolean=false;
  usuario:Usuario= new Usuario();
  constructor(private usuariosService:UsuarioService,private rutaParametro:ActivatedRoute){}
  ngOnInit(): void {
this.rutaParametro.paramMap.subscribe(p=>{
let id = + p.get('id');
if(id){
  this.usuariosService.usuarioFindById(id).subscribe(data=>{
    this.usuario= data;
  })
}
})
  }
  cambiarCondicion(){
    if(this.condicion==true){
      this.condicion=false
    }else{
      this.condicion=true;
    }
  }
cambiar(){
if(this.actual== this.usuario.password && this.nueva==this.repita){
  Swal.fire('Exito:', 'Contraseña cambiada con exito', 'success');
  //poner el metodo del back para cambiar la contraseña
}else{
  Swal.fire('Error:', 'Contraseñas Incorrectas', 'error');
}
}
}

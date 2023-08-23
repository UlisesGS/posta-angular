import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from './../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as bcrypt from 'bcryptjs'; 

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
  constructor(private ruta:Router, private usuariosService:UsuarioService,private rutaParametro:ActivatedRoute){}
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
  
if(bcrypt.compareSync(this.actual, this.usuario.password) && this.nueva == this.repita ){
 
  
  this.usuario.password= this.nueva;



  //poner el metodo del back para cambiar la contraseña
  this.usuariosService.usuarioUpdate(this.usuario).subscribe(s=>{

    Swal.fire('Exito:', 'Contraseña cambiada con exito', 'success');
  })

}else{
  Swal.fire('Error:', 'Contraseñas Incorrectas', 'error');
}
}
inicio(){
this.ruta.navigate(['/main'])
}
}

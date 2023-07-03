import { Component, Input, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/client/modal.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-usuarioform',
  templateUrl: './usuarioform.component.html',
  styleUrls: ['./usuarioform.component.css']
})
export class UsuarioformComponent implements OnInit {
  @Input()usuario: Usuario = new Usuario();
  usuario1: Usuario = new Usuario();
  public titulo: string = 'Formulario Usuario'
  public modal:boolean;
  usuarioLogin: Usuario = new Usuario();

  
  constructor(private usuarioService: UsuarioService,
     private ruta: Router,
     private rutaParametro:ActivatedRoute,
     private modalService:ModalService) {}


  ngOnInit(): void {
      this.rutaParametro.paramMap.subscribe(parametro=>{
        let id=+parametro.get('id');
       if(id){
        this.usuarioService.usuarioFindById(id).subscribe(data=>{
          this.usuario1=data;
          this.titulo='Editar Usuario';
          console.log(this.usuario1);
        })
       }else{
        this.titulo='Crear Usuario';
       }
       
  
      })
      
    }

  public cerrarModal(){
    this.modalService.cerrarModalProceso();
  }

  public cerrarModalEditar(){
    this.modalService.cerrarVerMas();
  }


  public registrar() {
    console.log(this.usuario1);
    this.usuario1.role='ADVISER';
    this.usuarioService.usuarioSave(this.usuario1).subscribe(data => {
      this.modalService.cerrarModalProceso();
      Swal.fire('ÉXITO', `El usuario ${data.name} fue creado con exito`, 'success');

    }
    , e => {
      Swal.fire('ERROR: ', 'Datos Incorrectos', 'error');
    }
    )

  }
public editar(){
 // Swal.fire('En construccion', 'Esta seccion esta en construccion', 'info');
 this.usuarioService.usuarioUpdate(this.usuario).subscribe(data=>{
  this.modalService.cerrarVerMas();
  Swal.fire('EDITADO', `El usuario ${data.name} fue editado con exito`, 'success');

 },e=>{
  console.log(e);

  Swal.fire('ERROR: ', 'Datos Incorrectos', 'error');
 })
}

}

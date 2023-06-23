import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from 'src/app/client/modal.service';

@Component({
  selector: 'app-usuarioform',
  templateUrl: './usuarioform.component.html',
  styleUrls: ['./usuarioform.component.css']
})
export class UsuarioformComponent implements OnInit {
  usuario: Usuario = new Usuario();
  public titulo: string = 'Formulario Usuario'
  public modal:boolean;
  ngOnInit(): void {
    this.rutaParametro.paramMap.subscribe(parametro=>{
      let id=+parametro.get('id');
     if(id){
      this.usuarioService.usuarioFindById(id).subscribe(data=>{
        this.usuario=data;
        this.titulo='Editar Usuario';
      })
     }else{
      this.titulo='Crear Usuario';
     }

    })
    
  }
  constructor(private usuarioService: UsuarioService, private ruta: Router,private rutaParametro:ActivatedRoute,
    ) {

  }
  public registrar() {
    console.log(this.usuario);
    this.usuarioService.usuarioSave(this.usuario).subscribe(data => {
      Swal.fire('Creado', `El usuario ${data.name} fue creado con exito`, 'success');
      this.ruta.navigate(['/usuarios'])

    }, e => {
      Swal.fire('Error: ', 'Ingrese bien los datos', 'error');
    })

  }
public editar(){
 // Swal.fire('En construccion', 'Esta seccion esta en construccion', 'info');
 this.usuarioService.usuarioUpdate(this.usuario).subscribe(data=>{
  this.ruta.navigate(['/usuarios'])
  Swal.fire('Editado', `El usuario ${data.name} fue editado con exito`, 'success');

 },e=>{
  console.log(e);

  Swal.fire('Error: ', 'Ingrese bien los datos', 'error');
 })
}

}

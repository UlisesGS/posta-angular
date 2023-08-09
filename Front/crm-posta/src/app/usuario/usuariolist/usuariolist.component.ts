import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { ModalService } from 'src/app/client/modal.service';

@Component({
  selector: 'app-usuariolist',
  templateUrl: './usuariolist.component.html',
  styleUrls: ['./usuariolist.component.css']
})
export class UsuariolistComponent implements OnInit{
  usuarios:Usuario[]=[];
  usuario:Usuario = new Usuario();
  activo:boolean
  usuarioSeleccionado:Usuario;


  ngOnInit(): void {
    this.usuario= JSON.parse(localStorage.getItem('usuario'));
    this.todos();
  }

  constructor(private usuarioService:UsuarioService,
    public modalService:ModalService){}

  abrirModal():void{
    this.modalService.abrirModal();
  }

  abrirModalCrearAsesor(){
    console.log('hola');

    this.modalService.abrirModalPocesos();
  }


  abrirModalEditarAsesor(usuario:Usuario){
    this.usuarioSeleccionado=usuario;
    this.modalService.abrirVerMas();
  }

  public usuarioDelete(id:number): void{
    console.log(id);

    this.usuarioService.usuarioDelete(id).subscribe( data => {
      console.log(data);

      this.todos();
    })
  }

  public todos(){
    this.usuarioService.usuarioFindAll().subscribe(data=>{
      this.usuarios=data;
this.activo=data.active;
      console.log(data);
    //  this.usuarios = this.usuarios.filter(u=>u.id==this.usuario.id);


    })

  }

}

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
  activo:boolean


  ngOnInit(): void {
    this.todos();
  }

  constructor(private usuarioService:UsuarioService,
    public modalService:ModalService){}

  abrirModal():void{
    this.modalService.abrirModal();
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


    })

  }

}

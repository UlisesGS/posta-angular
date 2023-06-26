import { Component, Input } from '@angular/core';
import { ModalService } from '../modal.service';
import { Client } from '../client';
import { Router } from '@angular/router';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
pdfMake.vfs=pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-accion',
  templateUrl: './accion.component.html',
  styleUrls: ['./accion.component.css']
})
export class AccionComponent {

  @Input()cliente:Client = new Client();

  constructor(private modalService:ModalService,
    private ruta:Router,
    ){}

  cerrarModalAction():void{
    this.modalService.cerrarModalAction();
  }
  public tipoCliente(){
    if(this.cliente.type=='entrepreneur'){
      this.ruta.navigate([`clients/form/editar/entrepreneur/${this.cliente.id}`]);

    }else{
      this.ruta.navigate([`clients/form/editar/businessman/${this.cliente.id}`]);
    }
  }
  /*
  createPdf(){
    const pdfDefinition:any={
      content:[
        {
          text: 'Imprimir cliente',
          style: 'header'
        },
        {
          text: 'Nombre: ' + this.cliente.name,
          bold: true, // Texto en negrita
          fontSize: 12, // Tamaño de fuente
          color:'red'
        },
        {
          text: 'Apellido: ' + this.cliente.lastName,
          bold: true, // Texto en negrita
          fontSize: 12 ,// Tamaño de fuente,
          color:'red'
        },
        {
          text: 'Direccion: ' + this.cliente.address,
          bold: true, // Texto en negrita
          fontSize: 12 ,// Tamaño de fuente,
          color:'red'
        },




      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
        }
      }


  }
  const pdf=pdfMake.createPdf(pdfDefinition);
  pdf.open();
//descargar
//pdf.dowload();
}*/
/*
// tipo carta
createPdf(){
  const pdfDefinition: any = {
    content: [
      {
        text: 'Ficha de Cliente',
        style: 'header'
      },
      {
        table: {
          widths: ['auto', '*'], // Ancho de las columnas
          body: [
            ['Fecha:', { text: new Date().toLocaleDateString(), margin: [10, 0, 0, 0] }],
            ['Nombre completo:', { text: this.cliente.name + ' ' + this.cliente.lastName, margin: [10, 0, 0, 0] }],
            ['Dirección:', { text: this.cliente.address, margin: [10, 0, 0, 0] }],
            ['Teléfono:', { text: this.cliente.phone, margin: [10, 0, 0, 0] }],
            ['Email:', { text: this.cliente.email, margin: [10, 0, 0, 0] }],
            ['Mensaje:', {
              text: 'Estimado(a) ' + this.cliente.name + ',\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices elit nec consequat feugiat. Mauris pulvinar turpis vitae purus volutpat scelerisque. Donec eu dui nisl. Curabitur viverra odio sed nisi varius lobortis. Integer tristique ex non purus congue, a ultrices magna facilisis. Vestibulum euismod sem id purus aliquam, ac pellentesque tellus rutrum. Sed id lectus dui. Suspendisse faucibus tellus ut massa dapibus, ut vulputate neque porttitor. Vivamus dictum magna sit amet mauris fermentum, sit amet faucibus sapien tempor. Sed consectetur cursus urna eget vestibulum. Sed id libero luctus, mattis eros ac, dictum risus.\n\nSincerely,\nTu Nombre',
              margin: [10, 0, 0, 0]
            }]
          ]
        },
        layout: 'noBorders' // Eliminar bordes de la tabla
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      }
    }
  };

  const pdf = pdfMake.createPdf(pdfDefinition);
  pdf.open();
}*/
// tipo tabla

createPdf(){
  const pdfDefinition: any = {
    content: [
      {
        text: 'Ficha de Cliente',
        style: 'header'
      },
      {
        table: {


          widths: ['auto', '*'], // Ancho de las columnas
          body: [
            [
              { text: 'ID:', bold: true },
              { text: this.cliente.id }
            ],
            [
              { text: 'NIT:', bold: true },
              { text: this.cliente.nit }
            ],
            [
              { text: 'Nombre:', bold: true },
              { text: this.cliente.name }
            ],
            [
              { text: 'Apellido:', bold: true },
              { text: this.cliente.lastName }
            ],
            [
              { text: 'Genero:', bold: true },
              { text: this.cliente.gender }
            ],
            [
              { text: 'Municipio:', bold: true },
              { text: this.cliente.municipio.country } // Suponiendo que el atributo "nombre" contiene el nombre del municipio
            ],
            [
              { text: 'Teléfono:', bold: true },
              { text: this.cliente.phone }
            ],
            [
              { text: 'Email:', bold: true },
              { text: this.cliente.email }
            ]
          ]
        },
        layout: 'lightHorizontalLines' // Estilo de tabla con líneas horizontales claras
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      }
    }
  };
  const pdf = pdfMake.createPdf(pdfDefinition);
  pdf.open();
}

//tipo ficha
/*
createPdf(cliente: Client) {
  const pdfDefinition: any = {
    content: [
      {
        text: 'Ficha del Cliente',
        style: 'header'
      },
      {
        text: 'ID: ' + cliente.id,
        margin: [0, 10, 0, 0] // Margen superior de 10 unidades
      },
      {
        text: 'NIT: ' + cliente.nit,
        margin: [0, 5, 0, 0] // Margen superior de 5 unidades
      },
      {
        text: 'Nombre: ' + cliente.name,
        margin: [0, 5, 0, 0]
      },
      {
        text: 'Apellido: ' + cliente.lastName,
        margin: [0, 5, 0, 0]
      },
      {
        text: 'Edad: ' + cliente.edad,
        margin: [0, 5, 0, 0]
      },
      {
        text: 'Municipio: ' + cliente.municipio.country, // Suponiendo que el atributo "nombre" contiene el nombre del municipio
        margin: [0, 5, 0, 0]
      },
      {
        text: 'Teléfono: ' + cliente.phone,
        margin: [0, 5, 0, 0]
      },
      {
        text: 'Email: ' + cliente.email,
        margin: [0, 5, 0, 0]
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      }
    }
  };

  const pdf = pdfMake.createPdf(pdfDefinition);
  pdf.open();
  // Descargar
  // pdf.download();
}
*/
}

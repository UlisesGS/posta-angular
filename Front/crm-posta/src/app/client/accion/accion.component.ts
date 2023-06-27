import { Component, Input } from '@angular/core';
import { ModalService } from '../modal.service';
import { Client } from '../client';
import { Router } from '@angular/router';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
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
/*
createPdf(){
  //const imagenUrl='/assets/camaraHD.jpg'
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
            ],
            [
              { text: 'tipo:', bold: true },

              { text:  this.cliente.type==='entrepreneur'?'Emprendedor':'Empresario',color:'red' }
            ]
          ]
        },
        layout: 'lightHorizontalLines' // Estilo de tabla con líneas horizontales claras
      },

    ],

    styles: {
      header: {
        fontSize: 30,
        bold: true,
        margin: [0, 20, 0,20],
        color:'red',
        alignment:'center',
        localization: {
          attributes: {
            text: 'Nombre' // Cambia el atributo "name" al idioma deseado
          }
        }
      }
    }
  };
  const pdf = pdfMake.createPdf(pdfDefinition);
  pdf.open();
}*/

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

  createPdf() {
    const documentDefinition = {
      content: [
        { text: 'FECHA: ______/______/______', style: 'header' },
        { text: 'MUNICIPIO/DEPARTAMENTO: _________________', style: 'header' },
        { text: 'ASESOR: __________________', style: 'header' },
        { text: 'DURACIÓN ASESORÍA: _______________________', style: 'header' },
        { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
        '',
        {
        columns: [
          { text: 'CLASIFICACIÓN DE CLIENTE:', style: 'fieldHeader' },
          { text: 'EMPRENDEDOR: _______', style: 'fieldValue', margin: [20, 0] },
          { text: 'EMPRESARIO: _______', style: 'fieldValue', margin: [20, 0] }
        ]},
        { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
        '',
        {
          columns: [
            { text: 'NOMBRES Y APELLIDOS:', style: 'fieldHeader' },
            { text: 'No. DOCUMENTO/NIT:', style: 'fieldHeader', margin: [100, 0] }
          ]
        },
        { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
        '',
        {
          columns: [
            { text: 'GÉNERO:', style: 'fieldHeader' },
            { text: 'MASCULINO _____', style: 'fieldValue', margin: [20, 0] },
            { text: 'FEMENINO _____', style: 'fieldValue', margin: [20, 0] },
            { text: 'LGBTI ______', style: 'fieldValue', margin: [20, 0] }
          ]
        },
        { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
        '',
        'NOMBRE DE LA EMPRESA O IDEA DE NEGOCIO:',
        'PRODUCTO O SERVICIO A COMERCIALIZAR:',
        'No. CELULAR:       CORREO ELECTRÓNICO:',
        'DIRECCIÓN:',
        { canvas: [{ type: 'line', x1: 0, y1: 10, x2: 595 - 2 * 40, y2: 10 }] },
        '',
        '¿INTERESADO EN RECIBIR CORREOS ELECTRÓNICOS MASIVOS?:          SI ______       NO ______',
        'TEMA ABORDADO:',
        '',
        {
          text: 'Autorizo de manera expresa, libre y voluntaria a la CÁMARA DE COMERCIO DE VILLAVICENCIO (la “CCV”) para realizar el tratamiento de mis datos personales, especialmente los relativos a identificación personal, nombres y apellidos, números de teléfono y celular, correo electrónico, país de origen y en general toda la información solicitada para información de contacto emprendedor, las finalidades dispuestas en la Política de Tratamiento de Datos Personales a la que puede accederse en el siguiente link:',
          style: 'p'
        },
        {
          text: 'https://s3.pagegear.co/415/78/politica_de_tratamiento_de_datos_personales_2021_ccv.pdf',
          link: 'https://s3.pagegear.co/415/78/politica_de_tratamiento_de_datos_personales_2021_ccv.pdf',
          style: 'link'
        },
        {
          text: 'así como para el desarrollo de las funciones públicas que le han sido asignadas y demás actividades complementarias y ser informado de nuevas jornadas, eventos y/o espacios de formación que adelanta la Cámara, divulgación de la oferta académica y evaluación de los servicios de la Cámara. Reconozco y acepto que la CCV me informó que en caso de que se soliciten datos personales sensibles, la entrega de estos es meramente facultativa y no estoy obligado a entregarlos.',
          style: 'p'
        },
        {
          text: 'Reconozco que se me fue informado que, como titular de mis datos personales, tengo derecho a conocer, actualizar y rectificar mis datos personales, solicitar prueba de la autorización otorgada para su tratamiento, ser informado sobre el uso que se ha dado a los mismos, presentar quejas ante la Superintendencia de Industria y Comercio por infracción a la ley, revocar la autorización y/o solicitar la supresión de mis datos en los casos que sea procedente y acceder en forma gratuita a los mismos. De igual manera, se me indicó que puedo ejercer mis derechos como titular de mis datos personales a través de los canales dispuestos en la Política de Tratamiento de Datos Personales o a través del correo electrónico datospersonales@ccv.org.co.',
          style: 'p'
        }
      ],
      styles: {
        header: {
          bold: true,
          fontSize: 12
        },
        p: {
          fontSize: 10,
          margin: [0, 10]
        },
        link: {
          fontSize: 10,
          color: 'blue',
          margin: [0, 10],
          decoration: 'underline'
        }
      }
    };

    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();
  }


}

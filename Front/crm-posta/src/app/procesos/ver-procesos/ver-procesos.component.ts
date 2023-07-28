import { Component, OnInit } from '@angular/core';
import { Process } from '../Process';
import { ActivatedRoute } from '@angular/router';
import { ProcesoService } from '../proceso.service';
import { Client } from 'src/app/client/client';
import { ClientService } from 'src/app/client/client.service';
import { ModalService } from 'src/app/client/modal.service';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import { HttpHeaders, HttpClient } from '@angular/common/http';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-ver-procesos',
  templateUrl: './ver-procesos.component.html',
  styleUrls: ['./ver-procesos.component.css']
})
export class VerProcesosComponent implements OnInit {
  client: Client = new Client;
  procesoSeleccionado: Process;
  proceso: Process = new Process();
  procesos: Process[];
  valor: boolean = false;
  bool1: boolean = false;
  idVer: number;
  imageUrl = "/assets/camaraHD.jpg";
  constructor(
    private rutaPorParametro: ActivatedRoute,
    private procesoService: ProcesoService,
    private clienteService: ClientService,
    private http:HttpClient,
    public modalService: ModalService) { }

  ngOnInit(): void {
    this.rutaPorParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      this.idVer = +parametro.get('idVer')
      if (this.idVer) {
        this.procesoService.procesosFindById(this.idVer).subscribe(proce => {
          this.proceso = proce;
          this.client = this.proceso?.canvasModel?.client;
        })
      }
      if (id) {
        this.procesoService.procesosFindById(id).subscribe(data => {
          this.proceso = data;
          console.log(this.proceso);
          this.clienteService.getClient(this.proceso?.canvasModel?.client?.id).subscribe(data => {
            this.client = data;
          })

        })
      }
    })
  }


  public abrirAesoria() {
    this.modalService.abrirModalAsesoria();
  }

  public abrirVerMasSegmento(proceso: Process, bool: boolean) {
    this.bool1 = bool;
    this.procesoSeleccionado = proceso;
    this.modalService.abrirVerMas();
  }


  public abrirVerMasPropuesta(proceso: Process, bool: boolean) {
    this.bool1 = bool;
    this.procesoSeleccionado = proceso;
    this.modalService.abrirVerMas1();
  }


  public abrirVerMasCanales(proceso: Process, bool: boolean) {
    this.bool1 = bool;
    this.procesoSeleccionado = proceso;
    this.modalService.abrirVerMas2();
  }


  public abrirVerMasRelaciones(proceso: Process, bool: boolean) {
    this.bool1 = bool;
    this.procesoSeleccionado = proceso;
    this.modalService.abrirVerMas3();
  }


  public abrirVerMasRecursosClaves(proceso: Process, bool: boolean) {
    this.bool1 = bool;
    this.procesoSeleccionado = proceso;
    this.modalService.abrirVerMas4();
  }


  public abrirVerMasActividadesClaves(proceso: Process, bool: boolean) {
    this.bool1 = bool;
    this.procesoSeleccionado = proceso;
    this.modalService.abrirVerMas5();
  }


  public abrirVerMasSociosClaves(proceso: Process, bool: boolean) {
    this.bool1 = bool;
    this.procesoSeleccionado = proceso;
    this.modalService.abrirVerMas6();
  }


  public abrirVerMasIngresos(proceso: Process, bool: boolean) {
    this.bool1 = bool;
    this.procesoSeleccionado = proceso;
    this.modalService.abrirVerMas7();
  }


  public abrirVerMasEstructuraCostos(proceso: Process, bool: boolean) {
    this.bool1 = bool;
    this.procesoSeleccionado = proceso;
    this.modalService.abrirVerMas8();
  }



  convertImageToBase64(imageUrl: string): Promise<string> {
    return this.http.get(imageUrl, { responseType: 'blob' })
      .toPromise()
      .then((blob: Blob) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      });
  }


  imprimirSegmento() {

    this.convertImageToBase64(this.imageUrl).then(base64 => {
      const documentDefinition = {
        content: [
          {
            image: base64,
            width: 129, // Ancho de la imagen en el PDF
            height: 106, // Alto de la imagen en el PDF
            margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
            // Márgenes de la imagen en el PDF
          },

          // ... Estilos y otras configuraciones ...

          /*     SEGMENTO DE CLIENTES     */
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'SEGMENTO DE CLIENTES', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'DEMOGRAFICAS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.customerSegments.demograficas , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'GEOGRAFICAS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.customerSegments.geograficas , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'PSICOGRAFICAS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.customerSegments.psicograficas , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'COMPORTAMIENTO:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.customerSegments.comportanmiento , style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },
        ],
        styles: {
          header: {
            bold: true,
            fontSize: 12,
          },
          thisText: {
            bold: true,
            color: 'dark'
          },
          fieldValue: {
            fontSize: 10,
            margin: [5, 0]
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
          },
          fieldHeader: {
            fontSize: 10,
            bold: true,
            margin: [0, 5]
          }
        }
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();

    })
  }



  imprimirPropuesta() {

    this.convertImageToBase64(this.imageUrl).then(base64 => {
      const documentDefinition = {
        content: [
          {
            image: base64,
            width: 129, // Ancho de la imagen en el PDF
            height: 106, // Alto de la imagen en el PDF
            margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
            // Márgenes de la imagen en el PDF
          },

          // ... Estilos y otras configuraciones ...

          /*     SEGMENTO DE CLIENTES     */
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'PROPUESTA DE VALOR', style: ['thisText', 'header'] }
                ]
              ]
            }
          },

          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'PORPUESTA DE VALOR:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.valuePropositions.proposition, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },
        ],
        styles: {
          header: {
            bold: true,
            fontSize: 12,
          },
          thisText: {
            bold: true,
            color: 'dark'
          },
          fieldValue: {
            fontSize: 10,
            margin: [5, 0]
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
          },
          fieldHeader: {
            fontSize: 10,
            bold: true,
            margin: [0, 5]
          }
        }
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();

    })
  } 



  imprimirCanales() {

    this.convertImageToBase64(this.imageUrl).then(base64 => {
      const documentDefinition = {
        content: [
          {
            image: base64,
            width: 129, // Ancho de la imagen en el PDF
            height: 106, // Alto de la imagen en el PDF
            margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
            // Márgenes de la imagen en el PDF
          },

          // ... Estilos y otras configuraciones ...

          /*     SEGMENTO DE CLIENTES     */
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'CANALES', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'INFORMACION:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.channels.informacion , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'EVALUACION:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.channels.evaluacion , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'COMPRA:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.channels.compra, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'ENTREGA:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.channels.entrega , style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'POSTVENTA:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.channels.postVenta , style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },
        ],
        styles: {
          header: {
            bold: true,
            fontSize: 12,
          },
          thisText: {
            bold: true,
            color: 'dark'
          },
          fieldValue: {
            fontSize: 10,
            margin: [5, 0]
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
          },
          fieldHeader: {
            fontSize: 10,
            bold: true,
            margin: [0, 5]
          }
        }
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();

    })
  }




  imprimirRelaciones() {

    this.convertImageToBase64(this.imageUrl).then(base64 => {
      const documentDefinition = {
        content: [
          {
            image: base64,
            width: 129, // Ancho de la imagen en el PDF
            height: 106, // Alto de la imagen en el PDF
            margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
            // Márgenes de la imagen en el PDF
          },

          // ... Estilos y otras configuraciones ...

          /*     SEGMENTO DE CLIENTES     */
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'RELACION CON CLIENTES', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'CAPTACION:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.customerRelationships.captacion, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'FIDELIZACION:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.customerRelationships.fidelizacion, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'ESTIMULACION:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.customerRelationships.estimulacion, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },
        ],
        styles: {
          header: {
            bold: true,
            fontSize: 12,
          },
          thisText: {
            bold: true,
            color: 'dark'
          },
          fieldValue: {
            fontSize: 10,
            margin: [5, 0]
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
          },
          fieldHeader: {
            fontSize: 10,
            bold: true,
            margin: [0, 5]
          }
        }
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();

    })
  }




  imprimirRecursosClaves() {

    this.convertImageToBase64(this.imageUrl).then(base64 => {
      const documentDefinition = {
        content: [
          {
            image: base64,
            width: 129, // Ancho de la imagen en el PDF
            height: 106, // Alto de la imagen en el PDF
            margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
            // Márgenes de la imagen en el PDF
          },

          // ... Estilos y otras configuraciones ...

          /*     SEGMENTO DE CLIENTES     */
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'RECURSOS CLAVES', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'RECURSOS HUMANOS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyRecources.recursosHumanos, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'RECURSOS FISICOS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyRecources.recursosFisicos, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'RECURSOS INTELECTUALES:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyRecources.recursosIntelectuales, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'RECURSOS TECNOLOGICOS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyRecources.recursosTecnologicos, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },
        ],
        styles: {
          header: {
            bold: true,
            fontSize: 12,
          },
          thisText: {
            bold: true,
            color: 'dark'
          },
          fieldValue: {
            fontSize: 10,
            margin: [5, 0]
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
          },
          fieldHeader: {
            fontSize: 10,
            bold: true,
            margin: [0, 5]
          }
        }
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();

    })
  }




  imprimirActividadesClaves() {

    this.convertImageToBase64(this.imageUrl).then(base64 => {
      const documentDefinition = {
        content: [
          {
            image: base64,
            width: 129, // Ancho de la imagen en el PDF
            height: 106, // Alto de la imagen en el PDF
            margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
            // Márgenes de la imagen en el PDF
          },

          // ... Estilos y otras configuraciones ...

          /*     SEGMENTO DE CLIENTES     */
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'ACTIVIDADES CLAVES', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'ACTIVIDAD PRINCIPAL:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyActivities.actividadPrincipal, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'PRESTACION SERVICIO:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyRecources.recursosFisicos, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'COMUNICACION MARKETING:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyRecources.recursosIntelectuales, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'POSTVENTA:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyRecources.recursosTecnologicos, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },
        ],
        styles: {
          header: {
            bold: true,
            fontSize: 12,
          },
          thisText: {
            bold: true,
            color: 'dark'
          },
          fieldValue: {
            fontSize: 10,
            margin: [5, 0]
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
          },
          fieldHeader: {
            fontSize: 10,
            bold: true,
            margin: [0, 5]
          }
        }
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();

    })
  }

        



  imprimirSociosClaves() {

    this.convertImageToBase64(this.imageUrl).then(base64 => {
      const documentDefinition = {
        content: [
          {
            image: base64,
            width: 129, // Ancho de la imagen en el PDF
            height: 106, // Alto de la imagen en el PDF
            margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
            // Márgenes de la imagen en el PDF
          },

          // ... Estilos y otras configuraciones ...

          /*     SEGMENTO DE CLIENTES     */
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'SOCIOS CLAVES', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'PROVEEDORES:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyPartners.proveedores, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'ENTIDADES PUBLICAS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyPartners.entidadesPublicas, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'ENTIDADES PRIVADAS:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyPartners.entidadesPrivadas, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'ACADEMIA:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.keyPartners.academia, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },
        ],
        styles: {
          header: {
            bold: true,
            fontSize: 12,
          },
          thisText: {
            bold: true,
            color: 'dark'
          },
          fieldValue: {
            fontSize: 10,
            margin: [5, 0]
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
          },
          fieldHeader: {
            fontSize: 10,
            bold: true,
            margin: [0, 5]
          }
        }
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();

    })
  }
         



  imprimirIngresos() {

    this.convertImageToBase64(this.imageUrl).then(base64 => {
      const documentDefinition = {
        content: [
          {
            image: base64,
            width: 129, // Ancho de la imagen en el PDF
            height: 106, // Alto de la imagen en el PDF
            margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
            // Márgenes de la imagen en el PDF
          },

          // ... Estilos y otras configuraciones ...

          /*     SEGMENTO DE CLIENTES     */
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#',  },
                  { text: 'INGRESOS', style: ['thisText', 'header'] }
                ]
              ]
            }
          },
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: 'CAPITAL PROPIO:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.revenueStreams.capitalPorpio, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'CAPITAL PRESTAMO:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.revenueStreams.capitalPrestamo, style: ['thisText', 'fieldHeader'] }
                ],
                [
                  { text: 'CANALES PAGO:', style: 'fieldHeader' },
                  { text: this.proceso.canvasModel.revenueStreams.canalesPago, style: ['thisText', 'fieldHeader'] }
                ],
              ]
            }
          },
        ],
        styles: {
          header: {
            bold: true,
            fontSize: 12,
          },
          thisText: {
            bold: true,
            color: 'dark'
          },
          fieldValue: {
            fontSize: 10,
            margin: [5, 0]
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
          },
          fieldHeader: {
            fontSize: 10,
            bold: true,
            margin: [0, 5]
          }
        }
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();

    })
  }




  imprimirCostoEstructura() {

    this.convertImageToBase64(this.imageUrl).then(base64 => {
      const documentDefinition = {
        content: [
          {
            image: base64,
            width: 129, // Ancho de la imagen en el PDF
            height: 106, // Alto de la imagen en el PDF
            margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
            // Márgenes de la imagen en el PDF
          },

          // ... Estilos y otras configuraciones ...

          /*     SEGMENTO DE CLIENTES     */
          {
            table: {
              layout: 'noBorders', // <-- Eliminar los bordes de la tabla
              widths: ['auto', '*'],
              body: [
                [
                  { text: '#', style: '' },
                  { text: 'ESTRUCTURA COSTOS // COSTOS VARIABLES', style:['thisText', 'header'] },
                ]
              ]
            }
          },
          {
          table: {
            headerRows: 1,
            widths: ['*', '*'],
            body: [
              // Encabezado de la tabla de frutas
              [
                { text: 'NOMBRE', style: '' },
                { text: 'MONTO', style: 'tableHeader' },
              ],
              // Contenido de la tabla de frutas (iteración sobre la lista de frutas)
              ...this.proceso.canvasModel.costStructure.costosVariables.map(fruta => [
                fruta.nameComponent,
                fruta.amount.toLocaleString('en-US', {
                  style: 'currency', currency: 'USD' })
              ])
            ]
          }
        },


        {
          table: {
            layout: 'noBorders', // <-- Eliminar los bordes de la tabla
            widths: ['auto', '*'],
            body: [
              [
                { text: '#', style: '' },
                { text: 'ESTRUCTURA COSTOS // COSTOS FIJOS', style:['thisText', 'header'] },
              ]
            ]
          }
        },
        {
        table: {
          headerRows: 1,
          widths: ['*', '*'],
          body: [
            // Encabezado de la tabla de frutas
            [
              { text: 'NOMBRE', style: '' },
              { text: 'MONTO', style: 'tableHeader' },
            ],
            // Contenido de la tabla de frutas (iteración sobre la lista de frutas)
            ...this.proceso.canvasModel.costStructure.costosFijos.map(fruta => [
              fruta.nameComponent,
              fruta.amount.toLocaleString('en-US', {
                style: 'currency', currency: 'USD' })
            ])
          ]
        }
      },
      {
        table: {
          layout: 'noBorders', // <-- Eliminar los bordes de la tabla
          widths: ['auto', '*'],
          body: [
            [
              { text: '#',  },
              { text: 'ESTRUCTURA COSTOS // TOTALES', style: ['thisText', 'header'] }
            ]
          ]
        }
      },
      {
        table: {
          layout: 'noBorders', // <-- Eliminar los bordes de la tabla
          widths: ['auto', '*'],
          body: [
            [
              { text: 'TOTAL COSTOS VARIABLES:', style: 'fieldHeader' },
              { text: this.proceso.canvasModel.costStructure.totalCostosVariables.toLocaleString('en-US', {
                style: 'currency', currency: 'USD' }), style: ['thisText', 'fieldHeader'] }
            ],
            [
              { text: 'TOTAL COSTOS FIJOS:', style: 'fieldHeader' },
              { text: this.proceso.canvasModel.costStructure.totalCostosFijos.toLocaleString('en-US', {
                style: 'currency', currency: 'USD' }), style: ['thisText', 'fieldHeader'] }
            ],
            [
              { text: 'TOTAL DE COSTOS:', style: 'fieldHeader' },
              { text: this.proceso.canvasModel.costStructure.totalCostos.toLocaleString('en-US', {
                style: 'currency', currency: 'USD' }), style: ['thisText', 'fieldHeader'] }
            ],
          ]
        }
      },
        ],
        styles: {
          header: {
            bold: true,
            fontSize: 12,
          },
          thisText: {
            bold: true,
            color: 'dark'
          },
          fieldValue: {
            fontSize: 10,
            margin: [5, 0]
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
          },
          fieldHeader: {
            fontSize: 10,
            bold: true,
            margin: [0, 5]
          }
        }
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();

    })
  }


          /*   ESTRUCTURA COSTOS    */
      /*    {
            image: base64,
            width: 129, // Ancho de la imagen en el PDF
            height: 106, // Alto de la imagen en el PDF
            margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
            // Márgenes de la imagen en el PDF
          },
          
          
        ],
        styles: {
          header: {
            bold: true,
            fontSize: 12,
          },
          thisText: {
            bold: true,
            color: 'dark'
          },
          fieldValue: {
            fontSize: 10,
            margin: [5, 0]
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
          },
          fieldHeader: {
            fontSize: 10,
            bold: true,
            margin: [0, 5]
          }
        }
      };
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      pdfMake.createPdf(documentDefinition).open();

    })
  }*/

}

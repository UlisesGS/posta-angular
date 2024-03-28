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
import { PdfServiceService } from 'src/app/client/detalles/pdf-service.service';

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
    public modalService: ModalService,
    private pdfServ:PdfServiceService) { }

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


  generarClientes(id: number) {
    this.pdfServ.generarClientes(id).subscribe(
      (data: Blob) => {
        // Maneja la respuesta del servicio
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Abre el PDF en una nueva ventana o pestaña
      },
      (error) => {
        // Maneja errores, si los hay
        console.error('Error al generar el informe:', error);
      }
    );
  }

  generarValor(id: number) {
    this.pdfServ.generarValor(id).subscribe(
      (data: Blob) => {
        // Maneja la respuesta del servicio
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Abre el PDF en una nueva ventana o pestaña
      },
      (error) => {
        // Maneja errores, si los hay
        console.error('Error al generar el informe:', error);
      }
    );
  }

  generarCanales(id: number) {
    this.pdfServ.generarCanales(id).subscribe(
      (data: Blob) => {
        // Maneja la respuesta del servicio
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Abre el PDF en una nueva ventana o pestaña
      },
      (error) => {
        // Maneja errores, si los hay
        console.error('Error al generar el informe:', error);
      }
    );
  }

  generarRelaciones(id: number) {
    this.pdfServ.generarRelaciones(id).subscribe(
      (data: Blob) => {
        // Maneja la respuesta del servicio
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Abre el PDF en una nueva ventana o pestaña
      },
      (error) => {
        // Maneja errores, si los hay
        console.error('Error al generar el informe:', error);
      }
    );
  }

  generarRecursos(id: number) {
    this.pdfServ.generarRecursos(id).subscribe(
      (data: Blob) => {
        // Maneja la respuesta del servicio
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Abre el PDF en una nueva ventana o pestaña
      },
      (error) => {
        // Maneja errores, si los hay
        console.error('Error al generar el informe:', error);
      }
    );
  }

  generarActividades(id: number) {
    this.pdfServ.generarActividades(id).subscribe(
      (data: Blob) => {
        // Maneja la respuesta del servicio
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Abre el PDF en una nueva ventana o pestaña
      },
      (error) => {
        // Maneja errores, si los hay
        console.error('Error al generar el informe:', error);
      }
    );
  }

  generarSocios(id: number) {
    this.pdfServ.generarSocios(id).subscribe(
      (data: Blob) => {
        // Maneja la respuesta del servicio
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Abre el PDF en una nueva ventana o pestaña
      },
      (error) => {
        // Maneja errores, si los hay
        console.error('Error al generar el informe:', error);
      }
    );
  }

  generarIngresos(id: number) {
    this.pdfServ.generarIngresos(id).subscribe(
      (data: Blob) => {
        // Maneja la respuesta del servicio
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // Abre el PDF en una nueva ventana o pestaña
      },
      (error) => {
        // Maneja errores, si los hay
        console.error('Error al generar el informe:', error);
      }
    );
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

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { Process } from 'src/app/procesos/Process';
import { ModalService } from '../modal.service';
import { ImagenService } from './imagen.service';
import { PdfServiceService } from './pdf-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {
  cliente: Client = new Client();
  procesos: Process[];
  proceso: Process = new Process();
  procesoSeleccionado: Process;

  autoB: string;
  canvasB: string;
  negociosB: string;
  financieroB: string;

  tipoVer: string;

  compromiso: boolean = false;
  encuesta: boolean = false;
  cierre: boolean = false;
  impacto:boolean=false;

  existeCompromiso=false;
  existeEncuesta=false;
  existeCierre=false;
  existeImpacto=false;

  constructor(
    private procesoService: ProcesoService,
    private rutaParametro: ActivatedRoute,
    private clienteService: ClientService,
    public modalService: ModalService,
    public imagenService: ImagenService,
    public pdfService:PdfServiceService,
  ) { }

  file: File | null = null;
  imageUrl: string | null = null;
  imageUrlEncuesta: string | null = null;
  imageUrlCierre: string | null = null;
  imageUrlImpacto: string | null = null;

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  uploadImage() {
    if (!this.file) {
      return; // Si no hay archivo seleccionado, sal del método
    }
    console.log(this.proceso.id);
    
    this.imagenService.uploadImage(this.file, this.proceso.id).subscribe(
      (response) => {
        console.log(response);
        console.log("Cargo");
        window.location.reload();
        
        // Maneja la respuesta del backend
      },
      (error) => {
        console.error(error); // Maneja el error, si ocurre
        console.log("Error");
        window.location.reload();
        
      },
      () => {
        window.location.reload(); // Recarga la página después de completar la carga
      }
    );
  }
 
  downloadFile() {
    this.imagenService.downloadFile(this.proceso.id).subscribe(
      response => {
        // Crear una URL para el Blob
        const downloadUrl = window.URL.createObjectURL(response);

        // Crear un enlace <a> para descargar el archivo
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'documento'; // Cambia 'documento' por el nombre deseado del archivo
        document.body.appendChild(link);
        link.click();

        // Limpiar la URL creada para el Blob
        window.URL.revokeObjectURL(downloadUrl);
      },
      error => {
        console.error('Error al descargar el archivo:', error);
      }
    );
  }
 


  uploadImageEncuesta() {
    if (!this.file) {
      return; // Si no hay archivo seleccionado, sal del método
    }
    
      this.imagenService.uploadImageEncuesta(this.file, this.proceso.id).subscribe(
        (response) => {
          console.log(response);
          console.log("Cargo");
          window.location.reload();
          
          // Maneja la respuesta del backend
        },
        (error) => {
          console.error(error); // Maneja el error, si ocurre
          console.log("Error");
          window.location.reload();
          
        },
        () => {
          window.location.reload(); // Recarga la página después de completar la carga
        }
      );
  }
  
  downloadEncuesta() {
    this.imagenService.downloadEncuesta(this.proceso.id).subscribe(
      response => {
        // Crear una URL para el Blob
        const downloadUrl = window.URL.createObjectURL(response);

        // Crear un enlace <a> para descargar el archivo
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'documento'; // Cambia 'documento' por el nombre deseado del archivo
        document.body.appendChild(link);
        link.click();

        // Limpiar la URL creada para el Blob
        window.URL.revokeObjectURL(downloadUrl);
      },
      error => {
        console.error('Error al descargar el archivo:', error);
      }
    );
  }

  uploadImageCierre() {
    if (this.file) {
      this.imagenService.uploadImageCierre(this.file, this.proceso.id).subscribe(
        (response:any) => {
          this.proceso.fechaFinalizacion=new Date();
          this.proceso.terminado=true;
          this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
            Swal.fire('Éxito','Proceso Terminado', 'success').then(() => {
              window.location.reload();
            });
          })
          console.log(response);
          //window.location.reload();
           // Maneja la respuesta del backend
        },
        (error) => {
          console.error(error);
          this.proceso.fechaFinalizacion=new Date();
          this.proceso.terminado=true;
          this.procesoService.procesosUpdate(this.proceso).subscribe(pro=>{
            Swal.fire('Éxito','Proceso Terminado', 'success').then(() => {
              window.location.reload();
            });
          }) // Maneja el error, si ocurre
        }
      );
    }
   
  }

  downloadCierre() {
    this.imagenService.downloadCierre(this.proceso.id).subscribe(
      response => {
        // Crear una URL para el Blob
        const downloadUrl = window.URL.createObjectURL(response);

        // Crear un enlace <a> para descargar el archivo
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'documento'; // Cambia 'documento' por el nombre deseado del archivo
        document.body.appendChild(link);
        link.click();

        // Limpiar la URL creada para el Blob
        window.URL.revokeObjectURL(downloadUrl);
      },
      error => {
        console.error('Error al descargar el archivo:', error);
      }
    );
  }
  uploadImageImpacto() {
    if (!this.file) {
      return; // Si no hay archivo seleccionado, sal del método
    }
      this.imagenService.uploadImageImpacto(this.file, this.proceso.id).subscribe(
        (response) => {
          console.log(response);
          console.log("Cargo");
          window.location.reload();
          
          // Maneja la respuesta del backend
        },
        (error) => {
          console.error(error); // Maneja el error, si ocurre
          console.log("Error");
          window.location.reload();
          
        },
        () => {
          window.location.reload(); // Recarga la página después de completar la carga
        }
      );
    }
    
  
 
    downloadImpacto() {
      this.imagenService.downloadImpacto(this.proceso.id).subscribe(
        response => {
          // Crear una URL para el Blob
          const downloadUrl = window.URL.createObjectURL(response);
  
          // Crear un enlace <a> para descargar el archivo
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = 'documento'; // Cambia 'documento' por el nombre deseado del archivo
          document.body.appendChild(link);
          link.click();
  
          // Limpiar la URL creada para el Blob
          window.URL.revokeObjectURL(downloadUrl);
        },
        error => {
          console.error('Error al descargar el archivo:', error);
        }
      );
    }
  

  ngOnInit(): void {
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          this.procesoService.procesosFindAll().subscribe(pro => {
            this.procesos = pro;

            this.procesos.forEach(proceso => {
              if (proceso?.canvasModel?.client?.id == this.cliente.id) {
                this.proceso = proceso;
                console.log(this.proceso);
                
                if (this.proceso.documentoCompromiso) {
                  this.existeCompromiso=true;
                }
                if (this.proceso.encuestaSatisfaccion) {
                  this.existeEncuesta=true;
                }
                if (this.proceso.actaCierre) {
                  this.existeCierre=true;
                }
              }else 
              if (proceso?.processEmpresario?.client?.id == this.cliente.id) {
                this.proceso = proceso;
                
                if (this.proceso.documentoCompromiso) {
                  this.existeCompromiso=true;
                }
                if (this.proceso.encuestaSatisfaccion) {
                  this.existeEncuesta=true;
                }
                if (this.proceso.actaCierre) {
                  this.existeCierre=true;
                }
                if (this.proceso.impacto) {
                  this.existeImpacto=true;
                }

              }
              
            })
          })

        })
      }
    })
    console.log(this.proceso);
  }


  public abrirTestAuto(proceso: Process, autoB: string, canvasB: string, negociosB: string, financieroB: string, tipoVer: string) {

    this.tipoVer = tipoVer;
    this.autoB = autoB
    this.canvasB = canvasB
    this.negociosB = negociosB
    this.financieroB = financieroB
    this.procesoSeleccionado = proceso;
    this.modalService.abrirTestAuto();
  }

  public abrirEmpresarial(proceso: Process, autoB: string, canvasB: string, tipoVer: string) {

    this.tipoVer = tipoVer;
    this.autoB = autoB
    this.canvasB = canvasB
    this.procesoSeleccionado = proceso;
    this.modalService.abrirTestAuto();
  }




  imprimirActa() {
    const pdfUrl = 'assets/ActaCierreEmprendedor.pdf'; // Reemplaza con la ruta correcta a tu archivo PDF
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = pdfUrl;
    document.body.appendChild(iframe);

    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000); // Esperar un segundo antes de eliminar el iframe
  }

  imprimirCompromiso() {
    const pdfUrl = 'assets/CompromisoEmprendedor.pdf'; // Reemplaza con la ruta correcta a tu archivo PDF
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = pdfUrl;
    document.body.appendChild(iframe);

    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000); // Esperar un segundo antes de eliminar el iframe
  }
  imprimirEncuesta() {
    const pdfUrl = 'assets/EncuestaEmprendedor.pdf'; // Reemplaza con la ruta correcta a tu archivo PDF
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = pdfUrl;
    document.body.appendChild(iframe);

    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000); // Esperar un segundo antes de eliminar el iframe
  }
  imprimirImpacto() {
    const pdfUrl = 'assets/EncuestaImpacto.pdf'; // Reemplaza con la ruta correcta a tu archivo PDF
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = pdfUrl;
    document.body.appendChild(iframe);

    iframe.contentWindow?.focus();
    iframe.contentWindow?.print();

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000); // Esperar un segundo antes de eliminar el iframe
  }

  condicionCompromiso() {
    if (this.compromiso) {
      this.compromiso = false;
    } else {
      this.compromiso = true;
    }
  }
  condicionEncuesta() {
    if (this.encuesta) {
      this.encuesta = false;
    } else {
      this.encuesta = true;
    }
  }
  condicionCierre() {
    if (this.cierre) {
      this.cierre = false;
    } else {
      this.cierre = true;
    }
  }
  condicionImpacto() {
    if (this.impacto) {
      this.impacto = false;
    } else {
      this.impacto = true;
    }
  }


  imprimirPDF(){
    this.pdfService.generarInforme(this.cliente.id).subscribe((data: Blob) => {
      // Crear un objeto Blob con los datos recibidos
      const blob = new Blob([data], { type: 'application/pdf' });

      // Crear una URL temporal y descargar el archivo
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'informe.pdf';
      link.click();

      // Liberar la URL temporal creada
      window.URL.revokeObjectURL(url);
    },
    error => {
      console.error('Error al descargar el informe:', error);
    }
  );
      
  }

}

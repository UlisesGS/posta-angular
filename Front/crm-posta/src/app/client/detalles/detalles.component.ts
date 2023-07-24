import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcesoService } from 'src/app/procesos/proceso.service';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { Process } from 'src/app/procesos/Process';
import { ModalService } from '../modal.service';
import { ImagenService } from './imagen.service';

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

  autoB:string;
  canvasB:string;
  negociosB:string;
  financieroB:string;

  compromiso:boolean=false;
  encuesta:boolean=false;
  cierre:boolean=false;

  constructor(
    private procesoService: ProcesoService,
    private rutaParametro: ActivatedRoute,
    private clienteService: ClientService,
    public modalService: ModalService,
    public imagenService:ImagenService,
  ) { }

  file: File | null = null;
  imageUrl: string | null = null;
  imageUrlEncuesta: string | null = null;
  imageUrlCierre: string | null = null;

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  uploadImage() {
    if (this.file) {
      this.imagenService.uploadImage(this.file,this.proceso).subscribe(
        (response) => {
          console.log(response); // Maneja la respuesta del backend
        },
        (error) => {
          console.error(error); // Maneja el error, si ocurre
        }
      );
    }
  }
  getImageUrl() {
    this.imagenService.getImageBlob(this.proceso).subscribe(
      (blob) => {
        this.imageUrl = URL.createObjectURL(blob);
        console.log(this.imageUrl);
        
      },
      (error) => {
        console.error(error); // Maneja el error, si ocurre
      }
    );
  }

  uploadImageEncuesta() {
    if (this.file) {
      this.imagenService.uploadImageEncuesta(this.file,this.proceso).subscribe(
        (response) => {
          console.log(response); // Maneja la respuesta del backend
        },
        (error) => {
          console.error(error); // Maneja el error, si ocurre
        }
      );
    }
  }
  getImageUrlEncuesta() {
    this.imagenService.getImageBlobEncuesta(this.proceso).subscribe(
      (blob) => {
        this.imageUrlEncuesta = URL.createObjectURL(blob);
        console.log(this.imageUrl);
        
      },
      (error) => {
        console.error(error); // Maneja el error, si ocurre
      }
    );
  }

  uploadImageCierre() {
    if (this.file) {
      this.imagenService.uploadImageCierre(this.file,this.proceso).subscribe(
        (response) => {
          console.log(response); // Maneja la respuesta del backend
        },
        (error) => {
          console.error(error); // Maneja el error, si ocurre
        }
      );
    }
  }
  getImageUrlCierre() {
    this.imagenService.getImageBlobCierre(this.proceso).subscribe(
      (blob) => {
        this.imageUrlCierre = URL.createObjectURL(blob);
        console.log(this.imageUrl);
        
      },
      (error) => {
        console.error(error); // Maneja el error, si ocurre
      }
    );
  }



  ngOnInit(): void {
    this.rutaParametro.paramMap.subscribe(parametro => {
      let id = +parametro.get('id');
      if (id) {
        this.clienteService.getClient(id).subscribe(data => {
          this.cliente = data;
          console.log(data);
          this.procesoService.procesosFindAll().subscribe(pro => {
            this.procesos = pro;

            this.procesos.forEach(proceso => {
              
              if (proceso.canvasModel.client.id == this.cliente.id) {
                this.proceso = proceso;
                this.getImageUrl();
                this.getImageUrlCierre();
                this.getImageUrlEncuesta();
              }
            })
          })

        })
      }
    })
    
  }


  public abrirTestAuto(proceso: Process, autoB:string, canvasB:string, negociosB:string, financieroB:string) {


    this.autoB=autoB
    this.canvasB=canvasB
    this.negociosB=negociosB
    this.financieroB=financieroB
    this.procesoSeleccionado = proceso;
    console.log(this.autoB);
    console.log(this.canvasB);
    console.log(this.negociosB);
    console.log(this.financieroB);
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

  condicionCompromiso(){
    if(this.compromiso){
      this.compromiso=false;
    }else{
      this.compromiso=true;
    }
  }
  condicionEncuesta(){
    if(this.encuesta){
      this.encuesta=false;
    }else{
      this.encuesta=true;
    }
  }
  condicionCierre(){
    if(this.cierre){
      this.cierre=false;
    }else{
      this.cierre=true;
    }
  }

}


import { Component, OnInit } from '@angular/core';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import { Client } from '../client/client';
import { ClientService } from 'src/app/client/client.service';
pdfMake.vfs=pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
cliente:Client = new Client();
  constructor(private clientService:ClientService) { }

  ngOnInit() {

  }
  createPdf(){
    const pdfDefinition:any={
      content:[
        {
          text:'Hola mundo desde la biblioteca'
        }
      ]


  }
  const pdf=pdfMake.createPdf(pdfDefinition);
  pdf.open();
//descargar
//pdf.dowload();
}
}

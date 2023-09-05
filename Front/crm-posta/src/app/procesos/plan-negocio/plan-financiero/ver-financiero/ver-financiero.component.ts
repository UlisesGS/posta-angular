import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/client/client';

@Component({
  selector: 'app-ver-financiero',
  templateUrl: './ver-financiero.component.html',
  styleUrls: ['./ver-financiero.component.css']
})
export class VerFinancieroComponent implements OnInit {
  venta: boolean = false;
  compra: boolean = false;
  gasto: boolean = false;
  inversion: boolean = false;
  cliente: Client = new Client;
  constructor() {

  }

  ngOnInit(): void {

  }
  condicionVenta() {
    if (this.venta) {
      this.venta = false;
    } else {
      this.venta = true;
    }
  }
  condicionCompra() {
    if (this.compra) {
      this.compra = false;
    } else {
      this.compra = true;
    }
  }
  condicionGasto() {
    if (this.gasto) {
      this.gasto = false;
    } else {
      this.gasto = true;
    }
  }
  condicionInversion() {
    if (this.inversion) {
      this.inversion = false;
    } else {
      this.inversion = true;
    }
  }

}

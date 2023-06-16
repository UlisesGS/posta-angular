import { Component } from '@angular/core';
import { Client } from '../client';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent {
  cliente:Client;

}

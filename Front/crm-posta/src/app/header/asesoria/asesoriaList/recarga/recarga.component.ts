import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recarga',
  templateUrl: './recarga.component.html',
  styleUrls: ['./recarga.component.css']
})
export class RecargaComponent implements OnInit{
  constructor(private router:Router){}

  ngOnInit(): void {
    this.router.navigate(['/asesorias'])
    
  }



}

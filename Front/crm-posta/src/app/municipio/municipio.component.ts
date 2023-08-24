import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.component.html'
})
export class MunicipioComponent implements OnInit{

  constructor(private route:Router){}

  ngOnInit(): void {
    this.route.navigate(["/clients"])
  }
}

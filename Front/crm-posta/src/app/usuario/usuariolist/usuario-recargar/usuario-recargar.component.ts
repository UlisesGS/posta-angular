import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-recargar',
  templateUrl: './usuario-recargar.component.html',
  styleUrls: ['./usuario-recargar.component.css']
})
export class UsuarioRecargarComponent {

  constructor(private router:Router){}

  ngOnInit(): void {
    this.router.navigate(['/usuarios'])
    
  }
}

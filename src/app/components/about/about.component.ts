import { Component } from '@angular/core';
import { HeaderData, HeaderService } from '../../services/header.services'; 

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],  // Add necessary imports here
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']  // Correct the typo here
})
export class AboutComponent {

  private uiData: HeaderData = {
    title: 'Sobre mi',
    subtitle: 'Esto es algo sobre mis gustos, pensamientos, jeje',
    thumbnail: 'https://concepto.de/wp-content/uploads/2015/03/paisaje-2-e1549600987975.jpg'
  };

  constructor(private headerService: HeaderService) {
    headerService.uiData.set(this.uiData);  // Set the header data
  }

}

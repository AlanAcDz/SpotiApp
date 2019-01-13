import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent {
  artistas: any[] = [];
  loading: boolean;
  error = false;
  mensajeError: string;
  constructor(private spotify: SpotifyService) { }
  buscar(termino: string) {
    this.loading = true;
    this.spotify.getArtistas(termino).subscribe((data: any) => {
      this.artistas = data;
      this.loading = false;
    }, errorService => {
      this.loading = false;
      this.error = true;
      this.mensajeError = errorService.error.error.message;
    });
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {
  artista: any = {};
  loading: boolean;
  topTracks: any[] = [];
  error = false;
  mensajeError: string;
  constructor(private route: ActivatedRoute,
              private spotify: SpotifyService) {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    }, errorService => {
      this.loading = false;
      this.error = true;
      this.mensajeError = errorService.error.error.message;
    });
  }
  getArtista(id: string) {
    this.spotify.getArtista(id).subscribe(artista => {
      this.artista = artista;
      this.loading = false;
    });
  }
  getTopTracks(id: string) {
    this.spotify.getTopTracks(id).subscribe(topTracks => {
      console.log(topTracks);
      this.topTracks = topTracks;
    });
  }
}

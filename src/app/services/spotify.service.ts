import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }
  getQuery(query: string) {
    const URL = `https://api.spotify.com/v1/${ query }`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQBzuGz6azoXMaodHuvgleVTTklEdkQR8tyx0DN4TasENGfEfTshx87UlrX7rRHRq3WCF76S94KWYytAMn8'
    });
    return this.http.get(URL, { headers });
  }
  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
               .pipe(map(data => data['albums'].items));
  }
  getArtistas(termino: string) {
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
               .pipe(map(data => data['artists'].items));
  }
  getArtista(id: string) {
    return this.getQuery(`artists/${ id }`);
  }
  getTopTracks(id: string) {
    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
               .pipe(map(data => data['tracks']));
  }
}

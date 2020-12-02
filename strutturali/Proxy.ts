type Categoria = number | string;
type Log = [Date, string]

class Video {

  constructor(public titolo: string, public durataMin: number, public categoria: Categoria) {}

  play(): void {
    console.log('play');
  };

  pause(): void {
    console.log('pause');
  };

  download(): string {
    return `un sacco di dati ${ this.titolo }`;
  }
}

interface LibreriaDiVideo {
  elencoVideo: Video[];

  addVideo(video: Video): void;

  downloadFirstVideoOccurence(categoria: Categoria): string;

  getFirstVideoOccurenceByCategoria(categoria: Categoria): Video | null;
}

/* --- */

class LibreriaEsterna implements LibreriaDiVideo {
  elencoVideo: Video[] = [];

  addVideo(video: Video): void {
    this.elencoVideo.push(video);
  }

  downloadFirstVideoOccurence(categoria: Categoria): string {
    console.log('scarico il video, dalla libreria esterna');
    return this.getFirstVideoOccurenceByCategoria(categoria).download();
  }

  getFirstVideoOccurenceByCategoria(categoria: Categoria): Video | null {
    for (let video of this.elencoVideo) {
      if (video.categoria === categoria) return video;
    }
  }
}


class LibreriaIntelligente implements LibreriaDiVideo {
  elencoVideo: Video[] = [];

  videoScaricati: Video[] = [];

  logs: Log[] = [];

  libreriaProxata: LibreriaDiVideo = new LibreriaEsterna();


  addVideo(video: Video): void {
    this.logs.push([new Date(), `aggiungo: ${ video.titolo }`]);
    this.libreriaProxata.addVideo(video);
  }

  downloadFirstVideoOccurence(categoria: Categoria): string {

    if (this.alreadyDownloaded(categoria)) {
      this.logs.push([new Date(), 'scarico video, ce l\'avevo già!']);
      return this.alreadyDownloaded(categoria).download();
    }

    this.logs.push([new Date(), 'scarico video, devo chiamare la libreria brutta']);
    const videoScaricato = this.libreriaProxata.getFirstVideoOccurenceByCategoria(categoria);
    this.videoScaricati.push(videoScaricato);
    return videoScaricato.download();
  }

  getFirstVideoOccurenceByCategoria(categoria: Categoria): Video | null {
    this.logs.push([new Date(), 'restituisco video']);
    return this.libreriaProxata.getFirstVideoOccurenceByCategoria(categoria);
  }

  alreadyDownloaded(categoria: Categoria): Video | null {
    for (let video of this.videoScaricati) {
      if (video.categoria === categoria) return video;
    }
  }

  printLogs(): void {
    this.logs.forEach(logItem => console.log(logItem));
  }
}

/* --- */

enum categorie {
  videogiochi,
  asmr
}

const laMiaLibreria = new LibreriaIntelligente();

laMiaLibreria.addVideo(new Video('Gioco 24ore a Minecraft Epico No click bait', 8, categorie.videogiochi));
laMiaLibreria.addVideo(new Video('Mi gratto la schiena, ti addormenterai sicuro', 74, categorie.asmr));

const ilMioVideo = laMiaLibreria.downloadFirstVideoOccurence(categorie.videogiochi);
console.log(ilMioVideo);

const unAltroVideo = laMiaLibreria.downloadFirstVideoOccurence(categorie.videogiochi);
console.log(unAltroVideo);

laMiaLibreria.printLogs();

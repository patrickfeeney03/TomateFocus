class VolumeSlider {
  constructor() {
    this.sliderThumb = document.querySelector('.slider-thumb');
    this.sliderTrack = document.querySelector('.slider-track');
    this.sliderContainer = document.querySelector('.slider-container');
    this.sliderBoundaries = document.querySelector('.slider-boundaries');

    // This variable will be used to know if the slider-thumb is being pressed:
    this.isDragging = false;

    // Si el movimiento está habilitado, se mueve mientras esté dentro de los límites:
    this.sliderBoundaries.addEventListener('mousemove', function(event) {
      // Si se está pulsando el thumb:
      if (this.isDragging) {
        this.updateSlider(event);
      }
    }.bind(this));
    // Evento para cuando se levanta el thumb.
    this.sliderBoundaries.addEventListener('mouseup', function() {
      this.isDragging = false;
    }.bind(this));
    // Si el mouse abandona los límites del slider se deja de poder mover:
    this.sliderBoundaries.addEventListener('mouseleave', function() {
      this.isDragging = false;
    }.bind(this));

    // Evento para cuando se pulsa en algún lugar del contenedor del slider:
    this.sliderContainer.addEventListener('mousedown', function(event) {
      this.updateSlider(event);
      this.isDragging = true;
    }.bind(this));
    // Si el movimiento está habilitado, se mueve mientras esté dentro de los límites:
    this.sliderContainer.addEventListener('mousemove', function(event) {
      // Si se está pulsando el thumb:
      if (this.isDragging) {
        this.updateSlider(event);
      }
    }.bind(this));

    // Evento para cuando se pulsa el thumb.
    this.sliderThumb.addEventListener('mousedown', function() {
      console.log("Se pulsa el thumb!")
      this.isDragging = true;
    }.bind(this));
    // Evento para cuando se levanta el thumb.
    this.sliderThumb.addEventListener('mouseup', function() {
      this.isDragging = false;
    }.bind(this));
  }

  updateSlider(event) {
    // Se calcula la altura del slider track a partir de la del contenedor:
    this.trackHeight = event.clientY - this.sliderContainer.getBoundingClientRect().top;

    // Si la altura del track es igual a mayor o igual a cero y es menor o igual a la altura del contenedor:
    if (this.trackHeight >= 24 &&  this.trackHeight <= this.sliderContainer.offsetHeight - 25) {
      // Se establece la altura del track:
      this.sliderTrack.style.height = this.trackHeight + 'px';
      // Se establece la posición del thumb:
      this.sliderThumb.style.top = this.trackHeight - (this.sliderThumb.offsetHeight / 2) + 'px';

      this.changeVolume();
    }
  }

  changeVolume() {
    // thumbPosition tiene valores de entre -1 y 200.
    let thumbPosition = parseInt(this.sliderThumb.style.top);
    console.log(this.trackHeight)
    let volumePercentage = 1 - (thumbPosition / this.trackHeight);
    volumePercentage = Math.max(0, Math.min(1, volumePercentage));

    musicPlayer.songBeingPlayed.volume = volumePercentage;
  }
}

class MusicPlayer {
    constructor() {
        this.song1 = document.querySelector(".music-player-song-1");
        this.song2 = document.querySelector(".music-player-song-2");
        this.song3 = document.querySelector(".music-player-song-3");
        this.song4 = document.querySelector(".music-player-song-4");

        this.songsList = [this.song1, this.song2, this.song3, this.song4];
        this.songBeingPlayed = this.songsList[0];
        this.songIsPlaying = false;

        this.playButton = document.querySelector(".music-player-play-and-pause-button");
        this.nextSongButton = document.querySelector(".music-next-song-button");
        this.previousSongButton = document.querySelector(".music-previous-song-button");

        this.playButton.addEventListener('click', () => {
            if (!this.songIsPlaying) {
              console.log("The song starts!");
              this.songBeingPlayed.play();
              this.songIsPlaying = true;
            } else {
              console.log("The song stops!");
              this.songBeingPlayed.pause();
              this.songIsPlaying = false;
            }
        });

        this.nextSongButton.addEventListener('click', () => {
          this.changeToNextSong();
        });

        this.previousSongButton.addEventListener('click', () => {
          this.changeToPreviousSong();
        });
    }

    changeToNextSong() {
      // Se detiene la canción que sonaba hasta ahora:
      this.songBeingPlayed.pause();
      this.songBeingPlayed.currentTime = 0;

      // Se obtiene el índice de la siguiente canción:
      const index = this.songsList.indexOf(this.songBeingPlayed);

      // Si el índice es igual o mayor al número de canciones existentes, se pone en marcha la primera:
      if (index >= this.songsList.length - 1) {
        this.songBeingPlayed = this.songsList[0];
        this.songBeingPlayed.play();
        console.log("Se cambia a la primera canción!")

        if (this.songIsPlaying) {
          this.songBeingPlayed.play();
        };
      } else {
        this.songBeingPlayed = this.songsList[index + 1];

        // Si estaba sonando otra canción:
        if (this.songIsPlaying) {
          this.songBeingPlayed.play();
        };
        console.log("Se cambia a la siguiente canción!")
      }
    }

    changeToPreviousSong() {
      // Se detiene la canción que sonaba hasta ahora:
      this.songBeingPlayed.pause();
      this.songBeingPlayed.currentTime = 0;

      // Se obtiene el índice de la siguiente canción:
      const index = this.songsList.indexOf(this.songBeingPlayed);

      // Si el índice es igual o menor a 0, se pone en marcha la última:
      if (index <= 0) {
        this.songBeingPlayed = this.songsList.pop();
        console.log("Se cambia a la última canción!")

        if (this.songIsPlaying) {
          this.songBeingPlayed.play();
        };

      } else {
        this.songBeingPlayed = this.songsList[index - 1];

        // Si estaba sonando otra canción:
        if (this.songIsPlaying) {
          this.songBeingPlayed.play();
        };
        console.log("Se cambia a la anterior canción!")
      }
    }
}

const volumeSlider = new VolumeSlider()
const musicPlayer = new MusicPlayer()
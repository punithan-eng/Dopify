
        var audio = document.getElementById('audio1');
        var Play = document.getElementById('play');
        var Stop = document.getElementById('stop');
        var Seek = document.getElementById('seek');
        var Rewind = document.getElementById('rewind');
        //functions to control audio
        Play.addEventListener('click', function(){
            audio.play();
        });
        Stop.addEventListener('click', function(){
            audio.pause();
        });
        Seek.addEventListener('click', function(){
            seekForward();
        });
        Rewind.addEventListener('click', function(){
            rewind();
        });
        
        //Console log messages for audio events
        audio.addEventListener('pause', function(e){
            console.log('Audio playback has been paused ...');
            console.log('Playback paused at : '+ e.target.currentTime +" seconds");
        }, false);
        audio.addEventListener('ended', function(e){
            console.log('Playback has ended');
        }, false);
        audio.addEventListener('volumechange', function(e){
            console.log("Volume has changed ...");
            console.log("Volume is now "+ e.target.volume);
        }, false);
        audio.addEventListener('playing', function(e){
            console.log('Audio playback has started ...');
            console.log('Playback started at : '+ e.target.currentTime +" seconds");
        }, false);
        audio.addEventListener('timeupdate', function(e){
            console.log('Current time of audio playback : '+ e.target.currentTime);
            var time = (e.target.currentTime/60).toFixed(2);
            var duration = e.target.currentTime%100;
            var remainDur = ((e.target.duration/60) - time).toFixed(2);

            document.getElementById('time').innerHTML = time;
            document.getElementById('duration').innerHTML = remainDur;
        });
        
        // Function to get the dominant color of an image
        function getDominantColor(imageUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                // Simple average color calculation (can be improved)
                let r = 0, g = 0, b = 0;
                for (let i = 0; i < data.length; i += 4) {
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                }

                const pixelCount = data.length / 4;
                r = Math.floor(r / pixelCount);
                g = Math.floor(g / pixelCount);
                b = Math.floor(b / pixelCount);

                resolve(`rgb(${r}, ${g}, ${b})`);
            };
            img.onerror = reject;
            img.src = imageUrl;
        });
    }

        // Set the background color of the bottom section dynamically
        getDominantColor('IMG_0252.PNG').then(color => {
            document.querySelector('#player').style.backgroundColor = color;
         }).catch(err => {
            console.error('Error getting dominant color:', err);
         });
        
        
         //Seek forward by 5 seconds
        function seekForward() {
            document.getElementById("audio1").currentTime += 5; 
            document.getElementById("audio1").play();
            console.log('Seeking forward by 5 seconds ...');
        };
        
        //Rewind at 0:00
        function rewind() {
            document.getElementById("audio1").currentTime = 0;
            document.getElementById("audio1").play();
            console.log('Rewinded to 0:00 ...');
        };
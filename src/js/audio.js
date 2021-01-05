const Queue = require("sync-queue");
class AudioPlayerSync {
    constructor() {
        this.queue = new Queue()
        this.langs = {
            ar: false,
            id: true,
        }
        this.playingID = null
    }
    reset() {
        this.queue.clear()
    }
    async playAudio(url,id='') {

        this.queue.place(async () => {

            var audio = new Audio();
            audio.src = url;
            audio.onplay = () => {
                console.log("play sync sound start");
                this.playingID = id
            }
            audio.onended = () => {
                this.queue.next();
            };
            try {
                await audio.play();
                console.log("play end");
                return true;
            } catch (e) {
                console.log("Error playing audio", e);
                console.log("url:", url);
                this.queue.next();
            }



        })


    }
    async playAudioID(id) {
        const urlaudio = "https://raw.githubusercontent.com/goer/quran-data/master/speech/id/" + id + ".mp3";
        this.playingID = id
        await this.playAudio(urlaudio,id)
    }
    async playAudioAR(id) {
        var pad = (n, width = 3, z = 0) => {
            return (String(z).repeat(width) + String(n)).slice(String(n).length);
        };

        var split_id = id.split("_");
        var surat_no = pad(split_id[0]);
        var ayat_no = pad(split_id[1]);

        var url =
            "https://raw.githubusercontent.com/semarketir/quranjson/master/source/audio/" +
            surat_no +
            "/" +
            ayat_no +
            ".mp3";

        console.log("audio:", url);
        await this.playAudio(url,id);
    }
    async playAllAudio(surats,index=0) {
        console.log("playAudioAll");
        for (;index<surats.length;index++) {
            var s = surats[index]
            console.log('s',s)
            if (this.langs.ar)
                await this.playAudioAR(s.id);
            if (this.langs.id)
                await this.playAudioID(s.id);
        }
    }
}

export { AudioPlayerSync }
var recorder = (function () {
 
    let recorder, stream;
 
    async function startRecording() {
        stream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: "screen" }
        });
        recorder = new MediaRecorder(stream);
 
        const chunks = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = e => {
            const completeBlob = new Blob(chunks, { type: "video/mp4" });
            console.log(URL.createObjectURL(completeBlob));
        };
 
        recorder.start();
    }
 
    function stopRecording() {
        recorder.stop();
        stream.getVideoTracks()[0].stop();
    }
 
    return {
        start: startRecording,
        stop: stopRecording
    }
})()

import axios from "axios";
import { AudioRecorder } from "react-audio-voice-recorder";

export default function RecordAnswer({ id }) {
  const addAudioElement = (blob) => {
    console.log(blob);
    const formData = new FormData();
    formData.append("file", blob, "answer");
    formData.append("id", id);
    axios.post("http://localhost:3000/answer", formData);
    // const url = URL.createObjectURL(blob);
    // const audio = document.createElement("audio");
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audio);
  };
  return (
    <AudioRecorder
      onRecordingComplete={addAudioElement}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }}
      downloadOnSavePress={true}
      downloadFileExtension="webm"
    />
  );
}

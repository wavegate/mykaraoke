import axios from "axios";
import { AudioRecorder } from "react-audio-voice-recorder";

export default function RecordAnswer({ id }) {
  const addAudioElement = (blob) => {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("id", id);
    axios.post("http://localhost:3000/answer", formData);
  };
  return (
    <AudioRecorder
      onRecordingComplete={addAudioElement}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }}
      downloadOnSavePress={false}
      downloadFileExtension="webm"
    />
  );
}

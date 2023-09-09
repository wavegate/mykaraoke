import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AudioRecorder } from "react-audio-voice-recorder";

export default function RecordAnswer({ id }) {
  const queryClient = useQueryClient();

  const addAudioElement = (blob) => {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("id", id);
    axios.post("http://localhost:3000/answer", formData).then(() => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    });
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

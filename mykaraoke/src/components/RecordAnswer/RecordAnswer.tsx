import { API_URL } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AudioRecorder } from "react-audio-voice-recorder";

interface IRecordAnswer {
  id: string;
}

export default function RecordAnswer({ id }: IRecordAnswer) {
  const queryClient = useQueryClient();

  const addAudioElement = (blob: Blob) => {
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("id", id);
    axios.post(`${API_URL}/answer`, formData).then(() => {
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

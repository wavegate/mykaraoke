import { jsx as _jsx } from "react/jsx-runtime";
import { API_URL } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AudioRecorder } from "react-audio-voice-recorder";
export default function RecordAnswer({ id }) {
    const queryClient = useQueryClient();
    const addAudioElement = (blob) => {
        const formData = new FormData();
        formData.append("file", blob);
        formData.append("id", id);
        axios.post(`${API_URL}/answer`, formData).then(() => {
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        });
    };
    return (_jsx(AudioRecorder, { onRecordingComplete: addAudioElement, audioTrackConstraints: {
            noiseSuppression: true,
            echoCancellation: true,
        }, downloadOnSavePress: false, downloadFileExtension: "webm" }));
}

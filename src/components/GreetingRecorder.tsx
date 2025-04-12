
import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

const GreetingRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      chunksRef.current = [];
      mediaRecorder.addEventListener('dataavailable', (e) => {
        chunksRef.current.push(e.data);
      });
      
      mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        
        // Stop all tracks from the stream
        stream.getTracks().forEach(track => track.stop());
      });
      
      mediaRecorder.start();
      setIsRecording(true);
      toast.info('Recording started...');
    } catch (err) {
      console.error('Error accessing microphone:', err);
      toast.error('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success('Recording completed!');
    }
  };

  const playAudio = () => {
    if (audioRef.current && recordedAudio) {
      setPlayingAudio(true);
      audioRef.current.play();
    }
  };

  const handleAudioEnded = () => {
    setPlayingAudio(false);
  };

  const saveGreeting = () => {
    // This would save the greeting to storage in a real app
    toast.success('Greeting saved successfully!');
  };

  return (
    <div className="p-4">
      <Card className="p-4 mb-4">
        <h3 className="font-medium mb-2">Custom Greeting</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Record a custom greeting for your callers
        </p>
        
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isRecording ? 'bg-red-500 animate-pulse-recording' : 'bg-muted'}`}>
            <Mic className={`h-8 w-8 ${isRecording ? 'text-white' : 'text-muted-foreground'}`} />
          </div>
        </div>
        
        <div className="flex justify-center gap-2">
          {isRecording ? (
            <Button variant="destructive" onClick={stopRecording}>
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
          ) : (
            <Button onClick={startRecording}>
              <Mic className="h-4 w-4 mr-2" />
              Record
            </Button>
          )}
          
          {recordedAudio && !isRecording && (
            <>
              <Button 
                variant="outline" 
                onClick={playAudio}
                disabled={playingAudio}
              >
                <Play className="h-4 w-4 mr-2" />
                Play
              </Button>
              
              <Button 
                variant="default" 
                onClick={saveGreeting}
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </>
          )}
        </div>
      </Card>
      
      {recordedAudio && (
        <audio 
          ref={audioRef}
          src={recordedAudio}
          onEnded={handleAudioEnded}
          className="hidden"
        />
      )}
    </div>
  );
};

export default GreetingRecorder;

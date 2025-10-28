import { Pause, Play, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

interface ReadAloudButtonProps {
  text: string;
  className?: string;
}

export function ReadAloudButton({ text, className }: ReadAloudButtonProps) {
  const { supported, speaking, paused, speak, pause, resume, stop } = useTextToSpeech();

  if (!supported) return null;

  const handleClick = () => {
    if (speaking && !paused) return pause();
    if (speaking && paused) return resume();
    return speak(text);
  };

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <Button variant="outline" size="sm" onClick={handleClick} className="rounded-full">
        {!speaking && <Volume2 className="h-4 w-4 mr-2" />}
        {speaking && !paused && <Pause className="h-4 w-4 mr-2" />}
        {speaking && paused && <Play className="h-4 w-4 mr-2" />}
        {!speaking ? "Read Aloud" : paused ? "Resume" : "Pause"}
      </Button>
      {speaking && (
        <Button variant="ghost" size="sm" onClick={stop} className="rounded-full">
          <Square className="h-4 w-4 mr-2" /> Stop
        </Button>
      )}
    </div>
  );
}

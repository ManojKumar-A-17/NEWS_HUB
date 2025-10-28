import { useEffect, useMemo, useRef, useState } from "react";

export function useTextToSpeech() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;

  const defaultVoice = useMemo(() => {
    if (!voices.length) return undefined;
    const en = voices.find((v) => v.lang?.toLowerCase().startsWith("en"));
    return en ?? voices[0];
  }, [voices]);

  useEffect(() => {
    if (!synth) return;

    function loadVoices() {
      const list = synth.getVoices();
      if (list && list.length) setVoices(list);
    }

    loadVoices();
    synth.onvoiceschanged = loadVoices;

    return () => {
      synth.onvoiceschanged = null;
      if (utteranceRef.current) {
        synth.cancel();
        utteranceRef.current = null;
      }
    };
  }, [synth]);

  function speak(
    text: string,
    opts?: { rate?: number; pitch?: number; volume?: number; voice?: SpeechSynthesisVoice }
  ) {
    if (!synth || !text?.trim()) return;

    // Stop current
    synth.cancel();
    setSpeaking(false);
    setPaused(false);

    const u = new SpeechSynthesisUtterance(text);
    u.voice = opts?.voice ?? defaultVoice ?? null;
    u.rate = opts?.rate ?? 1;
    u.pitch = opts?.pitch ?? 1;
    u.volume = opts?.volume ?? 1;

    u.onstart = () => setSpeaking(true);
    u.onend = () => {
      setSpeaking(false);
      setPaused(false);
      utteranceRef.current = null;
    };
    u.onerror = () => {
      setSpeaking(false);
      setPaused(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = u;
    synth.speak(u);
  }

  function pause() {
    if (!synth) return;
    if (synth.speaking && !synth.paused) {
      synth.pause();
      setPaused(true);
    }
  }

  function resume() {
    if (!synth) return;
    if (synth.paused) {
      synth.resume();
      setPaused(false);
    }
  }

  function stop() {
    if (!synth) return;
    synth.cancel();
    setSpeaking(false);
    setPaused(false);
    utteranceRef.current = null;
  }

  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  return { supported, voices, defaultVoice, speaking, paused, speak, pause, resume, stop };
}

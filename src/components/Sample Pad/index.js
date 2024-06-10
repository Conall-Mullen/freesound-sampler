"use client";
import React from "react";

export default function SamplePad({ sample }) {
  function playSample(event) {
    const audioPlayer = new Audio(sample);
    audioPlayer.play();
  }

  return (
    <>
      <button className="sample-pad" onClick={playSample}>
        {sample}
      </button>
    </>
  );
}

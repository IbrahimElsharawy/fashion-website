import React, { useState, useEffect } from "react";

const CountDownTimer = () => {
  const targetDate = new Date("April 30, 2024 00:00:00").getTime();
  const storedTimeRemaining = localStorage.getItem("timeRemaining");
  const initialTimeRemaining = storedTimeRemaining
    ? JSON.parse(storedTimeRemaining)
    : calculateTimeRemaining();
  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remainingTime = calculateTimeRemaining();
      setTimeRemaining(remainingTime);
      localStorage.setItem("timeRemaining", JSON.stringify(remainingTime));

      if (
        remainingTime.days === 0 &&
        remainingTime.hours === 0 &&
        remainingTime.minutes === 0 &&
        remainingTime.seconds === 0
      ) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      // Countdown is over
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <div className="grid grid-cols-4   gap-4">
      <div className="flex flex-col items-center border border-1 border-custom-border-color px-6">
        <span>{timeRemaining.days}</span>
        <span className="text-second-text-color">Days</span>
      </div>
      <div className="flex flex-col items-center border border-1 border-custom-border-color px-6">
        <span>{timeRemaining.hours}</span>
        <span className="text-second-text-color">hrs</span>
      </div>
      <div className="flex flex-col items-center border border-1 border-custom-border-color px-6">
        <span>{timeRemaining.minutes}</span>
        <span className="text-second-text-color">mins</span>
      </div>
      <div className="flex flex-col items-center border border-1 border-custom-border-color px-6">
        <span>{timeRemaining.seconds}</span>
        <span className="text-second-text-color">secs</span>
      </div>
    </div>
  );
};

export default CountDownTimer;

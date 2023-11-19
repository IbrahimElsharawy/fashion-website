import React, { useState, useEffect } from "react";

const CountDownTimer = () => {
  const targetDate = new Date("January 27, 2024 00:00:00").getTime();
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

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
      <div className="flex flex-col  items-center border border-1  border-custom-border-color px-6  ">
        <span>{timeRemaining.days}</span>
        <span className="text-second-text-color">Days</span>
      </div>
      <div className="flex flex-col  items-center border border-1  border-custom-border-color px-6">
        <span>{timeRemaining.hours}</span>

        <span className="text-second-text-color">hrs</span>
      </div>
      <div className="flex flex-col  items-center border border-1  border-custom-border-color px-6">
        <span> {timeRemaining.minutes}</span>
        <span className="text-second-text-color">mins</span>
      </div>

      <div className="flex flex-col  items-center border border-1  border-custom-border-color px-6">
        <span>{timeRemaining.seconds}</span>
        <span className="text-second-text-color">secs</span>
      </div>
    </div>
  );
};

export default CountDownTimer;
"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const rounter = useRouter();

  const handleSumbit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = inputRef.current?.value;
    console.log(username);
    rounter.push(`/${username}`);
  };
  return (
    <div className="flex flex-col justify-center w-screen h-screen items-center align-middle bg-[#24292e]">
      <h1 className="text-lg">Greeting Which Profile are we looking for?</h1>
      <form className="flex flex-col" onSubmit={handleSumbit}>
        <input
          className="max-h-[20px] outline-none p-5 text-center"
          type="text"
          placeholder="Insert username here"
          ref={inputRef}
          required
        ></input>
        <input className="max-h-[20px] outline-none" type="submit"></input>
      </form>
    </div>
  );
}

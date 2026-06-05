"use client";
import React, { useEffect, useRef, useState } from "react";
import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import Image from "next/image";

type Repo = RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"];

export function Repository({ data }: { data: Repo }) {
  const [repositoryName, setRepositoryName] = useState<string | null>(null);
  const [repositoryLink, setRepositoryLink] = useState<string | undefined>(
    undefined,
  );

  const triggerContent = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const repositories = data.map((info) => (
    <button
      key={info.id}
      onClick={() => {
        setRepositoryName(info.name);
        setRepositoryLink(info.html_url);

        dialogRef.current?.close();
      }}
    >
      <p className="text-white">{info.name}</p>
    </button>
  ));

  const emptyContainer = <p>Click to Select</p>;
  const container = (
    <>
      <Image src={"./book.svg"} alt="Book.png" width={50} height={50}></Image>
      <a
        href={repositoryLink}
        target="_blank"
        rel="noopener noreferrer"
        className="pt-1"
      >
        {repositoryName?.slice(0, 15)}
      </a>
    </>
  );

  useEffect(() => {
    const listenToTrigger = (event: MouseEvent) => {
      const target = event.target as Node;
      if (triggerContent.current?.contains(target)) {
        if (dialogRef.current?.open) {
          dialogRef.current.close();
        } else {
          dialogRef.current?.showModal();
        }
      }
    };

    document.addEventListener("dblclick", listenToTrigger);
    return () => document.removeEventListener("dblclick", listenToTrigger);
  }, []);

  return (
    <>
      <dialog className="m-auto bg-[#24292e]" ref={dialogRef}>
        <div className="flex flex-col items-center bg-[#24292e] p-[20px] overflow-auto scroll-smooth">
          {repositories}
        </div>
      </dialog>
      <div
        ref={triggerContent}
        className="bg-[#24292e] rounded-sm p-[20px] min-h-[200px] max-h-[500px] h-auto w-auto max-w-[500px] m-0.5 border-2 border-[#2b3137]
        flex flex-col justify-center items-center"
      >
        {repositoryName ? container : emptyContainer}
      </div>
    </>
  );
}

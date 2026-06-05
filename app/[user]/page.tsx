import { Octokit } from "@octokit/rest";
import { permanentRedirect } from "next/navigation";
import Profile from "../components/profile";
import Image from "next/image";
import { Repository } from "../components/popup";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import Loading from "./loading";

export default async function userPage({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  "use cache";
  cacheLife("hours");
  const { user } = await params;
  const octokit = new Octokit();
  try {
    const response = (
      await octokit.rest.users.getByUsername({ username: user })
    ).data;
    const imageUrl = response.avatar_url;
    const repo = (await octokit.rest.repos.listForUser({ username: user }))
      .data;

    return (
      <Suspense fallback={<Loading></Loading>}>
        <div className="bg-[#24292e] flex flex-row justify-center items-center align-middle h-screen w-screen">
          <Image
            src={imageUrl}
            alt="User_Profile.png"
            width={500}
            height={500}
            loading="eager"
            className="rounded-full min-w-[200px] max-w-[400px] w-auto min-h-[200px] max-h-[400px] h-auto max-m-[70px] m-[20px]"
          ></Image>
          <div className="flex flex-col">
            <div className="bg-[#24292e] rounded-sm p-[20px] w-auto max-w-[600px] m-0.5 border-2 border-[#2b3137] flex flex-col">
              <Profile username={user} bios={response.bio}></Profile>
            </div>
            <div className="flex flex-row justify-between mt-2">
              <Repository data={repo}></Repository>
              <Repository data={repo}></Repository>
              <Repository data={repo}></Repository>
            </div>
          </div>
        </div>
      </Suspense>
    );
  } catch {
    permanentRedirect("/");
  }
}

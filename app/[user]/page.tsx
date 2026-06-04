import { Octokit } from "@octokit/rest";
import { notFound } from "next/navigation";
import Profile from "../components/profile";
import Repo from "../components/repository";
import Image from "next/image";

export default async function userPage({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
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
      <div className="flex flex-row justify-center items-center align-middle h-screen w-screen">
        <Image
          src={imageUrl}
          alt="User_Profile.png"
          width={500}
          height={500}
          className="rounded-full min-w-[200px] max-w-[400px] w-auto min-h-[200px] max-h-[400px] h-auto max-m-[70px] m-[20px]"
        ></Image>
        <div className="flex flex-col">
          <div className="bg-[#24292e] rounded-sm p-[20px] w-auto max-w-[600px] m-0.5">
            <Profile
              username={user}
              bios={response.bio}
              skills={"C#, Python, Java, Typescript"}
            ></Profile>
          </div>
          <div className="flex flex-row justify-between mt-2">
            <div className="bg-[#24292e] rounded-sm p-[20px] min-h-[200px] max-h-[500px] h-auto w-auto max-w-[500px] m-0.5 flex flex-row justify-center items-center">
              <Repo link={null} repositoryName={null}></Repo>
            </div>
            <div className="bg-[#24292e] rounded-sm p-[20px] min-h-[200px] max-h-[500px] h-auto w-auto max-w-[500px] m-0.5 flex flex-row justify-center items-center">
              <Repo link={null} repositoryName={null}></Repo>
            </div>
            <div className="bg-[#24292e] rounded-sm p-[20px] min-h-[200px] max-h-[500px] h-auto w-auto max-w-[500px] m-0.5 flex flex-row justify-center items-center">
              <Repo link={null} repositoryName={null}></Repo>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}

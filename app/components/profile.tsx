export default function Profile({
  username,
  bios,
  skills,
}: {
  username: string;
  bios: string | null;
  skills: string | null;
}) {
  return (
    <>
      <h1 className="underline">{username.toLocaleUpperCase()}</h1>
      <p>{bios}</p>
      <h1 className="underline">Relavent Languages :</h1>
      <p>{skills}</p>
    </>
  );
}

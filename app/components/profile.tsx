export default function Profile({
  username,
  bios,
}: {
  username: string;
  bios: string | null;
}) {
  return (
    <>
      <h1 className="underline">{username.toLocaleUpperCase()}</h1>
      <p>{bios}</p>
      <input
        className="underline outline-none w-auto"
        type="text"
        placeholder="Insert Niche title"
      ></input>
      <input
        className="outline-none w-auto"
        type="text"
        placeholder="Insert description"
      ></input>
    </>
  );
}

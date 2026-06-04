import Image from "next/image";
export default function Repo({
  link,
  repositoryName,
}: {
  link: string | null;
  repositoryName: string | null;
}) {
  const emptyContainer = <p>Click to Select</p>;
  const container = (
    <>
      <Image src={"./book.svg"} alt="Book.png" width={50} height={50}></Image>
      <p>{repositoryName}</p>
    </>
  );
  return <>{link && repositoryName ? container : emptyContainer}</>;
}

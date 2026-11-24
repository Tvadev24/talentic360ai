import ProgramPage, { generateMetadata as baseMetadata } from "@/app/programs/[slug]/page";

export async function generateMetadata() {
  return baseMetadata({ params: Promise.resolve({ slug: "remote" }) });
}

export default async function Page() {
  return <ProgramPage params={Promise.resolve({ slug: "remote" })} />;
}

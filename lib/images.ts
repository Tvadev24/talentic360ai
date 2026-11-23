/**
 * Photography library. Real editorial photographs (Unsplash) rather than
 * synthetic renders — keyed by role so pages stay readable.
 */

const PHOTOS = {
  heroMain: "photo-1524178232363-1fb2b075b655", // trainer addressing a full room
  heroInset: "photo-1581092160562-40aa08e78837", // technical drafting at a bench
  heroWide: "photo-1591115765373-5207764f72e7", // session in progress, full room

  aboutMain: "photo-1521791136064-7986c2920216", // partnership handshake
  aboutSecondary: "photo-1517048676732-d65bc937f952", // working session around a table

  academicHero: "photo-1562774053-701939374585", // university building
  academicDetail: "photo-1596495578065-6e0763fa1178", // student at work

  vocationalHero: "photo-1504328345606-18bbc8c9d7d1", // welder, sparks
  vocationalDetail: "photo-1581092918056-0c4c3acd3789", // electronics bench

  corporateHero: "photo-1542744173-8e7e53415bb0", // boardroom training
  corporateDetail: "photo-1557804506-669a67965ba0", // facilitated workshop

  governmentHero: "photo-1541888946425-d81bb19240f5", // public infrastructure site
  governmentDetail: "photo-1486406146926-c627a92ad1ab", // civic towers

  postgraduateHero: "photo-1532094349884-543bc11b234d", // research laboratory
  postgraduateDetail: "photo-1573164713988-8665fc963095", // advanced technical facility

  volunteeringHero: "photo-1593113598332-cd288d649433", // volunteers sorting supplies
  volunteeringDetail: "photo-1543269865-cbf427effbad", // young people collaborating

  remoteHero: "photo-1519389950473-47ba0277781c", // distributed team, overhead
  remoteDetail: "photo-1434030216411-0b793f4b4173", // self-paced study

  whyUsMain: "photo-1600880292203-757bb62b4baf", // result worth celebrating
  whyUsSecondary: "photo-1560439514-4e9645039924", // hiring floor at scale

  contactMain: "photo-1573497620053-ea5300f94f21", // one-to-one consultation

  leadership: "photo-1521737604893-d14cc237f11d", // leadership team meeting
  strategy: "photo-1454165804606-c3d57bc86b40", // planning with data
  cohort: "photo-1522202176988-66273c2fd55f", // small cohort, laptops
} as const;

export type PhotoKey = keyof typeof PHOTOS;

type Opts = { w?: number; h?: number; q?: number };

export function photo(key: PhotoKey, { w = 1200, h, q = 72 }: Opts = {}) {
  const id = PHOTOS[key];
  const params = new URLSearchParams({
    auto: "format",
    fit: "crop",
    w: String(w),
    q: String(q),
  });
  if (h) params.set("h", String(h));
  return `https://images.unsplash.com/${id}?${params.toString()}`;
}

export const isPhotoKey = (value: string): value is PhotoKey => value in PHOTOS;

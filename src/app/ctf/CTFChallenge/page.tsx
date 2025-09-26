import CTFChallengeView from "@/presentation/views/CTF/CTFChallengeView";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function CTFChallengePage({ searchParams }: PageProps) {
  const raw = searchParams?.id;
  const id = Array.isArray(raw) ? raw[0] : raw;
  return (
    <div>
      <CTFChallengeView id={id} />
    </div>
  );
}
import Link from "next/link";
import {
  TEAM_GROUPS,
  TEAM_MEMBERS,
  initialsFor,
} from "@/src/lib/data/team";

const Teams = () => {
  const groups = TEAM_GROUPS.map((group) => ({
    group,
    members: TEAM_MEMBERS.filter((m) => m.group === group),
  })).filter((g) => g.members.length > 0);

  return (
    <section className="container-msp">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between md:gap-8">
        <div className="max-w-xl">
          <p className="eyebrow">L'équipe</p>
          <h2 className="mt-3 text-base font-semibold leading-tight tracking-tight text-darker md:text-xl lg:text-2xl">
            <span className="text-secondary">{TEAM_MEMBERS.length}</span>{" "}
            professionnels, un seul lieu.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-2 md:text-base">
            Médecins généralistes, spécialistes, infirmiers et paramédicaux.
            Concertés autour de votre suivi.
          </p>
        </div>
        <Link
          href="/qui-sommes-nous"
          className="inline-flex items-center gap-1.5 self-start rounded-md border border-line bg-main px-3 py-1.5 text-xs font-medium text-darker transition-colors hover:border-secondary/40 hover:text-forest md:self-end md:text-sm"
        >
          Voir l'équipe
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="mt-8 space-y-8 md:mt-10 md:space-y-10">
        {groups.map(({ group, members }) => (
          <div key={group}>
            <div className="mb-3 flex items-baseline justify-between border-b border-line pb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-darker md:text-sm">
                {group}
              </h3>
              <span className="text-2xs text-secondary md:text-xs">
                {String(members.length).padStart(2, "0")}
              </span>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2 md:gap-3">
              {members.map((member) => (
                <div
                  key={member.firstName + member.lastName}
                  className="flex items-center gap-2.5 rounded-lg border border-line bg-main p-2.5 transition-colors hover:border-secondary/40 md:p-3"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-light text-2xs font-semibold text-forest md:h-10 md:w-10 md:text-xs">
                    {initialsFor(member)}
                  </span>
                  <div className="min-w-0 flex-1 leading-snug">
                    <p className="break-words text-xs font-medium text-darker md:text-sm">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="mt-0.5 truncate text-2xs text-ink-2 md:text-xs">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Teams;

/** Short, true stories from the work: the kind of thing you'd mention over coffee, not on a résumé. */
export type FieldNote = {
  /** Small label in the corner, like a sample tag. */
  tag: string;
  title: string;
  body: string;
};

export const fieldNotes: FieldNote[] = [
  {
    tag: "PHIVOLCS · 2020",
    title: "I rewrote the app mid-build.",
    body: "HazardHunterPH started in React Native. Then we learned ArcGIS, the mapping engine behind every hazard layer, didn't support it. I moved the app to Ionic so the maps could ship.",
  },
  {
    tag: "DICT · LGUs",
    title: "I taught towns to run their own sites.",
    body: "Beyond building the Government Web Template 2.0, I trained local government units to adopt it and keep their own websites running.",
  },
  {
    tag: "OpsWerks · make",
    title: "One command, a whole stack.",
    body: "My application template turns one make command into a running Next.js, Django, PostgreSQL and Docker app, so new teams start on the work, not the wiring.",
  },
  {
    tag: "Civil Service · 2019",
    title: "Government-ready, on paper too.",
    body: "I passed the Civil Service Exam at the Professional level, the eligibility behind permanent government posts.",
  },
  {
    tag: "Tuguegarao → Caloocan",
    title: "From the north, working everywhere.",
    body: "I studied IT at the University of Saint Louis Tuguegarao. Today I'm based in Caloocan, shipping for teams across time zones.",
  },
];

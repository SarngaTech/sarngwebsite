/** Online bootcamps — kept separate from the full course catalogue. Fees/durations intentionally not listed. */
export interface Bootcamp {
  slug: string;
  title: string;
  badge: string;
  accent: "cyan" | "teal";
  summary: string;
  tags: string[];
  covers: string[];
  relatedCourse: string;
}

export const bootcamps: Bootcamp[] = [
  {
    slug: "python-basics",
    title: "Python Basics",
    badge: "Py",
    accent: "cyan",
    summary: "A focused online bootcamp to write your first real Python programs — ideal if you are starting from zero.",
    tags: ["Beginner friendly", "Online", "Weekend batches"],
    covers: ["Variables, loops and functions", "Lists and dictionaries", "Small practical programs"],
    relatedCourse: "python",
  },
  {
    slug: "sql-basics",
    title: "SQL Basics",
    badge: "SQL",
    accent: "teal",
    summary: "A hands-on online bootcamp to start querying databases and answering real questions with data.",
    tags: ["Beginner friendly", "Online", "Weekend batches"],
    covers: ["SELECT, filters and sorting", "Aggregations and GROUP BY", "Joining tables"],
    relatedCourse: "sql",
  },
];

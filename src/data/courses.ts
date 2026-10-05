/**
 * Course catalogue.
 * Structured so it can later be served from a CMS / admin dashboard with the same shape.
 * Durations and fees are intentionally left as null — the UI shows a placeholder until they are confirmed.
 */

export type Level = "Beginner" | "Intermediate" | "Advanced";
export type Mode = "Online" | "Offline" | "Hybrid";
export type Accent = "blue" | "cyan" | "teal" | "purple" | "pink" | "orange";

export interface CourseModule {
  title: string;
  topics: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface Course {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  /** Short monogram shown in the technology badge */
  badge: string;
  accent: Accent;
  category: "Programming" | "Web" | "Data & Analytics" | "AI & Cloud";
  short: string;
  levels: Level[];
  modes: Mode[];
  /** null = not yet announced; shown as a placeholder */
  duration: string | null;
  highlights: string[];
  /** Skills covered, shown under 'What you will learn' */
  learn: string[];
  overview: string[];
  audience: string[];
  prerequisites: string[];
  modules: CourseModule[];
  handsOn: string[];
  tools: string[];
  outcomes: string[];
  faqs: FAQItem[];
  keywords: string[];
}

const ALL_MODES: Mode[] = ["Online", "Offline", "Hybrid"];
const FULL_RANGE: Level[] = ["Beginner", "Intermediate", "Advanced"];

const commonFaqs = (title: string): FAQItem[] => [
  {
    q: `What is the batch size for ${title}?`,
    a: "Batches are kept small, so each learner gets focused guidance and time for questions.",
  },
  {
    q: "Will I receive a certificate?",
    a: "Yes. Learners who complete the programme requirements receive a verifiable course completion certificate from Sarng Infotech.",
  },
  {
    q: "What is the duration and fee?",
    a: "Batch schedules and fees are shared on enquiry, as they depend on the mode and batch you choose. Send us an enquiry and our team will share the current details.",
  },
];

export const courses: Course[] = [
  {
    slug: "c-programming",
    title: "C Programming",
    shortTitle: "C",
    subtitle: "Basic to Advanced",
    badge: "C",
    accent: "blue",
    category: "Programming",
    short: "Master the language behind operating systems and embedded devices — and build rock-solid programming logic.",
    levels: FULL_RANGE,
    modes: ALL_MODES,
    duration: null,
    highlights: ["Programming logic & problem solving", "Pointers & memory management", "Structures, files & modular code"],
    learn: ["Write, compile and run C programs", "Use conditions, loops and functions to solve problems", "Work confidently with arrays and strings", "Understand pointers and dynamic memory", "Organise data with structures and files", "Debug programs systematically"],
    overview: [
      "C is the foundation of modern computing. Learning it builds a clear understanding of how programs actually run — memory, data, and control flow — which makes every other language easier to learn.",
      "This course takes you from writing your first program to confidently working with pointers, dynamic memory, structures and file handling, with regular practice problems at every step.",
    ],
    audience: [
      "First-year engineering and computer science students",
      "Students preparing for programming lab exams and technical interviews",
      "Anyone starting their programming journey",
    ],
    prerequisites: ["No prior programming experience required", "Basic computer usage"],
    modules: [
      { title: "Getting Started", topics: ["How programs compile and run", "Variables, data types & operators", "Input and output"] },
      { title: "Control Flow", topics: ["Conditions and branching", "Loops and patterns", "Problem-solving techniques"] },
      { title: "Functions & Arrays", topics: ["Functions and scope", "Recursion", "Arrays and strings"] },
      { title: "Pointers & Memory", topics: ["Pointers and pointer arithmetic", "Dynamic memory allocation", "Common memory errors"] },
      { title: "Structures & Files", topics: ["Structures and unions", "File handling", "Modular programs with header files"] },
      { title: "Applied Practice", topics: ["Mini console applications", "Debugging practice", "Interview-style problems"] },
    ],
    handsOn: ["Daily practice problems", "Guided debugging sessions", "Mini console application", "Code reviews with mentor feedback"],
    tools: ["GCC compiler", "VS Code", "Code::Blocks", "Online judges for practice"],
    outcomes: [
      "Write structured, readable C programs",
      "Use pointers and dynamic memory confidently",
      "Break problems into functions and modules",
      "Approach programming interview questions with clarity",
    ],
    faqs: commonFaqs("C Programming"),
    keywords: ["C programming course Chennai", "C language training"],
  },
  {
    slug: "cpp-programming",
    title: "C++ Programming",
    shortTitle: "C++",
    subtitle: "Basic to Advanced",
    badge: "C++",
    accent: "purple",
    category: "Programming",
    short: "Learn object-oriented programming and the STL — the toolkit used in systems, games and competitive programming.",
    levels: FULL_RANGE,
    modes: ALL_MODES,
    duration: null,
    highlights: ["Object-oriented programming", "Standard Template Library", "Data structures in practice"],
    learn: ["Apply object-oriented design with classes", "Use inheritance and polymorphism correctly", "Write generic code with templates", "Solve problems efficiently with the STL", "Manage memory safely with smart pointers", "Implement common data structures"],
    overview: [
      "C++ combines low-level control with powerful abstractions. It is widely used in systems software, game engines, finance and competitive programming.",
      "You will learn OOP concepts the right way — by designing and building programs — and then use the Standard Template Library to write efficient, modern C++.",
    ],
    audience: [
      "Students who know basic programming and want to learn OOP",
      "Students preparing for coding rounds and competitive programming",
      "Engineering students with C++ in their curriculum",
    ],
    prerequisites: ["Basic programming logic (C knowledge is helpful but not mandatory)"],
    modules: [
      { title: "C++ Fundamentals", topics: ["Syntax, types and references", "Functions and overloading", "Namespaces"] },
      { title: "Object-Oriented Programming", topics: ["Classes and objects", "Constructors and destructors", "Encapsulation"] },
      { title: "Inheritance & Polymorphism", topics: ["Inheritance types", "Virtual functions", "Abstract classes and interfaces"] },
      { title: "Templates & STL", topics: ["Function and class templates", "Vectors, maps, sets", "Algorithms and iterators"] },
      { title: "Memory & Modern C++", topics: ["Dynamic memory", "Smart pointers", "Exception handling"] },
      { title: "Applied Practice", topics: ["Data structure implementations", "OOP mini project", "Coding round practice"] },
    ],
    handsOn: ["OOP design exercises", "STL-based problem solving", "Mini application using classes", "Timed coding practice"],
    tools: ["G++ / Clang", "VS Code", "Online judges for practice"],
    outcomes: [
      "Design programs using classes, inheritance and polymorphism",
      "Use the STL to write efficient solutions",
      "Implement common data structures",
      "Solve coding round problems with confidence",
    ],
    faqs: commonFaqs("C++ Programming"),
    keywords: ["C++ training Chennai", "OOP course"],
  },
  {
    slug: "python",
    title: "Python",
    shortTitle: "Python",
    subtitle: "Basic to Advanced",
    badge: "Py",
    accent: "cyan",
    category: "Programming",
    short: "The most versatile language for automation, data, web and AI — learned through practical, real-world exercises.",
    levels: FULL_RANGE,
    modes: ALL_MODES,
    duration: null,
    highlights: ["Core Python & OOP", "Files, APIs & automation", "Intro to data analysis with Pandas"],
    learn: ["Write clean Python using core syntax and functions", "Use lists, dictionaries and comprehensions", "Build programs with classes and modules", "Read and write CSV and JSON files", "Call web APIs and handle errors", "Analyse data with Pandas basics"],
    overview: [
      "Python is the language of automation, data analysis, web development and artificial intelligence. Its readable syntax makes it the ideal first language — and its ecosystem makes it a career-long skill.",
      "This course moves from fundamentals to object-oriented Python, working with files and APIs, automation scripts and an introduction to data analysis, so you can apply Python to real problems.",
    ],
    audience: [
      "Beginners who want to learn programming",
      "Students heading towards data, AI or backend development",
      "Professionals who want to automate repetitive work",
    ],
    prerequisites: ["No prior programming experience required"],
    modules: [
      { title: "Python Foundations", topics: ["Variables, types and operators", "Conditions and loops", "Functions"] },
      { title: "Data Structures", topics: ["Lists, tuples, sets, dictionaries", "Comprehensions", "String processing"] },
      { title: "Object-Oriented Python", topics: ["Classes and objects", "Inheritance", "Modules and packages"] },
      { title: "Working with Data", topics: ["File handling (CSV, JSON)", "Error handling", "Working with APIs"] },
      { title: "Automation & Libraries", topics: ["Virtual environments & pip", "Automation scripts", "Intro to NumPy and Pandas"] },
      { title: "Applied Practice", topics: ["Guided mini projects", "Code quality and debugging", "Next steps: web, data or AI"] },
    ],
    handsOn: ["Automation scripts", "Data cleaning exercises with Pandas", "API integration exercise", "Guided mini project"],
    tools: ["Python 3", "VS Code", "Jupyter Notebook", "Pandas", "Git basics"],
    outcomes: [
      "Write clean, well-structured Python programs",
      "Automate everyday tasks with scripts",
      "Read, process and analyse data files",
      "Choose a clear path into web, data or AI",
    ],
    faqs: commonFaqs("Python"),
    keywords: ["Python training Chennai", "Python course"],
  },
  {
    slug: "web-technologies",
    title: "Web Technologies",
    shortTitle: "Web",
    subtitle: "HTML, CSS, JavaScript",
    badge: "</>",
    accent: "orange",
    category: "Web",
    short: "Design and build responsive, interactive websites with HTML, CSS and modern JavaScript.",
    levels: ["Beginner", "Intermediate"],
    modes: ALL_MODES,
    duration: null,
    highlights: ["Semantic HTML & modern CSS", "Responsive layouts", "JavaScript & the DOM"],
    learn: ["Structure pages with semantic, accessible HTML", "Style layouts with modern CSS, Flexbox and Grid", "Build mobile-first responsive designs", "Program interactivity with JavaScript and the DOM", "Fetch and display data from APIs", "Publish a website with Git and GitHub"],
    overview: [
      "Every website and web application starts with HTML, CSS and JavaScript. This course teaches you to build responsive, accessible and interactive web pages from scratch.",
      "You will learn layout systems like Flexbox and Grid, write modern JavaScript, interact with the DOM and fetch data from APIs — building up to a complete multi-page website.",
    ],
    audience: ["Beginners interested in web development", "Students who want to build a personal portfolio website", "Aspiring front-end developers"],
    prerequisites: ["Basic computer usage", "No prior coding required"],
    modules: [
      { title: "HTML Essentials", topics: ["Document structure", "Semantic elements", "Forms and accessibility"] },
      { title: "CSS Styling", topics: ["Selectors and the box model", "Typography and colour", "Transitions"] },
      { title: "Layouts & Responsive Design", topics: ["Flexbox", "CSS Grid", "Media queries and mobile-first design"] },
      { title: "JavaScript Fundamentals", topics: ["Variables, functions, arrays and objects", "ES6+ syntax", "Events"] },
      { title: "DOM & APIs", topics: ["DOM manipulation", "Fetch API and JSON", "Form validation"] },
      { title: "Build & Publish", topics: ["Multi-page website build", "Git and GitHub basics", "Publishing a site"] },
    ],
    handsOn: ["Responsive landing page", "Interactive JavaScript components", "API-driven page", "Portfolio website"],
    tools: ["VS Code", "Chrome DevTools", "Git & GitHub"],
    outcomes: [
      "Build responsive websites that work on every screen",
      "Add interactivity with JavaScript",
      "Consume data from APIs",
      "Publish your own portfolio site",
    ],
    faqs: commonFaqs("Web Technologies"),
    keywords: ["web development course Chennai", "HTML CSS JavaScript training"],
  },
  {
    slug: "sql",
    title: "SQL",
    shortTitle: "SQL",
    subtitle: "Basic to Advanced",
    badge: "SQL",
    accent: "teal",
    category: "Data & Analytics",
    short: "Query, analyse and manage data with SQL — the most in-demand skill across data and software roles.",
    levels: FULL_RANGE,
    modes: ALL_MODES,
    duration: null,
    highlights: ["Queries, joins & aggregations", "Subqueries, CTEs & window functions", "Database design basics"],
    learn: ["Filter, sort and query data with SELECT", "Summarise data with GROUP BY and aggregates", "Combine tables with joins", "Write subqueries, CTEs and window functions", "Modify data and use constraints and indexes", "Design normalised database schemas"],
    overview: [
      "SQL is the language of data. Developers, analysts, data engineers and business teams all rely on it to retrieve and analyse information stored in databases.",
      "Starting with simple queries, you will progress through joins, aggregations, subqueries, CTEs and window functions, and learn how databases are designed — using realistic business datasets.",
    ],
    audience: ["Students interested in data analytics or data engineering", "Developers who work with databases", "Business professionals who need to analyse data"],
    prerequisites: ["No prior experience required"],
    modules: [
      { title: "Database Basics", topics: ["Tables, rows and keys", "SELECT, WHERE, ORDER BY", "Filtering and sorting"] },
      { title: "Aggregation", topics: ["GROUP BY and HAVING", "Aggregate functions", "Business reporting queries"] },
      { title: "Joins", topics: ["Inner and outer joins", "Self joins", "Combining multiple tables"] },
      { title: "Advanced Queries", topics: ["Subqueries", "Common Table Expressions (CTEs)", "Window functions"] },
      { title: "Data Management", topics: ["INSERT, UPDATE, DELETE", "Constraints and indexes", "Views"] },
      { title: "Database Design", topics: ["Normalisation", "ER modelling", "Case-study analysis"] },
    ],
    handsOn: ["Querying realistic business datasets", "Report-building exercises", "Schema design exercise", "Interview-style SQL problems"],
    tools: ["MySQL / PostgreSQL", "SQL Server basics", "DBeaver or equivalent client"],
    outcomes: [
      "Write accurate queries to answer business questions",
      "Use joins, CTEs and window functions confidently",
      "Design simple, well-structured databases",
      "Tackle SQL interview questions",
    ],
    faqs: commonFaqs("SQL"),
    keywords: ["SQL training Chennai", "SQL course"],
  },
  {
    slug: "excel",
    title: "Excel",
    shortTitle: "Excel",
    subtitle: "Basic to Advanced",
    badge: "XL",
    accent: "teal",
    category: "Data & Analytics",
    short: "Go from spreadsheets to smart analysis — formulas, lookups, pivot tables, dashboards and automation.",
    levels: FULL_RANGE,
    modes: ALL_MODES,
    duration: null,
    highlights: ["Formulas & lookups", "Pivot tables & charts", "Dashboards & Power Query"],
    learn: ["Apply logical, text and date functions", "Look up data with XLOOKUP and INDEX-MATCH", "Analyse data with pivot tables", "Build charts and interactive dashboards", "Clean and combine data with Power Query", "Run what-if analysis"],
    overview: [
      "Excel remains the most widely used business tool in the world. Strong Excel skills make you faster and more valuable in almost any role.",
      "This course covers essential and advanced formulas, lookups, pivot tables, charts, data cleaning with Power Query and building interactive dashboards.",
    ],
    audience: ["Students entering business, finance or analytics roles", "Working professionals who use spreadsheets daily", "Anyone preparing for a data analytics path"],
    prerequisites: ["Basic computer usage"],
    modules: [
      { title: "Excel Essentials", topics: ["Navigation and formatting", "Basic formulas", "Sorting and filtering"] },
      { title: "Functions", topics: ["Logical and text functions", "Date functions", "XLOOKUP / VLOOKUP / INDEX-MATCH"] },
      { title: "Data Analysis", topics: ["Pivot tables", "Conditional formatting", "Data validation"] },
      { title: "Visualisation", topics: ["Charts", "Slicers", "Interactive dashboards"] },
      { title: "Data Preparation", topics: ["Power Query basics", "Cleaning messy data", "Combining data sources"] },
      { title: "Productivity", topics: ["What-if analysis", "Intro to macros", "Case-study dashboard"] },
    ],
    handsOn: ["Business case-study workbooks", "Data-cleaning exercises", "Interactive dashboard build"],
    tools: ["Microsoft Excel", "Power Query"],
    outcomes: [
      "Use advanced formulas and lookups",
      "Summarise data with pivot tables",
      "Build clear, interactive dashboards",
      "Clean and prepare data efficiently",
    ],
    faqs: commonFaqs("Excel"),
    keywords: ["Excel training Chennai", "advanced Excel course"],
  },
  {
    slug: "power-bi",
    title: "Power BI",
    shortTitle: "Power BI",
    subtitle: "Basic to Advanced",
    badge: "BI",
    accent: "orange",
    category: "Data & Analytics",
    short: "Turn raw data into interactive business dashboards with Power Query, data modelling and DAX.",
    levels: FULL_RANGE,
    modes: ALL_MODES,
    duration: null,
    highlights: ["Power Query & data modelling", "DAX measures", "Interactive dashboards & publishing"],
    learn: ["Connect Power BI to common data sources", "Clean and shape data in Power Query", "Model data using a star schema", "Write DAX measures and time intelligence", "Design clear, interactive reports", "Publish and share in the Power BI Service"],
    overview: [
      "Power BI is Microsoft's business intelligence platform, used by organisations of every size to report and analyse data.",
      "You will learn the complete workflow — connecting to data, transforming it with Power Query, building a proper data model, writing DAX measures, designing reports and publishing them to the Power BI service.",
    ],
    audience: ["Students aiming for data analyst or BI roles", "Excel users who want to scale up their reporting", "Professionals responsible for business reporting"],
    prerequisites: ["Basic Excel knowledge is helpful", "SQL knowledge is helpful but not required"],
    modules: [
      { title: "Power BI Foundations", topics: ["Power BI Desktop overview", "Connecting to data sources", "Report basics"] },
      { title: "Power Query", topics: ["Data cleaning and shaping", "Merging and appending", "Parameters"] },
      { title: "Data Modelling", topics: ["Star schema", "Relationships", "Date tables"] },
      { title: "DAX", topics: ["Calculated columns vs measures", "CALCULATE and filter context", "Time intelligence"] },
      { title: "Report Design", topics: ["Visual best practices", "Drill-through and bookmarks", "Dashboard storytelling"] },
      { title: "Publishing & Sharing", topics: ["Power BI Service", "Workspaces and sharing", "Scheduled refresh concepts"] },
    ],
    handsOn: ["End-to-end dashboard on a business dataset", "DAX measure exercises", "Report design review"],
    tools: ["Power BI Desktop", "Power BI Service", "Power Query", "DAX"],
    outcomes: [
      "Build clean data models",
      "Write practical DAX measures",
      "Design interactive dashboards",
      "Publish and share reports",
    ],
    faqs: commonFaqs("Power BI"),
    keywords: ["Power BI training Chennai", "Power BI course"],
  },
  {
    slug: "tableau",
    title: "Tableau",
    shortTitle: "Tableau",
    subtitle: "Basic to Advanced",
    badge: "Tb",
    accent: "blue",
    category: "Data & Analytics",
    short: "Visualise data and tell compelling stories with Tableau's drag-and-drop analytics.",
    levels: FULL_RANGE,
    modes: ALL_MODES,
    duration: null,
    highlights: ["Visual analytics", "Calculated fields & LOD", "Dashboards & stories"],
    learn: ["Connect to data and understand dimensions and measures", "Build core charts and maps", "Use calculated fields, table calculations and LOD", "Add parameters, actions and filters", "Design dashboards and story points", "Publish and share workbooks"],
    overview: [
      "Tableau helps people see and understand data. It is widely used for visual analytics and executive dashboards.",
      "This course teaches you to connect to data, build effective visualisations, use calculations and LOD expressions, and design dashboards and stories that communicate insights clearly.",
    ],
    audience: ["Students interested in data visualisation and analytics", "Analysts who want to present data more effectively"],
    prerequisites: ["Basic Excel or data familiarity is helpful"],
    modules: [
      { title: "Getting Started", topics: ["Tableau interface", "Connecting to data", "Dimensions and measures"] },
      { title: "Core Visualisations", topics: ["Bar, line and scatter charts", "Maps", "Filters and sorting"] },
      { title: "Calculations", topics: ["Calculated fields", "Table calculations", "LOD expressions"] },
      { title: "Interactivity", topics: ["Parameters", "Actions", "Sets and groups"] },
      { title: "Dashboards & Stories", topics: ["Dashboard layout", "Story points", "Design principles"] },
      { title: "Sharing", topics: ["Tableau Public", "Publishing workbooks", "Case-study dashboard"] },
    ],
    handsOn: ["Visual analysis exercises", "Interactive dashboard build", "Data storytelling presentation"],
    tools: ["Tableau Desktop / Tableau Public"],
    outcomes: [
      "Choose the right chart for the question",
      "Use calculations and LOD expressions",
      "Build interactive dashboards",
      "Present insights as a clear story",
    ],
    faqs: commonFaqs("Tableau"),
    keywords: ["Tableau training Chennai"],
  },
  {
    slug: "generative-ai",
    title: "Generative AI",
    shortTitle: "Gen AI",
    subtitle: "Practical applications of modern AI",
    badge: "AI",
    accent: "pink",
    category: "AI & Cloud",
    short: "Understand how large language models work and build practical applications with prompts, APIs and RAG.",
    levels: ["Beginner", "Intermediate"],
    modes: ALL_MODES,
    duration: null,
    highlights: ["How LLMs work", "Prompt engineering", "Building AI apps with APIs & RAG"],
    learn: ["Explain how large language models work", "Write structured, reliable prompts", "Call LLM APIs from Python", "Build retrieval-augmented (RAG) applications", "Create simple assistants with tool use", "Evaluate outputs and use AI responsibly"],
    overview: [
      "Generative AI is changing how software is built and how work gets done. This course gives you a clear understanding of how large language models work — and the practical skills to use them responsibly.",
      "You will learn effective prompt engineering, work with AI APIs from Python, and build retrieval-augmented generation (RAG) applications that answer questions from your own documents.",
    ],
    audience: ["Students curious about AI and its applications", "Developers who want to add AI features to applications", "Professionals exploring AI for productivity"],
    prerequisites: ["Basic Python is recommended for the application-building modules"],
    modules: [
      { title: "AI Foundations", topics: ["AI, ML and generative AI explained", "How large language models work", "Capabilities and limitations"] },
      { title: "Prompt Engineering", topics: ["Prompt structure and patterns", "Few-shot prompting", "Structured outputs"] },
      { title: "Working with AI APIs", topics: ["Calling LLM APIs from Python", "Managing context and cost", "Handling responses"] },
      { title: "Retrieval-Augmented Generation", topics: ["Embeddings", "Vector search", "Building a document Q&A app"] },
      { title: "AI Applications", topics: ["Chatbots and assistants", "Tool use and simple agents", "Evaluating outputs"] },
      { title: "Responsible AI", topics: ["Accuracy and hallucinations", "Privacy and data safety", "Ethical use"] },
    ],
    handsOn: ["Prompt design workshops", "Python AI API exercises", "Document Q&A (RAG) application", "Mini AI assistant build"],
    tools: ["Python", "LLM APIs", "Embeddings & vector databases", "Jupyter Notebook"],
    outcomes: [
      "Explain how generative AI works and where it fits",
      "Write effective, reliable prompts",
      "Build simple AI-powered applications",
      "Use AI responsibly and critically",
    ],
    faqs: commonFaqs("Generative AI"),
    keywords: ["Generative AI training", "Gen AI course Chennai"],
  },
  {
    slug: "data-engineering-azure",
    title: "Data Engineering (Azure)",
    shortTitle: "Azure DE",
    subtitle: "Build data pipelines on Microsoft Azure",
    badge: "Az",
    accent: "blue",
    category: "AI & Cloud",
    short: "Design and build cloud data pipelines with Azure Data Factory, Data Lake, Databricks and Synapse.",
    levels: ["Intermediate", "Advanced"],
    modes: ALL_MODES,
    duration: null,
    highlights: ["ETL/ELT pipelines", "Azure Data Factory & Data Lake", "Databricks & PySpark"],
    learn: ["Explain ETL, ELT and modern data architecture", "Set up storage in Azure Data Lake", "Build and schedule Azure Data Factory pipelines", "Transform data with Databricks and PySpark", "Organise data with the medallion architecture", "Serve analytics-ready data to Power BI"],
    overview: [
      "Data engineers build the pipelines that move, clean and organise data so it can be analysed. Azure is one of the leading cloud platforms for this work.",
      "This course covers data engineering concepts and hands-on Azure services — ingesting data with Azure Data Factory, storing it in Azure Data Lake, transforming it with Databricks and PySpark, and serving it for analytics.",
    ],
    audience: ["Students with SQL and Python basics who want a data engineering career", "Data analysts moving into engineering", "Developers moving into cloud data roles"],
    prerequisites: ["Working knowledge of SQL", "Basic Python"],
    modules: [
      { title: "Data Engineering Foundations", topics: ["Data engineering lifecycle", "ETL vs ELT", "Batch vs streaming"] },
      { title: "Azure Fundamentals", topics: ["Azure portal and resource groups", "Storage accounts", "Security and access basics"] },
      { title: "Azure Data Lake", topics: ["Data lake architecture", "Medallion (bronze/silver/gold) layers", "File formats: CSV, Parquet, Delta"] },
      { title: "Azure Data Factory", topics: ["Pipelines and activities", "Linked services and datasets", "Triggers and parameterisation"] },
      { title: "Databricks & PySpark", topics: ["Spark fundamentals", "PySpark transformations", "Delta Lake"] },
      { title: "Serving & Operations", topics: ["Azure Synapse Analytics overview", "Connecting Power BI", "Monitoring and best practices"] },
    ],
    handsOn: ["End-to-end ingestion pipeline", "Medallion architecture build", "PySpark transformation notebooks", "Pipeline monitoring exercise"],
    tools: ["Azure Data Factory", "Azure Data Lake Storage", "Azure Databricks", "PySpark", "Azure Synapse", "SQL"],
    outcomes: [
      "Explain modern data engineering architecture",
      "Build and orchestrate pipelines in Azure Data Factory",
      "Transform data at scale with PySpark",
      "Prepare analytics-ready data for reporting",
    ],
    faqs: commonFaqs("Data Engineering (Azure)"),
    keywords: ["Azure Data Engineering training", "Data Engineering course Chennai"],
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);

/** Course artwork in /public/images/courses/<slug>.jpg — replace a file to change its image. */
export const courseImage = (slug: string) => `/images/courses/${slug}.jpg`;

export const courseCategories = ["All", "Programming", "Web", "Data & Analytics", "AI & Cloud"] as const;

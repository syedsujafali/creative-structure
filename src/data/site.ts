const px = (id: number, file: string, w: number) =>
  `https://images.pexels.com/photos/${id}/${file}?auto=compress&cs=tinysrgb&w=${w}`;

export const IMG = {
  hero: px(36777965, "pexels-photo-36777965.jpeg", 1800),
  heroMobile: px(36777965, "pexels-photo-36777965.jpeg", 900),
  heroAlt: "Warmly lit stone-faced home with a covered front porch at dusk",

  introRoom: px(8146325, "pexels-photo-8146325.jpeg", 1000),
  introDetail: px(30907888, "pexels-photo-30907888.jpeg", 900),

  aboutMain: px(8961295, "pexels-photo-8961295.jpeg", 1300),

  cta: px(4933643, "pexels-photo-4933643.jpeg", 1800),
};

/* ------------------------------------------------------------------ */
/* Services — one featured, two cards, three list items                 */
/* ------------------------------------------------------------------ */
export type Service = {
  index: string;
  title: string;
  copy: string;
  image?: string;
  alt?: string;
  focal?: string;
  tags?: string[];
};

export const SERVICE_FEATURED: Service = {
  index: "01",
  title: "Residential Construction",
  copy: "Renovations, improvements and new construction for homeowners — planned around how the house is actually used and finished to a standard you'll still appreciate years later.",
  image: px(7587470, "pexels-photo-7587470.jpeg", 1400),
  alt: "Brick family home with landscaped garden and driveway",
  focal: "50% 60%",
  tags: ["Whole-home renovation", "Interior build-out", "Finish carpentry"],
};

export const SERVICE_CARDS: Service[] = [
  {
    index: "02",
    title: "Home Additions",
    copy: "Additions planned to sit naturally against the existing rooflines and materials.",
    image: px(33954649, "pexels-photo-33954649.jpeg", 1100),
    alt: "New timber framing added to an existing house",
    focal: "50% 45%",
  },
  {
    index: "03",
    title: "Remodeling & Renovation",
    copy: "Kitchens, baths and living spaces reworked for how you use them now.",
    image: px(36777561, "pexels-photo-36777561.jpeg", 1100),
    alt: "Newly remodeled kitchen with a central island",
    focal: "50% 55%",
  },
];

export const SERVICE_LIST: Service[] = [
  {
    index: "04",
    title: "Roofing",
    copy: "Full replacements and repairs for homes and small commercial buildings.",
    image: px(33404248, "pexels-photo-33404248.jpeg", 1100),
    alt: "Roofer installing asphalt shingles on a residential roof",
    focal: "50% 50%",
  },
  {
    index: "05",
    title: "Exterior Improvements",
    copy: "Siding, trim, porches and repairs that protect and lift the property.",
    image: px(36777968, "pexels-photo-36777968.jpeg", 1100),
    alt: "Home exterior with a spacious backyard in late afternoon light",
    focal: "50% 55%",
  },
  {
    index: "06",
    title: "Small Commercial",
    copy: "Build-outs and renovations for local businesses and storefronts.",
    image: px(32061510, "pexels-photo-32061510.jpeg", 1100),
    alt: "Small storefront café with an awning on a neighborhood street",
    focal: "50% 50%",
  },
];

/** All six services in one ordered list. */
export const ALL_SERVICES: Service[] = [
  SERVICE_FEATURED,
  ...SERVICE_CARDS,
  ...SERVICE_LIST,
];

/* ------------------------------------------------------------------ */
/* Projects — editorial layout                                          */
/* ------------------------------------------------------------------ */
export type Project = {
  no: string;
  title: string;
  type: string;
  location: string;
  copy: string;
  image: string;
  alt: string;
  focal: string;
};

export const PROJECT_FEATURED: Project = {
  no: "01",
  title: "Open-Plan Kitchen & Main Level",
  type: "Interior Remodel",
  location: "Central New Jersey",
  copy: "Walls opened up, new cabinetry, lighting and finishes carried through the main living level.",
  image: px(36777912, "pexels-photo-36777912.jpeg", 1800),
  alt: "Bright remodeled kitchen with island and white cabinetry",
  focal: "50% 60%",
};

export const PROJECTS: Project[] = [
  {
    no: "02",
    title: "Rear Two-Story Addition",
    type: "Home Addition",
    location: "New Jersey",
    copy: "Added living space framed and finished to match the original roofline.",
    image: px(209266, "pexels-photo-209266.jpeg", 1200),
    alt: "Two-story wood framed addition under construction",
    focal: "50% 50%",
  },
  {
    no: "03",
    title: "Full Exterior Refresh",
    type: "Exterior",
    location: "Northern New Jersey",
    copy: "Siding, trim and entry detail replaced for a clean, consistent facade.",
    image: px(5517853, "pexels-photo-5517853.png", 1200),
    alt: "Suburban home with new siding and a covered front porch",
    focal: "50% 55%",
  },
  {
    no: "04",
    title: "Shingle Roof Replacement",
    type: "Roofing",
    location: "New Jersey",
    copy: "Complete tear-off with new flashing, ventilation and clean edge detail.",
    image: px(33404080, "pexels-photo-33404080.jpeg", 1200),
    alt: "Crew installing a new roof on a brick house",
    focal: "50% 45%",
  },
  {
    no: "05",
    title: "Primary Bath Renovation",
    type: "Renovation",
    location: "New Jersey",
    copy: "Reworked layout with tiled shower, new fixtures and aligned finish work.",
    image: px(11701114, "pexels-photo-11701114.jpeg", 1200),
    alt: "Renovated bathroom with tiled walls and glass shower",
    focal: "50% 50%",
  },
];

export const PROJECT_CLOSER: Project = {
  no: "06",
  title: "Neighborhood Storefront Fit-Out",
  type: "Small Commercial",
  location: "New Jersey",
  copy: "Interior build-out and exterior improvements for a small local business.",
  image: px(14356767, "pexels-photo-14356767.jpeg", 1800),
  alt: "Renovated small shop facade on a quiet street",
  focal: "50% 55%",
};

/* ------------------------------------------------------------------ */
export const WHY = [
  {
    index: "01",
    title: "Personal Attention",
    copy: "The people who plan your project are the ones running it day to day.",
  },
  {
    index: "02",
    title: "Quality Craftsmanship",
    copy: "Careful work from rough framing through the last piece of trim.",
  },
  {
    index: "03",
    title: "Clear Communication",
    copy: "You know what's happening, what's next, and who to call.",
  },
  {
    index: "04",
    title: "Reliable Process",
    copy: "Straightforward planning, construction and completion — no surprises.",
  },
  {
    index: "05",
    title: "Local Knowledge",
    copy: "A New Jersey team that knows the homes and neighborhoods it works in.",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Consultation",
    copy: "We talk through the project, your goals and what matters most.",
  },
  {
    step: "02",
    title: "Planning",
    copy: "We walk the property, review conditions and define the scope.",
  },
  {
    step: "03",
    title: "Estimate",
    copy: "A clear estimate with the work and expectations laid out.",
  },
  {
    step: "04",
    title: "Construction",
    copy: "Steady progress, consistent updates and a tidy job site.",
  },
  {
    step: "05",
    title: "Completion",
    copy: "A final walkthrough together, then handoff of the finished space.",
  },
];

export const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const COMPANY = {
  name: "Creative Structures NJ LLC",
  short: "Creative Structures",
  email: "info@creativestructuresnj.com",
  area: "New Jersey",
  areaLong: "Residential & small commercial · New Jersey",
  hours: "Mon – Sat · 8:00am – 6:00pm",
};

export const PROJECT_TYPES = [
  "Residential Construction",
  "Home Addition",
  "Remodeling & Renovation",
  "Roofing",
  "Exterior Improvements",
  "Small Commercial",
  "Something else",
];

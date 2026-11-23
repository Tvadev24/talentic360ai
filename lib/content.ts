/**
 * Single source of truth for every piece of copy on the site.
 * Content mirrors talentic360ai.in exactly.
 */

export const site = {
  name: "TALENTIC 360.AI",
  legalName: "TALENTIC 360.AI LLP",
  title: "TALENTIC 360.AI LLP - Comprehensive Training & Apprenticeship Programs",
  description:
    "Market leader in comprehensive training and apprenticeship programs for academic, vocational, corporate, government, and post-graduate sectors. Transform your workforce with TALENTIC 360.AI LLP.",
  tagline:
    "Market leader in comprehensive training and apprenticeship programs, transforming talent across multiple sectors.",
  email: "info@talentic360.ai",
  phone: "+91 XXX XXX XXXX",
  phoneHref: "tel:+91XXXXXXXXXX",
  location: "India",
  officeHours: [
    "Monday - Friday: 9:00 AM - 6:00 PM",
    "Saturday: 10:00 AM - 4:00 PM",
    "Sunday: Closed",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; blurb: string }[];
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Programs",
    href: "/programs",
    children: [
      {
        label: "Academic",
        href: "/programs/academic",
        blurb: "University partnerships, apprenticeships and certifications.",
      },
      {
        label: "Vocational",
        href: "/programs/vocational",
        blurb: "Trade skills, fast-track certification and on-the-job training.",
      },
      {
        label: "Corporate",
        href: "/programs/corporate",
        blurb: "Enterprise L&D, leadership and performance programs.",
      },
      {
        label: "Government",
        href: "/programs/government",
        blurb: "Public sector capability and Skill India initiatives.",
      },
      {
        label: "Post-Graduate",
        href: "/programs/post-graduate",
        blurb: "Advanced specialisations, research and executive education.",
      },
      {
        label: "Volunteering",
        href: "/programs/volunteering",
        blurb: "Social impact programs with real professional development.",
      },
      {
        label: "Remote",
        href: "/programs/remote",
        blurb: "Online, self-paced and hybrid learning without boundaries.",
      },
    ],
  },
  { label: "Why Us", href: "/why-us" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  badge: "Market Leader in Training Solutions",
  titleLines: ["Comprehensive", "Training & Apprenticeship", "Programs"],
  description:
    "Transforming talent through innovative programs across academic, vocational, corporate, and government sectors. Your trusted partner for workforce excellence.",
  primaryCta: { label: "Get Started", href: "/contact" },
  secondaryCta: { label: "Learn More", href: "/about" },
  imageAlt: "TALENTIC 360.AI comprehensive training programs",
};

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  heading: "About",
  headingAccent: "TALENTIC 360.AI LLP",
  intro:
    "We are market leaders in comprehensive training and apprenticeship programs, dedicated to transforming talent across academic, vocational, corporate, and government sectors.",
  positioningTitle: "Our Unique Positioning",
  positioning: [
    "TALENTIC 360.AI LLP stands as the preferred training partner for MNCs, Corporates, and large manufacturers. Our mindful strategy combines cutting-edge methodologies with deep industry insights to deliver workforce solutions that drive real business impact.",
    "We don't just train—we transform. Our comprehensive approach ensures that every program aligns with your organizational goals, creating a sustainable talent pipeline that fuels growth and innovation.",
  ],
  visualCaption: "Neural Network Processing AI Model",
  pillars: [
    {
      icon: "Target",
      title: "Mindful Strategy",
      description:
        "Tailored solutions for MNCs, Corporates, and large manufacturers with strategic workforce development.",
    },
    {
      icon: "Award",
      title: "Market Leadership",
      description:
        "Industry-leading training programs recognized for excellence and innovation across multiple sectors.",
    },
    {
      icon: "TrendingUp",
      title: "Proven Results",
      description:
        "Track record of transforming talent and delivering measurable outcomes for our partners.",
    },
    {
      icon: "Users",
      title: "Expert Team",
      description:
        "Dedicated professionals with deep industry expertise and commitment to your success.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Programs                                                            */
/* ------------------------------------------------------------------ */

export type Offering = {
  icon: string;
  title: string;
  description: string;
};

export type Program = {
  slug: string;
  /** value used by the contact form's program <select> */
  value: string;
  /** "Academic" — rendered before the word "Programs" */
  name: string;
  navLabel: string;
  intro: string;
  cta: string;
  image: string;
  imageAlt: string;
  secondaryImage: string;
  secondaryImageAlt: string;
  offerings: Offering[];
};

export const programs: Program[] = [
  {
    slug: "academic",
    value: "academic",
    name: "Academic",
    navLabel: "Academic Programs",
    intro:
      "Empowering students with industry-ready skills through comprehensive academic training programs that seamlessly integrate theoretical knowledge with practical application.",
    cta: "Explore Academic Programs",
    image: "academicHero",
    imageAlt: "University campus where TALENTIC 360.AI runs academic partnership programs",
    secondaryImage: "academicDetail",
    secondaryImageAlt: "Student working through a skill enhancement course",
    offerings: [
      {
        icon: "GraduationCap",
        title: "Higher Education Partnerships",
        description:
          "Collaborative programs with universities and colleges to bridge the gap between academic learning and industry requirements.",
      },
      {
        icon: "BookOpen",
        title: "Skill Enhancement Courses",
        description:
          "Specialized courses designed to complement academic curriculum with practical, industry-relevant skills.",
      },
      {
        icon: "Users",
        title: "Student Apprenticeships",
        description:
          "Structured apprenticeship programs that provide students with hands-on experience while pursuing their degrees.",
      },
      {
        icon: "Award",
        title: "Certification Programs",
        description:
          "Industry-recognized certification courses that enhance employability and career prospects for students.",
      },
    ],
  },
  {
    slug: "vocational",
    value: "vocational",
    name: "Vocational",
    navLabel: "Vocational Programs",
    intro:
      "Practical, industry-focused vocational training programs that equip individuals with the specialized skills needed to excel in their chosen trades and professions.",
    cta: "Explore Vocational Programs",
    image: "vocationalHero",
    imageAlt: "Welder at work during hands-on vocational trade training",
    secondaryImage: "vocationalDetail",
    secondaryImageAlt: "Technician drafting a technical drawing during skills training",
    offerings: [
      {
        icon: "Wrench",
        title: "Technical Skills Training",
        description:
          "Hands-on training programs in specialized trades and technical skills aligned with industry standards and requirements.",
      },
      {
        icon: "Zap",
        title: "Fast-Track Certifications",
        description:
          "Accelerated vocational courses designed to quickly upskill individuals for immediate employment opportunities.",
      },
      {
        icon: "Briefcase",
        title: "Trade Apprenticeships",
        description:
          "Comprehensive apprenticeship programs combining classroom instruction with on-the-job training in various trades.",
      },
      {
        icon: "TrendingUp",
        title: "Career Advancement Programs",
        description:
          "Specialized programs for vocational professionals looking to advance their careers and expand their skill sets.",
      },
    ],
  },
  {
    slug: "corporate",
    value: "corporate",
    name: "Corporate",
    navLabel: "Corporate Programs",
    intro:
      "Strategic corporate training solutions tailored for MNCs, corporates, and large manufacturers. Our mindful approach ensures alignment with your business objectives and long-term growth.",
    cta: "Explore Corporate Programs",
    image: "corporateHero",
    imageAlt: "Corporate training session running in a boardroom",
    secondaryImage: "corporateDetail",
    secondaryImageAlt: "Facilitator leading an innovation workshop with a corporate team",
    offerings: [
      {
        icon: "Building2",
        title: "Enterprise Training Solutions",
        description:
          "Customized training programs designed specifically for MNCs and large corporations to enhance workforce capabilities.",
      },
      {
        icon: "UsersRound",
        title: "Leadership Development",
        description:
          "Executive and leadership training programs that cultivate strategic thinking and management excellence.",
      },
      {
        icon: "Rocket",
        title: "Innovation Workshops",
        description:
          "Interactive workshops focused on fostering innovation, creativity, and problem-solving skills in corporate teams.",
      },
      {
        icon: "ChartLine",
        title: "Performance Optimization",
        description:
          "Data-driven programs designed to improve team productivity, efficiency, and overall business performance.",
      },
    ],
  },
  {
    slug: "government",
    value: "government",
    name: "Government",
    navLabel: "Government Programs",
    intro:
      "Partnership programs with government bodies to support national skill development initiatives, policy implementation, and public sector workforce enhancement.",
    cta: "Explore Government Programs",
    image: "governmentHero",
    imageAlt: "Site team on a public infrastructure project supported by skill development programs",
    secondaryImage: "governmentDetail",
    secondaryImageAlt: "Public sector buildings representing governance and policy work",
    offerings: [
      {
        icon: "Shield",
        title: "Public Sector Training",
        description:
          "Specialized training programs for government employees focused on efficiency, governance, and public service excellence.",
      },
      {
        icon: "Scale",
        title: "Policy Implementation Support",
        description:
          "Training initiatives aligned with government policies and schemes to ensure effective implementation and outcomes.",
      },
      {
        icon: "Users",
        title: "Skill India Programs",
        description:
          "Collaborative programs supporting national skill development missions and government-led employment initiatives.",
      },
      {
        icon: "Globe",
        title: "Community Development",
        description:
          "Training programs designed to support grassroots development and community empowerment initiatives.",
      },
    ],
  },
  {
    slug: "post-graduate",
    value: "postgraduate",
    name: "Post-Graduate",
    navLabel: "Post-Graduate Programs",
    intro:
      "Advanced learning programs for post-graduates seeking specialized knowledge, research opportunities, and professional excellence in their chosen fields.",
    cta: "Explore Post-Graduate Programs",
    image: "postgraduateHero",
    imageAlt: "Research laboratory used for advanced post-graduate programs",
    secondaryImage: "postgraduateDetail",
    secondaryImageAlt: "Speaker presenting research findings to a professional audience",
    offerings: [
      {
        icon: "BookMarked",
        title: "Advanced Specializations",
        description:
          "Post-graduate level programs offering deep expertise in specialized domains and emerging industry sectors.",
      },
      {
        icon: "Brain",
        title: "Research & Development",
        description:
          "Programs focused on research methodologies, innovation, and cutting-edge technological advancements.",
      },
      {
        icon: "Trophy",
        title: "Professional Excellence",
        description:
          "Advanced training for professionals seeking to achieve mastery and leadership in their respective fields.",
      },
      {
        icon: "Target",
        title: "Executive Education",
        description:
          "High-impact programs designed for senior professionals and executives pursuing continuous learning.",
      },
    ],
  },
  {
    slug: "volunteering",
    value: "volunteering",
    name: "Volunteering",
    navLabel: "Volunteering Programs",
    intro:
      "Make a difference while developing valuable skills. Our volunteering programs combine social impact with professional development and community engagement.",
    cta: "Explore Volunteering Programs",
    image: "volunteeringHero",
    imageAlt: "Volunteers sorting supplies during a community service program",
    secondaryImage: "volunteeringDetail",
    secondaryImageAlt: "Young volunteers taking part in a youth leadership programme",
    offerings: [
      {
        icon: "Heart",
        title: "Community Service Training",
        description:
          "Programs designed to train volunteers in effective community service and social impact initiatives.",
      },
      {
        icon: "HeartHandshake",
        title: "NGO Partnerships",
        description:
          "Collaborative volunteering programs with NGOs focused on skill development and community empowerment.",
      },
      {
        icon: "Smile",
        title: "Youth Volunteering",
        description:
          "Structured programs engaging youth in meaningful volunteer work while developing leadership and social skills.",
      },
      {
        icon: "TreePine",
        title: "Sustainability Initiatives",
        description:
          "Environmental and sustainability-focused volunteering programs promoting eco-conscious practices and awareness.",
      },
    ],
  },
  {
    slug: "remote",
    value: "remote",
    name: "Remote",
    navLabel: "Remote Programs",
    intro:
      "Learn from anywhere with our flexible remote training programs. Access world-class education and skill development without geographical limitations.",
    cta: "Explore Remote Programs",
    image: "remoteHero",
    imageAlt: "Distributed team learning together over laptops",
    secondaryImage: "remoteDetail",
    secondaryImageAlt: "Learner working through a self-paced course",
    offerings: [
      {
        icon: "Laptop",
        title: "Online Training Courses",
        description:
          "Comprehensive online training programs accessible from anywhere, designed for flexible learning and skill development.",
      },
      {
        icon: "Video",
        title: "Virtual Workshops",
        description:
          "Interactive virtual workshops and webinars featuring industry experts and hands-on learning experiences.",
      },
      {
        icon: "Calendar",
        title: "Self-Paced Learning",
        description:
          "Flexible self-paced courses that allow learners to progress at their own speed while maintaining quality outcomes.",
      },
      {
        icon: "Cloud",
        title: "Hybrid Programs",
        description:
          "Blended learning programs combining online flexibility with occasional in-person sessions for optimal engagement.",
      },
    ],
  },
];

export const getProgram = (slug: string) => programs.find((p) => p.slug === slug);

/* ------------------------------------------------------------------ */
/* Why choose us                                                       */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* The 360.AI engine — how the model behind the programmes works       */
/* ------------------------------------------------------------------ */

export const aiEngine = {
  eyebrow: "The intelligence layer",
  heading: "Inside the",
  headingAccent: "360.AI engine",
  intro:
    "Every programme we run begins as data: the capability a role demands, the capability a person holds today, and the shortest credible route between the two. This is how that work is organised.",
  steps: [
    {
      index: "01",
      title: "Assess",
      caption: "Capability baseline",
      body: "Role requirements are mapped against current capability, so the gap is a measurable number long before anyone writes a curriculum.",
    },
    {
      index: "02",
      title: "Match",
      caption: "Neural Network Processing AI Model",
      body: "That gap is matched across seven programme tracks and twenty-eight offerings to assemble the shortest credible route to competence.",
    },
    {
      index: "03",
      title: "Track",
      caption: "Outcome trajectory",
      body: "Progress is measured through the cohort, not only at the end of it — assessment, certification and placement all feed back into the model.",
    },
  ],
  /* Lines for the processing readout. Process steps, not performance claims. */
  ticker: [
    "initialising capability map",
    "reading role requirements",
    "scoring gap across 28 offerings",
    "assembling cohort curriculum",
    "projecting time to competence",
    "scheduling assessment checkpoints",
    "handing off to placement",
  ],
  /* Illustrative capability baseline used by the Assess panel. */
  capability: [
    { label: "Technical", current: 42, required: 88 },
    { label: "Process", current: 58, required: 82 },
    { label: "Digital", current: 35, required: 76 },
    { label: "Leadership", current: 46, required: 70 },
    { label: "Safety", current: 64, required: 95 },
  ],
  /* Illustrative competence curve used by the Track panel. */
  trajectory: [8, 19, 27, 41, 52, 63, 71, 80, 86, 91],
  disclaimer: "Diagrams illustrate the model. They are not live client data.",
  visionHud: "360.AI VISION",
};

export const whyUs = {
  heading: "Why Choose",
  headingAccent: "TALENTIC 360.AI LLP",
  intro:
    "Experience the difference with a training partner committed to excellence, innovation, and your success.",
  reasons: [
    {
      icon: "Star",
      title: "Market Leadership",
      description:
        "Recognized as the leading provider of comprehensive training and apprenticeship programs across multiple sectors.",
    },
    {
      icon: "Zap",
      title: "Innovative Approach",
      description:
        "Cutting-edge training methodologies combining technology, practical application, and industry best practices.",
    },
    {
      icon: "Shield",
      title: "Proven Track Record",
      description:
        "Thousands of successful placements and career transformations backed by industry partnerships and recognition.",
    },
    {
      icon: "Users",
      title: "Expert Faculty",
      description:
        "Learn from industry professionals and subject matter experts with real-world experience and deep domain knowledge.",
    },
    {
      icon: "TrendingUp",
      title: "Career Growth",
      description:
        "Structured pathways for career advancement with ongoing support, mentorship, and placement assistance.",
    },
    {
      icon: "CircleCheck",
      title: "Quality Assurance",
      description:
        "Industry-recognized certifications and rigorous quality standards ensuring excellent learning outcomes.",
    },
  ],
  stats: [
    { number: "10,000+", value: 10000, suffix: "+", label: "Trained Professionals" },
    { number: "500+", value: 500, suffix: "+", label: "Corporate Partners" },
    { number: "95%", value: 95, suffix: "%", label: "Placement Rate" },
  ],
};

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const contact = {
  heading: "Get in",
  headingAccent: "Touch",
  intro:
    "Ready to transform your career or workforce? Contact us today to discuss how we can help you achieve your goals.",
  infoTitle: "Contact Information",
  officeHoursTitle: "Office Hours",
  details: [
    { icon: "Mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: "Phone", label: "Phone", value: site.phone, href: site.phoneHref },
    { icon: "MapPin", label: "Location", value: site.location, href: null },
  ],
  form: {
    fields: {
      name: { label: "Full Name", placeholder: "John Doe" },
      email: { label: "Email Address", placeholder: "john@example.com" },
      phone: { label: "Phone Number", placeholder: "+91 XXX XXX XXXX" },
      program: { label: "Program Interest", placeholder: "Select a program" },
      message: { label: "Message", placeholder: "Tell us about your requirements..." },
    },
    submit: "Send Message",
    successTitle: "Message Sent Successfully!",
    successBody: "We've received your inquiry and will contact you shortly.",
  },
  storageKey: "talentic_submissions",
};

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Contact", href: "/contact" },
  ],
  programLinks: [
    { label: "Academic Programs", href: "/programs/academic" },
    { label: "Vocational Programs", href: "/programs/vocational" },
    { label: "Corporate Programs", href: "/programs/corporate" },
    { label: "Remote Programs", href: "/programs/remote" },
  ],
  socials: [
    { icon: "Facebook", href: "#", label: "Facebook" },
    { icon: "Twitter", href: "#", label: "Twitter" },
    { icon: "Linkedin", href: "#", label: "LinkedIn" },
    { icon: "Instagram", href: "#", label: "Instagram" },
  ],
  poweredBy: [
    { label: "Next.js 15", icon: "CodeXml" },
    { label: "React 19", icon: "Atom" },
    { label: "Tailwind CSS", icon: "Palette" },
    { label: "Framer Motion", icon: "Layers" },
    { label: "TypeScript", icon: "Waypoints" },
  ],
  compliance: [
    { label: "WCAG 2.1 AA", icon: "Accessibility" },
    { label: "SSL Secure", icon: "ShieldCheck" },
    { label: "High Performance", icon: "Zap" },
    { label: "Open Source", icon: "GitBranch" },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

/* ------------------------------------------------------------------ */
/* Admin                                                               */
/* ------------------------------------------------------------------ */

export const admin = {
  loginTitle: "Admin Portal",
  loginSubtitle: "Please authenticate to continue",
  usernameLabel: "Username",
  usernamePlaceholder: "Enter username",
  passwordLabel: "Password",
  passwordPlaceholder: "Enter password",
  submit: "Access Dashboard",
  back: "Return to Website",
  successTitle: "Login Successful",
  successBody: "Welcome back, Admin!",
  failTitle: "Access Denied",
  failBody: "Invalid credentials. Please try again.",
  dashboardTitle: "Admin Dashboard",
  role: "Administrator",
  logout: "Logout",
  submissionsTitle: "Contact Submissions",
  submissionsSubtitle: "Manage and view all incoming inquiries from the website.",
  stats: ["Total Inquiries", "Academic Interests", "Corporate Interests"],
  searchPlaceholder: "Search by name, email or program...",
  tableHead: ["Date", "Name", "Contact", "Program Interest", "Message"],
  empty: "No submissions found.",
  sessionKey: "talentic_admin_logged_in",
};

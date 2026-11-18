import {
  BilingualText,
  ProcessStep,
  ProjectCategory,
  ProjectItem,
  ServiceItem,
  SkillGroup,
  SocialChannel,
} from '../types/portfolio';

/**
 * Editable Brand, Portrait & Contact Configuration
 * ------------------------------------------------
 * 1. To add your professional portrait:
 *    Place your image file at `/public/assets/shakil-portrait.png`
 *    (it will be served at `/assets/shakil-portrait.png`).
 *    Adjust `objectPosition` below (e.g. '50% 20%' or 'center top') to refine cropping.
 *
 * 2. To activate social links or WhatsApp:
 *    Replace `null` with your verified profile URL (e.g., 'https://linkedin.com/in/your-handle')
 *    or WhatsApp link ('https://wa.me/8801XXXXXXXXX').
 *
 * 3. To display confirmed marketing tools:
 *    Add tool names into `CONFIRMED_TOOLS` once finalized.
 */
export const PORTFOLIO_CONFIG = {
  brandName: 'DG MARKETER SK',
  fullName: 'SK Shakil Hussain',
  email: 'dgmarketersk@gmail.com',
  portrait: {
    src: '/assets/aistudio/Untitled_Design_600b6f56.png',
    objectPosition: '50% 15%',
  },
  heroBackgroundImage: '/src/assets/images/hero_abstract_1794979008004.jpg',
};

export const CONFIRMED_TOOLS: string[] = [
  // Example when confirmed: 'Meta Ads Manager', 'Google Ads', 'Google Analytics'
];

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    url: 'https://wa.me/8801611052552',
    note: {
      en: '+880 1611052552',
      bn: '+880 1611052552',
    },
  },
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://www.facebook.com/skshakilhussain01',
    note: {
      en: 'Verified profile',
      bn: 'যাচাইকৃত প্রোফাইল',
    },
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/skshakilhussain/',
    note: {
      en: 'Verified profile',
      bn: 'যাচাইকৃত প্রোফাইল',
    },
  },
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/skshakilhussain3/',
    note: {
      en: 'Verified profile',
      bn: 'যাচাইকৃত প্রোফাইল',
    },
  },
  {
    id: 'fiverr',
    name: 'Fiverr',
    url: 'https://www.fiverr.com/skshakilhussain',
    note: {
      en: 'Verified profile',
      bn: 'যাচাইকৃত প্রোফাইল',
    },
  },
];

export const NAV_ITEMS: Array<{ id: string; label: BilingualText }> = [
  { id: 'home', label: { en: 'Home', bn: 'হোম' } },
  { id: 'about', label: { en: 'About', bn: 'পরিচিতি' } },
  { id: 'services', label: { en: 'Services', bn: 'সার্ভিস' } },
  { id: 'studio-3d', label: { en: '3D Stage', bn: '৩ডি স্টেজ' } },
  { id: 'ai-studio', label: { en: 'AI Studio', bn: 'এআই স্টুডিও' } },
  { id: 'projects', label: { en: 'Projects', bn: 'প্রজেক্ট' } },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'social-media-marketing',
    number: '01',
    iconName: 'share2',
    title: {
      en: 'Social Media Marketing',
      bn: 'Social Media Marketing',
    },
    description: {
      en: 'Strategic social media planning to help brands communicate consistently and connect with their target audience.',
      bn: 'ব্র্যান্ডের জন্য পরিকল্পিত সোশ্যাল মিডিয়া কৌশল, কনটেন্ট পরিকল্পনা এবং সঠিক অডিয়েন্সের সঙ্গে যোগাযোগ উন্নত করার কাজ।',
    },
    focusPoints: {
      en: ['Audience positioning', 'Content theme direction', 'Channel consistency'],
      bn: ['অডিয়েন্স নির্ধারণ', 'কনটেন্ট থিম পরিকল্পনা', 'ধারাবাহিক ব্র্যান্ড উপস্থিতি'],
    },
  },
  {
    id: 'facebook-instagram-ads',
    number: '02',
    iconName: 'megaphone',
    title: {
      en: 'Facebook & Instagram Ads',
      bn: 'Facebook & Instagram Ads',
    },
    description: {
      en: 'Campaign planning, audience targeting, creative direction, advertising setup, and campaign optimization.',
      bn: 'উপযুক্ত অডিয়েন্স নির্বাচন, বিজ্ঞাপনের ক্রিয়েটিভ পরিকল্পনা, ক্যাম্পেইন সেটআপ এবং অপটিমাইজেশন।',
    },
    focusPoints: {
      en: ['Campaign structure', 'Audience segmentation', 'Ad creative variations'],
      bn: ['ক্যাম্পেইন কাঠামো', 'অডিয়েন্স সেগমেন্টেশন', 'বিজ্ঞাপন ক্রিয়েটিভ ভ্যারিয়েশন'],
    },
  },
  {
    id: 'seo',
    number: '03',
    iconName: 'search',
    title: {
      en: 'Search Engine Optimization (SEO)',
      bn: 'Search Engine Optimization (SEO)',
    },
    description: {
      en: 'On-page SEO, keyword research, content optimization, and website search visibility improvements.',
      bn: 'ওয়েবসাইটের কনটেন্ট ও অন-পেজ SEO উন্নত করে সার্চে সহজে খুঁজে পাওয়ার উপযোগী করার কাজ।',
    },
    focusPoints: {
      en: ['Keyword & topic mapping', 'On-page structure', 'Search-friendly content'],
      bn: ['কিওয়ার্ড ও টপিক ম্যাপিং', 'অন-পেজ অপটিমাইজেশন', 'সার্চ-উপযোগী কনটেন্ট'],
    },
  },
  {
    id: 'google-ads',
    number: '04',
    iconName: 'target',
    title: {
      en: 'Google Ads',
      bn: 'Google Ads',
    },
    description: {
      en: 'Google advertising campaign planning and setup to connect businesses with people searching for relevant products or services.',
      bn: 'প্রাসঙ্গিক পণ্য বা সার্ভিস খুঁজছেন এমন মানুষের কাছে পৌঁছানোর জন্য Google Ads ক্যাম্পেইন পরিকল্পনা ও সেটআপ।',
    },
    focusPoints: {
      en: ['Search intent alignment', 'Ad group structure', 'Keyword targeting'],
      bn: ['সার্চ ইনটেন্ট অনুযায়ী পরিকল্পনা', 'অ্যাড গ্রুপ বিন্যাস', 'প্রাসঙ্গিক কিওয়ার্ড টার্গেটিং'],
    },
  },
  {
    id: 'social-media-management',
    number: '05',
    iconName: 'calendarCheck',
    title: {
      en: 'Social Media Management',
      bn: 'Social Media Management',
    },
    description: {
      en: 'Social media content planning, publishing coordination, page management, and audience engagement support.',
      bn: 'কনটেন্ট পরিকল্পনা, পোস্টিং সমন্বয়, পেজ পরিচালনা এবং অডিয়েন্স এনগেজমেন্টে সহায়তা।',
    },
    focusPoints: {
      en: ['Publishing calendar', 'Page upkeep & hygiene', 'Community interaction'],
      bn: ['পাবলিশিং ক্যালেন্ডার', 'পেজ ব্যবস্থাপনা', 'অডিয়েন্স এনগেজমেন্ট'],
    },
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'strategy',
    title: {
      en: 'Strategy & Planning',
      bn: 'কৌশল ও পরিকল্পনা',
    },
    items: [
      { en: 'Digital Marketing Strategy', bn: 'ডিজিটাল মার্কেটিং কৌশল' },
      { en: 'Social Media Marketing', bn: 'সোশ্যাল মিডিয়া মার্কেটিং' },
      { en: 'Content Planning', bn: 'কনটেন্ট পরিকল্পনা' },
    ],
  },
  {
    id: 'paid-media',
    title: {
      en: 'Paid Advertising',
      bn: 'পেইড বিজ্ঞাপন',
    },
    items: [
      { en: 'Facebook Ads', bn: 'Facebook Ads' },
      { en: 'Instagram Ads', bn: 'Instagram Ads' },
      { en: 'Google Ads', bn: 'Google Ads' },
      { en: 'Audience Targeting', bn: 'অডিয়েন্স টার্গেটিং' },
    ],
  },
  {
    id: 'search-management',
    title: {
      en: 'Search & Operations',
      bn: 'সার্চ ও পেজ পরিচালনা',
    },
    items: [
      { en: 'SEO & On-Page Optimization', bn: 'SEO ও অন-পেজ অপটিমাইজেশন' },
      { en: 'Social Media Management', bn: 'সোশ্যাল মিডিয়া ম্যানেজমেন্ট' },
      { en: 'Campaign Optimization', bn: 'ক্যাম্পেইন অপটিমাইজেশন' },
    ],
  },
];

export const PROJECT_FILTERS: Array<{ id: ProjectCategory; label: BilingualText }> = [
  { id: 'all', label: { en: 'All Concepts', bn: 'সব প্রজেক্ট' } },
  {
    id: 'social-media-marketing',
    label: { en: 'Social Media Marketing', bn: 'সোশ্যাল মিডিয়া মার্কেটিং' },
  },
  {
    id: 'paid-ads',
    label: { en: 'Facebook & Instagram Ads', bn: 'Facebook & Instagram Ads' },
  },
  { id: 'seo', label: { en: 'SEO', bn: 'SEO' } },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'local-business-social-campaign',
    category: 'social-media-marketing',
    categoryLabel: {
      en: 'Social Media Marketing',
      bn: 'Social Media Marketing',
    },
    projectTypeLabel: {
      en: 'Practice Project',
      bn: 'Practice Project',
    },
    title: {
      en: 'Local Business Social Media Campaign',
      bn: 'লোকাল বিজনেস সোশ্যাল মিডিয়া ক্যাম্পেইন',
    },
    shortDescription: {
      en: 'A sample social media campaign concept for a local business, including content planning, audience direction, and creative mockups.',
      bn: 'একটি স্থানীয় ব্যবসার জন্য নমুনা সোশ্যাল মিডিয়া ক্যাম্পেইন কনসেপ্ট—যেখানে কনটেন্ট পরিকল্পনা, অডিয়েন্স দিকনির্দেশনা ও ক্রিয়েটিভ মকআপ দেখানো হয়েছে।',
    },
    image: '/src/assets/images/project_social_campaign_1794979009965.jpg',
    imageAlt: {
      en: 'Practice project mockup showing a local business social media content calendar and mobile feed preview',
      bn: 'লোকাল বিজনেস সোশ্যাল মিডিয়া কনটেন্ট ক্যালেন্ডার এবং মোবাইল ফিড প্রিভিউয়ের প্র্যাকটিস প্রজেক্ট মকআপ',
    },
    aspectClass: 'aspect-[4/5]',
    overview: {
      en: 'Designed as a structured workflow demonstration for a hypothetical local retail brand looking to organize consistent weekly storytelling, community highlights, and product spotlights.',
      bn: 'একটি কাল্পনিক স্থানীয় ব্যবসার সাপ্তাহিক কনটেন্ট পরিকল্পনা, কমিউনিটি এনগেজমেন্ট এবং প্রোডাক্ট উপস্থাপনাকে সুসংগঠিত করার নমুনা কাঠামো হিসেবে তৈরি।',
    },
    scopeDeliverables: {
      en: [
        'Monthly content pillar framework (Storytelling, Product Spotlight, Community)',
        'Weekly publishing cadence and visual feed grid alignment',
        'Sample post direction tailored for local audience discovery',
      ],
      bn: [
        'মাসিক কনটেন্ট পিলার কাঠামো (স্টোরিটেলিং, প্রোডাক্ট স্পটলাইট, কমিউনিটি)',
        'সাপ্তাহিক পাবলিশিং শিডিউল এবং ভিজ্যুয়াল ফিড বিন্যাস',
        'স্থানীয় অডিয়েন্সের উপযোগী পোস্ট কনসেপ্ট পরিকল্পনা',
      ],
    },
    disclaimer: {
      en: 'Practice Project — Created strictly as a demonstration of campaign planning and workflow structure. Not an active or historical client engagement.',
      bn: 'Practice Project — এটি কেবল ক্যাম্পেইন পরিকল্পনা ও কাজের পদ্ধতি প্রদর্শনের জন্য তৈরি নমুনা কাজ, কোনো বাস্তব ক্লায়েন্ট প্রজেক্ট নয়।',
    },
  },
  {
    id: 'ecommerce-ad-campaign',
    category: 'paid-ads',
    categoryLabel: {
      en: 'Facebook & Instagram Ads',
      bn: 'Facebook & Instagram Ads',
    },
    projectTypeLabel: {
      en: 'Concept Campaign',
      bn: 'Concept Campaign',
    },
    title: {
      en: 'E-commerce Advertising Campaign',
      bn: 'ই-কমার্স বিজ্ঞাপন ক্যাম্পেইন কনসেপ্ট',
    },
    shortDescription: {
      en: 'A hypothetical advertising campaign concept featuring creative variations, audience targeting ideas, and a sample campaign structure.',
      bn: 'ই-কমার্স ব্যবসার জন্য একটি কাল্পনিক বিজ্ঞাপন ক্যাম্পেইন কনসেপ্ট, যেখানে ক্রিয়েটিভ ভ্যারিয়েশন, অডিয়েন্স টার্গেটিং এবং ক্যাম্পেইন কাঠামো সাজানো হয়েছে।',
    },
    image: '/src/assets/images/project_ad_campaign_1794979010980.jpg',
    imageAlt: {
      en: 'Concept campaign mockup presenting two e-commerce paid social ad creative variations on mobile screens',
      bn: 'মোবাইল স্ক্রিনে দুটি ই-কমার্স পেইড সোশ্যাল বিজ্ঞাপন ক্রিয়েটিভ ভ্যারিয়েশনের কনসেপ্ট ক্যাম্পেইন মকআপ',
    },
    aspectClass: 'aspect-[4/5]',
    overview: {
      en: 'An illustrative paid social advertising blueprint outlining how an online store can organize prospecting vs. remarketing ad sets and test distinct visual messaging angles.',
      bn: 'একটি অনলাইন স্টোরের জন্য নতুন অডিয়েন্স ও রিটার্গেটিং অডিয়েন্সের আলাদা ক্যাম্পেইন কাঠামো এবং ভিজ্যুয়াল মেসেজিং পরীক্ষার নমুনা পরিকল্পনা।',
    },
    scopeDeliverables: {
      en: [
        'Two contrasting ad creative & copy angles for creative testing',
        'Structured funnel layout separating cold discovery and warm follow-up',
        'Primary text, headline, and CTA hierarchy breakdown',
      ],
      bn: [
        'টেস্টিংয়ের জন্য দুটি ভিন্নধর্মী বিজ্ঞাপন ক্রিয়েটিভ ও কপি অ্যাঙ্গেল',
        'নতুন ও আগ্রহী অডিয়েন্সের জন্য পৃথক ফানেল কাঠামো',
        'প্রাইমারি টেক্সট, হেডলাইন ও CTA বিন্যাস',
      ],
    },
    disclaimer: {
      en: 'Concept Campaign — Hypothetical creative and campaign architecture sample with no fabricated performance figures or ROAS claims.',
      bn: 'Concept Campaign — এটি একটি কাল্পনিক ক্যাম্পেইন কাঠামোর নমুনা; এতে কোনো অনুমাননির্ভর ফলাফল বা বিক্রয়ের দাবি যুক্ত করা হয়নি।',
    },
  },
  {
    id: 'seo-content-strategy',
    category: 'seo',
    categoryLabel: {
      en: 'SEO',
      bn: 'SEO',
    },
    projectTypeLabel: {
      en: 'Practice Project',
      bn: 'Practice Project',
    },
    title: {
      en: 'SEO Content Strategy',
      bn: 'SEO কনটেন্ট কৌশল',
    },
    shortDescription: {
      en: 'A sample SEO strategy demonstrating keyword research concepts, topic mapping, content planning, and on-page optimization.',
      bn: 'কিওয়ার্ড রিসার্চ ধারণা, টপিক ম্যাপিং, কনটেন্ট পরিকল্পনা এবং অন-পেজ অপটিমাইজেশন প্রদর্শনের জন্য একটি নমুনা SEO কৌশল।',
    },
    image: '/src/assets/images/project_seo_plan_1794979010696.jpg',
    imageAlt: {
      en: 'Practice project wireframe displaying an SEO topic cluster map, content outline cards, and search structure',
      bn: 'SEO টপিক ক্লাস্টার ম্যাপ, কনটেন্ট আউটলাইন কার্ড এবং সার্চ কাঠামো প্রদর্শনকারী প্র্যাকটিস প্রজেক্ট ভিজ্যুয়াল',
    },
    aspectClass: 'aspect-[16/10]',
    overview: {
      en: 'A foundational search-visibility model illustrating how pillar topics, supporting articles, internal linking paths, and clean on-page elements work together for organic discoverability.',
      bn: 'পিলার টপিক, সহায়ক আর্টিকেল, ইন্টারনাল লিংকিং এবং অন-পেজ উপাদানগুলো একসাথে কীভাবে একটি ওয়েবসাইটের সার্চ দৃশ্যমানতা গঠনে সাহায্য করে তার নমুনা কাঠামো।',
    },
    scopeDeliverables: {
      en: [
        'Hub-and-spoke topic cluster architecture around core buyer questions',
        'Page title, meta description, H1–H3 heading, and URL structure checklist',
        'Internal linking blueprint connecting informational posts to service pages',
      ],
      bn: [
        'মূল বিষয় ও সহায়ক প্রশ্নের ভিত্তিতে টপিক ক্লাস্টার আর্কিটেকচার',
        'পেজ টাইটেল, মেটা ডেসক্রিপশন, হেডিং (H1–H3) ও URL চেকলিস্ট',
        'তথ্যমূলক পোস্ট থেকে সার্ভিস পেজে ইন্টারনাল লিংকিং পরিকল্পনা',
      ],
    },
    disclaimer: {
      en: 'Practice Project — Sample SEO planning framework created for portfolio demonstration without fabricated traffic or ranking metrics.',
      bn: 'Practice Project — পোর্টফোলিও প্রদর্শনের জন্য তৈরি নমুনা SEO কাঠামো; এতে কোনো কাল্পনিক ট্রাফিক বা র‍্যাংকিং সংখ্যা ব্যবহার করা হয়নি।',
    },
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: { en: 'Discover', bn: 'Discover' },
    subtitle: { en: 'Understand & Audit', bn: 'বুঝে নেওয়া' },
    description: {
      en: 'Understand the business, target audience, objectives, and challenges.',
      bn: 'ব্যবসা, টার্গেট অডিয়েন্স, লক্ষ্য এবং বর্তমান চ্যালেঞ্জগুলো স্পষ্টভাবে বোঝা।',
    },
  },
  {
    number: '02',
    title: { en: 'Plan', bn: 'Plan' },
    subtitle: { en: 'Strategy & Direction', bn: 'পরিকল্পনা' },
    description: {
      en: 'Develop an appropriate digital marketing strategy and campaign plan.',
      bn: 'উপযুক্ত প্ল্যাটফর্ম, কনটেন্ট এবং ক্যাম্পেইন কৌশল ও রোডম্যাপ তৈরি করা।',
    },
  },
  {
    number: '03',
    title: { en: 'Execute', bn: 'Execute' },
    subtitle: { en: 'Prepare & Launch', bn: 'বাস্তবায়ন' },
    description: {
      en: 'Prepare and implement the agreed marketing activities.',
      bn: 'নির্ধারিত পরিকল্পনা অনুযায়ী কনটেন্ট, বিজ্ঞাপন ও মার্কেটিং কার্যক্রম পরিচালনা করা।',
    },
  },
  {
    number: '04',
    title: { en: 'Optimize', bn: 'Optimize' },
    subtitle: { en: 'Review & Refine', bn: 'উন্নয়ন' },
    description: {
      en: 'Review available data and refine the marketing approach.',
      bn: 'প্রাপ্ত ডেটা ও ফলাফল পর্যালোচনা করে ধাপে ধাপে কৌশল আরও উন্নত করা।',
    },
  },
];

export const UI_COPY = {
  nav: {
    cta: { en: "Let's Talk", bn: 'কথা বলুন' },
    openMenu: { en: 'Open navigation menu', bn: 'মেনু খুলুন' },
    closeMenu: { en: 'Close navigation menu', bn: 'মেনু বন্ধ করুন' },
  },
  hero: {
    kicker: {
      en: 'DG MARKETER SK · Digital Marketing Specialist',
      bn: 'DG MARKETER SK · ডিজিটাল মার্কেটিং স্পেশালিস্ট',
    },
    headline: {
      en: 'Helping Brands Grow Their Digital Presence',
      bn: 'আপনার ব্র্যান্ডের অনলাইন উপস্থিতি আরও শক্তিশালী করতে',
    },
    subheadline: {
      en: 'I help businesses build a stronger online presence through strategic digital marketing, advertising, SEO, and social media management.',
      bn: 'আমি পরিকল্পিত ডিজিটাল মার্কেটিং কৌশল, পেইড বিজ্ঞাপন, SEO এবং সোশ্যাল মিডিয়া ম্যানেজমেন্টের মাধ্যমে ব্যবসাকে সঠিক অডিয়েন্সের সঙ্গে যুক্ত হতে সহায়তা করি।',
    },
    primaryCta: {
      en: "Let's Work Together",
      bn: 'কাজ নিয়ে আলোচনা করুন',
    },
    secondaryCta: {
      en: 'View My Projects',
      bn: 'প্রজেক্ট দেখুন',
    },
    identityLine: {
      en: 'SK Shakil Hussain · Digital Marketing Specialist · Serving Local & International Businesses',
      bn: 'SK Shakil Hussain · ডিজিটাল মার্কেটিং স্পেশালিস্ট · দেশীয় ও আন্তর্জাতিক ব্যবসার জন্য',
    },
    portraitPlaceholderTitle: {
      en: 'SK Shakil Hussain',
      bn: 'SK Shakil Hussain',
    },
    portraitPlaceholderRole: {
      en: 'Digital Marketing Specialist',
      bn: 'ডিজিটাল মার্কেটিং স্পেশালিস্ট',
    },
    portraitPlaceholderHint: {
      en: 'Portrait space ready · Replace /public/assets/shakil-portrait.png',
      bn: 'প্রোফাইল ছবির স্থান · /public/assets/shakil-portrait.png যুক্ত করুন',
    },
  },
  about: {
    eyebrow: { en: 'About', bn: 'পরিচিতি' },
    heading: { en: 'About Me', bn: 'আমার সম্পর্কে' },
    paragraph: {
      en: "I'm SK Shakil Hussain, a Digital Marketing Specialist focused on helping businesses strengthen their online presence. I work across social media marketing, paid advertising, SEO, and social media management. My approach is to understand a business's goals, plan suitable strategies, and create campaigns and content with clear objectives.",
      bn: 'আমি SK Shakil Hussain, একজন Digital Marketing Specialist। সোশ্যাল মিডিয়া মার্কেটিং, পেইড বিজ্ঞাপন, SEO এবং সোশ্যাল মিডিয়া ম্যানেজমেন্ট নিয়ে কাজ করি। প্রথমে ব্যবসার লক্ষ্য ও অডিয়েন্স বুঝে, তারপর স্পষ্ট উদ্দেশ্য নিয়ে উপযুক্ত কৌশল, কনটেন্ট ও ক্যাম্পেইন তৈরি করাই আমার কাজের পদ্ধতি।',
    },
    pillarsTitle: {
      en: 'Core Areas of Focus',
      bn: 'কাজের মূল ক্ষেত্রসমূহ',
    },
    pillars: {
      en: [
        { label: 'Audience-First Strategy', detail: 'Aligning messaging with customer intent and business objectives.' },
        { label: 'Paid Campaign Structure', detail: 'Organized setup and continuous optimization for Facebook, Instagram, and Google Ads.' },
        { label: 'Search Visibility', detail: 'Practical keyword mapping and on-page SEO fundamentals.' },
        { label: 'Consistent Page Management', detail: 'Structured planning, publishing coordination, and audience engagement.' },
      ],
      bn: [
        { label: 'অডিয়েন্স-কেন্দ্রিক কৌশল', detail: 'ব্যবসার লক্ষ্য এবং গ্রাহকের চাহিদার সঙ্গে সামঞ্জস্যপূর্ণ পরিকল্পনা।' },
        { label: 'সুবিন্যস্ত পেইড ক্যাম্পেইন', detail: 'Facebook, Instagram এবং Google Ads-এর জন্য পরিকল্পিত সেটআপ ও অপটিমাইজেশন।' },
        { label: 'সার্চ দৃশ্যমানতা', detail: 'প্রাসঙ্গিক কিওয়ার্ড ম্যাপিং ও অন-পেজ SEO উন্নয়ন।' },
        { label: 'নিয়মিত পেজ ব্যবস্থাপনা', detail: 'কনটেন্ট পরিকল্পনা, প্রকাশনা সমন্বয় ও অডিয়েন্স এনগেজমেন্ট।' },
      ],
    },
  },
  services: {
    eyebrow: { en: 'Services', bn: 'সার্ভিসসমূহ' },
    heading: { en: 'My Services', bn: 'আমার সার্ভিসসমূহ' },
    subheading: {
      en: 'Digital marketing solutions designed to help businesses build visibility, connect with their audience, and strengthen their online presence.',
      bn: 'ব্যবসার অনলাইন পরিচিতি বাড়ানো, সঠিক অডিয়েন্সের কাছে পৌঁছানো এবং ডিজিটাল উপস্থিতি শক্তিশালী করার জন্য পরিকল্পিত মার্কেটিং সমাধান।',
    },
    discussCta: {
      en: 'Inquire about this service',
      bn: 'এই সার্ভিস সম্পর্কে জানুন',
    },
  },
  skills: {
    eyebrow: { en: 'Capabilities', bn: 'দক্ষতা' },
    heading: { en: 'Skills & Focus Areas', bn: 'দক্ষতা ও কাজের ক্ষেত্র' },
    subheading: {
      en: 'Core disciplines practiced across strategy, paid advertising, organic search, and social media operations.',
      bn: 'স্ট্র্যাটেজি, পেইড বিজ্ঞাপন, অর্গানিক সার্চ এবং সোশ্যাল মিডিয়া পরিচালনার মূল দক্ষতাসমূহ।',
    },
    toolsHeading: {
      en: 'Tools & Platforms',
      bn: 'টুলস ও প্ল্যাটফর্ম',
    },
    toolsPlaceholderNote: {
      en: 'Confirmed platform stack and software tools will be displayed here once finalized. No unverified certifications or inflated proficiency scores are shown.',
      bn: 'নিশ্চিতকৃত প্ল্যাটফর্ম ও সফটওয়্যার টুলসের তালিকা চূড়ান্ত হলে এখানে যুক্ত করা হবে। কোনো অপ্রমাণিত সার্টিফিকেশন বা কাল্পনিক স্কোর দেখানো হয়নি।',
    },
  },
  projects: {
    eyebrow: { en: 'Portfolio Concepts', bn: 'পোর্টফোলিও নমুনা' },
    heading: { en: 'Selected Projects', bn: 'নির্বাচিত প্রজেক্ট' },
    subheading: {
      en: 'A collection of practice and concept projects created to demonstrate digital marketing strategies, creative direction, campaign planning, and marketing workflows.',
      bn: 'ডিজিটাল মার্কেটিং কৌশল, ক্রিয়েটিভ দিকনির্দেশনা, ক্যাম্পেইন পরিকল্পনা এবং কাজের প্রক্রিয়া প্রদর্শনের জন্য তৈরি প্র্যাকটিস ও কনসেপ্ট প্রজেক্টের সংকলন।',
    },
    viewDetails: { en: 'View Project Scope', bn: 'বিস্তারিত দেখুন' },
    modalOverviewTitle: { en: 'Concept Overview', bn: 'কনসেপ্ট সারসংক্ষেপ' },
    modalDeliverablesTitle: { en: 'Included Workflow Scope', bn: 'কাজের পরিধি ও ধাপ' },
    modalDiscussCta: { en: 'Discuss a Similar Approach', bn: 'অনুরূপ কৌশল নিয়ে আলোচনা করুন' },
    modalClose: { en: 'Close modal', bn: 'বন্ধ করুন' },
  },
  process: {
    eyebrow: { en: 'Workflow', bn: 'কাজের প্রক্রিয়া' },
    heading: { en: 'My Work Process', bn: 'আমার কাজের ধাপ' },
    subheading: {
      en: 'A clear, structured workflow from initial discovery to ongoing campaign refinement.',
      bn: 'ব্যবসা বোঝা থেকে শুরু করে কৌশল প্রণয়ন, বাস্তবায়ন ও ধারাবাহিক উন্নয়নের একটি সুস্পষ্ট প্রক্রিয়া।',
    },
  },
  contact: {
    eyebrow: { en: 'Contact', bn: 'যোগাযোগ' },
    heading: { en: "Let's Discuss Your Project", bn: 'আপনার প্রজেক্ট নিয়ে আলোচনা করতে চান?' },
    subheading: {
      en: 'Have a business or project in mind? Let us discuss how digital marketing can help support your goals.',
      bn: 'আপনার ব্যবসা বা প্রজেক্ট নিয়ে কোনো পরিকল্পনা আছে? ডিজিটাল মার্কেটিং কীভাবে আপনার লক্ষ্য পূরণে সহায়তা করতে পারে, তা নিয়ে কথা বলতে পারেন।',
    },
    directEmailLabel: { en: 'Direct Email', bn: 'সরাসরি ইমেইল' },
    emailCta: { en: 'Send an Email', bn: 'ইমেইল করুন' },
    copyEmail: { en: 'Copy Email', bn: 'ইমেইল কপি করুন' },
    copiedEmail: { en: 'Copied', bn: 'কপি হয়েছে' },
    socialHeading: { en: 'Social & Freelance Profiles', bn: 'সোশ্যাল ও ফ্রিল্যান্স প্রোফাইল' },
    socialPendingNotice: {
      en: 'Only verified channels are linked. Pending profiles will become clickable once real links are added.',
      bn: 'শুধুমাত্র যাচাইকৃত লিংকগুলোই সক্রিয় রাখা হয়েছে। প্রকৃত লিংক যুক্ত হলে বাকি প্রোফাইলগুলো চালু হবে।',
    },
    form: {
      nameLabel: { en: 'Your Name', bn: 'আপনার নাম' },
      namePlaceholder: { en: 'Enter your full name', bn: 'আপনার পূর্ণ নাম লিখুন' },
      emailLabel: { en: 'Email Address', bn: 'ইমেইল ঠিকানা' },
      emailPlaceholder: { en: 'you@example.com', bn: 'you@example.com' },
      serviceLabel: { en: 'Service Topic (Optional)', bn: 'সার্ভিস নির্বাচন (ঐচ্ছিক)' },
      serviceDefault: { en: 'General Inquiry', bn: 'সাধারণ জিজ্ঞাসা' },
      messageLabel: { en: 'Your Message', bn: 'আপনার বার্তা' },
      messagePlaceholder: {
        en: 'Tell me briefly about your business, goals, and what support you are looking for...',
        bn: 'আপনার ব্যবসা, লক্ষ্য এবং কী ধরনের মার্কেটিং সহায়তা প্রয়োজন তা সংক্ষেপে লিখুন...',
      },
      submitButton: { en: 'Prepare Message', bn: 'মেসেজ প্রস্তুত করুন' },
      disclaimer: {
        en: 'Note: This contact form is a front-end preview and is not connected to a backend mail server yet. Submitting prepares your message so you can send it directly via your email app.',
        bn: 'দ্রষ্টব্য: এই ফর্মটি এখনো কোনো ব্যাকএন্ড সার্ভারের সঙ্গে যুক্ত নয়। সাবমিট করলে আপনার মেসেজটি সরাসরি ইমেইল অ্যাপের মাধ্যমে পাঠানোর জন্য প্রস্তুত হবে।',
      },
      errors: {
        nameRequired: { en: 'Please enter your name.', bn: 'অনুগ্রহ করে আপনার নাম লিখুন।' },
        emailRequired: { en: 'Please enter your email address.', bn: 'অনুগ্রহ করে আপনার ইমেইল ঠিকানা লিখুন।' },
        emailInvalid: { en: 'Please enter a valid email address.', bn: 'অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা লিখুন।' },
        messageRequired: { en: 'Please write a short message about your project.', bn: 'অনুগ্রহ করে আপনার প্রজেক্ট সম্পর্কে সংক্ষেপে লিখুন।' },
        messageTooShort: { en: 'Please include at least 10 characters so I can understand your inquiry.', bn: 'অনুগ্রহ করে অন্তত ১০টি অক্ষরে আপনার বার্তা লিখুন।' },
      },
      readyTitle: {
        en: 'Message Prepared for Direct Email',
        bn: 'সরাসরি ইমেইলের জন্য মেসেজ প্রস্তুত',
      },
      readyDescription: {
        en: 'Because no automated backend server is connected yet, this message has not been sent automatically. Click below to open it in your email app or copy the formatted text.',
        bn: 'ব্যাকএন্ড সার্ভার যুক্ত না থাকায় এই বার্তাটি স্বয়ংক্রিয়ভাবে পাঠানো হয়নি। নিচের বাটনে ক্লিক করে সরাসরি আপনার ইমেইল অ্যাপে পাঠাতে বা টেক্সট কপি করতে পারেন।',
      },
      openMailClient: { en: 'Open in Email App', bn: 'ইমেইল অ্যাপে খুলুন' },
      copyFormatted: { en: 'Copy Message Text', bn: 'মেসেজ কপি করুন' },
      copiedFormatted: { en: 'Message Copied', bn: 'মেসেজ কপি হয়েছে' },
      editAgain: { en: 'Edit Message', bn: 'পুনরায় সম্পাদনা করুন' },
    },
  },
  footer: {
    role: {
      en: 'Digital Marketing Specialist',
      bn: 'ডিজিটাল মার্কেটিং স্পেশালিস্ট',
    },
    rights: {
      en: 'All rights reserved.',
      bn: 'সর্বস্বত্ব সংরক্ষিত।',
    },
  },
};

-- ==============================================================================
-- Migration: 20261109_shaibya_portfolio.sql
-- Dedicated Schema: shaibya_portfolio
-- NOTE: Does NOT touch public or auth schema. Completely isolated.
-- ==============================================================================

-- 1. Create Dedicated Schema
CREATE SCHEMA IF NOT EXISTS shaibya_portfolio;

-- 2. Grants for Schema Usage
GRANT USAGE ON SCHEMA shaibya_portfolio TO anon, authenticated, service_role;

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS shaibya_portfolio.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  tagline text NOT NULL,
  type text NOT NULL,
  industry text NOT NULL,
  client text NOT NULL,
  client_logo text,
  live_url text,
  year text NOT NULL,
  problem text NOT NULL,
  solution text NOT NULL,
  key_features jsonb DEFAULT '[]'::jsonb,
  tech_stack jsonb DEFAULT '[]'::jsonb,
  stats jsonb DEFAULT '[]'::jsonb,
  thumbnail text NOT NULL,
  thumbnail_alt text,
  image_caption text,
  screenshots jsonb DEFAULT '[]'::jsonb,
  brand_color text,
  testimonial jsonb,
  services_delivered jsonb DEFAULT '[]'::jsonb,
  tags jsonb DEFAULT '[]'::jsonb,
  featured boolean DEFAULT false,
  confidential boolean DEFAULT false,
  status text DEFAULT 'Production',
  collaborator text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 4. Testimonials Table
CREATE TABLE IF NOT EXISTS shaibya_portfolio.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  text text NOT NULL,
  author text NOT NULL,
  role text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 5. Team Members Table
CREATE TABLE IF NOT EXISTS shaibya_portfolio.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codename text NOT NULL,
  day_job text NOT NULL,
  night_skill text NOT NULL,
  location text NOT NULL,
  hover_quote text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL,
  image text,
  handle text,
  url text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 6. Careers Roles Table
CREATE TABLE IF NOT EXISTS shaibya_portfolio.careers_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id text UNIQUE NOT NULL,
  title text NOT NULL,
  team text NOT NULL,
  experience text NOT NULL,
  description text NOT NULL,
  responsibilities jsonb DEFAULT '[]'::jsonb,
  application_note text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 7. FAQs Table
CREATE TABLE IF NOT EXISTS shaibya_portfolio.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text DEFAULT 'general',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 8. Site Content (for key hero/stats/contact sections)
CREATE TABLE IF NOT EXISTS shaibya_portfolio.site_content (
  key text PRIMARY KEY,
  section text NOT NULL,
  data jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

-- 9. Enable RLS on All Tables in shaibya_portfolio
ALTER TABLE shaibya_portfolio.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE shaibya_portfolio.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE shaibya_portfolio.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE shaibya_portfolio.careers_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shaibya_portfolio.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE shaibya_portfolio.site_content ENABLE ROW LEVEL SECURITY;

-- 10. RLS Policies: Public Read Access
DO $$ BEGIN
  CREATE POLICY "Public Read Projects" ON shaibya_portfolio.projects FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public Read Testimonials" ON shaibya_portfolio.testimonials FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public Read Team" ON shaibya_portfolio.team_members FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public Read Careers" ON shaibya_portfolio.careers_roles FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public Read FAQs" ON shaibya_portfolio.faqs FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Public Read Site Content" ON shaibya_portfolio.site_content FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 11. RLS Policies: Service Role / Admin Write Access
DO $$ BEGIN
  CREATE POLICY "Admin Write Projects" ON shaibya_portfolio.projects FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Admin Write Testimonials" ON shaibya_portfolio.testimonials FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Admin Write Team" ON shaibya_portfolio.team_members FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Admin Write Careers" ON shaibya_portfolio.careers_roles FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Admin Write FAQs" ON shaibya_portfolio.faqs FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE POLICY "Admin Write Site Content" ON shaibya_portfolio.site_content FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 12. Table Permissions
GRANT ALL ON ALL TABLES IN SCHEMA shaibya_portfolio TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA shaibya_portfolio TO anon, authenticated, service_role;

-- ==============================================================================
-- SEED DATA
-- ==============================================================================

-- Projects Seed
INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'vims-hospital', 'VIMS Hospital', 'Complete digital presence for a leading Nagpur hospital', 'website',
  'Healthcare', 'VIMS Hospital Nagpur', NULL, 'https://vimsnagpur.com',
  '2024', 'VIMS Hospital had no digital presence. Patients had to call or visit physically for appointments. Marketing reach was minimal and new patient acquisition relied entirely on word-of-mouth.', 'Built a comprehensive SEO-optimized website with online appointments, 150+ doctor profiles, 20+ department listings, patient testimonials, and integrated social media presence.',
  '["Online appointment booking","Doctor profile directory","Department-wise navigation","Mobile-responsive design","Local SEO optimization"]'::jsonb, '["Next.js","Tailwind CSS","PostgreSQL","Prisma"]'::jsonb, '[{"value":"10k+","label":"Monthly Visitors"},{"value":"150+","label":"Doctors Listed"},{"value":"2.5x","label":"New Patient Inquiries"},{"value":"4.8/5","label":"User Rating"}]'::jsonb,
  '/images/screenshots/vims-hospital.png', NULL, NULL,
  '[]'::jsonb, NULL, '{"quote":"Before Shaibya, we had zero digital presence. They built our website, set up online booking, and managed our social media growth. Within 6 months, patient inquiries tripled.","name":"Dr. Meena S.","role":"Director, VIMS Hospital"}'::jsonb,
  '["Web Development","SEO","Digital Marketing"]'::jsonb, '["healthcare","hospital","nagpur","seo","appointments"]'::jsonb,
  true, false,
  'Production', NULL, 0
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'sonar-killa-tours', 'Sonar Killa Tours', 'Boutique heritage hotel booking platform', 'website',
  'Hospitality', 'Sonar Killa Tours', NULL, 'https://www.sonarkillatours.in',
  '2024', 'A heritage hotel in Jaisalmer had no online booking system. All reservations were managed via phone calls, leading to missed bookings and zero visibility from search engines.', 'Built a visually rich booking platform with immersive photo galleries, room type comparison, dynamic pricing, and direct WhatsApp booking integration for instant confirmation.',
  '["Rich media galleries","Room booking system","WhatsApp integration","Dynamic pricing display","Mobile-first design"]'::jsonb, '["Next.js","Tailwind CSS","Framer Motion"]'::jsonb, '[{"value":"3x","label":"Online Bookings"},{"value":"60%","label":"Less Phone Calls"},{"value":"Page 1","label":"Google Ranking"}]'::jsonb,
  '/images/screenshots/sonar-killa.png', NULL, NULL,
  '[]'::jsonb, NULL, NULL,
  '["Web Development","SEO","UI/UX Design"]'::jsonb, '["hospitality","hotel","booking","tourism"]'::jsonb,
  true, false,
  'Production', NULL, 1
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'touchwood-furnitech', 'Touchwood Furnitech', 'Premium furniture brand''s digital showroom', 'website',
  'Retail', 'Touchwood Furnitech', NULL, 'https://www.touchwoodfurnitech.com',
  '2024', 'A premium furniture manufacturer had no way to showcase their catalog online. Customers had to visit the physical showroom, limiting reach to Nagpur city only.', 'Designed an elegant digital showroom with high-resolution product galleries, category filtering, inquiry forms, and WhatsApp integration for instant quotes.',
  '["Product catalog with filters","High-res image galleries","WhatsApp inquiry","Mobile-responsive","SEO optimized"]'::jsonb, '["Next.js","Tailwind CSS","Vercel"]'::jsonb, '[{"value":"40%","label":"More Inquiries"},{"value":"5x","label":"Reach Beyond Nagpur"}]'::jsonb,
  '/images/screenshots/touchwood.png', NULL, NULL,
  '[]'::jsonb, NULL, NULL,
  '["Web Development","UI/UX Design","SEO"]'::jsonb, '["furniture","retail","catalog","ecommerce"]'::jsonb,
  false, false,
  'Production', NULL, 2
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'mg-infra-properties', 'MG Infra Properties', 'Digital backbone for Nagpur''s growing real estate player', 'website',
  'Real Estate', 'Manish Group', NULL, 'https://www.mginfraproperties.in',
  '2024', 'MG Infra was managing all property listings via WhatsApp groups and word-of-mouth. No centralized website, no lead tracking, and potential buyers couldn''t browse properties independently.', 'Built a professional property listing website with search filters, area-wise browsing, lead capture forms, and integrated CRM for automated follow-ups.',
  '["Property listing manager","Lead capture forms","Area-wise search","WhatsApp lead routing","Responsive design"]'::jsonb, '["Next.js","Tailwind CSS","Node.js"]'::jsonb, '[{"value":"3x","label":"Lead Capture Increase"},{"value":"0","label":"Missed Inquiries"},{"value":"70%","label":"Faster Response"}]'::jsonb,
  '/images/screenshots/mg-infra.png', NULL, NULL,
  '[]'::jsonb, NULL, '{"quote":"Before Shaibya, we were losing leads because we couldn''t respond fast enough. Now every inquiry gets captured automatically and routed to the right person.","name":"Manish G.","role":"Director, MG Infra Properties"}'::jsonb,
  '["Web Development","CRM Integration","Consulting"]'::jsonb, '["real-estate","nagpur","property","leads"]'::jsonb,
  true, false,
  'Production', NULL, 3
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'parmatma-ek-real-estate', 'Parmatma Ek Real Estate', 'Lead generation engine for a Nagpur real estate agency', 'website',
  'Real Estate', 'Parmatma Ek Real Estate', NULL, 'https://www.parmatmaekrealestate.com',
  '2024', 'The agency relied entirely on personal networks and physical visits. No digital presence meant zero organic lead generation and complete dependency on referrals.', 'Built a conversion-optimized website with property showcases, neighborhood guides, virtual tour links, and automated WhatsApp lead capture system.',
  '["Property showcase pages","Lead capture automation","WhatsApp integration","Neighborhood guides","SEO for local search"]'::jsonb, '["Next.js","Tailwind CSS","Vercel"]'::jsonb, '[{"value":"2x","label":"Lead Generation"},{"value":"50%","label":"Organic Traffic Growth"}]'::jsonb,
  '/images/screenshots/parmatma-ek.png', NULL, NULL,
  '[]'::jsonb, NULL, NULL,
  '["Web Development","SEO","Digital Marketing"]'::jsonb, '["real-estate","nagpur","leads","property"]'::jsonb,
  false, false,
  'Production', NULL, 4
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'revolution-fitness', 'Revolution Fitness', 'Digital identity for Nagpur''s fastest-growing gym', 'website',
  'Fitness', 'Revolution Fitness', NULL, 'https://www.revolutionfitnesss.in',
  '2024', 'Revolution Fitness had no website and relied on Instagram DMs for all communication. Potential members couldn''t find class schedules, pricing, or trainer information online.', 'Built a modern, high-energy website with class schedules, trainer profiles, membership plans, transformation galleries, and direct WhatsApp enrollment.',
  '["Class schedule display","Trainer profiles","Membership CTA","Transformation gallery","WhatsApp enrollment"]'::jsonb, '["Next.js","Tailwind CSS","Framer Motion"]'::jsonb, '[{"value":"120→350","label":"Member Growth"},{"value":"60%","label":"Online Enrollments"}]'::jsonb,
  '/images/screenshots/revolution-fitness.png', NULL, NULL,
  '[]'::jsonb, NULL, NULL,
  '["Web Development","Social Media Strategy","Consulting"]'::jsonb, '["fitness","gym","nagpur","membership"]'::jsonb,
  true, false,
  'Production', NULL, 5
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'snyppit', 'Snyppit', 'Fashion delivered in minutes — from idea to live platform', 'website',
  'Fashion Tech', 'Snyppit (Startup)', NULL, 'https://www.snyypit.com',
  '2025', 'A student walked up with nothing but a plan and fire in his eyes: fashion delivered in minutes, like food delivery but for clothes. No tech team, no platform, just a vision.', 'Built the complete platform from scratch — product listing, delivery flow, order management, customer-facing website. From idea to live in weeks.',
  '["Product catalog","Order management","Delivery tracking","Payment integration","Mobile-first UX"]'::jsonb, '["Next.js","React","Node.js","Tailwind CSS"]'::jsonb, '[{"value":"Live","label":"Platform Status"},{"value":"4 weeks","label":"Idea to Launch"}]'::jsonb,
  '/images/solutions/memorybox.png', NULL, NULL,
  '[]'::jsonb, NULL, NULL,
  '["Full-stack Development","UI/UX Design","Consulting"]'::jsonb, '["fashion","startup","ecommerce","delivery"]'::jsonb,
  true, false,
  'Production', NULL, 6
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'coaltrack-ai', 'CoalTrack AI', 'Smart billing automation for coal distributors', 'solution',
  'Logistics & Admin', 'Coal Distribution Co.', NULL, NULL,
  '2024', '4 employees spent an entire week manually entering billing data. Errors were common, reports were delayed, and the process consumed massive resources.', 'AI-based OCR tool where users click a photo of a bill & upload. Automated pipeline extracts fields, validates them, and generates structured Excel files with custom business logic.',
  '["OCR bill scanning","Auto-Excel report generation","Multi-branch support","Daily/weekly automated reports","Validation & error detection"]'::jsonb, '["Python","FastAPI","OpenAI Vision","React","PostgreSQL"]'::jsonb, '[{"value":"95%","label":"Faster Processing","context":"7 days → 4 hours"},{"value":"75%","label":"Manpower Reduction","context":"4 staff → 1"},{"value":"500+","label":"Bills/Day"},{"value":"90%","label":"Error Reduction"}]'::jsonb,
  '/images/solutions/coal.png', NULL, NULL,
  '[]'::jsonb, NULL, '{"quote":"Shaibya built our CoalTrack AI system that turned a 7-day manual billing process into a 4-hour automated workflow. It''s been a game-changer for our operations.","name":"Rajesh K.","role":"Operations Head, Coal Distribution Co."}'::jsonb,
  '["AI Automation","Web Development","Consulting"]'::jsonb, '["ai","ocr","automation","billing","logistics"]'::jsonb,
  true, false,
  'Production', NULL, 7
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'fitmanage-360', 'FitManage 360', 'All-in-one gym management system', 'solution',
  'Fitness', 'Revolution Fitness, Wave Fitness, Arnold Gold Gym, FitLife Gym, FitLife Fitness Studio', NULL, NULL,
  '2024', 'Gym owners tracked everything on registers and Excel. Renewals were missed, attendance was manual, trainers weren''t tracked, and revenue was leaking from no-show members and expired cards.', 'End-to-end membership system with automated renewal reminders, attendance tracking, trainer scheduling, workout & diet plan builder, payment dashboard, and social media strategy.',
  '["Membership management + auto renewals","Attendance tracking (biometric/QR/manual)","Trainer assignment & scheduling","Workout & diet plan builder","Payment tracking + revenue dashboard","WhatsApp renewal nudges + inquiry bot"]'::jsonb, '["React","Node.js","PostgreSQL","WhatsApp API","Razorpay"]'::jsonb, '[{"value":"120→350","label":"Members Growth","context":"Revolution Fitness"},{"value":"80%","label":"Admin Time Saved"},{"value":"25%","label":"Renewal Rate Increase"},{"value":"5","label":"Gym Brands Using It"}]'::jsonb,
  '/images/solutions/fitlife.png', NULL, NULL,
  '[]'::jsonb, NULL, '{"quote":"Before Shaibya, I was spending 3 hours a day on WhatsApp chasing renewals. Now it happens automatically. We grew from 120 to 350 members without adding admin staff.","name":"Owner","role":"Revolution Fitness, Nagpur"}'::jsonb,
  '["Product Development","WhatsApp Automation","Consulting"]'::jsonb, '["fitness","gym-management","saas","automation"]'::jsonb,
  true, false,
  'Production', NULL, 8
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'property-management', 'Property Management System', 'CRM + lead automation for real estate agents', 'solution',
  'Real Estate', 'Manish Group, Parmatma Ek Real Estate', NULL, NULL,
  '2024', 'Agents managed leads on WhatsApp and notebooks. No CRM, no follow-up automation, site visit scheduling was all manual, and document management was chaotic.', 'Lead capture from website → CRM pipeline. Property listing manager, client follow-up automation, site visit scheduler with confirmation reminders, document management, and commission tracking.',
  '["Lead capture → CRM pipeline","Property listing manager","Client follow-up automation (WhatsApp/email)","Site visit scheduler + reminders","Document management (agreements, KYC)","Commission & deal tracking dashboard"]'::jsonb, '["React","Node.js","PostgreSQL","WhatsApp API"]'::jsonb, '[{"value":"3x","label":"Lead Capture Increase"},{"value":"70%","label":"Faster Response Time"},{"value":"0","label":"Missed Follow-ups"}]'::jsonb,
  '/images/solutions/vims.png', NULL, NULL,
  '[]'::jsonb, NULL, NULL,
  '["Product Development","CRM Integration","Consulting"]'::jsonb, '["real-estate","crm","automation","lead-management"]'::jsonb,
  true, false,
  'Production', NULL, 9
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'dairy-management', 'Dairy Management System', 'Digital operations for dairy businesses', 'solution',
  'Agriculture', 'Local Dairy Business', NULL, NULL,
  '2024', 'A dairy business tracked daily milk collection, fat testing, and payments entirely on paper. Errors in calculation led to disputes with farmers and revenue discrepancies.', 'Built a digital system for daily collection tracking, automated fat-based pricing, farmer payment calculation, and monthly report generation.',
  '["Daily collection tracking","Fat-based price calculator","Farmer payment automation","Monthly reports","Multi-collection point support"]'::jsonb, '["React","Node.js","MySQL"]'::jsonb, '[{"value":"100%","label":"Digitized Records"},{"value":"0","label":"Payment Disputes"}]'::jsonb,
  '/images/solutions/coal.png', NULL, NULL,
  '[]'::jsonb, NULL, NULL,
  '["Product Development","Consulting"]'::jsonb, '["dairy","agriculture","automation"]'::jsonb,
  false, false,
  'Production', NULL, 10
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'shop-management', 'Shop Management System', 'Inventory and billing for retail shops', 'solution',
  'Retail', 'Local Retail Business', NULL, NULL,
  '2024', 'A retail shop owner managed inventory on paper and billing through a basic calculator. Stock tracking was impossible and theft/loss went undetected.', 'Built a simple yet powerful POS and inventory management system with barcode scanning, stock alerts, daily sales reports, and GST-compliant billing.',
  '["POS billing system","Inventory tracking","Low stock alerts","Daily/monthly sales reports","GST-compliant invoicing"]'::jsonb, '["React","Node.js","MySQL"]'::jsonb, '[{"value":"50%","label":"Faster Billing"},{"value":"100%","label":"Stock Visibility"}]'::jsonb,
  '/images/solutions/memorybox.png', NULL, NULL,
  '[]'::jsonb, NULL, NULL,
  '["Product Development"]'::jsonb, '["retail","pos","inventory","billing"]'::jsonb,
  false, false,
  'Production', NULL, 11
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'medireach-pro', 'MediReach Pro', 'Digital growth suite for hospitals', 'solution',
  'Healthcare', 'VIMS Hospital Nagpur', NULL, NULL,
  '2024', 'VIMS Hospital lacked digital presence. Patients had to call or visit physically. Marketing reach was minimal and patient management relied entirely on the call center.', 'SEO-optimized website with online booking, doctor profiles, automated appointment reminders, social media management, and Google Business optimization.',
  '["Online appointment booking","Doctor profile management","Automated reminders (SMS/WhatsApp)","Social media growth strategy","Google Business optimization"]'::jsonb, '["Next.js","Tailwind CSS","PostgreSQL","WhatsApp API"]'::jsonb, '[{"value":"70%","label":"Less Call Center Dependency"},{"value":"2.5x","label":"New Patient Increase"},{"value":"10k+","label":"Monthly Website Visits"},{"value":"35%","label":"No-show Reduction"}]'::jsonb,
  '/images/solutions/cellcurehub.png', NULL, NULL,
  '[]'::jsonb, NULL, NULL,
  '["Web Development","Digital Marketing","SEO","Consulting"]'::jsonb, '["healthcare","hospital","digital-marketing","seo"]'::jsonb,
  true, false,
  'Production', NULL, 12
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'mirragio-shopping-bot', 'Smart Shopping Bot', 'AI-powered shopping assistant for fashion retail', 'rnd',
  'Fashion / Retail', 'Mirragio', NULL, NULL,
  '2025', 'Online fashion shopping is overwhelming. Customers spend hours browsing and often abandon carts because they can''t find what they want or get confused by choices.', 'Built an intelligent shopping bot that understands natural language preferences, recommends outfits based on style/occasion/budget, and guides the customer to purchase.',
  '["Natural language product search","Style-based recommendations","Size guide integration","Cart integration"]'::jsonb, '["Python","OpenAI API","React","Node.js"]'::jsonb, '[{"value":"3x","label":"Product Discovery Speed"},{"value":"40%","label":"Less Cart Abandonment"}]'::jsonb,
  '/images/solutions/memorybox.png', NULL, NULL,
  '[]'::jsonb, NULL, NULL,
  '["AI Development","R&D"]'::jsonb, '["ai","chatbot","fashion","ecommerce"]'::jsonb,
  false, false,
  'MVP', 'Mirragio', 13
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'bridgestone-hrms', 'HRMS Bot', 'Automated HR management for enterprise', 'rnd',
  'Manufacturing', 'Bridgestone', NULL, NULL,
  '2025', 'HR teams at large manufacturing plants handle thousands of employee queries daily — leave balances, payslip requests, policy questions — consuming significant HR bandwidth.', 'Built a WhatsApp-based HRMS bot that employees can query for leave balance, payslip downloads, policy FAQs, and leave applications — all without contacting HR.',
  '["Leave balance inquiry","Payslip download","Policy FAQ","Leave application via WhatsApp","Multi-language support"]'::jsonb, '["Python","WhatsApp Business API","PostgreSQL","FastAPI"]'::jsonb, '[{"value":"500+","label":"Daily Queries Handled"},{"value":"60%","label":"HR Ticket Reduction"}]'::jsonb,
  '/images/solutions/hrms-bot.webp', 'Illustration of an HR self-service portal and employee assistant chat on a laptop and phone', 'Illustrative visual · Client interface not shown',
  '[]'::jsonb, NULL, NULL,
  '["AI Development","WhatsApp Automation","R&D"]'::jsonb, '["hr","enterprise","chatbot","automation"]'::jsonb,
  false, true,
  'MVP', 'Bridgestone', 14
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'biscuit-management', 'Biscuit Management System', 'Production & distribution tracking for FMCG', 'rnd',
  'FMCG / Manufacturing', 'Renowned Nagpur Company', NULL, NULL,
  '2025', 'A biscuit manufacturing company tracked production batches, quality control, and distribution on paper registers. Inventory mismatches and delayed shipments were common.', 'Built a production tracking system with batch management, quality control checkpoints, distribution route planning, and real-time inventory visibility.',
  '["Batch tracking","Quality control checkpoints","Distribution management","Real-time inventory","Production analytics"]'::jsonb, '["React","Node.js","PostgreSQL","Docker"]'::jsonb, '[{"value":"99%","label":"Inventory Accuracy","context":"Up from ~70%"},{"value":"50%","label":"Less Distribution Delays"}]'::jsonb,
  '/images/solutions/biscuit-management.webp', 'Illustration of biscuit batch, inventory, and dispatch management in a food production setting', 'Illustrative visual · Client interface not shown',
  '[]'::jsonb, NULL, NULL,
  '["Product Development","Consulting"]'::jsonb, '["manufacturing","fmcg","inventory","production"]'::jsonb,
  false, true,
  'Production', NULL, 15
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'law-practitioner-ai', 'Law Practitioner AI', 'AI legal assistant for Indian law practitioners', 'rnd',
  'Legal', 'Internal R&D', NULL, NULL,
  '2025', 'Junior lawyers spend hours researching case law and legal precedents. Access to relevant judgments is fragmented across multiple databases.', 'An AI-powered legal research assistant that can search Indian case law, summarize judgments, identify relevant precedents, and draft preliminary legal arguments.',
  '["Case law search","Judgment summarization","Precedent identification","Draft argument generation"]'::jsonb, '["Python","LangChain","OpenAI","Pinecone","FastAPI"]'::jsonb, '[{"value":"10x","label":"Faster Research"},{"value":"3","label":"Lawyers Testing"}]'::jsonb,
  '/images/solutions/cellcurehub.png', NULL, NULL,
  '[]'::jsonb, NULL, NULL,
  '["AI Development","R&D"]'::jsonb, '["ai","legal","nlp","research"]'::jsonb,
  false, false,
  'Prototype', NULL, 16
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'fly-ash-bricks', 'Fly Ash Bricks Management', 'Production & order tracking for brick manufacturing', 'rnd',
  'Construction', 'Local Manufacturer', NULL, NULL,
  '2024', 'A fly ash brick manufacturer managed production quantities, orders, and delivery schedules on paper. Order mix-ups and production shortfalls were common.', 'Built an order management system with production tracking, delivery scheduling, and customer invoicing — all accessible from a mobile-friendly dashboard.',
  '["Order management","Production tracking","Delivery scheduling","Mobile dashboard","Invoice generation"]'::jsonb, '["React","Node.js","MySQL"]'::jsonb, '[{"value":"0","label":"Order Mix-ups"},{"value":"100%","label":"Delivery Visibility"}]'::jsonb,
  '/images/solutions/pushkarna.png', NULL, NULL,
  '[]'::jsonb, NULL, NULL,
  '["Product Development"]'::jsonb, '["construction","manufacturing","order-management"]'::jsonb,
  false, false,
  'Production', 'Construction Industry Partner', 17
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

INSERT INTO shaibya_portfolio.projects (
  slug, name, tagline, type, industry, client, client_logo, live_url, year,
  problem, solution, key_features, tech_stack, stats, thumbnail, thumbnail_alt,
  image_caption, screenshots, brand_color, testimonial, services_delivered,
  tags, featured, confidential, status, collaborator, sort_order
) VALUES (
  'dal-mill-oms', 'Dal Mill Order Management', 'Order and inventory system for grain processing', 'rnd',
  'Agriculture / Processing', 'Local Dal Mill', NULL, NULL,
  '2024', 'A dal mill processing unit tracked incoming grain orders, processing status, and outgoing deliveries manually. Delays in order fulfillment and inventory mismatches were frequent.', 'Built an order management system tracking the full grain processing lifecycle — from raw material intake to processed output and delivery dispatching.',
  '["Order tracking","Processing status updates","Inventory management","Delivery dispatch","Daily reports"]'::jsonb, '["React","Node.js","MySQL"]'::jsonb, '[{"value":"40%","label":"Faster Order Fulfillment"},{"value":"100%","label":"Inventory Tracking"}]'::jsonb,
  '/images/solutions/sonarkilla.png', NULL, NULL,
  '[]'::jsonb, NULL, NULL,
  '["Product Development"]'::jsonb, '["agriculture","food-processing","order-management"]'::jsonb,
  false, false,
  'Production', NULL, 18
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  problem = EXCLUDED.problem,
  solution = EXCLUDED.solution,
  stats = EXCLUDED.stats,
  thumbnail = EXCLUDED.thumbnail,
  tech_stack = EXCLUDED.tech_stack,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();


-- Testimonials Seed
INSERT INTO shaibya_portfolio.testimonials (title, rating, text, author, role, sort_order)
VALUES ('From Registers to 350 Members', 5, 'Before Shaibya, I was spending 3 hours a day on WhatsApp chasing renewals. Now it happens automatically. We grew from 120 to 350 members without adding admin staff. They didn''t just build software — they understood how gyms actually run.', 'Revolution Fitness', 'Owner, Revolution Fitness Nagpur', 0);
INSERT INTO shaibya_portfolio.testimonials (title, rating, text, author, role, sort_order)
VALUES ('Our Hospital Finally Went Digital', 5, 'Before Shaibya, we had zero digital presence. They built our website, set up online booking, and managed our social media growth. Within 6 months, patient inquiries tripled and call center dependency dropped by 70%.', 'Dr. Meena S.', 'Director, VIMS Hospital Nagpur', 1);
INSERT INTO shaibya_portfolio.testimonials (title, rating, text, author, role, sort_order)
VALUES ('Billing That Used to Take a Week Now Takes Hours', 5, 'Shaibya built our CoalTrack AI system that turned a 7-day manual billing process into a 4-hour automated workflow. We went from 4 employees doing data entry to just 1 person overseeing the AI. Game-changer.', 'Rajesh K.', 'Operations Head, Coal Distribution Co.', 2);
INSERT INTO shaibya_portfolio.testimonials (title, rating, text, author, role, sort_order)
VALUES ('Real Estate Leads on Autopilot', 5, 'Before working with Shaibya, we were losing leads because we couldn''t respond fast enough. Now every inquiry gets captured automatically and routed to the right person. Our lead response time went from hours to minutes.', 'Manish G.', 'Director, MG Infra Properties Nagpur', 3);
INSERT INTO shaibya_portfolio.testimonials (title, rating, text, author, role, sort_order)
VALUES ('They Built Our Entire Platform in Weeks', 5, 'I walked up to Shaibya with nothing but a plan written on my phone — fashion delivered in minutes. They said yes, and within weeks we had a live platform. They don''t just work for established companies; they build with founders from day zero.', 'Snyppit Founder', 'Founder, Snyppit - Fashion Delivered in Minutes', 4);

-- Team Members Seed
INSERT INTO shaibya_portfolio.team_members (
  codename, day_job, night_skill, location, hover_quote, icon, color, image, handle, url, sort_order
) VALUES (
  'The Backend Alchemist', 'Backend Developer', 'API Sorcery & Data Flow Design', 'Nagpur, IN',
  'Turns raw data into seamless logic. Architect behind every stable system.', 'Code', '#00f6ff', 'https://api.dicebear.com/7.x/bottts/png?seed=alchemist&size=300&backgroundColor=0f172a',
  '@backendalchemist', 'https://github.com/shaibyasolutions', 0
);
INSERT INTO shaibya_portfolio.team_members (
  codename, day_job, night_skill, location, hover_quote, icon, color, image, handle, url, sort_order
) VALUES (
  'The Python Whisperer', 'Senior Python Engineer', 'Automation, AI, and Backend Craftsmanship', 'Texas, US',
  'Writes code that breathes. Scales systems with precision and Pythonic grace.', 'Zap', '#e400f6', 'https://api.dicebear.com/7.x/bottts/png?seed=pythonwhisperer&size=300&backgroundColor=0f172a',
  '@pythonwhisperer', 'https://github.com/shaibyasolutions', 1
);
INSERT INTO shaibya_portfolio.team_members (
  codename, day_job, night_skill, location, hover_quote, icon, color, image, handle, url, sort_order
) VALUES (
  'The Cloud Weaver', 'Salesforce Developer', 'CRM Customization & Cloud Logic', 'Nagpur, IN',
  'Knits together businesses and technology. Makes Salesforce dance to data''s rhythm.', 'LinkIcon', '#ffc700', 'https://api.dicebear.com/7.x/bottts/png?seed=cloudweaver&size=300&backgroundColor=0f172a',
  '@cloudweaver', 'https://www.linkedin.com/company/108785057/', 2
);
INSERT INTO shaibya_portfolio.team_members (
  codename, day_job, night_skill, location, hover_quote, icon, color, image, handle, url, sort_order
) VALUES (
  'The Firewall Phantom', 'Senior Penetration Tester', 'Ethical Hacking & Threat Simulation', 'Nagpur, IN',
  'Sees the unseen. Breaks systems before the bad guys can.', 'Shield', '#e400f6', 'https://api.dicebear.com/7.x/bottts/png?seed=firewallphantom&size=300&backgroundColor=0f172a',
  '@firewallphantom', 'https://github.com/shaibyasolutions', 3
);
INSERT INTO shaibya_portfolio.team_members (
  codename, day_job, night_skill, location, hover_quote, icon, color, image, handle, url, sort_order
) VALUES (
  'The Fullstack Maverick', 'Senior Fullstack Engineer', 'End-to-End System Architecture', 'Noida, IN',
  'Bridges front and back with elegance. Ships products that just work.', 'Settings', '#00f6ff', 'https://api.dicebear.com/7.x/bottts/png?seed=fullstackmaverick&size=300&backgroundColor=0f172a',
  '@fullstackmaverick', 'https://github.com/shaibyasolutions', 4
);
INSERT INTO shaibya_portfolio.team_members (
  codename, day_job, night_skill, location, hover_quote, icon, color, image, handle, url, sort_order
) VALUES (
  'The 3D Conjurer', '3D Specialist Artist', 'Visual Storytelling & Motion Design', 'Nagpur, IN',
  'Shapes imagination into pixels. Turns ideas into stunning 3D experiences.', 'Palette', '#ffc700', 'https://api.dicebear.com/7.x/bottts/png?seed=3dconjurer&size=300&backgroundColor=0f172a',
  '@3dconjurer', 'https://www.instagram.com/deepoffduty', 5
);

-- Careers Seed
INSERT INTO shaibya_portfolio.careers_roles (
  role_id, title, team, experience, description, responsibilities, application_note, is_active, sort_order
) VALUES (
  'full-stack-developer', 'Full Stack Developer', 'Engineering', '1–2 years of experience',
  'Build and improve web applications, from responsive interfaces to APIs and databases.', '["Develop frontend features and backend integrations.","Write maintainable code and help troubleshoot issues.","Collaborate on requirements, testing, and delivery."]'::jsonb, 'Share your CV, GitHub or portfolio, and a project you have worked on.', true, 0
) ON CONFLICT (role_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  responsibilities = EXCLUDED.responsibilities,
  is_active = EXCLUDED.is_active,
  updated_at = now();
INSERT INTO shaibya_portfolio.careers_roles (
  role_id, title, team, experience, description, responsibilities, application_note, is_active, sort_order
) VALUES (
  'video-editor', 'Video Editor', 'Creative', 'Portfolio-led applications',
  'Turn ideas and footage into clear, engaging videos for brands and digital channels.', '["Edit short-form videos, reels, and brand content.","Work with pacing, sound, captions, and visual consistency.","Develop edits from briefs and incorporate feedback."]'::jsonb, 'Share your CV or introduction and a showreel or links to your edits.', true, 1
) ON CONFLICT (role_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  responsibilities = EXCLUDED.responsibilities,
  is_active = EXCLUDED.is_active,
  updated_at = now();
INSERT INTO shaibya_portfolio.careers_roles (
  role_id, title, team, experience, description, responsibilities, application_note, is_active, sort_order
) VALUES (
  'business-development-sales', 'Business Development & Sales Executive', 'Business', 'Communication & relationship building',
  'Connect with prospective clients, understand their needs, and help turn conversations into project opportunities.', '["Research prospects and introduce our services.","Coordinate discovery conversations and follow-ups.","Keep lead information and proposal discussions organised."]'::jsonb, 'Share your CV and a short introduction to your sales or client-facing experience.', true, 2
) ON CONFLICT (role_id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  responsibilities = EXCLUDED.responsibilities,
  is_active = EXCLUDED.is_active,
  updated_at = now();

-- FAQs Seed
INSERT INTO shaibya_portfolio.faqs (question, answer, category, sort_order)
VALUES ('How long does it take to build a website?', 'Project timelines vary based on complexity. Most business websites are delivered within 2–4 weeks, while more advanced platforms—such as CRM systems, booking platforms, or custom web applications—typically take 4–8 weeks. Following our initial consultation, we''ll provide a detailed project roadmap with clear milestones and delivery timelines.', 'general', 0);

INSERT INTO shaibya_portfolio.faqs (question, answer, category, sort_order)
VALUES ('Can you handle RERA requirements for real estate?', 'Yes. We build real estate platforms with RERA compliance considerations, including required disclosures, project registration details, and compliant advertisement formats. Our solutions are designed to help you present property information accurately while meeting industry requirements.', 'general', 1);

INSERT INTO shaibya_portfolio.faqs (question, answer, category, sort_order)
VALUES ('Do you provide ongoing support after launch?', 'Absolutely. Every project includes 30 days of complimentary post-launch support to ensure a smooth transition. Beyond that, we offer flexible maintenance plans tailored to your needs. Many clients continue working with us long-term as we help optimize, maintain, and continuously improve their systems.', 'general', 2);

INSERT INTO shaibya_portfolio.faqs (question, answer, category, sort_order)
VALUES ('I''m not tech-savvy. Can I still use your systems?', 'Absolutely. Our solutions are designed for business owners and teams—not just technical users. We focus on creating simple, intuitive experiences that are easy to adopt. If you can use everyday tools like WhatsApp, you can confidently use our systems. We also provide hands-on training to help your team get started.', 'general', 3);


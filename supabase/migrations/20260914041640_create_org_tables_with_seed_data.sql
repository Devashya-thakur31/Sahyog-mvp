/*
# Create organizations, needs, and volunteer_opportunities tables with seed data

## 1. New Tables

### organizations
- `id` (uuid, primary key)
- `name` (text, not null) — organization display name
- `type` (text, not null) — one of: orphanage, old_age_home, ngo, shelter, school
- `city` (text, not null) — city in Madhya Pradesh
- `description` (text) — organization mission/summary
- `verified` (boolean, default false) — admin verification status
- `established` (text) — year established
- `supporters` (integer, default 0) — number of supporters
- `created_at` (timestamptz, default now())

### needs
- `id` (uuid, primary key)
- `organization_id` (uuid, foreign key to organizations, on delete cascade)
- `title` (text, not null) — short title of the need
- `category` (text, not null) — one of: food, education, medical, clothing, shelter, equipment
- `urgency` (text, not null) — one of: critical, high, moderate
- `description` (text) — details of the need
- `target_amount` (numeric, not null) — fundraising goal in INR
- `raised_amount` (numeric, default 0) — amount raised so far in INR
- `status` (text, default 'open') — one of: open, fulfilled
- `created_at` (timestamptz, default now())

### volunteer_opportunities
- `id` (uuid, primary key)
- `organization_id` (uuid, foreign key to organizations, on delete cascade)
- `title` (text, not null) — opportunity title
- `category` (text, not null) — one of: teaching, healthcare, event_support, mentorship, fundraising, field_work
- `commitment` (text, not null) — one of: one_time, weekend, ongoing
- `description` (text) — opportunity details
- `start_date` (date) — when the opportunity begins
- `volunteers_needed` (integer, not null) — total slots
- `volunteers_applied` (integer, default 0) — filled slots
- `status` (text, default 'open') — one of: open, filled, closed
- `skills_required` (text[]) — array of skill names
- `created_at` (timestamptz, default now())

## 2. Security
- RLS enabled on all three tables.
- SELECT is public (TO anon, authenticated) so anyone browsing the directory can view organizations, needs, and volunteer opportunities.
- INSERT/UPDATE/DELETE restricted to authenticated users (organization managers and admins will write data after sign-in).

## 3. Seed Data
- 10 organizations across Madhya Pradesh cities (Bhopal, Indore, Jabalpur, Gwalior, Ujjain, Rewa, Sagar, Ratlam, Satna, Betul)
- 20 needs linked to organizations, covering food, education, medical, clothing, shelter, and equipment categories
- 10 volunteer opportunities linked to organizations, covering teaching, healthcare, event support, mentorship, fundraising, and field work
*/

-- =============================================================
-- TABLES
-- =============================================================

CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('orphanage', 'old_age_home', 'ngo', 'shelter', 'school')),
  city text NOT NULL,
  description text,
  verified boolean NOT NULL DEFAULT false,
  established text,
  supporters integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS needs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('food', 'education', 'medical', 'clothing', 'shelter', 'equipment')),
  urgency text NOT NULL CHECK (urgency IN ('critical', 'high', 'moderate')),
  description text,
  target_amount numeric NOT NULL DEFAULT 0,
  raised_amount numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'fulfilled')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS volunteer_opportunities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('teaching', 'healthcare', 'event_support', 'mentorship', 'fundraising', 'field_work')),
  commitment text NOT NULL CHECK (commitment IN ('one_time', 'weekend', 'ongoing')),
  description text,
  start_date date,
  volunteers_needed integer NOT NULL DEFAULT 1,
  volunteers_applied integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'filled', 'closed')),
  skills_required text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =============================================================
-- INDEXES
-- =============================================================

CREATE INDEX IF NOT EXISTS idx_needs_organization_id ON needs(organization_id);
CREATE INDEX IF NOT EXISTS idx_needs_category ON needs(category);
CREATE INDEX IF NOT EXISTS idx_needs_status ON needs(status);
CREATE INDEX IF NOT EXISTS idx_volunteer_ops_organization_id ON volunteer_opportunities(organization_id);
CREATE INDEX IF NOT EXISTS idx_volunteer_ops_category ON volunteer_opportunities(category);
CREATE INDEX IF NOT EXISTS idx_volunteer_ops_status ON volunteer_opportunities(status);
CREATE INDEX IF NOT EXISTS idx_organizations_type ON organizations(type);
CREATE INDEX IF NOT EXISTS idx_organizations_city ON organizations(city);

-- =============================================================
-- RLS
-- =============================================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE needs ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_opportunities ENABLE ROW LEVEL SECURITY;

-- organizations: public read, authenticated write
DROP POLICY IF EXISTS "public_read_organizations" ON organizations;
CREATE POLICY "public_read_organizations" ON organizations FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_organizations" ON organizations;
CREATE POLICY "auth_insert_organizations" ON organizations FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_organizations" ON organizations;
CREATE POLICY "auth_update_organizations" ON organizations FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_organizations" ON organizations;
CREATE POLICY "auth_delete_organizations" ON organizations FOR DELETE
  TO authenticated USING (true);

-- needs: public read, authenticated write
DROP POLICY IF EXISTS "public_read_needs" ON needs;
CREATE POLICY "public_read_needs" ON needs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_needs" ON needs;
CREATE POLICY "auth_insert_needs" ON needs FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_needs" ON needs;
CREATE POLICY "auth_update_needs" ON needs FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_needs" ON needs;
CREATE POLICY "auth_delete_needs" ON needs FOR DELETE
  TO authenticated USING (true);

-- volunteer_opportunities: public read, authenticated write
DROP POLICY IF EXISTS "public_read_volunteer_ops" ON volunteer_opportunities;
CREATE POLICY "public_read_volunteer_ops" ON volunteer_opportunities FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_volunteer_ops" ON volunteer_opportunities;
CREATE POLICY "auth_insert_volunteer_ops" ON volunteer_opportunities FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_volunteer_ops" ON volunteer_opportunities;
CREATE POLICY "auth_update_volunteer_ops" ON volunteer_opportunities FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_volunteer_ops" ON volunteer_opportunities;
CREATE POLICY "auth_delete_volunteer_ops" ON volunteer_opportunities FOR DELETE
  TO authenticated USING (true);

-- =============================================================
-- SEED DATA: ORGANIZATIONS (10 records)
-- =============================================================

INSERT INTO organizations (id, name, type, city, description, verified, established, supporters) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Ashray Children''s Home', 'orphanage', 'Bhopal', 'Providing shelter, education, and care for orphaned children across Madhya Pradesh since 2005.', true, '2005', 342),
  ('a0000000-0000-0000-0000-000000000002', 'Vridha Seva Sansthan', 'old_age_home', 'Indore', 'A safe haven for elderly individuals offering medical care, companionship, and dignified living.', true, '2010', 198),
  ('a0000000-0000-0000-0000-000000000003', 'Pragati Foundation', 'ngo', 'Jabalpur', 'Empowering rural communities through education, healthcare, and sustainable livelihood programs.', true, '2008', 521),
  ('a0000000-0000-0000-0000-000000000004', 'Ujjwal Shelter Home', 'shelter', 'Gwalior', 'Emergency shelter and rehabilitation for women and children in crisis situations.', false, '2018', 87),
  ('a0000000-0000-0000-0000-000000000005', 'Shiksha Niketan School', 'school', 'Ujjain', 'Free education for underprivileged children from tribal and rural backgrounds.', true, '2012', 276),
  ('a0000000-0000-0000-0000-000000000006', 'Anath Balakashram Trust', 'orphanage', 'Rewa', 'Caring for abandoned children with a focus on education, nutrition, and emotional well-being.', false, '2015', 134),
  ('a0000000-0000-0000-0000-000000000007', 'Sahyog Nari Utthan', 'ngo', 'Sagar', 'Women empowerment through vocational training, micro-finance, and legal awareness programs.', true, '2011', 289),
  ('a0000000-0000-0000-0000-000000000008', 'Sneh Bandhan Old Age Care', 'old_age_home', 'Ratlam', 'Residential care for senior citizens with daily medical support, recreational activities, and community engagement.', true, '2014', 156),
  ('a0000000-0000-0000-0000-000000000009', 'Bal Vikas Shiksha Samiti', 'school', 'Satna', 'Running bridge schools for dropout children in tribal belts of Satna district.', false, '2017', 92),
  ('a0000000-0000-0000-0000-000000000010', 'Jeevan Jyoti Relief Trust', 'shelter', 'Betul', 'Disaster relief and rehabilitation shelter supporting families affected by floods and natural calamities in MP.', true, '2009', 203);

-- =============================================================
-- SEED DATA: NEEDS (20 records)
-- =============================================================

INSERT INTO needs (organization_id, title, category, urgency, description, target_amount, raised_amount, status) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Monthly Food Supplies for 40 Children', 'food', 'critical', 'Rations including rice, dal, wheat, and cooking oil to feed 40 children for one month.', 25000, 18500, 'open'),
  ('a0000000-0000-0000-0000-000000000001', 'Winter Clothing for Children', 'clothing', 'moderate', 'Warm sweaters, blankets, and socks for 40 children ahead of winter season.', 18000, 7200, 'open'),
  ('a0000000-0000-0000-0000-000000000001', 'New Mattresses and Bedding', 'shelter', 'moderate', 'Replacement of worn-out mattresses and bedding for 40 children''s dormitory.', 30000, 5000, 'open'),
  ('a0000000-0000-0000-0000-000000000002', 'Medical Camp for Elderly Residents', 'medical', 'high', 'Funding for a quarterly medical check-up camp covering 35 elderly residents.', 15000, 15000, 'fulfilled'),
  ('a0000000-0000-0000-0000-000000000002', 'Wheelchairs for Mobility-Impaired Residents', 'medical', 'high', 'Purchase of 5 wheelchairs for elderly residents with limited mobility.', 35000, 12000, 'open'),
  ('a0000000-0000-0000-0000-000000000002', 'Daily Nutrition Supplements', 'food', 'moderate', 'Protein powder, vitamins, and calcium supplements for 35 elderly residents for 3 months.', 12000, 4000, 'open'),
  ('a0000000-0000-0000-0000-000000000003', 'Computers for Digital Literacy Program', 'equipment', 'moderate', '5 desktop computers to launch a digital literacy program for rural youth.', 60000, 45000, 'open'),
  ('a0000000-0000-0000-0000-000000000003', 'Solar Lanterns for Off-Grid Villages', 'equipment', 'high', '100 solar lanterns for households in villages without electricity in Jabalpur district.', 50000, 38000, 'open'),
  ('a0000000-0000-0000-0000-000000000003', 'Clean Drinking Water Filtration Unit', 'medical', 'critical', 'Installation of a community water filtration unit in a village with contaminated water supply.', 75000, 22000, 'open'),
  ('a0000000-0000-0000-0000-000000000004', 'Roof Repair for Shelter Wing', 'shelter', 'critical', 'Urgent roof repairs needed before monsoon to protect 25 residents from water damage.', 50000, 8200, 'open'),
  ('a0000000-0000-0000-0000-000000000004', 'Counseling Sessions for Trauma Survivors', 'medical', 'high', 'Funding for 20 professional counseling sessions for women and children recovering from trauma.', 20000, 6000, 'open'),
  ('a0000000-0000-0000-0000-000000000005', 'School Books and Uniforms', 'education', 'high', 'Textbooks, notebooks, and uniforms for 60 tribal children for the new academic year.', 40000, 12000, 'open'),
  ('a0000000-0000-0000-0000-000000000005', 'Classroom Furniture for New Wing', 'equipment', 'moderate', 'Desks and chairs for 2 newly built classrooms serving 50 additional students.', 45000, 30000, 'open'),
  ('a0000000-0000-0000-0000-000000000006', 'Nutritional Meal Program Expansion', 'food', 'high', 'Expand daily meal program from 2 to 3 meals for 30 resident children.', 28000, 9500, 'open'),
  ('a0000000-0000-0000-0000-000000000006', 'School Admission Fees for 15 Children', 'education', 'high', 'Annual school admission fees and supplies for 15 children to attend local government schools.', 35000, 14000, 'open'),
  ('a0000000-0000-0000-0000-000000000007', 'Sewing Machines for Women''s Training Center', 'equipment', 'moderate', '10 sewing machines for a vocational training program for rural women in Sagar.', 22000, 11000, 'open'),
  ('a0000000-0000-0000-0000-000000000008', 'Medical Equipment for Elderly Care', 'medical', 'high', 'Blood pressure monitors, glucometers, and mobility aids for daily health monitoring of 40 residents.', 18000, 18000, 'fulfilled'),
  ('a0000000-0000-0000-0000-000000000009', 'Bridge Course Materials for Dropout Students', 'education', 'moderate', 'Learning materials and workbooks for 50 dropout children in Satna''s bridge school program.', 15000, 3000, 'open'),
  ('a0000000-0000-0000-0000-000000000009', 'School Van for Rural Transport', 'equipment', 'high', 'A used school van to transport 30 children from remote hamlets to the bridge school daily.', 80000, 25000, 'open'),
  ('a0000000-0000-0000-0000-000000000010', 'Flood Relief Family Kits', 'shelter', 'critical', '100 emergency family kits containing food, water purification tablets, blankets, and basic medicines for flood-affected families.', 100000, 67000, 'open');

-- =============================================================
-- SEED DATA: VOLUNTEER OPPORTUNITIES (10 records)
-- =============================================================

INSERT INTO volunteer_opportunities (organization_id, title, category, commitment, description, start_date, volunteers_needed, volunteers_applied, status, skills_required) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Weekend English Teaching for Children', 'teaching', 'weekend', 'Teach basic English to 40 children every Saturday morning. Lesson plans and materials provided.', '2026-09-20', 4, 2, 'open', ARRAY['English', 'Patience with children']),
  ('a0000000-0000-0000-0000-000000000002', 'Medical Check-up Camp Volunteers', 'healthcare', 'one_time', 'Assist doctors and nurses during a quarterly medical camp for 35 elderly residents.', '2026-09-25', 6, 6, 'filled', ARRAY['First Aid', 'Organization']),
  ('a0000000-0000-0000-0000-000000000003', 'Annual Charity Event Coordination', 'event_support', 'one_time', 'Help coordinate logistics, registration, and guest management for our annual fundraising gala.', '2026-10-05', 10, 4, 'open', ARRAY['Event management', 'Communication']),
  ('a0000000-0000-0000-0000-000000000005', 'Ongoing Mentorship for Youth', 'mentorship', 'ongoing', 'Mentor tribal youth aged 14-18 on career guidance and life skills. Minimum 3-month commitment.', '2026-10-01', 8, 3, 'open', ARRAY['Mentoring', 'Career guidance']),
  ('a0000000-0000-0000-0000-000000000001', 'Winter Clothing Distribution Drive', 'fundraising', 'weekend', 'Organize and execute a clothing collection and distribution drive across 3 city locations.', '2026-10-15', 12, 5, 'open', ARRAY['Logistics', 'Teamwork']),
  ('a0000000-0000-0000-0000-000000000003', 'Rural Education Field Survey', 'field_work', 'one_time', 'Conduct a field survey across 5 rural villages to assess education needs and enrollment gaps.', '2026-09-28', 5, 5, 'closed', ARRAY['Data collection', 'Hindi proficiency']),
  ('a0000000-0000-0000-0000-000000000007', 'Women''s Tailoring Workshop Facilitator', 'teaching', 'weekend', 'Lead weekend tailoring workshops for 20 rural women enrolled in the vocational training program.', '2026-10-10', 3, 1, 'open', ARRAY['Tailoring', 'Teaching']),
  ('a0000000-0000-0000-0000-000000000008', 'Companionship Program for Elderly', 'mentorship', 'ongoing', 'Spend time with elderly residents — read, play board games, and share stories. Weekly visits.', '2026-09-22', 10, 4, 'open', ARRAY['Empathy', 'Conversational Hindi']),
  ('a0000000-0000-0000-0000-000000000010', 'Flood Relief Volunteer Team', 'field_work', 'one_time', 'Join a 2-day relief operation distributing family kits and setting up temporary shelters in flood-affected areas of Betul.', '2026-09-30', 15, 8, 'open', ARRAY['Physical fitness', 'Crisis management']),
  ('a0000000-0000-0000-0000-000000000004', 'Art and Music Therapy Sessions', 'event_support', 'weekend', 'Conduct weekend art and music therapy sessions for children at the shelter to aid emotional recovery.', '2026-10-12', 4, 2, 'open', ARRAY['Art or Music skills', 'Working with children']);

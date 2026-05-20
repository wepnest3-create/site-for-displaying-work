-- WEPNEST SUPABASE SCHEMA
-- This script creates the necessary tables and policies for full website control.

-- 1. PLANS TABLE
CREATE TABLE IF NOT EXISTS public.plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    price TEXT NOT NULL,
    description TEXT,
    features TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. WORKS / PORTFOLIO TABLE
CREATE TABLE IF NOT EXISTS public.works (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    preview_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_name TEXT NOT NULL, -- Storing name directly for history
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    instagram TEXT NOT NULL,
    website_goal TEXT NOT NULL,
    primary_color TEXT DEFAULT '#ffffff',
    secondary_color TEXT DEFAULT '#000000',
    selected_features JSONB DEFAULT '{}',
    asset_urls TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'pending', -- pending, contacted, in_progress, completed
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.works ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- POLICIES FOR PLANS
-- Allow public to read plans
CREATE POLICY "Allow public read access to plans" ON public.plans
    FOR SELECT USING (true);

-- Allow admin (authenticated) full control
CREATE POLICY "Allow admin full control on plans" ON public.plans
    FOR ALL TO authenticated USING (true);

-- POLICIES FOR WORKS
-- Allow public to read works
CREATE POLICY "Allow public read access to works" ON public.works
    FOR SELECT USING (true);

-- Allow admin (authenticated) full control
CREATE POLICY "Allow admin full control on works" ON public.works
    FOR ALL TO authenticated USING (true);

-- POLICIES FOR ORDERS
-- Allow anyone to submit an order
CREATE POLICY "Allow public to insert orders" ON public.orders
    FOR INSERT WITH CHECK (true);

-- Allow admin (authenticated) to view and manage orders
CREATE POLICY "Allow admin full control on orders" ON public.orders
    FOR ALL TO authenticated USING (true);

-- SEED DATA (Optional initial plans)
INSERT INTO public.plans (name, price, description, features) VALUES
('Starter', '499', 'Ideal for landing pages and simple portfolios.', ARRAY['Custom Landing Page', 'Responsive Design', 'Basic SEO']),
('Professional', '1499', 'Complete web solutions for growing businesses.', ARRAY['Full Website', 'E-commerce', 'Advanced UI/UX', 'SEO']),
('Custom', 'Custom', 'Bespoke digital ecosystems tailored to your needs.', ARRAY['Scalable Apps', 'API Integrations', 'Brand Identity'])
ON CONFLICT (name) DO NOTHING;

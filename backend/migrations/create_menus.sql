CREATE TABLE IF NOT EXISTS menus (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial Bengali news categories for backward compatibility
INSERT INTO menus (name, url, sort_order)
VALUES
  ('জাতীয়', '/?category=জাতীয়', 1),
  ('রাজনীতি', '/?category=রাজনীতি', 2),
  ('অর্থনীতি', '/?category=অর্থনীতি', 3),
  ('সারাদেশ', '/?category=সারাদেশ', 4),
  ('আন্তর্জাতিক', '/?category=আন্তর্জাতিক', 5),
  ('খেলা', '/?category=খেলা', 6),
  ('বিনোদন', '/?category=বিনোদন', 7),
  ('সোনালী বিশেষ', '/?category=সোনালী বিশেষ', 8),
  ('শিক্ষা', '/?category=শিক্ষা', 9),
  ('স্বাস্থ্য', '/?category=স্বাস্থ্য', 10),
  ('চাকরির খবর', '/?category=চাকরির খবর', 11),
  ('ভিডিও গ্যালারি', '/?category=ভিডিও গ্যালারি', 12),
  ('বিবিধ', '/?category=বিবিধ', 13)
ON CONFLICT DO NOTHING;

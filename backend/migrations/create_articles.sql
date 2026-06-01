CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) DEFAULT 'জাতীয়',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- In case table already exists, add the column safely
ALTER TABLE articles ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'জাতীয়';

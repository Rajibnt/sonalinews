import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function initDb() {
  try {
    console.log("⏳ Initializing database tables...");
    
    // Create articles table if not exists
    await pool.query(`
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
    `);

    // Safely add column if not exists
    await pool.query(`
      ALTER TABLE articles ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'জাতীয়';
    `);

    // Create menus table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS menus (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if menus are empty, if so seed them
    const menuCheck = await pool.query("SELECT COUNT(*) FROM menus");
    if (parseInt(menuCheck.rows[0].count, 10) === 0) {
      console.log("🌱 Seeding default menu categories...");
      await pool.query(`
        INSERT INTO menus (name, url, sort_order) VALUES
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
        ('বিবিধ', '/?category=বিবিধ', 13);
      `);
    }
    
    console.log("✅ Database tables successfully initialized!");
  } catch (error) {
    console.error("❌ Failed to initialize database:", error);
  }
}

export default pool;


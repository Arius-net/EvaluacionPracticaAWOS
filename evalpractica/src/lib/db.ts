import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const query = async (text: string, params?: unknown[]) => {
  const normalizedText = text.trim().replace(/\s+/g, ' ').toUpperCase();
  const isSelect = normalizedText.startsWith('SELECT ');
  const hasFromView = /\bFROM\s+VW_[A-Z0-9_]+\b/.test(normalizedText);

  if (!isSelect || !hasFromView) {
    throw new Error('Only SELECT queries from reporting views are allowed.');
  }

  try {
    const res = params ? await pool.query(text, params) : await pool.query(text);
    console.log('Query executed:', { text, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};
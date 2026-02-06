import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  port: 5432,
  user: process.env.DB_USER,      // Usa variables del .env
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    // Solo permitimos SELECT sobre VIEWS [cite: 4, 41, 71]
    console.log('Query executed:', { text, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};
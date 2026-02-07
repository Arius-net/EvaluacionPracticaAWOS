-- Migration script for academic evaluation.
-- Keep this file idempotent so docker re-runs do not fail.

ALTER TABLE IF EXISTS orders
  ADD COLUMN IF NOT EXISTS channel VARCHAR(50) NOT NULL DEFAULT 'counter';

ALTER TABLE IF EXISTS orders
  ADD COLUMN IF NOT EXISTS status VARCHAR(50) NOT NULL DEFAULT 'completed';

ALTER TABLE IF EXISTS products
  ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT TRUE;

/*
# Създаване на таблица paintings

1. Нова таблица
- `paintings` — съхранява картини за галерията SveArt
  - `id` (uuid, primary key)
  - `title` (text, име на картината)
  - `description` (text, описание)
  - `price` (numeric, цена в лева)
  - `image_url` (text, URL на изображението)
  - `technique` (text, техника — масло/акрил/акварел)
  - `dimensions` (text, размери)
  - `status` (text, 'available' или 'sold')
  - `created_at` (timestamptz)

2. Сигурност
- RLS включен на paintings.
- Публично четене за всички (anon + authenticated).
- Писане (insert/update/delete) само за authenticated администратори.
*/

CREATE TABLE IF NOT EXISTS paintings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  price numeric DEFAULT 0,
  image_url text,
  technique text,
  dimensions text,
  status text NOT NULL DEFAULT 'available',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE paintings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_paintings" ON paintings;
CREATE POLICY "public_select_paintings" ON paintings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_paintings" ON paintings;
CREATE POLICY "admin_insert_paintings" ON paintings FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_paintings" ON paintings;
CREATE POLICY "admin_update_paintings" ON paintings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_paintings" ON paintings;
CREATE POLICY "admin_delete_paintings" ON paintings FOR DELETE
  TO authenticated USING (true);

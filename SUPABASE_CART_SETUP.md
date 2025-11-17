# Supabase CART Table Setup

Run this SQL in your Supabase project (SQL editor) to create the `cart` table used by the app.

```sql
-- Create cart table
create table if not exists public.cart (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  product_id int not null,
  title text,
  price numeric,
  thumbnail text,
  quantity int default 1,
  created_at timestamptz default now()
);

-- Optional index to speed lookups per user
create index if not exists idx_cart_user_id on public.cart(user_id);
```

Notes:
- The app expects a table named `cart` (lowercase) with the columns above.
- `user_id` references the Supabase `auth.users` table and identifies the owner of each cart row.
- After creating the table, the app will read/write cart rows for authenticated users.

How it works in the app
- When an authenticated user signs in, the client loads `cart` rows filtered by `user_id`.
- Adding/updating/deleting cart items performs `insert`, `update` and `delete` operations on this table to persist changes.

If you want to allow non-authenticated users to keep carts server-side, you'd need to create a guest identifier and save that in `cart` as well.

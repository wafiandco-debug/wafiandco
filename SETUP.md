# Hosting & backend setup

The code for all three pieces below is already built. Each one needs an account
that only you can create, plus a few credentials pasted into environment
variables. Nothing here requires touching code again.

## 1. Hosting on Vercel

1. Create a free GitHub account (if you don't have one) at github.com, and a
   free Vercel account at vercel.com (you can sign up with the GitHub account
   directly).
2. Push this project to a new GitHub repository.
3. In Vercel, click "New Project," import that repository, and deploy.
4. Add the environment variables from section 2-4 below under
   Project Settings -> Environment Variables, then redeploy.
5. Add your own domain later under Project Settings -> Domains whenever you
   buy one — no code changes needed.

## 2. Contact & Career form emails (Gmail SMTP)

1. On the Google account for `wafiandco@gmail.com`, turn on 2-Step
   Verification if it isn't already on: https://myaccount.google.com/security
2. Generate an App Password: https://myaccount.google.com/apppasswords
   (choose "Mail" as the app). Google gives you a 16-character code.
3. Set these environment variables:
   - `GMAIL_USER` = `wafiandco@gmail.com`
   - `GMAIL_APP_PASSWORD` = the 16-character code (no spaces)
4. Once set, both the "Get in touch" form and the Career application form
   (including the resume attachment) will email straight to
   `wafiandco@gmail.com`.

## 3. Insights articles & the admin backend (Supabase)

1. Create a free project at https://supabase.com.
2. In the Supabase SQL editor, run:

   ```sql
   create table insights (
     slug text primary key,
     title text not null,
     category text not null,
     excerpt text not null,
     content text not null,
     date date not null default current_date,
     created_at timestamptz not null default now(),
     author_name text,
     author_position text,
     author_photo_url text
   );

   alter table insights enable row level security;

   create policy "Public read access" on insights
     for select using (true);
   ```

3. In Supabase, go to Project Settings -> API and copy:
   - `Project URL` -> set as `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key -> set as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (keep this one secret, server-only) -> set as
     `SUPABASE_SERVICE_ROLE_KEY`
4. Until these are set, the Insights pages keep showing the three built-in
   sample articles — the site never breaks.

## 3b. Author credit fields (run this once, in the Supabase SQL editor)

This adds the author name, position, and photo fields to the Insights table,
plus a storage bucket for the uploaded photos.

```sql
alter table insights
  add column if not exists author_name text,
  add column if not exists author_position text,
  add column if not exists author_photo_url text;

insert into storage.buckets (id, name, public)
values ('author-photos', 'author-photos', true)
on conflict (id) do nothing;

create policy "Public read access for author photos"
on storage.objects for select
using (bucket_id = 'author-photos');
```

## 4. The admin panel itself

1. Choose any password and set it as `ADMIN_PASSWORD`.
2. Visit `yoursite.com/admin` and log in with that password.
3. From there you can add, edit, and delete Insights articles — changes go
   live within about a minute, no developer or redeploy required.

## Summary of environment variables to set in Vercel

| Variable | Where it comes from |
| --- | --- |
| `GMAIL_USER` | Your Gmail address |
| `GMAIL_APP_PASSWORD` | Google App Passwords page |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Project Settings -> API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Project Settings -> API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Project Settings -> API |
| `ADMIN_PASSWORD` | Any password you choose |

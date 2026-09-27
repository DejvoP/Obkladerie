-- Homepage catalog visibility (max 4 shown on main site)
alter table public.categories
  add column if not exists show_in_catalog boolean not null default false;

update public.categories
set show_in_catalog = true
where slug in ('obklady', 'dlazby', 'venkovni', 'doplnky');

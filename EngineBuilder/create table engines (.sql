create table engines (
  id text primary key,
  name text,
  type text,
  displacement numeric
);

create table parts (
  id text primary key,
  name text,
  type text,
  price numeric,
  compatible_engines text[]
);

insert into engines values
('ls3', 'GM LS3', 'V8', 6.2),
('k20', 'Honda K20', 'I4', 2.0);

insert into parts values
('cam_ls', 'Stage 2 LS Cam', 'camshaft', 399, '{ls3}'),
('piston_k20', 'Forged K20 Pistons', 'pistons', 299, '{k20}');
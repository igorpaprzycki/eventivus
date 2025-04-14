-- migration file: v20240907123045_create_initial_schema.sql
-- purpose: create initial database schema for eventivus application
-- description: creates tables users, events, proposed_dates, votes, registrations with constraints, indexes, and row-level security (rls) policies.
-- note: all sql commands are in lowercase.

-------------------------------------

-- create table: users
create table users (
    id uuid primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(255) not null,
    password_hash varchar(60) not null,
    is_active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint users_email_unique unique (email)
);

-- create table: events
create table events (
    id uuid primary key,
    organizer_id uuid not null,
    title varchar(255) not null,
    description text,
    location varchar(255),
    event_type varchar(50) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint chk_event_type check (event_type in ('registration','planning')),
    constraint fk_organizer foreign key (organizer_id) references users(id)
);

-- create table: proposed_dates
create table proposed_dates (
    id uuid primary key,
    event_id uuid not null,
    proposed_date_start timestamptz not null,
    proposed_date_end timestamptz not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint fk_event foreign key (event_id) references events(id) on delete cascade
);

-- create table: votes
create table votes (
    id uuid primary key,
    user_id uuid not null,
    proposed_date_id uuid not null,
    vote varchar(50) not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint chk_vote_status check (vote in ('dostępny','może','niedostępny')),
    constraint fk_vote_user foreign key (user_id) references users(id) on delete cascade,
    constraint fk_proposed_date foreign key (proposed_date_id) references proposed_dates(id) on delete cascade,
    constraint votes_unique unique (user_id, proposed_date_id)
);

-- create table: registrations
create table registrations (
    id uuid primary key,
    event_id uuid not null,
    user_id uuid not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint fk_registration_event foreign key (event_id) references events(id) on delete cascade,
    constraint fk_registration_user foreign key (user_id) references users(id) on delete cascade,
    constraint registrations_unique unique (event_id, user_id)
);

-- create indexes for performance
create index idx_events_organizer_id on events(organizer_id);
create index idx_proposed_dates_event_id on proposed_dates(event_id);

-- enable row level security on all tables
alter table users enable row level security;
alter table events enable row level security;
alter table proposed_dates enable row level security;
alter table votes enable row level security;
alter table registrations enable row level security;

--------------------------------------------------------
-- rls policies for table: users
--------------------------------------------------------
-- policy for select: allow users to select only their own record (authenticated)
create policy users_select_authenticated on users
    for select
    to authenticated
    using (current_setting('app.current_user', true)::uuid = id);
    
-- policy for insert: allow all authenticated users to insert records (validation at application level)
create policy users_insert_authenticated on users
    for insert
    to authenticated
    with check (true);

-- policy for update: allow users to update only their own record (authenticated)
create policy users_update_authenticated on users
    for update
    to authenticated
    using (current_setting('app.current_user', true)::uuid = id)
    with check (current_setting('app.current_user', true)::uuid = id);

-- policy for delete: allow users to delete only their own record (authenticated)
create policy users_delete_authenticated on users
    for delete
    to authenticated
    using (current_setting('app.current_user', true)::uuid = id);

--------------------------------------------------------
-- rls policies for table: events
--------------------------------------------------------
-- policy for select: allow public access to view events (anon and authenticated)
create policy events_select_anon on events
    for select
    to anon
    using (true);
create policy events_select_authenticated on events
    for select
    to authenticated
    using (true);

-- policy for insert: allow only the organizer (authenticated user) to insert an event
create policy events_insert_authenticated on events
    for insert
    to authenticated
    with check (current_setting('app.current_user', true)::uuid = organizer_id);

-- policy for update: allow only the organizer (authenticated user) to update an event
create policy events_update_authenticated on events
    for update
    to authenticated
    using (current_setting('app.current_user', true)::uuid = organizer_id)
    with check (current_setting('app.current_user', true)::uuid = organizer_id);

-- policy for delete: allow only the organizer (authenticated user) to delete an event
create policy events_delete_authenticated on events
    for delete
    to authenticated
    using (current_setting('app.current_user', true)::uuid = organizer_id);

--------------------------------------------------------
-- rls policies for table: proposed_dates
--------------------------------------------------------
-- policy for select: allow public access to view proposed dates (anon and authenticated)
create policy proposed_dates_select_anon on proposed_dates
    for select
    to anon
    using (true);
create policy proposed_dates_select_authenticated on proposed_dates
    for select
    to authenticated
    using (true);

-- policy for insert: allow only the event organizer to insert proposed dates
create policy proposed_dates_insert_authenticated on proposed_dates
    for insert
    to authenticated
    with check (exists (select 1 from events where id = proposed_dates.event_id and organizer_id = current_setting('app.current_user', true)::uuid));

-- policy for update: allow only the event organizer to update proposed dates
create policy proposed_dates_update_authenticated on proposed_dates
    for update
    to authenticated
    using (exists (select 1 from events where id = proposed_dates.event_id and organizer_id = current_setting('app.current_user', true)::uuid))
    with check (exists (select 1 from events where id = proposed_dates.event_id and organizer_id = current_setting('app.current_user', true)::uuid));

-- policy for delete: allow only the event organizer to delete proposed dates
create policy proposed_dates_delete_authenticated on proposed_dates
    for delete
    to authenticated
    using (exists (select 1 from events where id = proposed_dates.event_id and organizer_id = current_setting('app.current_user', true)::uuid));

--------------------------------------------------------
-- rls policies for table: votes
--------------------------------------------------------
-- policy for select: allow public access to view votes (anon and authenticated)
create policy votes_select_anon on votes
    for select
    to anon
    using (true);
create policy votes_select_authenticated on votes
    for select
    to authenticated
    using (true);

-- policy for insert: allow only the user to insert their vote
create policy votes_insert_authenticated on votes
    for insert
    to authenticated
    with check (current_setting('app.current_user', true)::uuid = user_id);

-- policy for update: allow only the user to update their vote
create policy votes_update_authenticated on votes
    for update
    to authenticated
    using (current_setting('app.current_user', true)::uuid = user_id)
    with check (current_setting('app.current_user', true)::uuid = user_id);

-- policy for delete: allow only the user to delete their vote
create policy votes_delete_authenticated on votes
    for delete
    to authenticated
    using (current_setting('app.current_user', true)::uuid = user_id);

--------------------------------------------------------
-- rls policies for table: registrations
--------------------------------------------------------
-- policy for select: allow public access to view registrations (anon and authenticated)
create policy registrations_select_anon on registrations
    for select
    to anon
    using (true);
create policy registrations_select_authenticated on registrations
    for select
    to authenticated
    using (true);

-- policy for insert: allow only the user to register themselves for an event
create policy registrations_insert_authenticated on registrations
    for insert
    to authenticated
    with check (current_setting('app.current_user', true)::uuid = user_id);

-- policy for update: allow only the user to update their registration
create policy registrations_update_authenticated on registrations
    for update
    to authenticated
    using (current_setting('app.current_user', true)::uuid = user_id)
    with check (current_setting('app.current_user', true)::uuid = user_id);

-- policy for delete: allow only the user to cancel their registration
create policy registrations_delete_authenticated on registrations
    for delete
    to authenticated
    using (current_setting('app.current_user', true)::uuid = user_id); 
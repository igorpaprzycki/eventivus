
Database Schema for EVENTIVUS

1. Lista tabel z kolumnami, typami danych i ograniczeniami
---------------------------------------------------------

**users**
- id: UUID PRIMARY KEY
- first_name: VARCHAR(100)
- last_name: VARCHAR(100)
- email: VARCHAR(255) NOT NULL UNIQUE
- password_hash: VARCHAR(60) NOT NULL
- is_active: BOOLEAN NOT NULL DEFAULT TRUE
- created_at: TIMESTAMPTZ NOT NULL DEFAULT now()
- updated_at: TIMESTAMPTZ NOT NULL DEFAULT now()

**events**
- id: UUID PRIMARY KEY
- organizer_id: UUID NOT NULL REFERENCES users(id)
- title: VARCHAR(255) NOT NULL
- description: TEXT
- location: VARCHAR(255)
- event_type: VARCHAR(50) NOT NULL -- CHECK constraint to allow only 'Registration' or 'Planning'
    CONSTRAINT chk_event_type CHECK (event_type IN ('Registration', 'Planning'))
- created_at: TIMESTAMPTZ NOT NULL DEFAULT now()
- updated_at: TIMESTAMPTZ NOT NULL DEFAULT now()

**proposed_dates**
- id: UUID PRIMARY KEY
- event_id: UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE
- proposed_date_start: TIMESTAMPTZ NOT NULL
- proposed_date_end: TIMESTAMPTZ NOT NULL
- created_at: TIMESTAMPTZ NOT NULL DEFAULT now()
- updated_at: TIMESTAMPTZ NOT NULL DEFAULT now()

  /*
  Uwaga: Dla wydarzeń typu 'Registration' aplikacja powinna wymusić istnienie tylko jednej propozycji,
  a dla 'Planning' – minimum dwóch. Ograniczenia te będą egzekwowane przez logikę aplikacyjną lub triggery.
  */

**votes**
- id: UUID PRIMARY KEY
- user_id: UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
- proposed_date_id: UUID NOT NULL REFERENCES proposed_dates(id) ON DELETE CASCADE
- vote: VARCHAR(50) NOT NULL
    CONSTRAINT chk_vote_status CHECK (vote IN ('Dostępny', 'Może', 'Niedostępny'))
- created_at: TIMESTAMPTZ NOT NULL DEFAULT now()
- updated_at: TIMESTAMPTZ NOT NULL DEFAULT now()

  /*
  Unikalność głosu: Jeden użytkownik może zagłosować tylko raz na daną propozycję.
  */

**registrations**
- id: UUID PRIMARY KEY
- event_id: UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE
- user_id: UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
- created_at: TIMESTAMPTZ NOT NULL DEFAULT now()
- updated_at: TIMESTAMPTZ NOT NULL DEFAULT now()

  /*
  Unikalny zapis: Każdy użytkownik może zarejestrować się tylko raz na dane wydarzenie.
  */

2. Relacje między tabelami
---------------------------

- Każdy rekord w tabeli `events` jest powiązany z jednym organizatorem z tabeli `users` (jeden-do-wielu).
- Każde wydarzenie (`events`) może mieć wiele propozycji dat w tabeli `proposed_dates` (jeden-do-wielu).
- Każda propozycja daty (`proposed_dates`) może mieć wiele głosów w tabeli `votes` (jeden-do-wielu).
- Każdy głos w tabeli `votes` jest przypisany do konkretnego użytkownika (users) i propozycji (proposed_dates).
- Każde wydarzenie (`events`) może mieć wiele rejestracji w tabeli `registrations` (jeden-do-wielu), a rejestracje łączą użytkowników i wydarzenia.

3. Indeksy
-----------

- Unikalny indeks na `users.email`.
- Indeks na `events.organizer_id` dla szybszego wyszukiwania wydarzeń organizowanych przez danego użytkownika.
- Indeks na `proposed_dates.event_id` dla optymalizacji zapytań związanych z propozycjami terminów dla wydarzenia.
- Unikalny indeks kompozytowy na `(votes.user_id, votes.proposed_date_id)` zapobiegający wielokrotnemu głosowaniu.
- Unikalny indeks kompozytowy na `(registrations.event_id, registrations.user_id)` zapobiegający wielokrotnym rejestracjom tego samego użytkownika na jedno wydarzenie.

4. Zasady PostgreSQL – Row-Level Security (RLS)
------------------------------------------------

- Wdrożenie RLS na tabelach wrażliwych (np. `events`, `votes`, `registrations`), aby:
  - Organizator wydarzenia miał pełen dostęp do modyfikacji swojego wydarzenia.
  - Użytkownicy mogli modyfikować lub usuwać jedynie swoje głosy i rejestracje.
- Polityki RLS mogą wyglądać następująco (implementacja zależna od wymagań aplikacji):
  - `events`: Dostęp do modyfikacji tylko dla organizatora.
  - `votes` i `registrations`: Dostęp do modyfikacji tylko dla właściciela rekordu.

5. Dodatkowe uwagi
-------------------

- Wszystkie tabele zawierają kolumny `created_at` i `updated_at` do celów audytu.
- Ograniczenia specyficzne dla logiki biznesowej (np. minimalna liczba propozycji dla wydarzeń typu 'Planning' oraz maksymalnie jedna propozycja dla 'Registration') powinny być egzekwowane przez logikę aplikacyjną lub dodatkowe triggery, gdyż nie są bezpośrednio możliwe do wymuszenia za pomocą CHECK constraints.
- Schemat jest zaprojektowany z myślą o skalowalności i wydajności poprzez stosowanie odpowiednich indeksów i relacji referencyjnych.

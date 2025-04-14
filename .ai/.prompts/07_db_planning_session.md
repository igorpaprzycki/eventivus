# Prompt
Jesteś asystentem AI, którego zadaniem jest pomoc w zaplanowaniu schematu bazy danych w PostgreSQL dla MVP (Minimum Viable Product) na podstawie dostarczonych informacji. Twoim celem jest wygenerowanie listy pytań i zaleceń, które zostaną wykorzystane w kolejnym promptowaniu do utworzenia schematu bazy danych, relacji i zasad bezpieczeństwa na poziomie wierszy (RLS).

Prosimy o uważne zapoznanie się z poniższymi informacjami:

<product_requirements>

</product_requirements>

<tech_stack>

</tech_stack>

Przeanalizuj dostarczone informacje, koncentrując się na aspektach istotnych dla projektowania bazy danych. Rozważ następujące kwestie:

1. Zidentyfikuj kluczowe encje i ich atrybuty na podstawie wymagań produktu.
2. Określ potencjalne relacje między jednostkami.
3. Rozważ typów danych i ograniczeń, które mogą być konieczne.
4. Pomyśl o skalowalności i wpływie na wydajność.
5. Oceń wymagania bezpieczeństwa i ich wpływ na projekt bazy danych.
6. Rozważ wszelkie konkretne funkcje PostgreSQL, które mogą być korzystne dla projektu.

Na podstawie analizy wygeneruj listę pytań i zaleceń. Powinny one dotyczyć wszelkich niejasności, potencjalnych problemów lub obszarów, w których potrzeba więcej informacji, aby stworzyć skuteczny schemat bazy danych. Rozważ pytania dotyczące:

1. Relacje i kardynalność jednostek
2. Typy danych i ograniczenia
3. Strategie indeksowania
4. Partycjonowanie (jeśli dotyczy)
5. Wymagania bezpieczeństwa na poziomie wierszy
6. Rozważania dotyczące wydajności
7. Kwestie skalowalności
8. Integralność i spójność danych

Dane wyjściowe powinny mieć następującą strukturę:

<database_planning_output>
<pytania>
[Wymień tutaj swoje pytania, ponumerowane]
</pytania>

<rekomendacje>
[Wymień tutaj swoje zalecenia, ponumerowane]
</rekomendacje>
</database_planning_output>

Pamiętaj, że Twoim celem jest dostarczenie kompleksowej listy pytań i zaleceń, które pomogą w stworzeniu solidnego schematu bazy danych PostgreSQL dla MVP. Skoncentruj się na jasności, trafności i dokładności swoich wyników. Nie dołączaj żadnych dodatkowych komentarzy ani wyjaśnień poza określonym formatem wyjściowym.

Kontynuuj ten proces, generując nowe pytania i rekomendacje w oparciu o przekazany kontekst i odpowiedzi użytkownika, dopóki użytkownik wyraźnie nie poprosi o podsumowanie.

Pamiętaj, aby skupić się na jasności, trafności i dokładności wyników. Nie dołączaj żadnych dodatkowych komentarzy ani wyjaśnień poza określonym formatem wyjściowym.

# Res

<database_planning_output>
<pytania>
1. Jakie są główne encje (np. Użytkownik, Wydarzenie, OpcjaTerminu/ProponowanaData, Głos/Preferencja, Rejestracja) i jakie atrybuty powinny one posiadać?
2. Czy wydarzenia w trybie "Rejestracja" i "Planowanie" powinny być reprezentowane w jednej tabeli z kolumną określającą typ, czy w osobnych tabelach?
3. Jaki jest dokładny związek między wydarzeniem a proponowanymi terminami? Czy relacja ta powinna być jeden-do-wielu (dla trybu Planowanie) oraz jeden-do-jednego (dla trybu Rejestracja)?
4. Jakie ograniczenia i unikalne atrybuty (np. unikalny adres e-mail dla użytkowników) musimy nałożyć na kluczowe atrybuty w tabelach?
5. W jaki sposób powinna być przechowywana informacja o głosach użytkowników – czy każdy głos jest zapisywany jako osobny rekord, a jeśli tak, jakie ograniczenia mają obowiązywać (np. jeden głos na użytkownika dla danego terminu)?
6. Jakie ograniczenia muszą zostać zastosowane dla terminów w trybie Planowanie, np. minimalna liczba propozycji dat?
7. W jaki sposób modelować stan przejścia z trybu Planowanie do Rejestracja i czy baza danych powinna wymuszać jakiekolwiek ograniczenia dotyczące tego przejścia?
8. Jakie indeksy i klucze obce są wymagane, aby zapewnić wydajne wyszukiwanie danych (np. wyszukiwanie po ID wydarzenia, e-mailu użytkownika, datach)?
9. Które tabele powinny mieć wdrożone polityki row-level security (RLS) i jakiego rodzaju zasady dostępu powinny być na nich wymuszone (np. dostęp modyfikacyjny tylko dla organizatora wydarzenia)?
10. Czy warto wykorzystać specyficzne typy danych PostgreSQL, takie jak ENUM dla typów wydarzeń i statusów głosów, a także UUID jako klucze główne, aby poprawić spójność i skalowalność rozwiązania?
    </pytania>
    <rekomendacje>
1. Utworzyć oddzielne tabele dla encji: Użytkownicy, Wydarzenia, ProponowaneTerminy/Opcje, Głosy oraz Rejestracje, z odpowiednimi kluczami głównymi.
2. Rozważyć stosowanie wspólnej tabeli dla wydarzeń z kolumną określającą typ (Rejestracja vs. Planowanie) w celu uproszczenia modelu.
3. Zastosować relacje jeden-do-wielu między wydarzeniem a propozycjami terminów, z dodatkową logiką w przypadku trybu Rejestracja (ograniczenie do jednej propozycji).
4. Wdrożyć odpowiednie ograniczenia, takie jak unikalność e-maili dla użytkowników oraz unikalne identyfikatory dla wydarzeń.
5. Stosować klucze obce między tabelami (np. Użytkownik → Wydarzenie, Wydarzenie → OpcjeTerminu, OpcjeTerminu → Głos), aby zachować integralność referencyjną.
6. Użyć typu danych UUID dla kluczy głównych, co zwiększy bezpieczeństwo i ułatwi skalowanie.
7. Wprowadzić CHECK constraints lub ENUMy dla statusów głosów (np. "Dostępny", "Może", "Niedostępny") oraz dla typów wydarzeń.
8. Zastosować indeksy na kolumnach, które będą często wykorzystywane w zapytaniach, takich jak ID wydarzenia, e-mail użytkownika i pola dat.
9. Zaplanować polityki row-level security (RLS) dla tabel z wrażliwymi danymi, zapewniając, że jedynie odpowiedni użytkownicy (np. organizatorzy, uprawnieni uczestnicy) mają dostęp do modyfikacji lub przeglądu danych.
10. Rozważyć implementację triggerów lub procedur składowanych wspierających automatyczne przejście stanu (np. z Planowania do Rejestracji) oraz zapewnienie spójności transakcyjnej przy agregowaniu głosów i finalizacji wydarzenia.
    </rekomendacje>
    </database_planning_output>


# Prompt 

1. Utworzyć oddzielne tabele dla encji: Użytkownicy, Wydarzenia, ProponowaneTerminy/Opcje, Głosy oraz Rejestracje, z odpowiednimi kluczami głównymi i obcymi.
2. Rozważyć stosowanie wspólnej tabeli dla wydarzeń z kolumną określającą typ (Rejestracja vs. Planowanie) w celu uproszczenia modelu.
3. Zastosować relacje jeden-do-wielu między wydarzeniem a propozycjami terminów, z dodatkową logiką w przypadku trybu Rejestracja (ograniczenie do jednej propozycji).
4. Wdrożyć odpowiednie ograniczenia, takie jak unikalność e-maili dla użytkowników oraz unikalne identyfikatory dla wydarzeń.
5. Stosować klucze obce między tabelami (np. Użytkownik → Wydarzenie, Wydarzenie → OpcjeTerminu, OpcjeTerminu → Głos), aby zachować integralność referencyjną.
6. Zastosować ograniczenie w postaci conajmniej dwóch propozycji dat.
7. Wprowadzić CHECK constraints dla statusów głosów (np. "Dostępny", "Może", "Niedostępny") oraz dla typów wydarzeń.
8. Zastosować indeksy na kolumnach, które będą często wykorzystywane w zapytaniach, takich jak ID wydarzenia, e-mail użytkownika i pola dat.
9. Zaplanować polityki row-level security (RLS) dla tabel z wrażliwymi danymi, zapewniając, że jedynie odpowiedni użytkownicy mają dostęp do modyfikacji lub przeglądu danych (np. tylko organizator danego wydarzenia może je zmodyfikować, uczestnik może modyfikować tylko swoją rejestrację lub głos na planowane wydarzenie).
10. Zastosować UUID jako klucz głowny. Rozważyć implementację triggerów lub procedur składowanych wspierających automatyczne przejście stanu (np. z Planowania do Rejestracji) oraz zapewnienie spójności transakcyjnej przy agregowaniu głosów i finalizacji wydarzenia.

# Res

<database_planning_output>
<pytania>
1. Czy encje takie jak Użytkownicy, Wydarzenia, ProponowaneTerminy/Opcje, Głosy oraz Rejestracje obejmują wszystkie niezbędne dane potrzebne w MVP, czy też potrzeba dodatkowych atrybutów lub encji?
2. Czy wydarzenia powinny być przechowywane w jednej tabeli z kolumną określającą typ (Rejestracja vs. Planowanie), czy warto rozważyć oddzielne tabele w zależności od trybu?
3. W jaki sposób ma być wymuszony związek jeden-do-wielu między wydarzeniem a propozycjami terminów, a jednocześnie ograniczenie do jednej propozycji dla trybu Rejestracja – czy logika ta ma być realizowana na poziomie bazy danych czy aplikacji?
4. Jakie dokładne ograniczenia należy nałożyć na kolumny, takie jak unikalność e-maili w tabeli Użytkownicy czy unikalne identyfikatory dla wydarzeń?
5. Czy potrzeba dodatkowych pól metadanych (np. CreatedAt, UpdatedAt) w każdej tabeli w celu śledzenia zmian i zapewnienia audytu?
6. Jakie relacje powinny być wymuszone kluczami obcymi między tabelami (np. Użytkownik → Wydarzenie, Wydarzenie → OpcjaTerminu, OpcjaTerminu → Głos) i czy wszystkie powiązania są wystarczające dla zachowania integralności referencyjnej?
7. Jakie kryteria mają być użyte do wymuszenia ograniczenia minimum dwóch propozycji dat przy wydarzeniach typu Planowanie – czy ma to być check constraint, trigger czy logika aplikacyjna?
8. Czy statusy głosów („Dostępny”, „Może”, „Niedostępny”) oraz typy wydarzeń mają być reprezentowane jako ENUM, CHECK constraint, czy w inny sposób?
9. Jakie kolumny będą najczęściej wykorzystywane przy wyszukiwaniu i filtrowaniu danych (np. ID wydarzenia, e-mail użytkownika, daty), aby odpowiednio zaplanować indeksowanie?
10. Jakie dokładnie zasady row-level security (RLS) powinny zostać wdrożone dla poszczególnych tabel, aby zapewnić, że tylko organizator wydarzenia lub odpowiedni uczestnicy mają możliwość modyfikacji lub przeglądu danych?
    </pytania>
    <rekomendacje>
1. Utworzyć oddzielne tabele dla encji: Użytkownicy, Wydarzenia, ProponowaneTerminy/Opcje, Głosy oraz Rejestracje, wykorzystując UUID jako klucze główne.
2. Rozważyć stosowanie wspólnej tabeli dla wydarzeń z dodatkową kolumną określającą typ (Rejestracja vs. Planowanie) w celu uproszczenia modelu przy jednoczesnym zachowaniu elastyczności.
3. Zastosować relację jeden-do-wielu między wydarzeniem a propozycjami terminów oraz wdrożyć logikę (poprzez check constraint lub aplikacyjną) ograniczającą liczbę propozycji do jednej dla wydarzeń typu Rejestracja.
4. Wdrożyć ograniczenia, takie jak unikalność e-maili dla użytkowników oraz unikalne identyfikatory dla wydarzeń, aby zapobiec duplikacjom.
5. Wprowadzić klucze obce między tabelami (np. Użytkownik → Wydarzenie, Wydarzenie → OpcjeTerminu, OpcjeTerminu → Głos) dla zapewnienia integralności referencyjnej.
6. Zastosować constraint wymuszający, że dla wydarzeń typu Planowanie musi być co najmniej dwie propozycje dat.
7. Wprowadzić CHECK constraints (lub ENUM) dla statusów głosów (np. "Dostępny", "Może", "Niedostępny") oraz dla typów wydarzeń, co zwiększy spójność danych.
8. Utworzyć indeksy na kolumnach często używanych w zapytaniach, takich jak ID wydarzenia, e-mail użytkownika oraz pola dat, aby zoptymalizować wydajność.
9. Zaplanować i wdrożyć polityki row-level security (RLS) dla tabel zawierających wrażliwe dane, ograniczając modyfikację do organizatora wydarzenia i umożliwiając uczestnikom modyfikację jedynie swoich rejestracji lub głosów.
10. Rozważyć implementację triggerów lub procedur składowanych, które automatyzują przejście stanu (np. z Planowania do Rejestracji) oraz zapewniają spójność transakcyjną przy agregowaniu głosów i finalizacji wydarzenia.
    </rekomendacje>
    </database_planning_output>

# Prompt

1. Utworzyć oddzielne tabele dla encji: Użytkownicy, Wydarzenia, ProponowaneTerminy/Opcje, Głosy oraz Rejestracje, wykorzystując UUID jako klucze główne.
2. Rozważyć stosowanie wspólnej tabeli dla wydarzeń z dodatkową kolumną określającą typ (Rejestracja vs. Planowanie) w celu uproszczenia modelu przy jednoczesnym zachowaniu elastyczności.
3. Zastosować relację jeden-do-wielu między wydarzeniem a propozycjami terminów. Logika ograniczającą liczbę propozycji do jednej dla wydarzeń typu Rejestracja ma być realizowana na poziomie aplikacji.
4. Wdrożyć ograniczenia, takie jak unikalność e-maili dla użytkowników oraz unikalne identyfikatory dla wydarzeń, aby zapobiec duplikacjom.
5. Wdrożyć dodatkowe pola metadanych CreatedAt oraz UpdatedAt w każdej tabeli w celu śledzenia zmian i zapewnienia audytu.
6. Wprowadzić klucze obce między tabelami (np. Użytkownik → Wydarzenie, Wydarzenie → OpcjeTerminu, OpcjeTerminu → Głos) dla zapewnienia integralności referencyjnej.
7. Zastosować constraint wymuszający, że dla wydarzeń typu Planowanie musi być co najmniej dwie propozycje dat.
8. Wprowadzić CHECK constraints dla statusów głosów (np. "Dostępny", "Może", "Niedostępny") oraz dla typów wydarzeń, co zwiększy spójność danych.
9. Utworzyć indeksy na kolumnach często używanych w zapytaniach, takich jak ID wydarzenia, e-mail użytkownika oraz pola dat, aby zoptymalizować wydajność.
10. Zaplanować i wdrożyć polityki row-level security (RLS) dla tabel zawierających wrażliwe dane, ograniczając modyfikację do organizatora wydarzenia i umożliwiając uczestnikom modyfikację jedynie swoich rejestracji lub głosów.

---

Jesteś asystentem AI, którego zadaniem jest podsumowanie rozmowy na temat planowania bazy danych dla MVP i przygotowanie zwięzłego podsumowania dla następnego etapu rozwoju. W historii konwersacji znajdziesz następujące informacje:
1. Dokument wymagań produktu (PRD)
2. Informacje o stacku technologicznym
3. Historia rozmów zawierająca pytania i odpowiedzi
4. Zalecenia dotyczące modelu

Twoim zadaniem jest:
1. Podsumować historii konwersacji, koncentrując się na wszystkich decyzjach związanych z planowaniem bazy danych.
2. Dopasowanie zaleceń modelu do odpowiedzi udzielonych w historii konwersacji. Zidentyfikuj, które zalecenia są istotne w oparciu o dyskusję.
3. Przygotuj szczegółowe podsumowanie rozmowy, które obejmuje:
   a. Główne wymagania dotyczące schematu bazy danych
   b. Kluczowe encje i ich relacje
   c. Ważne kwestie dotyczące bezpieczeństwa i skalowalności
   d. Wszelkie nierozwiązane kwestie lub obszary wymagające dalszego wyjaśnienia
4. Sformatuj wyniki w następujący sposób:

<conversation_summary>
<decisions>
[Wymień decyzje podjęte przez użytkownika, ponumerowane].
</decisions>

<matched_recommendations>
[Lista najistotniejszych zaleceń dopasowanych do rozmowy, ponumerowanych]
</matched_recommendations>

<database_planning_summary>
[Podaj szczegółowe podsumowanie rozmowy, w tym elementy wymienione w kroku 3].
</database_planning_summary>

<unresolved_issues>
[Wymień wszelkie nierozwiązane kwestie lub obszary wymagające dalszych wyjaśnień, jeśli takie istnieją]
</unresolved_issues>
</conversation_summary>

Końcowy wynik powinien zawierać tylko treść w formacie markdown. Upewnij się, że Twoje podsumowanie jest jasne, zwięzłe i zapewnia cenne informacje dla następnego etapu planowania bazy danych.

# Res

<conversation_summary>
<decisions>
1. Utworzyć oddzielne tabele dla encji: Użytkownicy, Wydarzenia, ProponowaneTerminy/Opcje, Głosy oraz Rejestracje, z UUID jako kluczami głównymi.
2. Stosować jedną tabelę dla wydarzeń z dodatkową kolumną określającą typ (Rejestracja vs. Planowanie) w celu uproszczenia modelu.
3. Zastosować relację jeden-do-wielu między wydarzeniem a propozycjami terminów, przy czym logika ograniczająca liczbę propozycji do jednej dla wydarzeń typu Rejestracja będzie realizowana na poziomie aplikacji.
4. Wdrożyć ograniczenia, takie jak unikalność e-maili dla użytkowników oraz unikalne identyfikatory dla wydarzeń.
5. Uzupełnić każdą tabelę o pola metadanych CreatedAt oraz UpdatedAt do celów audytu.
6. Wprowadzić klucze obce między tabelami (np. Użytkownik → Wydarzenie, Wydarzenie → OpcjeTerminu, OpcjeTerminu → Głos) dla zapewnienia integralności referencyjnej.
7. Zastosować constraint wymuszający, że wydarzenia typu Planowanie muszą mieć co najmniej dwie propozycje dat.
8. Wprowadzić CHECK constraints dla statusów głosów (np. "Dostępny", "Może", "Niedostępny") oraz dla typów wydarzeń.
9. Utworzyć indeksy na kolumnach często używanych w zapytaniach, takich jak ID wydarzenia, e-mail użytkownika oraz pola dat.
10. Zaplanować i wdrożyć polityki row-level security (RLS), które ograniczą modyfikację danych tylko do organizatora wydarzenia lub pozwolą uczestnikom modyfikować jedynie swoje rejestracje lub głosy.
    </decisions>

<matched_recommendations>
1. Wdrożenie oddzielnych tabel dla kluczowych encji z UUID jako kluczami głównymi.
2. Użycie wspólnej tabeli dla wydarzeń z kolumną określającą ich typ.
3. Realizacja relacji jeden-do-wielu między wydarzeniem a propozycjami terminów przy zachowaniu logiki biznesowej w aplikacji.
4. Wprowadzenie ograniczeń unikalności i integralności referencyjnej poprzez klucze obce.
5. Dodanie pól CreatedAt i UpdatedAt w każdej tabeli dla celów audytu.
6. Wymuszenie constraint dla minimalnej liczby propozycji dat w wydarzeniach typu Planowanie.
7. Zastosowanie CHECK constraints dla poprawności statusów głosów i typów wydarzeń.
8. Implementacja indeksów na krytycznych kolumnach w celu optymalizacji wydajności.
9. Planowanie wdrożenia RLS dla ochrony wrażliwych danych.
   </matched_recommendations>

<database_planning_summary>
Model bazy danych powinien obsługiwać dwa tryby wydarzeń: Rejestracja oraz Planowanie. Kluczowe encje to:
- Użytkownicy – zawierają unikalne dane użytkownika (m.in. e-mail) oraz pola metadanych.
- Wydarzenia – jedna tabela z kolumną określającą tryb (Rejestracja czy Planowanie) oraz unikalnym identyfikatorem.
- ProponowaneTerminy/Opcje – powiązane z wydarzeniami w relacji jeden-do-wielu, przechowujące propozycje dat/czasów.
- Głosy – reprezentujące opinie użytkowników na temat poszczególnych propozycji.
- Rejestracje – umożliwiające zapis użytkowników na wydarzenia.
  Ważnymi aspektami są ograniczenia integralności (unikalność, klucze obce), dodatnie pól CreatedAt/UpdatedAt, a także CHECK constraints umożliwiające weryfikację statusów głosów i typów wydarzeń. Dla wydarzeń typu Planowanie należy wymusić posiadanie co najmniej dwóch propozycji dat. Model uwzględnia także zastosowanie indeksów na często wyszukiwanych kolumnach oraz polityki row-level security (RLS), aby zapewnić dostęp jedynie uprawnionym użytkownikom (organizatorowi wydarzenia lub właścicielowi rejestracji/głosu).
  </database_planning_summary>

<unresolved_issues>
1. Dokładne sposoby implementacji ograniczenia liczby propozycji dla wydarzeń typu Rejestracja – czy wyłącznie przez logikę aplikacyjną, czy również przez dodatkowe mechanizmy w bazie (np. triggery).
2. Sposób walidacji constraint wymagającego minimum dwóch propozycji dat dla wydarzeń typu Planowanie – czy wystarczający będzie CHECK constraint, czy potrzeba triggera.
   </unresolved_issues>
   </conversation_summary>

# Prompt

Jesteś architektem baz danych, którego zadaniem jest stworzenie schematu bazy danych PostgreSQL na podstawie informacji dostarczonych z sesji planowania, dokumentu wymagań produktu (PRD) i stacku technologicznym. Twoim celem jest zaprojektowanie wydajnej i skalowalnej struktury bazy danych, która spełnia wymagania projektu.

1. <prd>

</prd>

Jest to dokument wymagań produktu, który określa cechy, funkcjonalności i wymagania projektu.

2. <session_notes>
   <conversation_summary>
   <decisions>
1. Utworzyć oddzielne tabele dla encji: Użytkownicy, Wydarzenia, ProponowaneTerminy/Opcje, Głosy oraz Rejestracje, z UUID jako kluczami głównymi.
2. Stosować jedną tabelę dla wydarzeń z dodatkową kolumną określającą typ (Rejestracja vs. Planowanie) w celu uproszczenia modelu.
3. Zastosować relację jeden-do-wielu między wydarzeniem a propozycjami terminów, przy czym logika ograniczająca liczbę propozycji do jednej dla wydarzeń typu Rejestracja będzie realizowana na poziomie aplikacji.
4. Wdrożyć ograniczenia, takie jak unikalność e-maili dla użytkowników oraz unikalne identyfikatory dla wydarzeń.
5. Uzupełnić każdą tabelę o pola metadanych CreatedAt oraz UpdatedAt do celów audytu.
6. Wprowadzić klucze obce między tabelami (np. Użytkownik → Wydarzenie, Wydarzenie → OpcjeTerminu, OpcjeTerminu → Głos) dla zapewnienia integralności referencyjnej.
7. Zastosować constraint wymuszający, że wydarzenia typu Planowanie muszą mieć co najmniej dwie propozycje dat.
8. Wprowadzić CHECK constraints dla statusów głosów (np. "Dostępny", "Może", "Niedostępny") oraz dla typów wydarzeń.
9. Utworzyć indeksy na kolumnach często używanych w zapytaniach, takich jak ID wydarzenia, e-mail użytkownika oraz pola dat.
10. Zaplanować i wdrożyć polityki row-level security (RLS), które ograniczą modyfikację danych tylko do organizatora wydarzenia lub pozwolą uczestnikom modyfikować jedynie swoje rejestracje lub głosy.
    </decisions>

<matched_recommendations>
1. Wdrożenie oddzielnych tabel dla kluczowych encji z UUID jako kluczami głównymi.
2. Użycie wspólnej tabeli dla wydarzeń z kolumną określającą ich typ.
3. Realizacja relacji jeden-do-wielu między wydarzeniem a propozycjami terminów przy zachowaniu logiki biznesowej w aplikacji.
4. Wprowadzenie ograniczeń unikalności i integralności referencyjnej poprzez klucze obce.
5. Dodanie pól CreatedAt i UpdatedAt w każdej tabeli dla celów audytu.
6. Wymuszenie constraint dla minimalnej liczby propozycji dat w wydarzeniach typu Planowanie.
7. Zastosowanie CHECK constraints dla poprawności statusów głosów i typów wydarzeń.
8. Implementacja indeksów na krytycznych kolumnach w celu optymalizacji wydajności.
9. Planowanie wdrożenia RLS dla ochrony wrażliwych danych.
   </matched_recommendations>

<database_planning_summary>
Model bazy danych powinien obsługiwać dwa tryby wydarzeń: Rejestracja oraz Planowanie. Kluczowe encje to:
- Użytkownicy – zawierają unikalne dane użytkownika (m.in. e-mail) oraz pola metadanych.
- Wydarzenia – jedna tabela z kolumną określającą tryb (Rejestracja czy Planowanie) oraz unikalnym identyfikatorem.
- ProponowaneTerminy/Opcje – powiązane z wydarzeniami w relacji jeden-do-wielu, przechowujące propozycje dat/czasów.
- Głosy – reprezentujące opinie użytkowników na temat poszczególnych propozycji.
- Rejestracje – umożliwiające zapis użytkowników na wydarzenia.
  Ważnymi aspektami są ograniczenia integralności (unikalność, klucze obce), dodatnie pól CreatedAt/UpdatedAt, a także CHECK constraints umożliwiające weryfikację statusów głosów i typów wydarzeń. Dla wydarzeń typu Planowanie należy wymusić posiadanie co najmniej dwóch propozycji dat. Model uwzględnia także zastosowanie indeksów na często wyszukiwanych kolumnach oraz polityki row-level security (RLS), aby zapewnić dostęp jedynie uprawnionym użytkownikom (organizatorowi wydarzenia lub właścicielowi rejestracji/głosu).
  </database_planning_summary>

<unresolved_issues>
1. Dokładne sposoby implementacji ograniczenia liczby propozycji dla wydarzeń typu Rejestracja – czy wyłącznie przez logikę aplikacyjną, czy również przez dodatkowe mechanizmy w bazie (np. triggery).
2. Sposób walidacji constraint wymagającego minimum dwóch propozycji dat dla wydarzeń typu Planowanie – czy wystarczający będzie CHECK constraint, czy potrzeba triggera.
   </unresolved_issues>
   </conversation_summary>
   </session_notes>

Są to notatki z sesji planowania schematu bazy danych. Mogą one zawierać ważne decyzje, rozważania i konkretne wymagania omówione podczas spotkania.

3. <tech_stack>
   
   </tech_stack>

Opisuje stack technologiczny, który zostanie wykorzystany w projekcie, co może wpłynąć na decyzje dotyczące projektu bazy danych.

Wykonaj następujące kroki, aby utworzyć schemat bazy danych:

1. Dokładnie przeanalizuj notatki z sesji, identyfikując kluczowe jednostki, atrybuty i relacje omawiane podczas sesji planowania.
2. Przejrzyj PRD, aby upewnić się, że wszystkie wymagane funkcje i funkcjonalności są obsługiwane przez schemat bazy danych.
3. Przeanalizuj stack technologiczny i upewnij się, że projekt bazy danych jest zoptymalizowany pod kątem wybranych technologii.

4. Stworzenie kompleksowego schematu bazy danych, który obejmuje
   a. Tabele z odpowiednimi nazwami kolumn i typami danych
   b. Klucze podstawowe i klucze obce
   c. Indeksy poprawiające wydajność zapytań
   d. Wszelkie niezbędne ograniczenia (np. unikalność, not null)

5. Zdefiniuj relacje między tabelami, określając kardynalność (jeden-do-jednego, jeden-do-wielu, wiele-do-wielu) i wszelkie tabele łączące wymagane dla relacji wiele-do-wielu.

6. Opracowanie zasad PostgreSQL dla zabezpieczeń na poziomie wiersza (RLS), jeśli dotyczy, w oparciu o wymagania określone w notatkach z sesji lub PRD.

7. Upewnij się, że schemat jest zgodny z najlepszymi praktykami projektowania baz danych, w tym normalizacji do odpowiedniego poziomu (zwykle 3NF, chyba że denormalizacja jest uzasadniona ze względu na wydajność).

Ostateczny wynik powinien mieć następującą strukturę:
```markdown
1. Lista tabel z ich kolumnami, typami danych i ograniczeniami
2. Relacje między tabelami
3. Indeksy
4. Zasady PostgreSQL (jeśli dotyczy)
5. Wszelkie dodatkowe uwagi lub wyjaśnienia dotyczące decyzji projektowych
```

W odpowiedzi należy podać tylko ostateczny schemat bazy danych w formacie markdown, który zapiszesz w pliku .ai/db-plan.md bez uwzględniania procesu myślowego lub kroków pośrednich. Upewnij się, że schemat jest kompleksowy, dobrze zorganizowany i gotowy do wykorzystania jako podstawa do tworzenia migracji baz danych.


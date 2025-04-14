# Dokument wymagań produktu (PRD) – Eventivus

## 1. Przegląd produktu
Eventivus to narzędzie webowe zaprojektowane w celu ułatwienia i przyspieszenia procesu planowania oraz organizacji imprez firmowych. Dzięki dostarczeniu prostego sposobu, w jaki organizatorzy wydarzeń mogą proponować potencjalne terminy a pracownicy na nie głosować, usprawnia komunikację i minimalizuje konieczność ręcznej koordynacji. Aplikacja oferuje dwa tryby tworzenia wydarzeń: "Rejestracja" (rejestracja na jeden potwierdzony termin) oraz "Planowanie" (planowanie z wieloma proponowanymi terminami).

Kluczowe cechy:
- Prosty system kont użytkowników.
- Wybór optymalnego terminu wydarzenia wspomagany przez AI.
- Interfejs użytkownika oparty na przeglądarce, umożliwiający tworzenie i zarządzanie wydarzeniami.
- Automatyczna synchronizacja danych rejestracji pomiędzy trybem planowania a rejestracją końcową.

## 2. Problem użytkownika
Organizacja wydarzeń dla pracowników firmy może być czasochłonna i podatna na błędy komunikacyjne, zwłaszcza przy ustalaniu terminu. Pracownicy często mają różne preferencje dotyczące harmonogramu, a zbieranie opinii za pomocą e-maili lub komunikatorów staje się bardzo uciążliwe. Eventivus rozwiązuje ten problem poprzez:
- Prezentowanie pracownikom wielu potencjalnych terminów wydarzenia.
- Umożliwienie rejestracji na istniejące wydarzenia lub głosowania na preferowane terminy wydarzeń w przyszłości.
- Głosowanie polega na oznaczeniu przy proponowanym terminie jednej z trzech opcji: "Dostępny", "Może" lub "Niedostępny"
- Automatyczne obliczanie najlepszego terminu (lub terminów) na podstawie największej liczby dostępnych pracowników, co redukuje konieczność wielokrotnej komunikacji.

## 3. Wymagania funkcjonalne
1. System kont użytkowników:
   - Prosta rejestracja z wykorzystaniem imienia, nazwiska oraz adresu e-mail.
   - Uwierzytelnianie oparte na sesji HTTP z automatycznym odnawianiem sesji.
2. Zarządzanie wydarzeniami:
   - Tworzenie nowego wydarzenia z podstawowymi danymi (nazwa, opis, lokalizacja, wybór daty/czasu).
   - Dwa tryby tworzenia wydarzeń:
     - "Rejestracja": Jeden termin i czas do bezpośredniej rejestracji.
     - "Planowanie": Kilka proponowanych terminów i godzin, na które pracownicy mogą głosować.
3. Dynamiczna walidacja formularzy:
   - Pola wymagane (np. nazwa wydarzenia, lokalizacja, wybrany termin/terminy).
   - Walidacja w czasie rzeczywistym zarówno na froncie, jak i na backendzie.
4. Wybór terminu przy wspomocy AI:
   - Podsumowuje głosy uczestników oraz identyfikuje termin(y), które odpowiadają największej liczbie pracowników.
   - Jeśli kilka terminów osiąga równą liczbę głosów, zwracane są wszystkie najlepsze opcje.
5. Głosowanie i rejestracja:
   - Użytkownicy mogą zapisać się na wydarzenie ("Rejestracja") lub wybrać wiele preferowanych terminów ("Planowanie").
   - Użytkownicy mogą anulować rejestrację lub zmienić swój głos przed zamknięciem trybu planowania lub rejestracji.
6. Przejście z trybu planowania na rejestrację:
   - Po zamknięciu trybu planowania, twórca wydarzenia może przekształcić wydarzenie w tryb ostatecznej rejestracji.
   - Wszyscy uczestnicy, którzy głosowali na wybrany termin/terminy, są automatycznie rejestrowani na finalne wydarzenie.
7. Zarządzanie cyklem życia wydarzenia:
   - Twórcy wydarzeń mogą edytować wybrane pola (nazwa, opis, lokalizacja), jednak pola dotyczące terminów pozostają tylko do odczytu po utworzeniu wydarzenia.
   - Twórcy mogą usuwać wydarzenie, po potwierdzeniu decyzji.
   - Twórcy wydarzeń mogą w dowolnym momencie zakończyć tryb planowania i sfinalizować rejestrację.
8. Kontrola dostępu i logowanie:
   - Prosty system kontroli dostępu, który zapewnia, że tylko twórcy mogą edytować lub usuwać swoje wydarzenia.
   - Kluczowe operacje (tworzenie wydarzenia, zakończenie planowania, sugestia AI, zakończenie rejestracji) są logowane w dedykowanej tabeli bazy danych.
9. Podsumowanie i raportowanie:
   - Twórca wydarzenia widzi zaktualizowaną listę preferencji (dla trybu planowania) oraz listę zarejestrowanych uczestników (dla obu trybów).
   - Zbiorczy widok głosów jest ukryty dla zwykłych uczestników i widoczny tylko dla twórcy wydarzenia.
10. Zgodność i wdrożenie:
   - Frontend: Aplikacja webowa oparta na React.
   - Backend: Spring Boot używający Java 21.
   - Baza danych: Relacyjna baza dla danych użytkowników, wydarzeń oraz logów.

## 4. Granice produktu
- Ograniczone funkcjonalności bezpieczeństwa: Brak wsparcia dla SSO, zaawansowanego uwierzytelniania czy wieloskładnikowej autentykacji w tym MVP.
- Nie wspieramy wydarzeń cyklicznych: System obsługuje wyłącznie pojedyncze wydarzenia.
- Brak ograniczeń związanych z pojemnością: MVP nie uwzględnia wydarzeń z limitem miejsc ani list rezerwowych.
- Brak automatycznych powiadomień: Powiadomienia e-mail lub push są poza zakresem.
- Brak aplikacji mobilnych: MVP będzie dostępne tylko jako aplikacja webowa.

## 5. Historyjki użytkowników

### US-001: Utworzenie nowego wydarzenia
- Tytuł: Utworzenie nowego wydarzenia
- Opis: Jako użytkownik mogę kliknąć przycisk "Utwórz wydarzenie", aby otworzyć formularz dodawania nowego wydarzenia.
- Kryteria akceptacji:
  1. Na głównym dashboardzie widoczny jest przycisk "Utwórz wydarzenie".
  2. Kliknięcie przycisku otwiera formularz z polami: nazwa wydarzenia, opis, lokalizacja oraz typ wydarzenia (Rejestracja lub Planowanie).
  3. Formularz nie powinien się wysłać, jeśli pola wymagane pozostaną puste.

### US-002: Wypełnienie formularza wydarzenia
- Tytuł: Wypełnienie formularza wydarzenia
- Opis: Jako użytkownik mogę uzupełnić formularz tworzenia wydarzenia o niezbędne dane.
- Kryteria akceptacji:
  1. Pola na formularzu: nazwa, opis, lokalizacja oraz typ wydarzenia są obecne.
  2. Przy wyborze trybu "Planowanie", formularz umożliwia dodanie wielu terminów/czasów.
  3. Przy wyborze trybu "Rejestracja", dostępne jest tylko jedno pole do wyboru terminu/czasu.
  4. W przypadku podania niepoprawnych danych, formularz wyświetla odpowiedni komunikat walidacyjny.

### US-003: Planowanie wydarzenia z wieloma terminami
- Tytuł: Planowanie wydarzenia z wieloma terminami
- Opis: Jako twórca wydarzenia typu "Planowanie" mogę określić wiele potencjalnych terminów i godzin wydarzenia.
- Kryteria akceptacji:
  1. Użytkownik może dodać co najmniej dwa pola wyboru terminu/czasu.
  2. Formularz blokuje możliwość wysłania, jeżeli liczba terminów jest mniejsza niż dwa.
  3. Każdy wpisany termin/czas jest wyświetlany oddzielnie, co umożliwia głosowanie uczestników.

### US-004: Rejestracja wydarzenia z pojedynczym terminem
- Tytuł: Rejestracja wydarzenia z pojedynczym terminem
- Opis: Jako twórca wydarzenia typu "Rejestracja" mogę wybrać dokładnie jeden termin/czas wydarzenia.
- Kryteria akceptacji:
  1. Formularz ogranicza użytkownika do wyboru jednego terminu/czasu.
  2. Uczestnicy widzą tylko jeden dostępny termin/czas przy rejestracji.
  3. Formularz nie powinien się wysłać, jeśli pole terminu/czasu nie zostanie uzupełnione.

### US-005: Udostępnianie linku do wydarzenia
- Tytuł: Udostępnianie linku do wydarzenia
- Opis: Jako twórca wydarzenia mogę udostępnić link, który kieruje innych użytkowników do wydarzenia.
- Kryteria akceptacji:
  1. System generuje unikalny link dla każdego utworzonego wydarzenia.
  2. Uczestnicy, którzy otworzą link, widzą szczegóły wydarzenia zależnie od trybu (Rejestracja lub Planowanie).

### US-006: Usuwanie wydarzenia
- Tytuł: Usuwanie wydarzenia
- Opis: Jako twórca wydarzenia mogę usunąć wydarzenie po potwierdzeniu swojej decyzji.
- Kryteria akceptacji:
  1. Opcja usunięcia wydarzenia jest widoczna wyłącznie dla twórcy.
  2. Przed usunięciem pojawia się komunikat potwierdzający decyzję.
  3. Po potwierdzeniu, wydarzenie zostaje usunięte z systemu.

### US-007: Podgląd informacji o uczestnikach
- Tytuł: Podgląd informacji o uczestnikach
- Opis: Jako twórca wydarzenia mogę przeglądać listę uczestników, którzy się zarejestrowali lub oddali głosy.
- Kryteria akceptacji:
  1. Dla wydarzenia typu "Rejestracja" wyświetlana jest lista zarejestrowanych uczestników.
  2. Dla wydarzenia typu "Planowanie" wyświetlane są wybory terminów dokonane przez użytkowników.
  3. Szczegóły są widoczne tylko dla twórcy wydarzenia.

### US-008: Sugestia terminu przez AI
- Tytuł: Sugestia terminu przez AI
- Opis: Jako twórca wydarzenia typu "Planowanie" mogę wygenerować propozycję terminu/czasu, który odpowiada największej liczbie uczestników, poprzez kliknięcie przycisku "Wskaż wspólny termin".
- Kryteria akceptacji:
  1. Po wyświetleniu minimum jednego głosu, dostępny jest przycisk "Wskaż wspólny termin".
  2. Agent AI zwraca termin(y) z największą liczbą głosów.
  3. Użytkownik może kilkukrotnie wywołać działanie do momentu zamknięcia trybu planowania.

### US-009: Wnioskowanie przez AI
- Tytuł: Wnioskowanie przez AI
- Opis: Jako agent AI analizuję wszystkie głosy uczestników i proponuję termin(y), które odpowiadają największej liczbie użytkowników.
- Kryteria akceptacji:
  1. Jeśli kilka terminów ma równą liczbę głosów, zwracane są wszystkie.
  2. System potrafi obsłużyć sytuację, gdy jeden użytkownik wybierze więcej niż jeden termin.

### US-010: Zakończenie trybu planowania
- Tytuł: Zakończenie trybu planowania
- Opis: Jako twórca wydarzenia typu "Planowanie" mogę zakończyć fazę planowania, klikając przycisk "Zakończ planowanie", co uniemożliwia dalsze głosowanie.
- Kryteria akceptacji:
  1. Po zakończeniu trybu planowania, system powiadamia agenta AI o konieczności zaproponowania najlepszego terminu.
  2. Użytkownikom zostaje zablokowane dalsze głosowanie.
  3. Twórca widzi finalną propozycję terminu od AI.

### US-011: Wywołanie AI przy zamknięciu planowania
- Tytuł: Wywołanie AI przy zamknięciu planowania
- Opis: Jako system, po otrzymaniu informacji o zakończeniu planowania, automatycznie wywołuję agenta AI, aby zaproponował najlepszy termin(y).
- Kryteria akceptacji:
  1. Zdarzenie zakończenia planowania jest rejestrowane.
  2. Agent AI jest natychmiast wywoływany do sugestii terminu.

### US-012: Wybór pojedynczego rekomendowanego terminu
- Tytuł: Wybór pojedynczego rekomendowanego terminu
- Opis: Jako twórca wydarzenia typu "Planowanie", gdy AI zasugeruje pojedynczy najlepszy termin, mogę go zatwierdzić.
- Kryteria akceptacji:
  1. Jeśli AI wskaże jeden najlepszy termin, system automatycznie go zatwierdza.
  2. Wydarzenie przechodzi w tryb "Rejestracja", umożliwiając uczestnikom potwierdzenie.

### US-013: Wybór spośród wielu rekomendowanych terminów
- Tytuł: Wybór spośród wielu rekomendowanych terminów
- Opis: Jako twórca wydarzenia typu "Planowanie", gdy AI zasugeruje kilka równorzędnych terminów, mogę wybrać jeden z nich.
- Kryteria akceptacji:
  1. Użytkownik widzi wszystkie proponowane terminy.
  2. Dokonuje wyboru dokładnie jednego terminu, który zostanie zatwierdzony.
  3. Po wyborze, wydarzenie zostaje przekształcone do trybu "Rejestracja".

### US-014: Automatyczne przeniesienie głosów z planowania do rejestracji
- Tytuł: Automatyczne przeniesienie głosów z planowania do rejestracji
- Opis: Jako system, po zatwierdzeniu finalnego terminu w trybie planowania, wszyscy uczestnicy, którzy głosowali na ten termin (Dostępny lub Może), są automatycznie rejestrowani.
- Kryteria akceptacji:
  1. Tylko głosy odpowiadające wybranemu terminowi są przenoszone do rejestracji.
  2. Operacja wykonuje się natychmiast po zatwierdzeniu terminu.
  3. Użytkownicy mają możliwość późniejszego anulowania rejestracji, chyba że wydarzenie zostało ostatecznie zamknięte.

### US-015: Zakończenie rejestracji
- Tytuł: Zakończenie rejestracji
- Opis: Jako twórca wydarzenia typu "Rejestracja" mogę zakończyć proces rejestracji, uniemożliwiając dalsze zapisy.
- Kryteria akceptacji:
  1. Przycisk "Zakończ rejestrację" jest widoczny wyłącznie dla twórcy wydarzenia.
  2. Po potwierdzeniu, nowe zapisy nie są przyjmowane.
  3. Zdarzenie zakończenia rejestracji jest logowane w systemie.

### US-016: Podgląd szczegółów wydarzenia Rejestracja
- Tytuł: Podgląd szczegółów wydarzenia Rejestracja
- Opis: Jako użytkownik, który otrzymał link do wydarzenia typu "Rejestracja", mogę wyświetlić informacje takie jak nazwa wydarzenia, opis, lokalizacja, data i czas.
- Kryteria akceptacji:
  1. Strona szczegółów wydarzenia jest dostępna publicznie poprzez otrzymany link.
  2. Strona wyświetla niezbędne dane w czytelny sposób.

### US-017: Rejestracja na wydarzenie
- Tytuł: Rejestracja na wydarzenie
- Opis: Jako użytkownik, który otrzymał link do wydarzenia "Rejestracja", mogę kliknąć przycisk "Zapisz się", aby zarejestrować się na wydarzenie.
- Kryteria akceptacji:
  1. Na stronie wydarzenia widoczny jest przycisk "Zapisz się".
  2. Kliknięcie przycisku powoduje rejestrację użytkownika i aktualizację listy uczestników.
  3. Formularz uwzględnia walidację sesji.

### US-018: Anulowanie rejestracji na wydarzenie
- Tytuł: Anulowanie rejestracji na wydarzenie
- Opis: Jako użytkownik, który zarejestrował się na wydarzenie "Rejestracja", mogę anulować swoją rejestrację, klikając przycisk "Anuluj uczestnictwo".
- Kryteria akceptacji:
  1. Użytkownik widzi opcję anulowania rejestracji.
  2. Po anulowaniu, status użytkownika zmienia się na "nie uczestniczy".
  3. Lista uczestników jest aktualizowana po anulowaniu rejestracji.

### US-019: Podgląd szczegółów wydarzenia Planowanie
- Tytuł: Podgląd szczegółów wydarzenia Planowanie
- Opis: Jako użytkownik, który otrzymał link do wydarzenia typu "Planowanie", mogę zobaczyć informacje takie jak nazwa, opis, lokalizacja oraz proponowane terminy.
- Kryteria akceptacji:
  1. Wszystkie dostępne opcje terminów i czasów są wyświetlane.
  2. Użytkownik może uzyskać dostęp do tej strony niezależnie od konieczności uwierzytelnienia, zgodnie z regułami systemu.

### US-020: Wybór wielu preferowanych terminów
- Tytuł: Wybór wielu preferowanych terminów
- Opis: Jako użytkownik, który otrzymał link do wydarzenia typu "Planowanie", mogę zaznaczyć kilka terminów, które odpowiadają mojej dostępności. Dla każdego z dostępnych terminów zaznaczam jedną z trzech opcji: "Dostępny", "Może" lub "Niedostępny"
- Kryteria akceptacji:
  1. Użytkownik może zaznaczyć więcej niż jeden termin/czas.
  2. Głosy są zapisywane i mogą być edytowane do momentu zamknięcia planowania.
  3. Zmiany są odzwierciedlane w podsumowaniu głosów widocznym dla twórcy.

### US-021: Podstawowe uwierzytelnianie
- Tytuł: Podstawowe uwierzytelnianie
- Opis: Jako użytkownik mogę zarejestrować się poprzez formularz (imię, nazwisko, e-mail) i automatycznie utworzyć sesję w systemie, co umożliwia mi korzystanie z funkcji tworzenia i zarządzania wydarzeniami.
- Kryteria akceptacji:
  1. Strona rejestracji zawiera pola: imię, nazwisko, e-mail (oraz opcjonalnie hasło, jeśli jest wymagane).
  2. Po pomyślnej rejestracji, system ustawia ciasteczko sesyjne, które pozostaje ważne przez określony czas.
  3. Uwierzytelnieni użytkownicy mogą tworzyć, edytować lub usuwać tylko swoje wydarzenia oraz korzystać z dodatkowych funkcji.

## 6. Metryki sukcesu
1. Redukcja ręcznej koordynacji:
   - Mierzona poprzez zmniejszenie liczby wewnętrznych e-maili lub wiadomości potrzebnych do ustalenia terminu wydarzenia.
2. Wskaźnik adopcji:
   - Procent użytkowników tworzących wydarzenia lub głosujących/zapisujących się na wydarzenia w organizacji w określonym okresie.
3. Dokładność rekomendacji AI:
   - Proporcja uczestników zadowolonych z wybranego finalnie terminu (lub terminów), co oznacza zgodność z harmonogramami pracowników.
4. Czas finalizacji wydarzenia:
   - Średni czas (w godzinach lub dniach) od momentu utworzenia wydarzenia do finalnego wyboru terminu i zakończenia rejestracji.
5. Zaangażowanie użytkowników:
   - Średnia liczba tworzonych wydarzeń miesięcznie oraz średnia liczba głosów lub rejestracji na wydarzenie.
6. Stabilność systemu:
   - Liczba krytycznych błędów lub nieplanowanych przestojów zgłoszonych podczas tworzenia wydarzenia, faz planowania lub rejestracji.

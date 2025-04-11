# Prompt

      Jesteś doświadczonym menedżerem produktu, którego zadaniem jest stworzenie kompleksowego dokumentu wymagań produktu (PRD) w oparciu o poniższe opisy:

      <project_description>
      ### Główny problem
      Koordynowanie i planowanie imprez firmowych dla pracowników jest niejednokrotnie wyzwaniem. Zarządzanie preferencjami pracowników co do daty eventów oraz zarządzanie listą osób chętnych na dany event zdecydowanie polepszy komunikację i skróci czas planowania eventów firmowych.

      ### Najmniejszy zestaw funkcjonalności
      - Prosty system kont użytkowników do identyfikowania konkretnych osób
      - Moduł planowania eventu pozwalający pracownikom wybór najbardziej odpowiadającego im terminu
      - Moduł rejestracji na już zaplanowany event
      - Wybór najbardziej optymalnego terminu eventu przez AI

      ### Co NIE wchodzi w zakres MVP
      - Zaawansowane uwierzytelnianie, integracja z SSO, 2FA
      - Obsługa cyklicznych wydarzeń
      - Obsługa rónych ról uytkowników i nadawanie im rónych uprawnień
      - Organizacja imprez z limitem miejsc i listą rezerwową
      - Powiadomienie i notyfikacje
      - Raportowanie i statystyki
      - Aplikacje mobilne (na początek tylko web)

      ### Kryteria sukcesu
      - Zaproponowane przez AI terminy są zaproponowane przez największą mozliwą liczbę pracowników
      - Zaplanowanie eventu nie wymaga żadnej dodatkowej komunikacji oprócz przesłania linku do proponowanego eventu i użycia proponowanego narzędzia
      </project_description>

      <project_user_stories_draft>
      - Jako użytkownik mogę utworzyć nowe wydarzenie poprzez kliknięcie przycisku "Utwórz wydarzenie". Pojawi się formularz do utworzenia nowego wydarzenia.
      - Jako użytkownik mogę wypełnić formularz tworzenia nowego eventu wypełniając jego pola: nazwa wydarzenia, opis, lokalizacja, typ wydarzenia (Rejestracja lub Planowanie). Na podstawie wybranego typu użytkownik zostanie przeniesiony do kolejnego formularza.
      - Jako użytkownik tworzący nowe wydarzenie, po wybraniu wydarzenia typu Planowanie mam możliwość wybrania wielu terminów i godzin wydarzenia, które będą przedstawione użytkownikom w celu wybrania najbardziej odpowiadającego im terminu. Wydarzenie w trybie planowania zostaje utworzone.
      - Jako użytkownik tworzący nowe wydarzenie, po wybraniu wydarzenia typu Rejestracja mam możliwość wybrania jednego terminu i godziny wydarzenia. Wydarzenie gotowe do przyjmowania rejestracji od użytkowników zostaje utworzone.
      - Jako użytkownik, k†óry utworzył wydarzenie w trybie Rejestracji czy Planowania mogę udostępnić link do tego wydarzenia i rozesłać innym użytkownikom w celu rejestracji lub wybrania odpowiadającego terminu.
      - Jako użytkownik, k†óry utworzył wydarzenie w trybie Rejestracji czy Planowania mogę usunąć utworzone przeze mnie wydarzenie. Po kliknięciu usuń wydarzenie zostanę poproszony o potwierdzenie czy aby na pewno chcę usunąć wydarzenie.
      - Jako użytkownik, k†óry utworzył wydarzenie w trybie Rejestracji czy Planowania mogę zobaczyć aktualną listę osób, które zapisały się na dane wydarzenie, lub jeżeli jest to wydarzenie w trybie planowania mogę zobaczyć jakie terminy wybrali poszczególni użytkownicy
      - Jako użytkownik, k†óry utworzył wydarzenie w trybie Planowania mogę wygenerować termin klikając przycisk "Wskaż wspólny termin", który odpowiada największej liczbie uczestników. Mogę powtarzać czynność wielokrotnie.
      - Jako Agent AI wnioskujący, który termin wydarzenia odpowiada największej liczbie uczestników, wnioskuję termina na podstawie wszystkich preferencji wszystkich użytkowników, korzy oddali głost. Biorę pod uwagę, że jedna osoba mogła wyrazić preferencję co do więcej niż jednego proponowanego terminu. Jeżeli wywnioskuję więcej niż jeden termin, który w rezultacie odpowiada tej samej ilości osób to podaję wszystkie możliwości (na przykład 2 proponowane terminy odpowiadają 10 z 12 osób. Obydwa odpowiadają 10 osobom to podaję obydwa terminy).
      - Jako użytkownik, k†óry utworzył wydarzenie w trybie Planowania mogę zakończyć tryb planowania klikając przycisk "Zakończ planowania". Zostanie wtedy zablokowana możliwość oddawania głosów przez użytkowników.
      - Jako system po otrzymaniu informacji o zakończeniu planowania wydarzenia w trybie Planowania, proszę agenta AI o wskazanie terminu, który odpowiada największej liczbie uczestników.
      - Jako użytkownik, k†óry utworzył wydarzenie w trybie Planowania zakończyłem tryb planowania i otrzymałem jeden najbardziej odpowiadający termin od Agenta AI mogę przekształcić wydarzenie w tryb rejestracji i umożliwić uczestnikom zapis na wydarzenie.
      - Jako użytkownik, k†óry utworzył wydarzenie w trybie Planowania zakończyłem tryb planowania i otrzymałem więcej niż jeden najbardziej odpowiadający termin od Agenta AI wybieram jeden termin i dopiero wtedy mogę przekształcić wydarzenie w tryb rejestracji i umożliwić uczestnikom zapis na wydarzenie. 
      - Jako system po przekształceniu wydarzenia z trybu planowania na rejestrację automatycznie dodaję uczestników, którzy w trybie planowania wyrazili chęć uczestnictwa w wydarzeniu w terminie, który został finalnie wybrany do listy użytkowników zapisanych na to wydarzenie.
      - Jako użytkownik, k†óry utworzył wydarzenie w trybie Rejestracji mogę zakończyć tryb rejestracji klikając przycisk "Zakończ rejestrację". Zostanie wtedy zablokowana możliwość rejestrowania się użytkowników na dane wydarzenie.

      - Jako użytkownik, k†óry otrzymał link do wydarzenia w trybie Rejestracji mogę zobaczyć wszystkie dane dotyczące wydarzenia (nazwe, opis, lokalizacja, termin, godzina). 
      - Jako użytkownik, k†óry otrzymał link do wydarzenia w trybie Rejestracji mogę zapisać się na dane wydarzenie klikając przycisk "Zapisz się".
      - Jako użytkownik, k†óry otrzymał link do wydarzenia w trybie Rejestracji i zapisałem się na dane wydarzenie, mogę zrezygnować z chęci uczestnictwa w danym wydarzeniu klikając przycisk "Anuluj uczestnictwo".
      - Jako użytkownik, k†óry otrzymał link do wydarzenia w trybie Planowania mogę zobaczyć wszystkie dane dotyczące wydarzenia (nazwe, opis, lokalizacja, proponowane terminy, proponowane godziny). 
      - Jako użytkownik, k†óry otrzymał link do wydarzenia w trybie Planowania mogę wybrać z dostępnych opcji terminy i godziny, które najbardziej mi odpowiadają (wybór wielokrotny).
      </project_user_stories_draft>
      <project_details>
      <conversation_summary>
      <decisions>
      1. Użytkownik zdecydował o wykorzystaniu prostego systemu uwierzytelniania opartego na formularzu rejestracji, w którym użytkownik podaje imię, nazwisko oraz email, a po rejestracji tworzona jest sesja HTTP z automatycznym odnawianiem.
      2. Twórca wydarzenia ma możliwość edycji danych wydarzenia (nazwa, opis, lokalizacja), przy czym pola dotyczące terminów są wyświetlane w trybie tylko do odczytu.
      3. Formularze tworzenia wydarzenia będą posiadały dynamiczną walidację zarówno na frontendzie, jak i na backendzie, według ustalonych wymagań (w tym: wymagane pola takie jak nazwa, lokalizacja, typ wydarzenia oraz odpowiednie kryteria walidacji terminów).
      4. W trybie „Planowanie” użytkownik może wskazać wiele terminów; system, wspierany przez agenta AI, synchronizuje uczestników na backendzie i wyznacza optymalny termin (lub terminy w przypadku remisu), pozostawiając ostateczny wybór twórcy.
      5. Podsumowanie oddanych głosów (liczba głosów na proponowane terminy) będzie widoczne wyłącznie dla twórcy wydarzenia i odświeżane po przeładowaniu strony.
      6. System logowania operacji krytycznych będzie rejestrował zdarzenia, takie jak: utworzenie wydarzenia, zakończenie procesu planowania, wyznaczenie optymalnego terminu przez AI oraz zamknięcie rejestracji.
      7. Architektura aplikacji zostanie podzielona na oddzielny moduł frontendowy (React) oraz backend oparty na Spring Boot.
      8. Harmonogram MVP został ustalony na 6 tygodni pracy (przy 2 godzinach dziennie jednego programisty, wspieranego przez AI).
      </decisions>

      <matched_recommendations>
      1. Wdrożenie prostego systemu uwierzytelniania opartego na rejestracji (imię, nazwisko, email) oraz utworzenie sesji HTTP z automatycznym odnawianiem.
      2. Oddzielenie pól edytowalnych (nazwa, opis, lokalizacja) od pól tylko do odczytu (terminy) w interfejsie wydarzenia.
      3. Implementacja spersonalizowanych komunikatów walidacyjnych na frontendzie i backendzie według ustalonych kryteriów.
      4. Zaprojektowanie mechanizmu synchronizacji uczestników przy przekształcaniu wydarzenia z trybu planowania na rejestrację, realizowanego po stronie backendu.
      5. Udostępnienie podsumowania głosów wyłącznie dla twórcy wydarzenia, pobieranego przy odświeżeniu strony.
      6. Wdrożenie systemu logowania operacji krytycznych rejestrowanego w dedykowanej tabeli bazy danych.
      7. Realizacja MVP zgodnie z ustalonym harmonogramem, skupiając się na podstawowych funkcjonalnościach i prostocie rozwiązania.
      </matched_recommendations>

      <prd_planning_summary>
      a. Główne wymagania funkcjonalne:
         - System uwierzytelniania: rejestracja za pomocą formularza (imię, nazwisko, email) z automatycznym odnawianiem sesji HTTP.
         - Tworzenie wydarzeń z dwoma trybami: „Rejestracja” (jeden termin) oraz „Planowanie” (wybór wielu terminów).
         - Dynamiczna walidacja formularzy na frontendzie i backendzie według precyzyjnych reguł (m.in. obowiązkowość pól, walidacja terminów).
         - Mechanizm synchronizacji uczestników oraz wyznaczania optymalnego terminu przy pomocy agenta AI.
         - Podsumowanie głosów dostępne wyłącznie dla twórcy wydarzenia, aktualizowane po przeładowaniu strony.
         - Logowanie operacji krytycznych (utworzenie wydarzenia, zakończenie planowania, wyznaczenie terminu przez AI, zamknięcie rejestracji).

      b. Kluczowe historie użytkownika i ścieżki korzystania (zarys):
         - Tworzenie wydarzenia:
         • Jako użytkownik mogę utworzyć nowe wydarzenie poprzez kliknięcie przycisku „Utwórz wydarzenie”, co prowadzi do wyświetlenia formularza.
         • Formularz zawiera pola: nazwa wydarzenia (wymagane), opis (opcjonalne), lokalizacja (wymagane), typ wydarzenia (Rejestracja lub Planowanie).
         • Dla wydarzenia typu Rejestracja wymagany jest jeden termin, natomiast dla typu Planowanie – wybór co najmniej dwóch terminów.
         - Edycja wydarzenia:
         • Jako twórca wydarzenia mogę edytować pola takie jak nazwa, opis i lokalizacja, natomiast termin(y) pozostają tylko do odczytu.
         - Udostępnianie i zarządzanie wydarzeniem:
         • Jako twórca mogę udostępnić link do wydarzenia oraz zarządzać uczestnictwem (m.in. usunięcie wydarzenia z potwierdzeniem).
         - Proces wyboru terminu w trybie Planowanie:
         • Jako użytkownik w trybie Planowanie mogę wskazać wiele terminów.
         • Po zakończeniu planowania system, wspierany przez agenta AI, analizuje preferencje głosów i wyznacza optymalny termin lub terminy w przypadku remisu.
         • Ostateczny wybór terminu dokonuje twórca wydarzenia.
         - Rejestracja uczestników:
         • Jako uczestnik, po otrzymaniu linku, mogę zapisać się na wydarzenie lub zrezygnować z udziału.
         
      c. Ważne kryteria sukcesu i sposoby ich mierzenia:
         - Trafność wyznaczenia terminu przez agenta AI (oparta na liczbie głosów i preferencjach).
         - Intuicyjność i spójność interfejsu użytkownika, zwłaszcza w zakresie tworzenia i edycji wydarzeń.
         - Skuteczność i niezawodność mechanizmu walidacji danych na frontendzie i backendzie.
         - Płynność synchronizacji uczestników przy przechodzeniu z trybu planowania na rejestrację.
         - Stabilność sesji HTTP z automatycznym odnawianiem, zapewniająca wrażenie ciągłego zalogowania.

      d. Nierozwiązane kwestie:
         - Na tym etapie wszystkie kluczowe aspekty MVP zostały omówione i zaakceptowane – nie ma nierozwiązanych kwestii.
      </prd_planning_summary>

      <unresolved_issues>
      Brak nierozwiązanych kwestii – wszystkie istotne elementy zostały ustalone.
      </unresolved_issues>
      </conversation_summary>
      </project_details>

      Wykonaj następujące kroki, aby stworzyć kompleksowy i dobrze zorganizowany dokument:

      1. Podziel PRD na następujące sekcje:
         a. Przegląd projektu
         b. Problem użytkownika
         c. Wymagania funkcjonalne
         d. Granice projektu
         e. Historie użytkownika
         f. Metryki sukcesu

      2. W każdej sekcji należy podać szczegółowe i istotne informacje w oparciu o opis projektu i odpowiedzi na pytania wyjaśniające. Upewnij się, że:
         - Używasz jasnego i zwięzłego języka
         - W razie potrzeby podajesz konkretne szczegóły i dane
         - Zachowujesz spójność w całym dokumencie
         - Odnosisz się do wszystkich punktów wymienionych w każdej sekcji

      3. Podczas tworzenia historyjek użytkownika i kryteriów akceptacji
         - Wymień WSZYSTKIE niezbędne historyjki użytkownika, w tym scenariusze podstawowe, alternatywne i skrajne.
         - Przypisz unikalny identyfikator wymagań (np. US-001) do każdej historyjki użytkownika w celu bezpośredniej identyfikowalności.
         - Uwzględnij co najmniej jedną historię użytkownika specjalnie dla bezpiecznego dostępu lub uwierzytelniania, jeśli aplikacja wymaga identyfikacji użytkownika lub ograniczeń dostępu.
         - Upewnij się, że żadna potencjalna interakcja użytkownika nie została pominięta.
         - Upewnij się, że każda historia użytkownika jest testowalna.

      Użyj następującej struktury dla każdej historii użytkownika:
      - ID
      - Tytuł
      - Opis
      - Kryteria akceptacji

      4. Po ukończeniu PRD przejrzyj go pod kątem tej listy kontrolnej:
         - Czy każdą historię użytkownika można przetestować?
         - Czy kryteria akceptacji są jasne i konkretne?
         - Czy mamy wystarczająco dużo historyjek użytkownika, aby zbudować w pełni funkcjonalną aplikację?
         - Czy uwzględniliśmy wymagania dotyczące uwierzytelniania i autoryzacji (jeśli dotyczy)?

      5. Formatowanie PRD:
         - Zachowaj spójne formatowanie i numerację.
         - Nie używaj pogrubionego formatowania w markdown ( ** ).
         - Wymień WSZYSTKIE historyjki użytkownika.
         - Sformatuj PRD w poprawnym markdown.

      Przygotuj PRD z następującą strukturą:

      ```markdown
      # Dokument wymagań produktu (PRD) - {{app-name}}
      ## 1. Przegląd produktu
      ## 2. Problem użytkownika
      ## 3. Wymagania funkcjonalne
      ## 4. Granice produktu
      ## 5. Historyjki użytkowników
      ## 6. Metryki sukcesu
      ```

      Pamiętaj, aby wypełnić każdą sekcję szczegółowymi, istotnymi informacjami w oparciu o opis projektu i nasze pytania wyjaśniające. Upewnij się, że PRD jest wyczerpujący, jasny i zawiera wszystkie istotne informacje potrzebne do dalszej pracy nad produktem.

      Ostateczny wynik powinien składać się wyłącznie z PRD zgodnego ze wskazanym formatem w markdown, który zapiszesz w pliku .ai/prd.md

# Res

# Dokument wymagań produktu (PRD) - Eventivus

## 1. Przegląd produktu
Eventivus to system webowy umożliwiający koordynację i planowanie imprez firmowych. Aplikacja umożliwia administratorom oraz użytkownikom tworzenie wydarzeń, wybieranie terminów poprzez głosowanie oraz rejestrację na wydarzenia. Głównym celem jest usprawnienie komunikacji i skrócenie czasu planowania wydarzeń dzięki prostemu interfejsowi oraz wsparciu agenta AI, który wskazuje najbardziej optymalny termin.

## 2. Problem użytkownika
Pracownicy firm mają trudności z organizacją i koordynacją imprez firmowych. Zarządzanie preferencjami odnośnie dat oraz współdzielenie informacji dotyczących dostępnych terminów są nieefektywne. Brak centralnego systemu powoduje opóźnienia i niejasności, co wpływa negatywnie na zaangażowanie pracowników oraz przebieg planowania wydarzeń.

## 3. Wymagania funkcjonalne
- Prosty system uwierzytelniania i rejestracji użytkowników na podstawie imienia, nazwiska oraz adresu email, wykorzystujący sesje HTTP z automatycznym odnawianiem.
- Moduł tworzenia wydarzeń z dwiema ścieżkami:
- Typ "Rejestracja": umożliwia wybór jednego terminu, po czym wydarzenie jest gotowe do przyjmowania zgłoszeń.
- Typ "Planowanie": umożliwia wybór wielu terminów, które są prezentowane użytkownikom do oddania głosu.
- Dynamiczna walidacja formularzy na frontendzie i backendzie (w tym obowiązkowe pola, walidacja terminów oraz komunikaty walidacyjne).
- Mechanizm udostępniania wydarzenia za pomocą unikalnego linku, umożliwiającego innym rejestrację lub oddanie głosu.
- Agent AI analizujący preferencje głosów i wyznaczający optymalny termin lub terminy odpowiadające największej liczbie uczestników.
- Synchronizacja uczestników przy przejściu z trybu planowania na rejestrację – automatyczne dodanie uczestników, którzy oddali głos na finalny termin.
- Możliwość zakończenia trybu planowania lub rejestracji, blokująca dalsze zmiany.
- System logowania operacji krytycznych, takich jak: utworzenie wydarzenia, zakończenie trybu planowania, wyznaczenie optymalnego terminu przez AI oraz zakończenie rejestracji.

## 4. Granice produktu
- Brak zaawansowanego uwierzytelniania (integracja z SSO, 2FA).
- Brak obsługi cyklicznych wydarzeń.
- Brak obsługi różnych ról użytkowników i nadawania im różnych uprawnień.
- Brak mechanizmu organizowania imprez z limitem miejsc i listą rezerwową.
- Brak powiadomień i notyfikacji.
- Brak zaawansowanego raportowania i statystyk.
- Aplikacja dostępna jedynie w wersji web (bez aplikacji mobilnych).

## 5. Historyjki użytkowników

US-001
Tytuł: Utworzenie nowego wydarzenia
Opis: Jako użytkownik mogę utworzyć nowe wydarzenie poprzez kliknięcie przycisku "Utwórz wydarzenie", co powoduje wyświetlenie formularza tworzenia wydarzenia.
Kryteria akceptacji:
- Po kliknięciu przycisku wyświetla się formularz.
- Formularz zawiera pola: nazwa, opis, lokalizacja, typ wydarzenia (Rejestracja lub Planowanie).

US-002
Tytuł: Wypełnienie formularza tworzenia wydarzenia
Opis: Jako użytkownik wypełniam formularz, podając niezbędne dane wydarzenia. W zależności od wybranego typu wydarzenia, jestem przekierowywany do odpowiedniego formularza:
- Dla trybu Rejestracja – możliwość wyboru jednego terminu.
- Dla trybu Planowanie – możliwość wyboru wielu terminów.
Kryteria akceptacji:
- Walidacja pól (nazwa, lokalizacja, typ wydarzenia) jest wykonywana.
- W przypadku trybu Planowanie, użytkownik musi wskazać przynajmniej dwa terminy.

US-003
Tytuł: Wybór terminów dla wydarzenia typu Planowanie
Opis: Jako użytkownik tworzący wydarzenie typu Planowanie mogę wskazać wiele terminów i godzin, które będą przedstawione innym użytkownikom do oddania głosu.
Kryteria akceptacji:
- Użytkownik może wybrać więcej niż jeden termin.
- System zapisuje wszystkie wybrane terminy jako możliwe opcje głosowania.

US-004
Tytuł: Wybór terminu dla wydarzenia typu Rejestracja
Opis: Jako użytkownik tworzący wydarzenie typu Rejestracja mogę wybrać jeden termin i godzinę dla wydarzenia.
Kryteria akceptacji:
- Użytkownik może wybrać tylko jeden termin.
- Wybrany termin jest wyświetlany jako jedyna opcja na stronie wydarzenia.

US-005
Tytuł: Udostępnianie wydarzenia
Opis: Jako użytkownik, który utworzył wydarzenie, mogę udostępnić link do wydarzenia, co umożliwi innym rejestrację lub oddanie głosu.
Kryteria akceptacji:
- System generuje unikalny link do wydarzenia.
- Link jest łatwy do skopiowania i udostępnienia.

US-006
Tytuł: Usunięcie wydarzenia
Opis: Jako użytkownik, który utworzył wydarzenie, mogę usunąć wydarzenie po potwierdzeniu, co pozwoli mi na zarządzanie nieaktualnymi wydarzeniami.
Kryteria akceptacji:
- Po kliknięciu przycisku "Usuń wydarzenie" wyświetlane jest potwierdzenie.
- Wydarzenie zostaje usunięte po potwierdzeniu.

US-007
Tytuł: Podgląd uczestników i głosów
Opis: Jako twórca wydarzenia mogę zobaczyć listę osób zapisanych na wydarzenie (dla trybu Rejestracja) lub wybrane terminy wraz z liczbą głosów (dla trybu Planowanie).
Kryteria akceptacji:
- Lista uczestników lub głosów jest widoczna tylko dla twórcy.
- Dane są aktualizowane po odświeżeniu strony.

US-008
Tytuł: Generowanie optymalnego terminu przez agenta AI
Opis: Jako użytkownik w trybie Planowanie mogę kliknąć przycisk "Wskaż wspólny termin", który powoduje, że agent AI analizuje preferencje użytkowników i generuje optymalny termin lub terminy.
Kryteria akceptacji:
- Agent AI wyznacza termin/termine odpowiadające największej liczbie uczestników.
- W przypadku remisu, system wyświetla wszystkie równe opcje.

US-009
Tytuł: Zakończenie trybu planowania
Opis: Jako twórca wydarzenia mogę zakończyć tryb planowania klikając przycisk "Zakończ planowania", co blokuje dalsze oddawanie głosów przez użytkowników.
Kryteria akceptacji:
- Po zakończeniu planowania, system blokuje możliwość oddawania głosów.
- Użytkownik otrzymuje potwierdzenie zakończenia procesu planowania.

US-010
Tytuł: Przekształcenie wydarzenia z trybu planowania na rejestrację
Opis: Jako twórca wydarzenia, po zakończeniu planowania i otrzymaniu optymalnego terminu od agenta AI, mogę przekształcić wydarzenie z trybu Planowanie na Rejestrację.
Kryteria akceptacji:
- System automatycznie dodaje do listy zapisanych uczestników tych, którzy głosowali na finalny termin.
- Wydarzenie zmienia tryb i umożliwia rejestrację uczestników.

US-011
Tytuł: Zakończenie rejestracji na wydarzenie
Opis: Jako twórca wydarzenia w trybie Rejestracja mogę zakończyć rejestrację, klikając przycisk "Zakończ rejestrację", co blokuje możliwość dalszego zapisu.
Kryteria akceptacji:
- Po zakończeniu rejestracji system nie przyjmuje nowych zgłoszeń.
- Użytkownik otrzymuje potwierdzenie zakończenia rejestracji.

US-012
Tytuł: Wyświetlenie szczegółów wydarzenia dla uczestników
Opis: Jako uczestnik, który otrzymał link do wydarzenia, mogę zobaczyć pełne dane wydarzenia (nazwa, opis, lokalizacja, termin, godzina).
Kryteria akceptacji:
- Szczegóły wydarzenia są czytelne i kompletne.
- Informacje są zgodne z danymi podanymi przez twórcę.

US-013
Tytuł: Rejestracja na wydarzenie
Opis: Jako uczestnik wydarzenia mogę kliknąć przycisk "Zapisz się", aby zarejestrować swój udział w wydarzeniu.
Kryteria akceptacji:
- Po kliknięciu przycisku, użytkownik zostaje dodany do listy uczestników.
- Użytkownik otrzymuje potwierdzenie rejestracji.

US-014
Tytuł: Anulowanie uczestnictwa
Opis: Jako uczestnik wydarzenia mogę anulować swój udział, klikając przycisk "Anuluj uczestnictwo".
Kryteria akceptacji:
- Po anulowaniu uczestnictwa, użytkownik zostaje usunięty z listy zapisanych.
- System informuje o pomyślnym anulowaniu rejestracji.

US-015
Tytuł: Rejestracja użytkownika (uwierzytelnienie)
Opis: Jako nowy użytkownik mogę zarejestrować się podając imię, nazwisko oraz adres email, co tworzy sesję HTTP z automatycznym odnawianiem.
Kryteria akceptacji:
- Formularz rejestracyjny umożliwia wprowadzenie wymaganych danych.
- Po rejestracji użytkownik jest automatycznie logowany i uzyskuje odpowiednią sesję.

US-016
Tytuł: Edycja wydarzenia
Opis: Jako twórca wydarzenia mogę edytować dane wydarzenia takie jak nazwa, opis i lokalizacja, przy czym pola dotyczące terminów są wyświetlane tylko do odczytu.
Kryteria akceptacji:
- Formularz edycji umożliwia modyfikację nazwy, opisu i lokalizacji.
- Terminy pozostają widoczne, ale nieedytowalne.

## 6. Metryki sukcesu
- Trafność wyznaczenia terminu przez agenta AI na podstawie liczby głosów i preferencji użytkowników.
- Intuicyjność interfejsu oraz spójność procesu tworzenia, edycji i zarządzania wydarzeniami.
- Skuteczność i niezawodność walidacji formularzy na frontendzie i backendzie.
- Płynność synchronizacji uczestników przy przekształcaniu wydarzenia z trybu planowania na rejestrację.
- Stabilność sesji HTTP z automatycznym odnawianiem oraz niskie wskaźniki błędów rejestracji operacji krytycznych.

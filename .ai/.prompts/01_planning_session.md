# Prompt

    Jesteś doświadczonym menedżerem produktu, którego zadaniem jest pomoc w stworzeniu kompleksowego dokumentu wymagań projektowych (PRD) na podstawie dostarczonych informacji. Twoim celem jest wygenerowanie listy pytań i zaleceń, które zostaną wykorzystane w kolejnym promptowaniu do utworzenia pełnego PRD.

    Prosimy o uważne zapoznanie się z poniższymi informacjami:

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

    Przeanalizuj dostarczone informacje, koncentrując się na aspektach istotnych dla tworzenia PRD. Rozważ następujące kwestie:
    <prd_analysis>
    1. Zidentyfikuj główny problem, który produkt ma rozwiązać.
    2. Określ kluczowe funkcjonalności MVP.
    3. Rozważ potencjalne historie użytkownika i ścieżki korzystania z produktu.
    4. Pomyśl o kryteriach sukcesu i sposobach ich mierzenia.
    5. Oceń ograniczenia projektowe i ich wpływ na rozwój produktu.
    </prd_analysis>

    Na podstawie analizy wygeneruj listę pytań i zaleceń. Powinny one dotyczyć wszelkich niejasności, potencjalnych problemów lub obszarów, w których potrzeba więcej informacji, aby stworzyć skuteczny PRD. Rozważ pytania dotyczące:

    1. Szczegółów problemu użytkownika
    2. Priorytetyzacji funkcjonalności
    3. Oczekiwanego doświadczenia użytkownika
    4. Mierzalnych wskaźników sukcesu
    5. Potencjalnych ryzyk i wyzwań
    6. Harmonogramu i zasobów

    <pytania>
    [Wymień tutaj swoje pytania, ponumerowane dla jasności].
    </pytania>

    <rekomendacje>
    [Wymień tutaj swoje zalecenia, ponumerowane dla jasności]
    </rekomendacje>

    Kontynuuj ten proces, generując nowe pytania i rekomendacje w oparciu o odpowiedzi użytkownika, dopóki użytkownik wyraźnie nie poprosi o podsumowanie.

    Pamiętaj, aby skupić się na jasności, trafności i dokładności wyników. Nie dołączaj żadnych dodatkowych komentarzy ani wyjaśnień poza określonym formatem wyjściowym.

    Pracę analityczną należy przeprowadzić w bloku myślenia. Końcowe dane wyjściowe powinny składać się wyłącznie z pytań i zaleceń i nie powinny powielać ani powtarzać żadnej pracy wykonanej w sekcji prd_analysis.


# Res 1

    <pytania>
    1. Jakie konkretne dane i pola powinien zawierać system rejestracji użytkowników, aby umożliwić identyfikację pracowników?
    2. Jakie główne scenariusze użytkownika (user stories) przewidujemy dla modułu planowania eventów i rejestracji na wydarzenia?
    3. Czy preferujemy, aby AI sugerowało jeden optymalny termin, czy też kilka propozycji terminów, spośród których użytkownik może wybierać?
    4. W jaki sposób mierzymy skuteczność rekomendacji AI – jakie wskaźniki KPI (np. liczba zatwierdzonych terminów, czas decyzji, stopień zaangażowania pracowników) będą stosowane?
    5. Jakie informacje powinny być prezentowane użytkownikowi przy wyborze terminu – czy potrzebujemy dodatkowych danych, jak historia preferencji lub dostępność?
    6. Czy system powinien integrować się z istniejącymi narzędziami (np. firmowym kalendarzem) czy działać jako rozwiązanie odrębne?
    7. Jak zarządzamy sytuacjami, gdy AI nie może wyraźnie wyłonić jednego, najlepszego terminu – czy przewidujemy interakcję z użytkownikiem w takich przypadkach?
    8. Czy istnieją specyficzne wymagania dotyczące interfejsu użytkownika, np. w kontekście ergonomii lub responsywności, zwłaszcza przy uproszczonej komunikacji (jedynie link do narzędzia)?
    9. Jakie ograniczenia technologiczne lub organizacyjne mogą wpłynąć na rozwój MVP, zwłaszcza biorąc pod uwagę rezygnację z dodatkowej komunikacji przy planowaniu eventu?
    10. Jaki harmonogram wdrażania MVP oraz alokacja zasobów są przewidywane w kontekście realizacji tego projektu?
    </pytania>

    <rekomendacje>
    1. Zalecam skupienie się na uproszczonym, intuicyjnym systemie rejestracji, który umożliwi łatwą identyfikację i weryfikację pracowników.
    2. Rekomenduję opracowanie szczegółowych user stories dla kluczowych funkcjonalności, aby lepiej zrozumieć potrzeby organizatorów i uczestników eventu.
    3. Sugeruję zdefiniowanie jasnych kryteriów sukcesu dla modułu AI, takich jak wysoki wskaźnik akceptacji proponowanych terminów przez użytkowników.
    4. Postuluję stworzenie precyzyjnych specyfikacji dotyczących wymagań interfejsu użytkownika, aby zagwarantować prostotę i efektywność procesu planowania.
    5. Warto rozważyć scenariusze awaryjne, np. w przypadkach niejednoznacznych wyników rekomendacji AI, i określić sposoby ich rozwiązania.
    6. Zalecam przygotowanie planu integracji systemu z potencjalnymi narzędziami firmowymi, co może zwiększyć wartość funkcjonalną produktu.
    7. Rekomenduję ustalenie klarownego harmonogramu wdrożenia MVP wraz z przypisaniem zasobów, co ułatwi monitorowanie postępów projektu.
    8. Postuluję organizację warsztatów z interesariuszami w celu doprecyzowania wymagań i uzyskania zgody na przyjęcie określonych kryteriów sukcesu.
    </rekomendacje>

# Prompt

    Odpowiadajac na pytania:
    1. Uproszczony, intuicyjny system rejestracji, który umożliwia identyfikację pracowników (Imię i Nazwisko)
    2. 

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

    3. Jeżeli jest jeden optymalny termin, k†óry odpowiada największej liczbie uczestników to wskaż tylko ten. Jeżeli z analizy okazałoby się, że więcej niż jeden termin odpowiada takiej samej i największej z możliwych liczbie uczestników, to wskaż wszystkie takie i daj możliwość twórcy wydarzenia wyboru finalnego terminu.
    4. Na tym etapie nie będziemy zbierać takich statystyk.
    5. Przy wyborze terminu dla wydarzenia w trybie planowania powinny być przedstawione użytkownikowi wszystkie dostępne terminy dla danego wydarzenia. Nie prezentujemy danych historycznych.
    6. System będzie działać jako rozwiązanie odrębne.
    7. AI zwróci więcej niż jedną propozycję i finalnie zostanie wybrana przez twórce wydarzenia.
    8. Interfejs użytkownika powinien być intuicyjny, i responsywny - możliwość wyświetlania na urządzeniach mobilnych.
    9. Dla MVP nie przewiduję żadnych.
    10. Harmonogram zakłada przygotowanie tego MVP w czasie 6 tygodni, 2 godziny dziennie jednego programisty ze wsparciem AI - generowanie kodu.

# Res 2

    <pytania>
    1. Czy rejestracja z wykorzystaniem tylko imienia i nazwiska zapewni wystarczającą jednoznaczność identyfikacji pracowników, czy należy rozważyć dodanie dodatkowych danych (np. numeru identyfikacyjnego lub adresu e-mail)?
    2. Czy przewidujemy możliwość edycji lub modyfikacji utworzonych wydarzeń przez ich twórców po początkowym utworzeniu, czy dostępna będzie jedynie opcja usunięcia wydarzenia?
    3. Czy formularze tworzenia wydarzeń powinny posiadać dynamiczną walidację danych, która informuje użytkownika o błędach w czasie rzeczywistym?
    4. Jakie konkretne mechanizmy potwierdzania operacji krytycznych (np. usunięcia wydarzenia, zakończenia rejestracji/planowania) powinny być wdrożone (np. modal dialog z jasnymi komunikatami)?
    5. Czy podczas przekształcania wydarzenia z trybu planowania na rejestrację system powinien automatycznie synchronizować listę uczestników wybranej ostatecznie opcji, czy też pozostawić weryfikację finalnego wyboru twórcy wydarzenia?
    6. W jaki sposób interfejs użytkownika ma prezentować wyniki działania agenta AI – czy planujemy udostępnić dodatkowe informacje (np. liczba głosów, kryteria wyboru) czy tylko finalną decyzję?
    7. Czy mimo rezygnacji z gromadzenia statystyk na etapie MVP, przewidujemy możliwość rozszerzenia modułu analitycznego w przyszłych iteracjach, a jeśli tak, to jakie dane byłyby najbardziej przydatne?
    8. Czy interfejs użytkownika powinien być budowany jako oddzielny moduł frontend (np. przy użyciu React) umożliwiający pełną responsywność, czy preferujemy ściśle zintegrowane rozwiązanie z backendem?
    9. Czy istnieją dodatkowe wymagania dotyczące bezpieczeństwa i audytu operacji krytycznych, takich jak logowanie akcji związanych z zakończeniem planowania lub rejestracji wydarzeń?
    10. Czy harmonogram MVP (6 tygodni, 2 godziny dziennie) uwzględnia również etapy testowania i walidacji produktu, czy powinniśmy przewidzieć dodatkowy bufor czasowy na iteracyjne poprawki?
    </pytania>

    <rekomendacje>
    1. Zalecam opracowanie intuicyjnych i prostych formularzy rejestracyjnych oraz tworzenia wydarzeń z dynamiczną walidacją danych, aby usprawnić proces wprowadzania informacji przez użytkownika.
    2. Rekomenduję wdrożenie wyraźnych mechanizmów potwierdzania operacji krytycznych (np. usunięcia wydarzenia, zakończenia rejestracji/planowania) z możliwością potwierdzenia akcji przez użytkownika.
    3. Warto rozważyć umożliwienie edycji wydarzeń przez ich twórców – nawet jeśli na początku dostępna będzie tylko opcja usunięcia – aby zwiększyć elastyczność systemu.
    4. Sugeruję przygotowanie modułu synchronizacji uczestników przy zmianie trybu wydarzenia z planowania na rejestrację, bazując na ostatecznym wyborze terminu dokonanego przez twórcę.
    5. Rekomenduję zaprojektowanie interfejsu użytkownika, który będzie responsywny i zoptymalizowany pod kątem urządzeń mobilnych, co zapewni lepsze doświadczenie użytkownika.
    6. Zalecam projektowanie systemu z myślą o przyszłych rozszerzeniach, takich jak moduł analityczny do gromadzenia statystyk, który może być wdrożony po fazie MVP.
    7. Rekomenduję dokładne przetestowanie wszystkich krytycznych ścieżek użytkownika (user flows), aby zapewnić intuicyjne korzystanie z systemu oraz wysoką satysfakcję użytkowników.
    </rekomendacje>

# Prompt

    Odpowiedzi na pytania:
    1. Masz rację, imię i nazwisko będą niewystarczające - należy dodać jeszcze email, który jednoznacznie zidentyfikuje pracownika. Pamiętaj, że pracownicy będą się rejestrować przed uzyskanie dostępu do systemu. Rejestracja na wydarzenie czy wskazywanie preferowanych terminów w trybie Planowania będzie się odbywać dla już zalogowanych użytkowników.
    2. Tak, twórca wydarzenia powinien mieć możliwość edycji wydarzenia, ale NIE może edytować terminów w żadnym przypadku.
    3. Tak. Walidacja powinna dotyczyć:
    - Pole Nazwa wydarzenia jest wymagane
    - Pole Opis wydarzenia jest opcjonalne
    - Pole lokalizacja jest wymagane (może to być lokalizacja fizyczna jak i lokalizacja "Spotkanie online")
    - Pole typ wydarzenia jest wymagane - lista wyboru z dwoma opcjami: Rejestracja lub Planowanie
    - W formularzu tworzenia wydarzeniu typu Rejestracja - wymagane pole terminu
    - W formularzu tworzenia wydarzenia typu Planowanie - wymagane pole i wybranie conajmniej dwóch terminów
    - Walidacja pojedynczego terminu - może to być sama data (wydarzenia całodniowe) lub data i godzina (godzina rozpoczęcia i zakończenia, od - do).
    Walidacje powinny być zaimplementowane zarówno na frontendzie (walidacja w czasie rzeczywistym na formularzu) oraz na backendzie.
    4. Modal dialog z jasnymi komunikatami.
    5. System powinien automatycznie zsynchronizować listę uczestników. W trybie Rejestracji, każdy z uczestników i tak będzie wciąż miał możliwość rezygnacji z chęci uczestnictwa w wydarzeniu.
    6. Oprócz finalnej decyzji niech system przedstawi również liczbę głosów na dany termin / dane terminy.
    7. Na razie nie zajmujemy się tym.
    8 Tak, interfejs użytkownika powinien być budowany jako oddzielny moduł w React.
    9. Nie istnieją dodatkowe wymagania dotyczące bezpieczeństwa i audytu operacji krytycznych.
    10. harmonogram 6 tygodni zakłada dostarczenie gotowego MVP po testach i poprawkach.

# Res 3

    <pytania>
    1. Czy system rejestrujący użytkowników powinien wymagać weryfikacji adresu email (np. poprzez link aktywacyjny) podczas procesu rejestracji przed przyznaniem dostępu?
    2. Czy przy edycji wydarzenia przez twórcę dostępne będą tylko pola takie jak nazwa, opis i lokalizacja, przy czym modyfikacja terminów będzie całkowicie zablokowana zarówno na poziomie interfejsu, jak i backendu?
    3. Czy należy przygotować dedykowane, spersonalizowane komunikaty walidacyjne dla każdego z wymaganych pól, a jeśli tak – czy mamy ustalone wytyczne dotyczące ich treści lub stylu?
    4. Czy system powinien umożliwić zapis szkiców formularza tworzenia wydarzenia, aby użytkownik mógł kontynuować prace nad wydarzeniem w późniejszym terminie?
    5. Jakie mechanizmy powinny zostać zaimplementowane, aby zarządzać potencjalnymi konfliktami przy jednoczesnej synchronizacji listy uczestników w trybie rejestracji?
    6. Czy wyświetlanie liczby głosów dla proponowanych terminów powinno być widoczne wyłącznie dla twórcy wydarzenia, czy również dla uczestników, aby zwiększyć transparentność procesu wyboru ostatecznego terminu?
    7. Czy mamy ustalone specyficzne wytyczne dotyczące wyglądu i stylu modal dialogów potwierdzających operacje krytyczne, takie jak usuwanie czy zakończenie rejestracji/planowania?
    8. Czy interfejs użytkownika budowany jako oddzielny moduł w React powinien być oparty na konkretnej bibliotece UI (np. Material-UI, Bootstrap) lub pozostaje to otwarte dla dewelopera?
    9. Czy podczas przekształcania wydarzenia z trybu planowania na rejestrację system powinien dodatkowo wyświetlać historię głosów lub inne dane kontekstowe, aby ułatwić finalny wybór terminu przez twórcę wydarzenia?
    10. Czy nawet przy minimalnych wymaganiach bezpieczeństwa MVP, warto wdrożyć podstawowe mechanizmy logowania operacji krytycznych, aby ułatwić diagnostykę w przypadku wystąpienia problemów produkcyjnych?
    </pytania>

    <rekomendacje>
    1. Zalecam wdrożenie funkcji weryfikacji adresu email przy rejestracji użytkowników, co podniesie jakość identyfikacji i bezpieczeństwo systemu.
    2. Rekomenduję wyraźne oddzielenie edytowalnych pól (nazwa, opis, lokalizacja) od tych, które nie mogą być modyfikowane (terminy), zarówno na poziomie frontendowym, jak i backendowym.
    3. Sugeruję stworzenie precyzyjnych i spersonalizowanych komunikatów walidacyjnych dla każdego pola, implementowanych zarówno po stronie klienta, jak i serwera.
    4. Warto rozważyć możliwość zapisywania szkiców formularza tworzenia wydarzenia, co umożliwi użytkownikom dokończenie pracy nad wydarzeniem w dogodnym momencie.
    5. Zalecam implementację mechanizmu obsługi konfliktów przy synchronizacji listy uczestników, aby zapewnić spójność danych przy równoczesnych akcjach rejestracyjnych.
    6. Rekomenduję, aby system prezentował liczbę głosów dla proponowanych terminów – przynajmniej dla twórcy wydarzenia – co zwiększy przejrzystość procesu wyboru.
    7. Sugeruję określenie wytycznych dotyczących wyglądu modal dialogów, w tym wspólnych elementów UI, aby operacje krytyczne były jasne i intuicyjne dla użytkownika.
    8. Rekomenduję wybór jednej z popularnych bibliotek UI (np. Material-UI) dla budowy responsywnego i estetycznego interfejsu w module React.
    9. Zalecam dodanie dodatkowych etapów potwierdzenia przy przechodzeniu z trybu planowania do rejestracji, aby decyzje dotyczące przekształcenia wydarzenia były świadome i zgodne z oczekiwaniami.
    10. Sugeruję wdrożenie podstawowego mechanizmu logowania operacji krytycznych, co ułatwi diagnostykę oraz szybkie reagowanie na potencjalne błędy w środowisku produkcyjnym.
    </rekomendacje>

# Prompt

    Odpowiedzi na pytania:
    1. Nie. Chcę aby był to bardzo prosty system uwierzytelniania mający na celu rozróżnienie, który z użytkowników wykonuje dane żądanie. Myślę o użyciu formularza rejestracji gdzie użytkownik poda Imię, Nazwisko oraz email. Zostanie utworzona dla niego sesja http, wykorzystywana przy późniejszych żądaniach.
    2. Tak, przy edycji możliwość edycji terminu będzie zablokowana zarówno na frontendzie jak i backendzie. Front end wyświetli pole z terminem, ale w opcji tylko do odczytu.
    3. Tak - komunikaty spersonalizowane, wskazujące jaki jest błąd, zarówno na frontendzie jak i z API na backendzie. Nie ma zdefiniowanych wymagań. Proste komunikaty w stylu: "Pole Nazwa wydarzenia jest wymagane". Wykorzystanie standardowych mechanizmów z docelowej biblioteki.
    4. Nie. Na etapie MVP nie będzie szkiców wydarzenia.
    5. Synchronizacja powinna się odbyć na backendzie - tam zostanie przekształcone wydarzenie z trybu planowania na tryb rejestracji. Finalna lista zostanie pobrana na frontend.
    6. Jedynie twórca wydarzenia zobaczy podsumowanie oddanych głosów.
    7. Nie ma specyficznych wytycznych.
    8. Na razie nie specyfikujemy tak dokładnie stosu technologicznego.
    9. Nie.
    10. Tak wdrożmy podstawowy sytem logowania operacji krytycznych. Możemy oprzeć rozwiązanie o zapisie logów do dedykowanej tabeli w bazie danych.

# Res 4

    <pytania>
    1. Czy architektura sesji HTTP powinna uwzględniać mechanizmy wygasania oraz automatycznego odnawiania, aby zapewnić ciągłość dostępu dla zalogowanych użytkowników?
    2. Czy interfejs edycji wydarzenia powinien wyświetlać pole terminu jako tylko do odczytu z dodatkową informacją wyjaśniającą, że modyfikacja terminu jest niedozwolona?
    3. Czy komunikaty walidacyjne dla formularzy (zarówno frontendowych, jak i API) powinny być standaryzowane pod względem stylistycznym lub z możliwością lokalizacji w przyszłych iteracjach?
    4. Czy walidacja pól formularza ma być oparta o konkretną bibliotekę lub framework, czy pozostawiamy wybór technologiczny deweloperowi?
    5. Czy przy synchronizacji uczestników przy przekształcaniu wydarzenia z trybu planowania na rejestrację musimy uwzględnić optymalizację wydajności w przypadku dużej liczby uczestników?
    6. Czy podsumowanie oddanych głosów dla twórcy wydarzenia powinno być odświeżane w czasie rzeczywistym podczas procesu głosowania, czy wystarczy jednorazowe pobranie danych po jego zakończeniu?
    7. Czy przy wyświetlaniu modal dialogów do potwierdzania operacji krytycznych należy przyjąć standardowy wygląd dostępny w danej bibliotece UI, czy pozostawić to do późniejszej definicji?
    8. Czy pozostawienie stosu technologicznego dla modułu frontendowego otwartym na etapie MVP wymaga minimalnych wytycznych dotyczących interfejsu, czy też warto już teraz wskazać preferowaną bibliotekę komponentów?
    9. Czy istnieją scenariusze, w których operacja synchronizacji uczestników może napotkać konflikty lub opóźnienia, wymagając wdrożenia dodatkowych mechanizmów obsługi błędów?
    10. Jakie konkretnie operacje krytyczne powinny być logowane w dedykowanej tabeli (np. zamknięcie rejestracji, przekształcenie trybu wydarzenia), aby zapewnić pełną możliwość diagnostyki i audytu?
    </pytania>

    <rekomendacje>
    1. Zalecam wdrożenie prostego systemu uwierzytelniania opartego o formularz rejestracji, gdzie użytkownik podaje imię, nazwisko oraz email, a po rejestracji tworzona jest sesja HTTP.
    2. Rekomenduję wyraźne odseparowanie pól edytowalnych od zablokowanych (np. termin jako read-only) w formularzu edycji wydarzenia wraz z towarzyszącą informacją wyjaśniającą, dlaczego termin nie może być zmieniony.
    3. Sugeruję implementację spersonalizowanych, prostych komunikatów walidacyjnych dla wszystkich wymaganych pól, stosując standardowe mechanizmy walidacyjne zarówno po stronie klienta, jak i serwera.
    4. Warto, aby zarówno frontend, jak i backend, korzystały z tej samej logiki walidacyjnej, co ułatwi utrzymanie spójności komunikatów o błędach.
    5. Zalecam zaprojektowanie mechanizmu synchronizacji uczestników w backendzie, który efektywnie przekształci wydarzenie z trybu planowania na rejestrację i zapewni sprawne pobieranie finalnej listy uczestników przez frontend.
    6. Rekomenduję, aby podsumowanie głosów widoczne było wyłącznie dla twórcy wydarzenia, przy czym warto rozważyć odświeżanie danych w czasie rzeczywistym lub aktualizację po zakończeniu głosowania.
    7. Sugeruję wykorzystanie standardowych, sprawdzonych komponentów modal dialog dostępnych w używanej bibliotece UI, co zapewni spójność oraz intuicyjność interfejsu.
    8. Rekomenduję dalsze określenie preferowanego stosu technologicznego dla modułu frontendowego na etapie projektowania, aby ułatwić implementację i integrację interfejsu.
    9. Warto przygotować strategię obsługi błędów w mechanizmie synchronizacji uczestników, aby w razie konfliktów lub opóźnień móc szybko zareagować.
    10. Zalecam wdrożenie systemu logowania operacji krytycznych, zapisującego zdarzenia (takie jak zamknięcie rejestracji czy przekształcenie trybu wydarzenia) w dedykowanej tabeli w bazie danych, co usprawni diagnostykę i audyt systemu.
    </rekomendacje>

# Prompt

    Odpowiedzi na pytania:
    1. Tak - sesja powinna być automatycznie odnawiana, tak aby użytkownik miał wrażenie że jest ciągle zalogowany. Każdorazowe otwarcie aplikacji powinno dla użytkownika wyglądać tak, jakby był zalogowany.
    2. Nie potrzeba dodatkowej informacji. Wystarczy że będzie wyświetlone w trybie tylko do odczytu.
    3. Nie. System będzie tylko w języku polskim.
    4. Obecnie nie wybieramy konkretych bibliotek.
    5. Nie. Liczba uczestników dla MVP będzie mała - do kilkudziesięciu użytkowników.
    6. Nie musi być odświeżane w czasie rzeczywistym. Wystarczy, że po odświeżeniu strony pobrane zostaną aktualne dane z backendu.
    7. Do późniejszej decyzji.
    8. Nie wskazujemy jeszcze biblioteki.
    9. Nie będzie takich przypadków.
    10. Opewracje, które powinniśmy logować:
    - utworzenie wydarzenia
    - zakończenie procesu planowania
    - wyznaczenie optymalnego terminu przez AI
    - zamknięcie rejestracji na wydarzenie


    Na tym zakończmy naszą sesję - nie zadawaj mi już więcej pytań. W kolejnym promptcie poproszę o podsumowanie.


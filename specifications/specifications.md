# Specyfikacja Wymagań Biznesowych

## 1. Wprowadzenie
### Cel Projektu
Celem projektu jest stworzenie aplikacji webowej do zarządzania zapisami i planowaniem imprez firmowych, która będzie wspierać komunikację pomiędzy uczestnikami a organizatorami. Aplikacja ma być dostępna przez przeglądarkę i wykorzystywana przez pracowników firmy.

### Zakres Projektu
System obejmuje obsługę dwóch głównych trybów:
- **Tryb zapisu na imprezę:** Użytkownicy (imprezowicze) zgłaszają chęć uczestnictwa w już zaplanowanym wydarzeniu.
- **Tryb planowania imprezy:** Organizatorzy ustalają proponowane terminy imprezy, a pracownicy podają swoje preferencje czasowe, co pozwala na wyłonienie optymalnego terminu.

System obejmuje mechanizmy rejestracji i logowania, zarządzanie rolami użytkowników, automatyczne wysyłanie powiadomień e-mail oraz generowanie raportów podsumowujących imprezy. System będzie również wykorzystywał rozwiązania SSO oraz panel zarządzania użytkownikami.
Dodatkowo system przewiduje wsparcie dla wydarzeń cyklicznych oraz imprez z ograniczoną liczbą miejsc (z możliwością zastosowania listy rezerwowej).

---

## 2. Cele Biznesowe
- **Usprawnienie organizacji imprez firmowych:** Umożliwienie sprawnego zarządzania wydarzeniami, rejestracjami i preferencjami czasowymi.
- **Poprawa komunikacji:** Automatyczne wysyłanie powiadomień e-mail dotyczących zmian statusów wydarzeń, potwierdzeń rejestracji oraz raportów podsumowujących imprezy.
- **Elastyczność:** Obsługa różnych typów wydarzeń (integracyjne, szkolenia, wydarzenia sportowe, konferencje) z możliwością planowania oraz zapisów.
- **Integracja z zewnętrznymi systemami:** Integracja z systemem SSO i kalendarzem Google, co usprawni proces uwierzytelniania oraz synchronizacji wydarzeń. Wykorzystanie Keycloak do obsługi SSO oraz zarządzania użytkownikami.

---

## 3. Użytkownicy i Role Systemu
System definiuje trzy główne role z przypisanymi uprawnieniami:

### 3.1 Administrator
- **Uprawnienia:** 
  - Dostęp do wszystkich funkcjonalności systemu.
  - Zarządzanie konfiguracją systemu oraz panelem użytkowników (nadawanie i odbieranie ról).
- **Bezpieczeństwo:**
  - Uwierzytelnianie - Logowanie z wykorzystaniem login/hasło oraz SSO. Wymóg uwierzytelniania dwuskładnikowego dla roli administratora.
- **Zadania:
  - Monitorowanie, zarządzanie danymi, nadzór nad poprawnym działaniem systemu, konfiguracja globalnych ustawień.

### 3.2 Organizator Imprezy
- **Uprawnienia:**
  - Tworzenie, edycja i usuwanie wydarzeń zarówno w trybie zapisu na imprezę jak i w trybie planowania imprezy.
  - Zarządzanie listami uczestników – akceptacja zgłoszeń, usuwanie uczestników oraz przenoszenie użytkowników z listy rezerwowej na główną.
  - Przeprowadzanie planowania imprez poprzez ustalanie proponowanych terminów i zbieranie preferencji czasowych od pracowników.
- **Uwierzytelnianie:
  - Logowanie za pomocą loginu/hasła oraz SSO (bez wymogu dwuskładnikowego).
- **Zadania:
  - Organizacja imprez oraz koordynacja zapisów.

### 3.3 Imprezowicz
- **Uprawnienia:**
  - Zgłaszanie chęci uczestnictwa w imprezach w trybie zapisu.
  - Możliwość proponowania preferowanych terminów w trybie planowania imprezy.
- **Bezpieczeństwo:**
  - Logowanie przy użyciu loginu/hasła oraz SSO (bez 2FA).
- **Zadania:**
  - Rejestracja na wydarzenia oraz dostarczanie preferencji terminowych.

---

## 4. Funkcjonalności Systemu

### 4.1 Tryb Zapisu na Imprezę
- **Rejestracja i zarządzanie zgłoszeniami:**
  - Użytkownicy mogą zapisywać się na wydarzenia.
  - Możliwość anulowania chęci uczestnictwa przez imprezowiczów.
  - Organizator może odrzucać zgłoszenia lub usuwać uczestników.
- **Obsługa limitu miejsc:**
  - Wydarzenia mogą mieć ustalony limit miejsc lub być bez ograniczeń.
  - W przypadku eventów z limitem miejsc, automatyczne przenoszenie użytkowników z listy rezerwowej na główną w razie zwolnienia miejsca.
  
### 4.2 Tryb Planowania Imprezy
- **Proponowanie terminów:**
  - Organizator inicjuje proces planowania poprzez podanie zestawu proponowanych terminów (określonych godzin lub przedziałów czasowych).
- **Preferencje uczestników:**
  - Imprezowicze wpisują swoje preferencje dotyczące proponowanych terminów.
  - System agreguje wyniki, umożliwiając wybór najbardziej optymalnego terminu.
- **Obsługa cyklicznych imprez:**
  - Wsparcie dla wydarzeń powtarzających się cyklicznie, gdzie planowanie oraz rejestracja odbywają się w podobny sposób.

### 4.3. Panel Zarządzania Użytkownikami
- **Zarządzanie rolami:**
  - Administrator może nadawać i odbierać role użytkownikom.
  - Interfejs do przeglądania oraz edycji profili użytkowników.
- **Zarządzanie dostępem:**
  - Integracja z Keycloak w celu scentralizowanego zarządzania tożsamościami i rolami.

### 4.4 Powiadomienia i Raportowanie
- **Powiadomienia e-mail:**
  - Automatyczne wysyłanie powiadomień przy ważnych zmianach (np. zmiana statusu imprezy, potwierdzenie rejestracji).
  - Możliwość wysłania e-maila z zaproszeniem do dodania wydarzenia do kalendarza (integracja z Google Calendar).
- **Raportowanie:**
  - Po zatwierdzeniu imprezy i listy uczestników system generuje raport podsumowujący (np. nazwa, zakres imprezy, daty, godziny, lista uczestników) i wysyła go automatycznie mailem.

---

## 5. Uwierzytelnianie i Integracja z Keycloak

### 5.1. Integracja SSO i Zarządzanie Użytkownikami
- **Keycloak:**
  - Wykorzystanie Keycloak jako centralnego systemu SSO umożliwiającego logowanie poprzez dostawców takich jak Google, Microsoft, Facebook.
  - Konfiguracja roli i polityk bezpieczeństwa.
  - Panel administracyjny Keycloak umożliwiający nadawanie oraz odbieranie ról użytkownikom.

### 5.2. Wymagania Dotyczące 2FA
- **Administratorzy:**
  - Uwierzytelnianie dwuskładnikowe wymagalne tylko dla użytkowników z rolą *administrator*.
  - Implementacja 2FA za pomocą kodu weryfikacyjnego wysyłanego e-mailem, z opcją zapamiętania urządzenia przez określony czas (np. 30 dni).
- **Pozostali użytkownicy:**
  - Standardowe logowanie (bez 2FA) przy użyciu loginu/hasła lub SSO.
---

## 6. Wymagania Niefunkcjonalne

### 6.1. Bezpieczeństwo
- **Uwierzytelnianie i autoryzacja:**
  - Ścisłe zabezpieczenie REST API za pomocą tokenów JWT.
  - Implementacja polityk bezpieczeństwa we frameworku Spring Security oraz w Keycloak.
- **Zarządzanie rolami:**
  - Centralizowane zarządzanie tożsamościami i rolami przy użyciu Keycloak.

### 6.2. Skalowalność i Wydajność
- **Aplikacja:**
  - Została zaprojektowana jako modularny monolit, co umożliwia późniejsze wydzielenie mikroserwisów.
- **Infrastruktura:**
  - System będzie uruchamiany w środowisku konteneryzowanym (Docker, Docker Compose).

### 6.3. Użyteczność i Responsywność
- **Interfejs użytkownika:**
  - Nowoczesny, intuicyjny, responsywny UI.
- **Responsywność:**
  - Dopasowanie interfejsu do urządzeń mobilnych, tabletów i desktopów.

---

## 7. Podsumowanie

Projekt systemu do zarządzania imprezami firmowymi ma na celu:
- Usprawnienie organizacji wydarzeń i zapisów na imprezy.
- Wprowadzenie scentralizowanego zarządzania użytkownikami i rolami przy użyciu Keycloak.
- Zabezpieczenie dostępu do systemu poprzez wdrożenie 2FA wyłącznie dla administratorów.
- Integrację z popularnymi dostawcami SSO oraz wysyłanie powiadomień e-mail (Mailgun).



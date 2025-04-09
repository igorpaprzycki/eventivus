# Stos Technologiczny i Architektura Systemu

## 1. Architektura Aplikacji

### 1.1. Model "Modularny Monolit"
- **Monolit:** System zostanie zaimplementowany jako monolit, co upraszcza początkowe wdrożenie i integrację.
- **Modularność:** Zastosowanie podejścia modularnego pozwoli na logiczny podział kodu na moduły, które w przyszłości można łatwo wydzielić jako mikroserwisy, gdy zajdzie taka potrzeba.

---

## 2. Backend

### 2.1. Język i Framework
- **Java 21** – zapewnia nowoczesne funkcje językowe i długoterminowe wsparcie.
- **Spring Boot 3.4.4** – framework umożliwiający szybkie tworzenie aplikacji, konfigurację oraz integrację z dodatkowymi komponentami.

### 2.2. System budowania
- **Maven** – system budowania i zarządzania zależnościami. Ułatwia integrację z IntelliJ IDEA, CI/CD oraz konteneryzacją.

### 2.3. Baza Danych
- **PostgreSQL** – relacyjna baza danych oferująca wysoką wydajność oraz skalowalność.

### 2.4. Uwierzytelnianie i Autoryzacja
- **Metody logowania i rejestracji:**
  - Logowanie tradycyjne – przy użyciu loginu i hasła.
  - Integracja z SSO poprzez popularnych dostawców: **Google, Microsoft, Facebook**.
- **Dwuskładnikowe uwierzytelnianie:**
  - Realizowane za pomocą e-maila (wysyłanie kodu weryfikacyjnego) z opcją zapamiętania urządzenia/użytkownika na okres około 30 dni.
  - **Wymagane tylko dla użytkowników z rolą "Administrator".**
- **Bezpieczeństwo API:**
  - Wykorzystanie tokenów **JWT** do uwierzytelniania i autoryzacji każdego requestu.
  - Szczególna dbałość o zabezpieczenie sesji użytkownika na poziomie frontendu.
- **Mechanizmy zabezpieczające:**
  - Użycie wbudowanych funkcji Spring Security.
  - Ścisła walidacja żądań do REST API.

### 2.5. Zarządzanie użytkownikami
- **Panel zarządzania użytkownikami:**
  - Możliwość nadawania i odbierania ról użytkownikom.
  - **Integracja z Keycloak** jako rozwiązanie do zarządzania tożsamością, rolami oraz autoryzacją.

### 2.6. Testowanie
- **Backend:**
  - **JUnit 6 (Jupiter)** oraz **Mockito** – narzędzia do testów jednostkowych oraz integracyjnych.
- **Testowanie API:**
  - Testy bezpieczeństwa i autoryzacji dla wszystkich endpointów.

### 2.7. Konteneryzacja
- **Docker:**
  - Przygotowanie Dockerfile dla aplikacji.
  - **Docker Compose** – konfiguracja środowiska deweloperskiego lokalnie.
- **Hosting chmurowy (MVP):**
  - Na początkowym etapie rozważenie tanich lub darmowych opcji hostingu (np. Heroku, niskokosztowe plany na DigitalOcean, free-tier w AWS/GCP).

### 2.8. Email Provider
- **Mailgun:**  
  - Wybrany jako dostawca usług e-mail, służący do wysyłania powiadomień (np. potwierdzenia rejestracji, zmiany statusu wydarzeń, raporty).

---

## 3. Frontend

### 3.1. Framework i Język
- **React** – używany do budowy interaktywnego interfejsu webowego.
- **TypeScript** – zapewnienie silnego typowania oraz większej niezawodności kodu.

### 3.2. Zarządzanie Stanem
- **Redux:**  
  - Sprawdzone rozwiązanie do zarządzania stanem aplikacji React.
  - W mniejszych modułach można rozważyć też React Context API, jednak Redux jest lepszym wyborem przy rosnącej złożoności systemu.

### 3.3. Testowanie
- **Testy jednostkowe i integracyjne:**
  - **Jest** oraz **React Testing Library** – narzędzia do testowania komponentów oraz logiki aplikacji.

### 3.4. UI i Responsywność
- **Biblioteka UI:**  
  - Propozycje: Material-UI (MUI) lub Bootstrap – obie zapewniają nowoczesny wygląd, dobrą responsywność i wsparcie dla projektu mobil-first.
- **Responsywność:**
  - Projekt interfejsu zapewniający poprawne działanie na urządzeniach mobilnych, tabletach i komputerach.

---

## 4. DevOps i CI/CD

### 4.1. Automatyzacja Procesu Build i Deployment
- **GitHub Actions:**  
  - Automatyzacja procesów buildów, testów oraz wdrożeń.
- **Repozytorium:**  
  - Konfiguracja continuous integration (CI) oraz continuous deployment (CD) zapewniająca efektywny proces developmentu.

---

## 5. Podsumowanie Stosu Technologicznego

- **Backend:**
  - **Język i Framework:** Java 21, Spring Boot 3.4.4.
  - **System budowania:** Maven.
  - **Baza Danych:** PostgreSQL.
  - **Bezpieczeństwo i Uwierzytelnianie:** Logowanie (login/hasło oraz SSO z Google, Microsoft, Facebook), 2FA przez e-mail dla administratorów, JWT, Spring Security, Keycloak.
  - **Zarządzanie użytkownikami:** Panel administracyjny + integracja z Keycloak.
  - **Testowanie:** JUnit 6 (Jupiter) i Mockito.
  - **Konteneryzacja:** Docker, Docker Compose.
  - **Email Provider:** Mailgun.
  - **API:** REST API z dobrze zabezpieczonymi endpointami.

- **Frontend:**
  - **Framework:** React.
  - **Język:** TypeScript.
  - **Zarządzanie stanem:** Redux.
  - **Testowanie:** Jest, React Testing Library.
  - **UI:** Nowoczesny interfejs (Material-UI lub Bootstrap) oraz responsywność.

- **DevOps:**
  - **Automatyzacja CI/CD:** GitHub Actions.
  - **Infrastruktura:** Konfiguracja lokalna przy użyciu Docker Compose i potencjalne wdrożenie na platformach chmurowych z niskim kosztem hostingu.

---

Dokument ten stanowi aktualną specyfikację stosu technologicznego oraz architektury systemu. Może być rozwijany wraz z rozwojem projektu.

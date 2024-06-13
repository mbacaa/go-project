# Aplikacja Webowa z Uwierzytelnianiem przez Ethereum

Projekt jest przykładem minimalnej aplikacji webowej, która wykorzystuje kontenery Docker oraz docker-compose do zarządzania usługami backend (Go), frontend (Next.js), bazą danych (Postgres) oraz nginx do przekierowywania ruchu na port 80.

Główną funkcjonalnością backendu jest uwierzytelnianie użytkowników za pomocą adresów Ethereum (SIWE) i podpisów kryptograficznych (signatures).

Uważam, że jest to bardzo ciekawy, sposób na uwierzytelnianie użytkowników, ponieważ nie wymaga od użytkownika podawania żadnych danych osobowych, a jedynie podpisania wiadomości za pomocą swojego klucza prywatnego.

## Auth flow

![](./images/auth-flow.png?raw=true)

## Test połączenia z DB oraz działania migracji w Go

![](./images/db-check.png?raw=true)

## Token znajdujący się w Cookie

![](./images/cookie.png?raw=true)

## Zdekodowany token JWT

![](./images/jwt-decode.png?raw=true)

## Screenshoty z UI

![](./images/00.png?raw=true)
![](./images/01.png?raw=true)
![](./images/02.png?raw=true)
![](./images/03.png?raw=true)
![](./images/04.png?raw=true)
![](./images/05.png?raw=true)
![](./images/06.png?raw=true)

## Dodatkowo - wtf is soft delete?

![](./images/soft-delete.png?raw=true)

Biblioteka GORM pozwala na zastosowanie tzw. soft delete, co oznacza, że rekord nie jest usuwany z bazy danych, a jedynie oznaczany jako usunięty (na tym brzydkim screenshocie widać kolumnę "deleted_at"). W ten sposób zachowujemy historię zmian w bazie danych. Oraz w razie potrzeby możemy przywrócić usunięty rekord.

Podobno jest to często stosowane w aplikacjach, które muszą spełniać wymogi GDPR (polski skrót- RODO).

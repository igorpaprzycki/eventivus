# Prompt

Na podstawie opisu MVP z @prd.md  oraz stacku technologicznego z @tech-stack-bolt.md przygotuj prompt dla generatora proof of
concept, który pozwoli nam zweryfikować podstawową funkcjonalność aplikacji czyli "US-008: Sugestia terminu przez AI". Wyklucz wszystkie nadmiarowe funkcje, ale uwzględnij te, które są konieczne do przetestowania powyższej funkcjonalności. Zaznacz, aby generator rozplanował pracę i uzyskał moją akceptację zanim przejdzie do tworzenia PoC.

# Res

Below is a proposed proof-of-concept generator prompt that focuses solely on verifying the "US-008: Sugestia terminu przez AI" functionality. This prompt excludes all extra features while including only what’s necessary to test the AI-driven suggestion of the optimal event date/time. It also instructs the generator to plan the work and acquire your approval before proceeding further.

---

**Proof-of-Concept Prompt for "US-008: AI Suggestion of Event Date/Time"**

Based on the MVP requirements from `prd.md` and the technology stack outlined in `tech-stack-bolt.md`, please generate a proof-of-concept that demonstrates the core functionality of "US-008: Sugestia terminu przez AI". The PoC must include the following:

1. **Minimal Event Planning Mode:**
   - A simple UI (built with Astro and React using TypeScript and styled with TailwindCSS) allowing the creation of a planning event.
   - The event creator can specify multiple potential dates/times (only the minimal fields necessary for this function).

2. **Voting Mechanism:**
   - A mechanism for users (or simulated votes) to cast votes on the proposed dates.
   - Ensure that when at least one vote is present, the UI shows a button labeled "Wskaż wspólny termin".

3. **AI Suggestion Logic:**
   - When the "Wskaż wspólny termin" button is clicked, trigger a backend function (or a simulated call to an AI service) that analyzes the votes.
   - The function should return the date/time(s) with the highest number of votes. In case of a tie, all top results must be returned.
   - Display the suggested date(s) to the event creator on the UI.

4. **Reusability:**
   - Allow multiple invocations of the AI suggestion process until planning mode is closed.
   - Keep the implementation minimal—exclude any unnecessary features beyond validating this AI suggestion functionality.

5. **Backend Setup:**
   - Use Supabase as the backend service for storing vote counts (you can simulate the database interactions if required).

6. **Work Planning & Approval:**
   - Before implementing the full PoC, please plan out the work by breaking the functionalities into discrete steps/modules (e.g., Event Planning UI, Voting Mechanism, AI Suggestion Service, and Integration) and present this plan for my review and approval.

---

Please plan the work by outlining the detailed steps you intend to follow, and wait for my approval before proceeding with the full implementation of the proof-of-concept.

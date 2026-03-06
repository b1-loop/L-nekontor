# ⏱️ TimeTrack Pro — Diamond Edition 💎

**Live demo:** https://b1-loop.github.io/SalaryHelper/

Ett komplett, webbaserat löne- och stämplingsverktyg byggt som en Single Page Application (SPA) med **multi-fil projektstruktur** (HTML + CSS + JS). Projektet är designat som en avancerad, klickbar prototyp (MVP) för kundpresentationer.

Kräver ingen backend eller databas — allt sparas i webbläsarens `localStorage` och fungerar helt offline. Förberedd som en PWA (Progressive Web App) och kan sparas på mobilens hemskärm.

---

## 🔑 Demo-inloggning

| Roll | PIN |
|------|-----|
| Admin | `9999` |
| Alex (Du) | `1234` |
| Sara Andersson | `5678` |

---

## ✨ Funktioner

### 👨‍🔧 Arbetarvyn

| Funktion | Beskrivning |
|----------|-------------|
| **Stämpelklocka** | Klocka in med GPS-tagg, starta/avsluta rast, stämpla ut |
| **Färdig pass** | Klicka ✅ Färdig på ett planerat pass — OB, övertid och lön räknas ut automatiskt från schemalagda tider |
| **Automatisk OB-beräkning** | Sessionen delas upp i vanlig tid och OB-tid med 5-minutsupplösning — gränserna är konfigurerbara av admin. Svenska helgdagar (röda dagar) identifieras automatiskt och ger OB-tillägg hela dagen |
| **Övertidsberäkning** | Timmar utöver den konfigurerbara gränsen (standard 8h/dag) flaggas som övertid och ger 1,5× lön |
| **Varning vid lång inloggningstid** | Toast-notis om man varit instämplad i över 10 timmar utan att stämpla ut |
| **Kommentar på arbetspass** | Valfri kommentarsruta dyker upp efter utstämpling (t.ex. "vikariat", "extra kvällsarbete") |
| **Rastlängd** | Rasttid (minuter) sparas per session och visas i historiken |
| **Frånvarohantering med kommentar** | Knappar för Sjukdom, Semester och VAB (Vård av Barn) öppnar ett inline-formulär där man kan skriva en valfri orsak/kommentar innan man bekräftar |
| **VAB** | Registrera VAB-dag separat från sjukdagar — räknas i ett eget saldo (VAB-dagar) som visas i stats-grid |
| **Frånvarosaldo** | Semesterdagar kvar, sjukdagar och VAB-dagar visas direkt i stats-grid |
| **Inkomstgraf** | Grönt månadsdiagram (Chart.js) i arbetar-vyn som visar bruttolön per månad — döljs automatiskt om historik saknas |
| **Mina lönespecar** | Knapp som öppnar en modal med alla egna sparade lönespecifikationer (period, brutto och netto) |
| **Schemahantering** | Visa, lägg till och ta bort egna pass — listan sorteras alltid kronologiskt |
| **Kalendervy för schema** | Toggle-knapp för att växla mellan listvy och månadskalender |
| **Kopiera förra veckan** | Ett klick kopierar alla pass från förra veckan till motsvarande dagar denna vecka (hoppar över dubbletter) |
| **Duplicera pass** | 📋-knapp på varje pass fyller i formuläret med samma tider — byt bara datum och tryck Lägg till |
| **Återkommande pass** | Lägg till ett pass för en valbar veckodag under 4/8/12 veckor framåt med ett klick |
| **Autofyll datum** | Datumfältet vid nytt pass fylls automatiskt med dagens datum |
| **Skiftpåminnelse** | Browser-notis + toast om ett pass börjar inom 30 min (uppdateras var 60:e sekund). Vid inloggning visas även en toast om man har pass idag eller imorgon |
| **Lönespecifikation** | Bruttolön uppdelad på vanlig tid, OB och övertid. Progressiv skatteberäkning (kommunalskatt 31,49 % + statlig skatt 20 % på belopp över 46 000 kr/mån). Konfetti-animation vid öppning |
| **Skriv ut / Spara PDF** | Knapp i lönespecifikationen som öppnar utskriftsdialogen — allt utom specen döljs |
| **Profilbild** | Anställda laddar upp ett eget foto (max 500 KB) via 📷-knappen i profilkortet — visas som rund avatar i profilen, redigeringsmodalen och admintabellen |
| **Min profil** | Anställda uppdaterar sin kontaktinformation (personnummer, telefon, e-post, gatuadress, postnummer, stad, nödkontaktens namn och telefon) — synlig för admin |
| **Lönestatus** | Statistikruta visar om lönen för aktuell månad är utbetald (✅) eller ej (⏳) — uppdateras när admin markerar utbetalningen |
| **Byt PIN-kod** | Anställda kan byta sin egen PIN direkt från profilkortet (validerar gamla PIN, 4-siffror, unikhet) |
| **Friskanmälan / Avsluta semester** | När status är Sjuk visas "✅ Friskanmäl dig" och när status är Semester visas "✅ Avsluta semester" — ett klick återställer till Utloggad |
| **Semesteransökan** | Anställda skickar en ansökan (datum + anledning) och ser statusen (Väntar/Godkänd/Nekad) direkt i vyn |
| **Inloggningsmeddelande** | Admin-meddelande visas som en lila banner när anställda loggar in — stängs per session, dyker upp igen om meddelandet ändras |
| **Lönedag-nedräkning** | "Dagar till lön"-ruta i stats-grid räknar ned till konfigurerat lönedatum. Visar 🎉 Idag! på lönedagen |
| **Anställningsinformation** | Visar anställningsdatum, beräknad tjänstetid (X år Y mån), avdelning, befattning och anställningsform i ett eget kort |
| **Anställningsform** | Admin registrerar anställningsform (Heltid, Deltid, Timanställd, Behovsanställd) per anställd — anställda ser sin form i informationskortet |
| **Mina certifikat** | Anställda ser sina certifikat och kompetenser (registrerade av admin) med utgångsdatum och färgkodad status |
| **Mina dokument** | Anställda ser och laddar ned filer som admin laddat upp på deras profil (anställningsavtal, intyg m.m.) |
| **Tillgänglighetsmarkering** | Markera dagar du kan jobba men inte är schemalagd — visas för admin i planeringskalendern som ✋-markeringar |
| **Skiftbyte** | Välj ett kommande pass och en kollega och skicka en bytesförfrågan — admin godkänner och passet flyttas automatiskt |
| **Meddelande till admin** | Anställda kan skicka ett fritt meddelande till admin (max 500 tecken) direkt från sin vy |
| **Notiser vid svar** | Toast-notis visas vid nästa inloggning när admin godkänner eller nekar en semester- eller skiftbytesansökan |
| **Veckorapport** | Kort med dag-för-dag-vy (mån–sön): jobbade timmar, OB och lön per dag, veckototaler och ◀ ▶ för att bläddra bakåt/framåt i veckor |
| **Statistik-dashboard** | 8-veckors stapeldiagram (Chart.js) med jobbade timmar per vecka + statistikrutor: snittimmar, bästa veckan, total OB-tid och frånvarograd |
| **Skiftpool** | Admin lägger ut öppna pass i en pool — anställda ser listan och ansöker med ett klick. Admin godkänner en sökande och passet läggs automatiskt till i personens schema |
| **Automatisk midnattsutstämpling** | Varning-toast kl 23:45 om man är instämplad. Om man fortfarande är instämplad vid midnatt sker automatisk utstämpling med en varningsnotis |
| **iCal-export** | 📆-knapp bredvid schema-toggle exporterar alla schemalagda pass som en standard .ics-fil (RFC 5545) — importeras direkt i Google Kalender, Apple Kalender eller Outlook |
| **Födelsdagshälsning** | Om dagens datum matchar MM-DD i den inloggade anställdas personnummer visas en personlig 🎂-toast direkt vid inloggning |
| **Interaktiv guide** | ❓ Guide-knapp i navigeringen startar en steg-för-steg genomgång av alla funktioner — startar automatiskt vid första inloggning |

---

### 👔 Admin Dashboard

| Funktion | Beskrivning |
|----------|-------------|
| **Dashboard-statistik** | Fyra statistikrutor längst upp: lönekostnad för vald period, antal inloggade just nu, snittlön (kr/h) och totala timmar |
| **Realtidsavisering vid instämpling** | Toast-notis visas för admin inom 15 sekunder när en anställd stämplar in — via `storage`-event (kors-flik) eller polling (samma flik) |
| **Kostnadsdiagram** | Interaktivt stapeldiagram (Chart.js) — vanlig lön vs OB-tillägg per anställd |
| **Löneöversikt med perioder** | Filtrera lönetabellen på *Allt*, *Denna vecka* eller *Denna månad* |
| **Sorterbar lönetabell** | Klicka på kolumnrubriker (Anställd, Vanlig tid, OB, Bruttolön) för att sortera stigande/fallande |
| **Sök anställda** | Fritextsök i lönetabellen |
| **Övertidsrapport** | Horisontellt stapeldiagram per anställd sorterat efter övertidstimmar — färgkodat (gul/orange/röd) efter allvarlighetsgrad, respekterar periofiltret |
| **Semesterplanering** | Delad månadskalender som visar alla anställdas schemalagda pass (blå), semesterdagar (grön 🏖️), sjukdagar (röd 🤒) och tillgänglighetsmarkeringar (gul ✋) — navigera med ◀ ▶ |
| **Personalhantering** | Lägg till, redigera (namn, PIN, timlön, semesterdagar, avdelning, befattning, anställningsform, personuppgifter, nödkontakt) och radera anställda |
| **Schemamallar** | Spara aktuell veckas schema som en namngiven mall i redigeringsmodalen — återanvänd med ett klick så att passen kopieras till rätt veckodagar |
| **Frånvarograd** | Varje anställd i lönetabellen visar en 🤒-badge med frånvarograd i procent — beräknad som sjukdagar / (jobbade dagar + sjukdagar) |
| **Profilbild per anställd** | Admin laddar upp eller byter foto i redigeringsmodalen — avataren visas som miniatyrbild bredvid namnet i lönetabellen |
| **Dokumenthantering** | Admin laddar upp filer (PDF, Word, bild — max 2 MB) kopplade till en specifik anställd. Filen listas med nedladdningslänk och kan raderas |
| **Löneutbetalning** | 💰-knapp per anställd i lönetabellen markerar lönen för aktuell månad som utbetald. Knappen blir grön ✅ och inaktiveras. Den anställde får automatiskt en notis och ser uppdaterad lönestatus |
| **Jubileumsnotiser** | Vid inloggning kontrolleras om någon anställd fyller år idag (baserat på personnummer) eller har jobbsdag (baserat på anställningsdatum) — visas som toast-notiser, en gång per session |
| **Bekräftelsedialog** | Alla destruktiva åtgärder kräver bekräftelse via en anpassad modal — ingen `window.confirm()` |
| **Schema vs. faktisk tid** | I redigeringsmodalen visas jobbad tid bredvid schemalagd tid: `08:00–16:00 \| Jobbade: 7,5h (−0,5h)` |
| **Historikvy per anställd** | Månadsgrupperad historik med deltotaler — vanlig tid, OB, övertid, rast, kommentar och bruttolön |
| **Månadsdiagram i historik** | Blått stapeldiagram per anställd i historikmodalen visar lön per månad |
| **Datumfilter i historik** | Filtrera historikmodalen på valfritt datumintervall |
| **Korrigera arbetstid** | Admin kan lägga till, redigera eller ta bort enskilda arbetspass direkt i historikmodalen |
| **Frånvarohistorik** | Visar exakta datum + kommentarer för sjukdagar och semester i historikmodalen, med möjlighet att ta bort enskilda dagar |
| **Nollställ semesterdagar** | Återställ en anställds semesterdagar till 25 med ett klick (kräver bekräftelse) |
| **Rensa historik** | Knapp i redigeringsmodalen rensar all arbetstidshistorik och nollställer sjukdagar (semesterdagar rörs ej) |
| **Aktivitetslogg** | 100 senaste händelser, fritextsök i loggen, "Visa fler"-knapp (50 åt gången) |
| **CSV-export (löneöversikt)** | Exportera hela löneöversikten till en Excel-kompatibel CSV |
| **CSV-export (all historik)** | Exportera alla anställdas kompletta arbetshistorik som en samlad CSV-fil |
| **CSV-export (personalregister)** | Exportera alla anställdas kontaktuppgifter (personnummer, telefon, e-post, adress m.m.) som CSV |
| **CSV-export (per anställd)** | Ladda ner en enskild anställds historik som CSV direkt från historikmodalen |
| **Semesteransökningar** | Admin ser alla väntande ansökningar (med antal i rubriken), kan skriva en kommentar och godkänna eller neka — godkännande drar dagarna automatiskt och fyller i semesterhistoriken |
| **Certifikat & kompetenser** | Admin lägger till certifikat med utgångsdatum per anställd — färgkodat grön/orange/röd. Varningskort visar alla certifikat som löper ut inom 60 dagar |
| **Anställningsdatum** | Admin registrerar startdatum per anställd — ingår i personalregister-CSV |
| **Inloggningsmeddelande** | Admin skriver ett meddelande i ⚙️ Inställningar som visas som banner för alla anställda vid nästa inloggning |
| **Lönedatum** | Admin konfigurerar lönedagen (1–31) under ⚙️ Inställningar — styr anställdas nedräkning |
| **Konfigurerbar övertidsgräns** | Admin ställer in efter hur många timmar/dag övertid räknas under ⚙️ Inställningar (standard: 8h) |
| **Anpassningsbara OB-tider** | Admin ställer in kväll- och morgongränser för OB under ⚙️ Inställningar (standard: 18:00 / 07:00) |
| **Företagsnamn** | Ange företagsnamn under ⚙️ Inställningar — visas i navigeringen och på lönespecen |
| **Lönespecifikationshistorik** | Varje gång en lönespec öppnas sparas en snapshot automatiskt — admin ser alla under ⚙️ Inställningar |
| **Säkerhetskopiering** | Ladda ner hela databasen (anställda, historik, loggar, lönespecar) som JSON, eller återställ från backup |
| **Frånvarostatistik** | Donut-diagram som visar totalt antal jobbade pass, sjukdagar och semesterdagar för alla anställda |
| **Skiftbyten** | Admin ser alla väntande skiftbytesförfrågningar, godkänner (passet flyttas automatiskt i schemat) eller nekar |
| **Meddelanden från anställda** | Inkorgsvy med alla meddelanden sorterade nyast först — olästa markeras med 🔵 och räknas i rubriken. "Markera alla lästa"-knapp |
| **Meddelandebadge i navigering** | 💬-knapp i adminens navigering visar antal olästa meddelanden som en röd badge — uppdateras automatiskt |
| **Anställd-ranking** | Topplista med progressbars — rangordna anställda efter vanlig tid, OB, övertid, antal pass eller bruttolön. Respekterar perioffiltret. 🥇🥈🥉 för topp 3 |
| **Schemavarningar** | Visar automatiskt vilka anställda som saknar pass inlagda för nästa vecka — grön ✅ om alla är täckta, annars ⚠️ per person |
| **Global historik-sökning** | Fritextsökning tvärs alla anställdas arbetshistorik — sök på namn, datum (ÅÅÅÅ-MM-DD) eller sessionkommentar. Visar timmar, OB, övertid och lön per träff |
| **Kalenderanteckningar** | Admin klickar på valfri dag i planeringskalendern för att lägga till, redigera eller ta bort en anteckning. Dagar med anteckning visas med en lila 📝-badge i kalenderrutnätet |
| **Slumpa PIN** | 🎲-knapp bredvid PIN-fältet i redigeringsmodalen genererar en oanvänd 4-siffrig PIN — admin kopierar och meddelar den anställde |
| **Skiftpool (admin)** | Lägg ut öppna pass i en pool (datum, tid, valfri beskrivning) — se vilka anställda som ansökt och godkänn med ett klick |

---

### 🌐 System & UX

| Funktion | Beskrivning |
|----------|-------------|
| **Flerspråkigt stöd** | Knapp 🇬🇧 EN / 🇸🇪 SV i navigeringen växlar hela gränssnittet mellan svenska och engelska — 200+ nycklar, sparas i `localStorage`, datum- och talformatering anpassas till valt språk |
| **Dark Mode / Light Mode** | Fullt stöd för mörkt tema, sparas i `localStorage` |
| **Korrekt utskrift i dark mode** | Lönespecen skrivs alltid ut med ljus bakgrund oavsett valt tema |
| **PIN-knappsats** | Visuellt numeriskt tangentbord på inloggningsskärmen — auto-skickar vid 4 siffror |
| **Enter-tangent** | Tryck Enter i PIN-fältet för att logga in |
| **Fel PIN-animation** | Inputfältet skakar och visar "Fel PIN-kod" i rött vid felaktig inloggning |
| **Brute-force-skydd** | Max 3 felaktiga PIN-försök — därefter 30 sekunders lockout med nedräkning. Felmeddelandet visar antal kvarvarande försök |
| **XSS-skydd** | `escapeHtml()` saniterar all användardata (namn, anteckningar, beskrivningar) innan den renderas som HTML — skyddar mot cross-site scripting |
| **PWA / Service Worker** | Appen cachas offline via en Service Worker (cache-first) och kan installeras på mobilens hemskärm |
| **Inaktivitets-timeout** | Automatisk utloggning efter 15 minuters inaktivitet |
| **Offline-indikator** | Visar 🟢 Online / 🔴 Offline i navigeringen i realtid |
| **Toast-notiser** | Animerade notiser för all feedback — inga webbläsar-popups |
| **Levande klocka** | Systemtid uppdateras varje sekund |
| **Interaktiv guide** | 4-panelsspotlight med steg-för-steg tooltip — 6 steg för anställda, 8 för admin. Auto-start vid första inloggning, manuell start via ❓ Guide i navigeringen |

---

## 🛠️ Teknisk stack

| Del | Teknik |
|-----|--------|
| **Frontend** | HTML5, CSS3 (CSS-variabler, `@keyframes`, `@media print`), Vanilla JS (ES6+) |
| **Databas** | `localStorage` — ingen server krävs |
| **Diagram** | [Chart.js 4.4.7](https://www.chartjs.org/) via CDN (låst version) |
| **Konfetti** | [canvas-confetti](https://github.com/catdad/canvas-confetti) via CDN |
| **Arkitektur** | Multi-fil SPA — HTML, CSS och JS i separata filer |
| **PWA** | Service Worker med cache-first strategi — fungerar helt offline |
| **Säkerhet** | `escapeHtml()` mot XSS, brute-force-lockout på PIN-login, `try/catch` på localStorage |

---

## 🚀 Kom igång

Ingen byggprocess eller Node.js behövs.

1. Öppna `index.html` direkt i en modern webbläsare (Chrome, Edge, Firefox, Safari).
2. Logga in med en av PIN-koderna ovan.

**Mobil-demo:** Ladda upp projektet till GitHub Pages eller Vercel och öppna länken på telefonen. Välj *Dela → Lägg till på hemskärmen* för att installera som PWA.

---

## 🎭 Guide för demopresentation

1. **Inloggning** — Visa PIN-skärmen och knappsatsen. Ange `1234` för Alex.
2. **Klocka in** — Klicka *Klocka In (GPS)*. Notera plats-taggen i aktivitetsloggen.
3. **Rast** — Starta och avsluta en rast. Visa att rasttiden dras av från arbetstiden.
4. **Klocka ut** — Klicka *Stämpla Ut*. Visa OB/övertid i toasten, sedan kommentarsrutan.
5. **Färdig pass** — Visa ✅ Färdig-knappen på ett planerat pass och hur lönen räknas ut direkt.
6. **Frånvaro med kommentar** — Klicka *Sjuk* eller *Semester* och visa kommentarsrutan som dyker upp innan bekräftelse.
7. **Inkomstgraf** — Visa det gröna månadsdiagrammet i arbetar-vyn.
8. **Kopiera vecka** — Klicka *Kopiera förra veckan* och visa att passen dupliceras till denna vecka.
9. **Kalendervy** — Växla till kalendervy för schemat och tillbaka till lista.
10. **Lönespecifikation** — Klicka *Visa Lönespecifikation*. Visa konfettin, skatteuppdelningen och utskriftsknappen.
11. **Mina lönespecar** — Klicka *Mina lönespecar* och visa historiken.
12. **Lönedag** — Visa nedräkningen "Dagar till lön" i stats-griden.
13. **Friskanmäl** — Klicka *Sjuk*, visa bekräftelse-prompten, sedan visa att "✅ Friskanmäl dig"-knappen visas och återställer statusen.
14. **Semesteransökan** — Scrolla till ansökningskortet, fyll i datum och anledning och skicka in.
15. **Certifikat** — Visa det egna certifikat-kortet med färgkodad statusindikator.
16. **Tillgänglighet** — Scrolla till "Min Tillgänglighet", lägg till ett datum och visa att det sparas.
17. **Skiftbyte** — Gå till "Byt Skift", välj ett pass och en kollega och skicka förfrågan.
18. **Byt PIN** — Scrolla till profilkortet och visa PIN-bytesformuläret.
19. **Admin-vy** — Logga ut och logga in som Admin (`9999`).
20. **Inloggningsmeddelande** — Öppna ⚙️ Inställningar, skriv ett meddelande, spara. Logga in som worker och visa bannern.
21. **Dashboard-statistik** — Visa de fyra statistikrutorna längst upp.
22. **Semesteransökningar** — Visa kortet med väntande ansökningar, godkänn en med kommentar.
23. **Skiftbyten** — Visa kortet med väntande skiftbytesförfrågningar och godkänn ett.
24. **Frånvarostatistik** — Visa donut-diagrammet med jobbade pass, sjukdagar och semesterdagar.
25. **Certifikat-varningar** — Visa varningskortet för certifikat som snart löper ut.
26. **Löneperiod** — Byt filter till *Denna månad* och visa hur totalsiffrorna ändras.
27. **Övertidsrapport** — Visa stapeldiagrammet med övertid per anställd.
28. **Semesterplanering** — Scrolla till kalenderkortet, navigera månader och visa ✋-markeringar för tillgänglighet.
29. **Meddelanden** — Logga in som worker, scrolla till "Meddelande till Admin", skriv och skicka. Logga sedan in som admin och visa inkorgskortet med 🔵-markering.
30. **Notiser** — Godkänn en ansökan som admin, logga sedan in som worker och visa att toasten visas direkt.
31. **Veckorapport** — Visa "Veckorapport"-kortet i arbetar-vyn, bläddra bakåt med ◀ och visa dagsvisa timmar.
32. **Flerspråkigt** — Klicka 🇬🇧 EN i navigeringen och visa att hela gränssnittet växlar till engelska. Klicka 🇸🇪 SV för att återgå.
33. **Ranking** — Visa rankingkortet, byt dropdown till "Övertid" och visa hur ordningen ändras med progressbars.
34. **Schemavarningar** — Visa varningskortet och notera vilka anställda som saknar pass för nästa vecka.
35. **Global sökning** — Scrolla till sökkortet, skriv ett namn eller datum och visa träffarna med timmar och lön.
36. **Historikvy** — Klicka *Historik* bredvid en anställd. Visa månadsgruppering, frånvarohistorik med kommentarer och månadsdiagrammet.
37. **Exportera** — Visa de tre CSV-exportknapparna: löneöversikt, all historik, personalregister (inkl. anst.datum).
38. **Inställningar** — Visa lönedatum, OB-tider, övertidsgräns och företagsnamn.
39. **Backup** — Klicka *Ladda ner backup* och visa den nedladdade JSON-filen.
40. **Offline** — Stäng av WiFi och visa att indikatorn byter till 🔴 Offline utan att appen slutar fungera.
41. **Profilbild** — Logga in som worker, scrolla till profilkortet och ladda upp ett foto via 📷-knappen. Logga sedan in som admin och visa avataren i lönetabellen.
42. **Nödkontakt** — Visa fälten "Nödkontaktens namn" och "Nödkontaktens telefon" i profilkortet och i adminens redigeringsmodal.
43. **Dokumenthantering** — Öppna redigeringsmodalen för en anställd, ladda upp en PDF och visa nedladdningslänken. Logga sedan in som worker och visa "Mina Dokument".
44. **Löneutbetalning** — Klicka 💰-knappen för en anställd i lönetabellen. Visa att knappen blir ✅. Logga in som worker och visa att lönestatus ändrats till "✅ Utbetald".
45. **Jubileumsnotis** — Sätt en anställds personnummer eller anställningsdatum till dagens datum och logga in som admin för att se jubileumstoasten.
46. **VAB** — Logga in som worker, klicka *VAB* och skriv en valfri kommentar. Visa att VAB-dagar räknas separat i stats-grid.
47. **OB på röda dagar** — Stämpla in på ett datum som är en svensk helgdag (t.ex. 1 maj) och visa att hela passet räknas som OB automatiskt.
48. **Anställningsform** — Öppna redigeringsmodalen för en anställd, välj anställningsform (t.ex. "Deltid") och spara. Logga in som worker och visa att formen visas i anställningsinformationskortet.
49. **Schemamallar** — Öppna redigeringsmodalen, scrolla till schemamallar, klicka *Spara aktuell vecka som mall*, ge den ett namn. Återanvänd mallen på en annan anställd med ett klick.
50. **Frånvarograd** — Visa 🤒-badge bredvid en anställd i lönetabellen och förklara hur frånvarograden beräknas.
51. **Realtidsavisering** — Öppna appen i två flikar: admin i en, worker i den andra. Stämpla in som worker och visa att admin-fliken får en toast-notis inom 15 sekunder.
52. **Meddelandebadge** — Skicka ett meddelande som worker, logga sedan in som admin och visa den röda sifferbadgen på 💬-knappen i navigeringen.
53. **Statistik-dashboard** — Logga in som worker och scrolla till statistikkortet. Visa 8-veckorsdiagrammet och statistikrutorna (snitt, bästa vecka, OB, frånvarograd).
54. **Skiftpool (worker)** — Scrolla till "Lediga pass"-kortet, visa ett öppet pass i poolen och klicka *Ansök* för att söka passet.
55. **Skiftpool (admin)** — Logga in som admin, scrolla till skiftpool-kortet längst ned. Lägg till ett nytt pass (datum + tid + beskrivning) och visa sökande-listan.
56. **Kalenderanteckning** — Klicka på en dag i semesterplaneringskalendern, skriv en anteckning och spara. Visa att dagen får en lila 📝-badge.
57. **Slumpa PIN** — Öppna redigeringsmodalen för en anställd, klicka 🎲 bredvid PIN-fältet och visa att en ny unik PIN genereras automatiskt.
58. **iCal-export** — Logga in som worker, klicka 📆 bredvid schema-toggle och visa att en .ics-fil laddas ned som kan importeras i t.ex. Google Kalender.
59. **Födelsdagshälsning** — Sätt en anställds personnummer till ett vars MM-DD matchar dagens datum och logga in som den anställde — visa 🎂-toasten.
60. **Automatisk midnattsutstämpling** — Förklara hur varningen visas kl 23:45 och att appen automatiskt stämplar ut vid midnatt om man glömt.
61. **Brute-force-skydd** — Mata in tre felaktiga PIN-koder i rad och visa lockout-meddelandet med 30-sekunders-nedräkning.
62. **PWA-installation** — Öppna appen i Chrome på mobil, välj *Dela → Lägg till på hemskärmen* och visa att appen kan startas offline som en native-app.

---

## 🧹 Återställa testdata

Klistra in detta i webbläsarens konsol (F12 → Console) för att nollställa all data:

```js
['timetrack_pro_v3', 'timetrack_logs_v3', 'tt_payslips', 'tt_messages', 'tt_company', 'tt_ob_evening', 'tt_ob_morning', 'tt_ot_threshold', 'tt_payday', 'tt_admin_message', 'tt_lang'].forEach(k => localStorage.removeItem(k));
location.reload();
```

---

## 📁 Projektstruktur

```
index.html          ← HTML-markup + referenser till CSS och JS
README.md           ← Denna fil
css/
  style.css         ← All CSS (variabler, animationer, dark mode, kalender, @media print)
js/
  i18n.js           ← 200+ översättningsnycklar (sv/en), t(), applyTranslations(), toggleLanguage()
  data.js           ← Global state, konstanter, localStorage-nycklar, datamigration
  utils.js          ← escapeHtml, showToast, updateClock, aktivitetslogg, toggleDarkMode, nätverksstatus
  calculations.js   ← isOBTime, calculateOBSplit, getTaxBreakdown, getElapsedMs, getFilteredHistory
  worker.js         ← Arbetar-vy, clockIn/Out, schema, kalender, iCal-export, profil, PIN-byte, semesteransökan, tillgänglighet, skiftbyte, skiftpool, meddelanden, veckorapport, statistik-dashboard, certifikat, frånvaro, lönedag, notiser, födelsdagshälsning, midnattsutstämpling, återkommande schema
  admin.js          ← Admin-dashboard, lönetabell, sortering, övertidsrapport, semesterplanering, kalenderanteckningar, skiftpool, frånvarostatistik, skiftbyten, certifikat-varningar, semesteransökningar, meddelanden, exportCSV, diagram
  modals.js         ← Alla modaler: lönespec, redigera (inkl. slumpa PIN), bekräfta, inställningar, historik, backup, certifikat, mina lönespecar
  auth.js           ← PIN-login, brute-force-lockout (3 försök / 30 s), inaktivitetstimeout (15 min), logout, språkinitiering
  sw.js             ← Service Worker — cache-first offline-stöd för alla JS/CSS/HTML-filer
  tour.js           ← Interaktiv guide med 4-panelsspotlight, separata steg för anställda och admin (stegtext hämtas via t())
```

Skripten laddas i rätt ordning i `index.html` (**i18n → data → utils → calculations → worker → admin → modals → auth → tour**) så att alla globala variabler och funktioner finns tillgängliga vid behov. Ingen byggprocess eller bundler krävs — öppna `index.html` direkt i webbläsaren.

# AGENTS.md

Diese Datei ist eine Arbeitsanweisung fuer KI-Agenten und Menschen, die in diesem Repository neue Liedseiten erstellen oder bestehende Liedseiten erweitern.

Sie gilt nicht nur fuer `erlebe-den-osterweg/`, sondern auch fuer zukuenftige Reihen, weitere CDs, weitere Unterordner und weitere zusammengehoerige Liedsammlungen.

## Ziel

Neue Liedseiten sollen im bestehenden Stil der Website erstellt werden.
Die Struktur, Navigation, Linklogik und Inhalte sollen zu den bereits vorhandenen Seiten in `erlebe-den-osterweg/` passen.

Der Bereich `erlebe-den-osterweg/` ist das erste konkrete Referenzbeispiel in diesem Repository.
Zukuenftige Bereiche sollen sich daran orientieren, aber mit ihren jeweils eigenen Titeln, Inhalten, Unterordnern und Liedfolgen angelegt werden.

## Schreibweise

In sichtbaren deutschen Texten sollen echte Umlaute und das `ß` verwendet werden.

- Schreibe also `Ü`, `Ä`, `Ö`, `ü`, `ä`, `ö` und `ß`
- Vermeide Umschreibungen wie `UE`, `AE`, `OE`, `ue`, `ae`, `oe` oder `ss`, wenn es sich um normales Deutsch handelt
- Das gilt besonders für Überschriften, Fließtexte, Navigation, Beschriftungen und neue Inhalte auf den HTML-Seiten
- Bestehende HTML-Entities wie `&uuml;`, `&auml;`, `&ouml;` und `&szlig;` sind weiterhin in Ordnung, wenn sie im HTML bereits so verwendet werden

## Wichtige Grundregel

Wenn eine neue Liedseite erstellt wird, orientiere dich immer zuerst an den bereits vorhandenen Liedseiten im Ordner `erlebe-den-osterweg/`.
Die neue Seite soll dieselbe HTML-Struktur, dieselben Klassen, dieselbe Breadcrumb-Navigation und dieselbe untere Vorherige-/Naechste-Navigation verwenden.

Wenn spaeter neue Reihen oder CDs hinzukommen, gilt:

- Ein bestehender Bereich darf als Vorlage dienen
- Die Struktur soll konsistent bleiben
- Namen, Pfade, Texte und Navigation muessen aber zum neuen Bereich passen
- Nicht alles hart auf `erlebe-den-osterweg` fest verdrahten, wenn ein neues Unterverzeichnis aufgebaut wird

## Zentrale Dateien

- Hauptbereich fuer die Liedseiten: `erlebe-den-osterweg/`
- Uebersichtsseite des Bereichs: `erlebe-den-osterweg/index.html`
- Bereichsnavigation: `erlebe-den-osterweg/nav.js`
- Globale Navigation: `nav.js`
- Styling: `css/site.css`
- Zentrale Social-Share-Logik: `js/social-links.js`
- Plattform-Icons: `img/platforms/`
- Lied-Vorschaubilder: `img/lied-X-vorschaubild.jpg`

Bei zukuenftigen Bereichen gilt sinngemaess dasselbe Muster:

- eigener Unterordner fuer den Bereich
- eigene `index.html` im Bereich
- eigene `nav.js` im Bereich
- Liedseiten im jeweiligen Unterordner
- Einbindung in die globale Navigation, falls der neue Bereich in der Seitennavigation sichtbar sein soll

## Allgemeines Muster fuer zukuenftige Reihen und CDs

Dieses Repository kann spaeter mehrere zusammenhaengende Musikreihen enthalten.
Beispiele:

- eine weitere CD
- ein neuer Themenbereich
- ein weiterer Unterordner mit eigener Liedfolge
- eine neue Serie mit derselben Seitenlogik

Dann soll nicht improvisiert werden, sondern dieses Muster verwendet werden:

1. Fuer die neue Reihe einen eigenen Ordner anlegen
2. In diesem Ordner eine eigene Uebersichtsseite `index.html` anlegen
3. In diesem Ordner eine eigene `nav.js` fuer die Liedfolge anlegen
4. Die Liedseiten in derselben strukturellen Form wie im Osterweg erstellen
5. Falls der Bereich global sichtbar sein soll, `nav.js` im Projektstamm erweitern
6. Die Gestaltung und Logik konsistent halten, auch wenn Thema und Texte anders sind

Wichtig:
`erlebe-den-osterweg/` ist ein Vorbild, aber nicht die einzige moegliche Sammlung.
Neue Sammlungen sollen "analog dazu" entstehen.

## Workflow fuer eine neue Liedseite

1. Eine vorhandene Liedseite als Vorlage nehmen.
   Gute Referenzen sind die neuesten vorhandenen Dateien in einem inhaltlich passenden Bereich, zuerst `erlebe-den-osterweg/`, spaeter auch neue vergleichbare Unterordner.

2. Den Dateinamen im bestehenden Schema anlegen.
   Format:
   `lied-<nummer>-<slug>.html`

   Beispiel:
   `lied-8-auf-dem-weg-nach-golgatha.html`

3. Die Uebersichtsseite des Bereichs aktualisieren.
   In der `index.html` des jeweiligen Unterordners den neuen Liedlink in die Liste der Unterseiten aufnehmen.

4. Die Bereichsnavigation aktualisieren.
   In der `nav.js` des jeweiligen Unterordners einen weiteren Eintrag mit Titel und `href` ergaenzen.

5. Die untere Vorherige-/Naechste-Navigation anpassen.
   Auf der vorherigen Liedseite muss der `Naechste`-Link auf die neue Seite zeigen.
   Auf der neuen Seite muss der `Vorherige`-Link auf die vorherige Seite zeigen.
   Wenn noch keine folgende Seite existiert, bleibt rechts `Naechste ->` als nicht klickbarer Text (`<span>`).

## Inhalte einer Liedseite

Jede Liedseite soll nach Moeglichkeit diese Bereiche enthalten:

- `h1` mit dem kompletten Seitentitel
- Untertitel wie:
  `Achtes Lied der CD "Erlebe den Osterweg"`
- Vorschaubild mit Link zum YouTube-Video
- Bereich `Audio-Plattformen`
- Bereich `Biblischer Hintergrund`
- Liedtext in einzelnen Abschnitten:
  - `Strophe 1`
  - `Strophe 2`
  - `Refrain`
  - weitere Strophen / Bridge / Outro / Refrain (Final) je nach Vorlage
- Linkblock am Ende:
  - Playlist
  - Mehr Infos
  - Video

Dies gilt nicht nur fuer Osterlieder.
Auch spaetere Liedseiten in anderen Reihen sollen nach demselben Bauprinzip aufgebaut werden, sofern nicht ausdruecklich etwas anderes vorgegeben wird.

## Neue Liedtexte mit KI

In diesem Repository kann KI nicht nur Liedseiten bauen, sondern auch neue Liedtexte entwerfen, wenn ausdruecklich der Auftrag dazu gegeben wird.

Wenn eine Anweisung lautet, dass ein neues Lied geschrieben werden soll, dann gilt:

- Die inhaltlichen Vorgaben des Auftraggebers sind verbindlich
- Genannte Themen, Szenen, Aussagen, Bibelstellen, Schwerpunkte, Bilder oder Formulierungswuensche muessen zuerst gesammelt und inhaltlich geordnet werden
- Die KI soll vor dem eigentlichen Schreiben gedanklich klaeren, was inhaltlich unbedingt in das Lied gehoert und wie die Aussagen sinnvoll ueber die einzelnen Teile des Liedes verteilt werden koennen
- Wenn der Auftraggeber bereits eine klare Vorlage oder Stichpunkte vorgibt, soll die KI diese als inhaltliche Grundlage verwenden und nicht eigenmaechtig in eine andere Richtung umdeuten

### Bibeltreue bei neuen Liedtexten

Neue Liedtexte sollen sehr bibeltreu sein.
Die KI soll deshalb nicht nur formulieren, sondern den Inhalt aktiv gegenpruefen.

- Jede zentrale Aussage soll daran gemessen werden, ob sie von den genannten Bibelstellen wirklich gedeckt ist
- Wenn konkrete Bibelstellen vorgegeben sind, soll die KI den Liedinhalt daran ausrichten und pruefen, ob die Aussagen dort tatsaechlich so vorkommen
- Wenn Szenen, Aussagen oder Deutungen im Auftrag genannt werden, soll die KI sorgfaeltig darauf achten, nichts als biblische Tatsache zu behaupten, was so in der Bibel nicht steht
- Zusaetzliche Ausschmueckungen, erfundene Details oder theologisch fragwuerdige Zuspitzungen sollen vermieden werden
- Wenn etwas eher eine Deutung, ein Gebet, eine Antwort des Menschen oder eine poetische Verdichtung ist, soll der Text so formuliert sein, dass dies sprachlich erkennbar bleibt

### Liedform und Sprache

Die Liedtexte sollen nicht nur inhaltlich korrekt, sondern auch als Lied gut singbar und sprachlich gelungen sein.

- Der Text soll in einer nachvollziehbaren Liedform aufgebaut werden, zum Beispiel mit mehreren Strophen und einem Refrain, bei Bedarf auch mit Bridge, Outro oder Refrain (Final)
- Die einzelnen Teile sollen inhaltlich zusammenpassen und eine klare Entwicklung oder Wiederaufnahme haben
- Der Refrain soll die Hauptaussage des Liedes tragen und sich gut wiederholen lassen
- Die Sprache soll natuerlich, klar, poetisch und singbar sein
- Reime sind willkommen, aber keine Pflicht an jeder Stelle
- Wenn gereimt wird, sollen die Reime gut klingen und sprachlich sauber wirken
- Zweckreime, holprige Formulierungen oder unnatuerliche Saetze nur fuer den Reim sollen vermieden werden
- Der Text soll nicht nur auf dem Papier gut aussehen, sondern sich auch wie ein echtes Lied lesen und singen lassen

### Empfohlener Ablauf fuer KI bei neuen Liedtexten

Wenn die KI den Auftrag bekommt, einen neuen Liedtext zu schreiben, soll sie in dieser Reihenfolge arbeiten:

1. Alle Vorgaben des Auftraggebers sammeln: Thema, Ziel, Bibelstellen, gewuenschte Inhalte, Bilder, Aussagen, Liedform
2. Inhaltlich ordnen, welche Aussagen in Strophe 1, weitere Strophen, Refrain und gegebenenfalls Bridge gehoeren
3. Alle zentralen Aussagen auf Bibeltreue pruefen und unklare oder nicht belegbare Punkte nicht als biblische Tatsachen formulieren
4. Erst danach den Liedtext als singbare Fassung ausarbeiten
5. Zum Schluss nochmals pruefen, ob der Text sowohl bibeltreu als auch sprachlich und musikalisch stimmig ist

### Entwurfsstatus und Veroeffentlichung

Neue Liedtexte oder neue Liedseiten duerfen bereits im Repository als Entwurf vorbereitet werden, bevor sie oeffentlich sichtbar sein sollen.
Dabei ist wichtig zwischen technischem Anlegen und echter Veroeffentlichung zu unterscheiden.

- Eine neue Liedseite darf als HTML-Datei bereits erstellt und inhaltlich ausgearbeitet werden, auch wenn sie noch nicht freigegeben ist
- Solange kein ausdruecklicher Auftrag vorliegt, die neue Seite jetzt in die Website einzubinden oder zu veroeffentlichen, bleibt sie unveroeffentlicht
- Unveroeffentlichte Liedseiten duerfen insbesondere noch nicht in Uebersichtsseiten, Bereichslisten, `nav.js`, globaler Navigation oder Vorherige-/Naechste-Verlinkungen aufgenommen werden
- Das Ziel ist, dass Besucher der Website solche Entwurfsseiten ueber die normale Seitennavigation und interne Linkstruktur nicht finden
- Erst wenn ausdruecklich gesagt wird, dass die neue Seite jetzt eingebunden oder veroeffentlicht werden soll, duerfen die noetigen Verlinkungen und Navigationseintraege gesetzt werden
- Bis zu diesem Freigabeschritt darf die Seite vorbereitet, verbessert und vollstaendig ausformuliert werden, aber noch nicht als regulaerer Teil der Website erscheinen

## Soziale Links und Teilen

Die Website verwendet eine zentrale JavaScript-Loesung fuer Social-Share-Funktionen.
Diese Logik soll nicht pro Seite einzeln nachgebaut werden, sondern immer ueber die zentrale Datei eingebunden werden.

- Zentrale Datei fuer die Teilen-Funktion: `js/social-links.js`
- Diese Datei soll auf allen HTML-Seiten eingebunden werden
- Die Positionierung und das Verhalten der Teilen-Funktion sollen zentral ueber `js/social-links.js` und `css/site.css` gesteuert werden
- Wenn spaeter Netzwerke hinzukommen, Beschriftungen geaendert werden oder das Popup angepasst werden soll, soll das zentral ueber diese Dateien geschehen
- Es sollen keine externen Social-Media-Widgets eingebunden werden
- Es sollen keine Verbindungen zu sozialen Netzwerken aufgebaut werden, bevor der Nutzer aktiv auf einen Teilen-Button klickt

### Teilen-Vorschau fuer soziale Netzwerke

Damit Dienste wie WhatsApp, Facebook, LinkedIn oder X beim Teilen eine brauchbare Vorschau anzeigen, sollen geeignete Meta-Tags im `head` der Seite gesetzt werden.

Bei neuen Liedseiten gilt:

- `og:type`, `og:site_name`, `og:title`, `og:description`, `og:url`, `og:image` und `og:image:alt` setzen
- zusaetzlich passende `twitter:`-Meta-Tags setzen, vor allem `twitter:card`, `twitter:title`, `twitter:description` und `twitter:image`
- fuer Liedseiten moeglichst das vorhandene lokale Lied-Vorschaubild als Social-Vorschaubild verwenden
- die `og:image`- und `twitter:image`-Werte mit absoluter URL zur Live-Domain angeben
- `og:title` und `og:description` inhaltlich passend zur jeweiligen Liedseite pflegen

Bei Uebersichtsseiten oder spaeteren CD-Seiten gilt:

- falls ein eigenes geeignetes Social-Vorschaubild vorhanden ist, dieses ebenfalls ueber die Meta-Tags eintragen
- falls noch kein passendes Bild vorliegt, spaeter ein geeignetes Social-Bild nachpflegen statt improvisierte oder unpassende Bilder zu verwenden

## YouTube-Video und Vorschaubild

Wenn ein YouTube-Link vorhanden ist, soll daraus auch das Vorschaubild eingebunden werden.

Wichtig:

- Fuer lokale Vorschaubilder ist ein Format in `16:9` zu bevorzugen
- Schwarze Balken oben oder unten sollen nach Moeglichkeit vermieden werden
- Wenn YouTube nur ein ungeeignetes `4:3`-Thumbnail mit Balken liefert, soll das lokale Bild fuer die Website in eine saubere `16:9`-Variante gebracht werden
- Social-Vorschaubilder sollen ebenfalls auf dieser lokalen `16:9`-Datei basieren

### YouTube-ID ermitteln

Beispiel-Link:
`https://www.youtube.com/watch?v=IuDbJPs3-iE&list=...&index=8`

Die Video-ID ist der Wert hinter `v=`.
In diesem Beispiel:
`IuDbJPs3-iE`

### Vorschaubild-URL

Standard-URL fuer das Thumbnail:
`https://i.ytimg.com/vi/<VIDEO-ID>/hqdefault.jpg`

Beispiel:
`https://i.ytimg.com/vi/IuDbJPs3-iE/hqdefault.jpg`

Hinweis:
Diese Standard-URL kann im Einzelfall nur ein `4:3`-Bild liefern.
Dann soll das Bild nicht ungeprueft uebernommen werden, sondern vor der Verwendung auf eine passende `16:9`-Darstellung fuer die Website geprueft werden.

### Lokale Ablage des Bildes

Das Bild lokal im Projekt speichern:
`img/lied-<nummer>-vorschaubild.jpg`

Beispiel:
`img/lied-8-vorschaubild.jpg`

### Einbindung in HTML

Die Seite soll den bestehenden Thumbnail-Block verwenden:

```html
<div class="thumb">
  <a href="YOUTUBE-LINK" target="_blank" rel="noopener noreferrer">
    <img src="../img/lied-8-vorschaubild.jpg" alt="Vorschaubild zum Lied Auf dem Weg nach Golgatha">
  </a>
</div>
<p class="thumb-link"><a href="YOUTUBE-LINK" target="_blank" rel="noopener noreferrer">Video auf YouTube &ouml;ffnen</a></p>
```

## Audio-Plattformen finden

Die Audio-Plattformen sollen moeglichst vollstaendig im gleichen Muster wie auf den anderen Liedseiten eingebaut werden.

### Prioritaet der Suche

1. Zuerst die HyperFollow- bzw. DistroKid-Seite des Liedes verwenden.
2. Falls dort nicht alle Links sichtbar sind, gezielt nach fehlenden Plattformen suchen.
3. Wenn moeglich, dieselben Plattformen wie auf den anderen Liedseiten einbauen:
   - Spotify
   - Apple Music
   - iTunes
   - Deezer
   - Amazon Music
   - YouTube Music

### Wichtiger Hinweis zur Startseite

Auf der Startseite sind die Kuenstlerprofile der Plattformen verlinkt.
Diese Kuenstlerseiten koennen als Ausgangspunkt dienen, wenn einzelne Liedlinks noch nicht direkt bekannt sind.

Relevante Stelle:
`index.html`

Dort sind unter `Direkt zu den Kuenstlerprofilen` bereits Plattform-Links hinterlegt.

Falls spaeter weitere Kuenstlerbereiche oder neue Reihen hinzukommen, koennen die jeweiligen Kuenstler- oder Sammlungsseiten ebenso als Einstieg fuer die Linksuche verwendet werden.

### Typische Suchstrategie

- Zuerst HyperFollow-Seite pruefen
- Dann bei Bedarf ueber die Kuenstlerseite oder die Plattform-Suche den spezifischen Song bzw. das Album finden
- Bei Deezer kann auch eine API-Suche helfen, wenn eine Websuche unzuverlaessig ist
- Bei YouTube Music kann die Video-ID oder der Titel helfen, aber Consent-Seiten koennen Suchabrufe erschweren

## Bereich "Biblischer Hintergrund"

Jede neue Liedseite soll einen eigenen Abschnitt `Biblischer Hintergrund` enthalten.

Dieser Abschnitt ist Pflicht, wenn eine neue Liedseite erstellt wird.

Auch in zukuenftigen Reihen soll ein inhaltlich passender Hintergrundabschnitt enthalten sein, sofern es sich weiterhin um Bibel- bzw. thematisch erklaerende Liedseiten handelt.

### Ziel des Abschnitts

- Die passenden Bibelstellen nennen
- Kurz erklaeren, welche Szene oder welchen theologischen Schwerpunkt das Lied zusammenfasst
- Im Stil der bestehenden Seiten schreiben: sachlich, kurz, passend zur Liedaussage

### Typische Struktur

- Ein bis zwei Saetze zur Szene
- Nennung der relevanten Evangelienstellen
- Ein Satz zur Deutung oder zum Schwerpunkt des Liedes

## HTML-Konventionen

- Bestehende Klassen und Struktur beibehalten
- HTML-Entities wie `&ouml;`, `&auml;`, `&uuml;`, `&szlig;` konsistent wie in den vorhandenen Seiten verwenden
- Relative Pfade innerhalb des Bereichs mit `../` verwenden
- Externe Links immer mit
  `target="_blank" rel="noopener noreferrer"`

## Qualitaetscheck vor Abschluss

Vor dem Abschluss immer pruefen:

- Existiert die neue HTML-Datei?
- Ist sie in `erlebe-den-osterweg/index.html` verlinkt?
- Ist sie in `erlebe-den-osterweg/nav.js` aufgenommen?
- Zeigt die Vorherige-/Naechste-Navigation korrekt?
- Ist das Thumbnail lokal vorhanden?
- Funktionieren YouTube-Link und Plattform-Links?
- Ist der Abschnitt `Biblischer Hintergrund` enthalten?
- Ist der Titel konsistent mit den anderen Seiten?
- Ist `js/social-links.js` eingebunden?
- Sind fuer Liedseiten passende Social-Meta-Tags im `head` gesetzt?
- Zeigt die Seite beim Teilen ein passendes Vorschaubild, sobald die Meta-Tags von der Plattform gelesen werden?

Wenn ein neuer Bereich oder Unterordner angelegt wurde, zusaetzlich pruefen:

- Hat der neue Bereich eine eigene `index.html`?
- Hat der neue Bereich eine eigene `nav.js`?
- Ist die globale Navigation angepasst, falls noetig?
- Ist die Struktur analog zu den bestehenden Bereichen aufgebaut?

## Empfehlung fuer KI-Agenten

Wenn du den Auftrag bekommst, eine neue Liedseite zu erstellen, gehe nicht frei vor, sondern:

1. zuerst die neuesten vorhandenen Liedseiten lesen
2. dann Dateiname, Navigation und Uebersichtsseite anpassen
3. danach Thumbnail und Plattformen einbauen
4. danach Social-Share-Einbindung und Social-Meta-Tags pruefen oder ergaenzen
5. danach den Abschnitt `Biblischer Hintergrund` ergaenzen
6. zum Schluss die finale Seite gegen eine bestehende Liedseite vergleichen

Wenn du den Auftrag bekommst, eine ganz neue Reihe, CD oder einen neuen Unterordner anzulegen, gehe so vor:

1. zuerst die Struktur von `erlebe-den-osterweg/` als Referenz lesen
2. dann einen neuen Bereich analog dazu aufbauen
3. danach dessen `index.html`, `nav.js` und Liedseiten konsistent anlegen
4. danach die globale Navigation nur dann erweitern, wenn der neue Bereich sichtbar werden soll
5. zum Schluss pruefen, ob die neue Reihe sich wie ein natuerlicher Teil derselben Website anfuehlt

Diese Datei ist bewusst fuer KI leicht auffindbar im Projektstamm abgelegt.

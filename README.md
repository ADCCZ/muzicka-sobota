# Múzička – zpěvy (sobota večer + neděle ráno)

Webová prezentace písní ve stylu Múzičky (fonty **Blaka** – nadpisy, **Grenze** – text).

## Spuštění
Statický web, žádný build. Na Vercelu: *Add New → Project → importovat repo → Framework: Other → Deploy*.
Lokálně: `python3 -m http.server` a otevřít `http://localhost:8000`.

## Dvě okna
| Adresa | Pro koho | Co ukazuje |
|---|---|---|
| `/` | — | rozcestník: výběr programu |
| `/?p=sobota` · `/?p=nedele` | notebook (ty) | aktuální slajd **s akordy**, náhled dalšího slajdu, program, strukturu písně, hodiny |
| `/?p=sobota&view=projektor` · `/?p=nedele&view=projektor` | projektor | čisté slajdy **bez akordů** |

1. Otevři `/` na notebooku, klikni **Otevřít projektor ↗** (nebo klávesa `P`).
2. Nové okno přetáhni na projektor a zmáčkni `F` (nebo na něj dvakrát klikni) → celá obrazovka.
3. Listuješ v kterémkoli okně – druhé se přepne samo (obě okna musí být ve stejném prohlížeči).

## Ovládání
| Klávesa | Akce |
|---|---|
| `→` `↓` `PageDown` `mezerník` | další slajd (funguje i prezentační klikátko) |
| `←` `↑` `PageUp` | předchozí |
| `B` / `.` | černá obrazovka |
| `F` | celá obrazovka |
| `C` | akordy zap/vyp (notebook) |
| `Home` / `End` | začátek / konec |

## Úprava písní
Sobota je v `sobota.js`, neděle v `nedele.js` (nový program = zkopírovat soubor, změnit klíč `PROGRAMS.xyz` a přidat `<script>` do `index.html`). Akord se píše do hranatých závorek před slabiku: `"[D]Máš, má ovečko, [A]dávno spát"`.
`---` = ruční zlom slajdu (max. 4 řádky na slajd, delší části se dělí samy), `repeat: 2` = celá část se zobrazí dvakrát. Pořadí slok/refrénů určuje pole `order`.

Zdroje: Zpěvník 4 (Ježíši, dávno už to vím; Zpívej haleluja; Otče náš nebeský; Oceán; Budem ako strom; Žízeň; Zlaté město; Hymna pathfinderů), Zpěvník pro pathfindery III (Bláznova ukolébavka; Ráno, celý den).
Grafika (mapa, figura, logo) je převzatá z diplomu Múzičky.

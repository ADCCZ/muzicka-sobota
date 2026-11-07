# Múzička – sobotní večerní program

Webová prezentace písní ve stylu Múzičky (fonty **Blaka** – nadpisy, **Grenze** – text).

## Spuštění
Statický web, žádný build. Na Vercelu: *Add New → Project → importovat repo → Framework: Other → Deploy*.
Lokálně: `python3 -m http.server` a otevřít `http://localhost:8000`.

## Dvě okna
| Adresa | Pro koho | Co ukazuje |
|---|---|---|
| `/` | notebook (ty) | aktuální slajd **s akordy**, náhled dalšího slajdu, program, strukturu písně, hodiny |
| `/?view=projektor` | projektor | čisté slajdy **bez akordů** |

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
Vše je v `songs.js`. Akord se píše do hranatých závorek před slabiku: `"[D]Máš, má ovečko, [A]dávno spát"`.
Opakování `|: … :|` se na projektoru zobrazí jako „2×“. Pořadí slok/refrénů určuje pole `order`.

Zdroje: Zpěvník 4 (Ježíši, dávno už to vím; Zpívej haleluja; Otče náš nebeský), Zpěvník pro pathfindery III (Bláznova ukolébavka).
Grafika (mapa, figura, logo) je převzatá z diplomu Múzičky.

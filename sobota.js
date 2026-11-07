/*
 * Program: Múzička – sobotní večerní program
 *
 * Formát textů: akord se píše do hranatých závorek před slabiku, na které zazní:
 *   "[D]Máš, má ovečko, [A]dávno spát"
 * "---" = ruční zlom slajdu, "\\n" = ruční zalomení řádku. Dlouhé řádky (> 32 znaků) se zalomí samy,
 * na slajdu jsou max. 4 řádky.
 * `repeat: 2` u části = celá část se zopakuje (slajdy se zobrazí dvakrát).
 * Opakovaný řádek uvnitř sloky se prostě napíše dvakrát.
 *
 * Každá položka v PROGRAM je buď píseň (type: "song"), nebo předěl (type: "section").
 * Pořadí slok v písni určuje pole `order` (klíče z `parts`).
 */

PROGRAMS.sobota = {
  name: "Sobota večer",
  subtitle: "sobotní večerní program",
  items: [
  {
    type: "song",
    title: "Ježíši, dávno už to vím",
    author: "BCC Worship, Karel Sedláček",
    source: "Zpěvník 4, str. 16",
    parts: {
      "1": {
        label: "1.",
        lines: [
          "Ježíši, [h]dávno už to vím, [G]že jsi věrný Pán,",
          "že [D]na kříži jsi všechno dal, tak [A]moc jsi o mě stál.",
          "Jen [h]kvůli Tobě jsem a smysl [G]žití poznávám,",
          "tak [D]o Tobě teď zpívat chci, ať [A]celý svět to ví!"
        ]
      },
      "R": {
        label: "Ref.",
        lines: [
          "Že Tvoje [D]láska mě našla,",
          "Tvoje [A]spása mě zvedla,",
          "Tvoje [h]milost se mě dotkla,",
          "nový [G]život mám.",
          "---",
          "Tvoje [D]dobrota mě drží,",
          "Tvoje [A]věrnost se mě nevzdá,",
          "Tvoje [h]cesta je ta pravá,",
          "jsi můj [G]věrný Pán."
        ]
      },
      "B": {
        label: "Bridge",
        repeat: 4,
        lines: [
          "Jen [G]kvůli Tobě jsem,\n[D]kvůli Tobě smím,",
          "[G]kvůli Tobě mám,\n[A]kvůli Tobě vím."
        ]
      }
    },
    order: ["1", "R", "1", "R", "B", "R"]
  },

  { type: "section", title: "Zamyšlení" },

  {
    type: "song",
    title: "Zpívej haleluja",
    author: "Neznámý autor",
    source: "Zpěvník 4, str. 57",
    parts: {
      "1": {
        label: "1.",
        lines: [
          "[a]Zpívej [e]hale[a]lu[e]ja,",
          "[a]zpívej [e]hale[E]luja,",
          "[a]zpívej [e]haleluja, [F]zpívej ha[C]leluja,",
          "[a]zpívej [e]halelu[a]ja."
        ]
      },
      "2": {
        label: "2.",
        lines: [
          "[a]Bůh je [e]všech lidí [a]Pán a [e]Král,",
          "[a]Bůh je [e]všech lidí [E]Pán a Král,",
          "[a]Bůh je [e]všech lidí Pán, [F]Bůh je všech [C]lidí Král,",
          "[a]Bůh je [e]všech lidí Pán a [a]Král."
        ]
      },
      "3": {
        label: "3.",
        lines: [
          "[a]On bude [e]vládnout [a]navě[e]ky,",
          "[a]On bude [e]vládnout na[E]věky,",
          "[a]On bude [e]vládnout, [F]On bude [C]vládnout,",
          "[a]On bude [e]vládnout na[a]věky."
        ]
      },
      "4": {
        label: "4.",
        lines: [
          "[a]Zpívej [e]hale[a]lu[e]ja,",
          "[a]zpívej [e]hale[E]luja,",
          "[a]zpívej [e]haleluja, [F]zpívej ha[C]leluja,",
          "[a]zpívej [e]halelu[a]ja."
        ]
      }
    },
    order: ["1", "2", "3", "4"]
  },

  { type: "section", title: "Písně na přání" },

  {
    type: "song",
    title: "Bláznova ukolébavka",
    author: "Pavel Dydovič / František Řebíček",
    source: "Zpěvník pro pathfindery III, str. 63",
    parts: {
      "1": {
        label: "1.",
        lines: [
          "[D]Máš, má ovečko, [A]dávno spát,",
          "už [G]píseň ptáků [D]končí,",
          "kvůli nám přestal i [A]vítr vát,",
          "jen [G]můra zírá [D]zvenčí.",
          "---",
          "Já [A]znám její zášť, tak [G]vyhledej skrýš,",
          "zas [A]má bílej plášť a v o[G]kně je [A]mříž."
        ]
      },
      "R": {
        label: "Ref.",
        lines: [
          "[D]Máš, má ovečko, [A]dávno spát",
          "a [G]můžeš hrát, ty mě [E]můžeš hrát,",
          "---",
          "vždyť [D]přijdou se [G]ptát, zítra zas při[D]jdou se [G]ptát,",
          "jestli ty v [D]mých předsta[G]vách\nuž [D]mizíš."
        ]
      },
      "2": {
        label: "2.",
        lines: [
          "[D]Máš, má ovečko, [A]dávno spát,",
          "dnes [G]máme půlnoc [D]temnou,",
          "ráno budou nám [A]bláznů lát,",
          "že [G]ráda snídáš [D]se mnou.",
          "---",
          "Proč [A]měl bych jim lhát, že [G]jsem tady sám,",
          "když [A]tebe mám rád, když [G]tebe tu [A]mám."
        ]
      }
    },
    order: ["1", "R", "2", "R"]
  }
]
};

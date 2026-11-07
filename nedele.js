/* Program: Múzička – nedělní ranní program (formát viz songs.js) */

PROGRAMS.nedele = {
  name: "Neděle ráno",
  subtitle: "nedělní ranní program",
  items: [
    {
      type: "song",
      title: "Ráno, celý den",
      author: "",
      source: "Zpěvník pro pathfindery III, str. 109",
      parts: {
        "R": {
          label: "Ref.",
          lines: [
            "[D]Ráno, celý den, [G]andělé nade mnou [E7]bdí, můj [A7]Pane,",
            "[D]ráno, celý den, andělé nade [A7]mnou [D]bdí."
          ]
        },
        "1": {
          label: "1.",
          lines: [
            "[D]Když probouzím se v nový den,",
            "[G]andělé nade mnou [E7]bdí, můj [A7]Pane,",
            "s [D]Tebou jdu a šťastný [G]jsem,",
            "[D]andělé nade [A7]mnou [D]bdí."
          ]
        },
        "2": {
          label: "2.",
          lines: [
            "[D]Samota mne už netíží,",
            "[G]andělé nade mnou [E7]bdí, můj [A7]Pane.",
            "Ne[D]bojím se ob[G]tíží,",
            "[D]andělé nade [A7]mnou [D]bdí."
          ]
        },
        "3": {
          label: "3.",
          lines: [
            "A [D]když je večer a jdu spát,",
            "[G]andělé nade mnou [E7]bdí, můj [A7]Pane,",
            "ne[D]musím se zlého [G]bát,",
            "[D]andělé nade [A7]mnou [D]bdí."
          ]
        }
      },
      order: ["R", "1", "R", "2", "R", "3", "R"]
    },

    {
      type: "song",
      title: "Oceán",
      author: "Neznámý autor",
      source: "Zpěvník 4, str. 32",
      parts: {
        "1": {
          label: "1.",
          lines: [
            "Když už svět [C]neměl co dát a [e]já to chtěl vzdát,",
            "Tys [G]přišel jak Král, do [D]rukou mě vzal.",
            "Tvá [C]milost je víc, než [e]dokážu říct,",
            "až [G]na kolenou rozu[D]mím."
          ]
        },
        "B": {
          label: "Bridge",
          lines: [
            "Tak svým [C]živo[e]tem nap[G]lním Tvůj [D]sen.",
            "Toužím [C]říci [e]všem, že jsi tu [G]každý [D]den."
          ]
        },
        "R": {
          label: "Ref.",
          lines: [
            "[C]Tvoje lás[G]ka, ona uzdra[e]ví a vysvobo[D]dí.",
            "[C]Tvoje ná[G]ruč je tam, kde chci [e]být a neode[D]jít.",
            "[C]Budu zpí[G]vat a chválit Tě [e]dál za všechno, cos [D]dal.",
            "---",
            "Proč bych se [C]bál, vždyť se mnou je [G]Král,",
            "tak [e]nekonečný [D]Pán, můj [C]oceán. [G] [e] [D]"
          ]
        },
        "2": {
          label: "2.",
          lines: [
            "Do [C]života dal jsi [e]radost a vzal",
            "jsi [G]minulost mou, už [D]nebloudím tmou.",
            "Tvá [C]milost je víc, než [e]dokážu říct,",
            "až [G]na kolenou rozu[D]mím."
          ]
        }
      },
      order: ["1", "B", "R", "2", "B", "R"]
    },

    { type: "section", title: "Zamyšlení" },

    {
      type: "song",
      title: "Budem ako strom",
      author: "Tretí deň",
      source: "Zpěvník 4, str. 6",
      parts: {
        "R": {
          label: "Ref.",
          lines: [
            "Budem ako [E]strom, [A] [E]",
            "[A]sadený pri [E]vode, [A] [E]",
            "[A]a mojou [E]oporou [A] [E]",
            "[A]je mi živý [E]Pán. [A] [E]"
          ]
        },
        "1": {
          label: "1.",
          lines: [
            "[c#]Nech len príde [F#]des,",
            "ja [c#]neutečiem [F#]preč."
          ]
        },
        "2": {
          label: "2.",
          lines: [
            "[c#]Nebudem sa [F#]báť,",
            "hoc [c#]aj príde [F#]dážď."
          ]
        }
      },
      order: ["R", "1", "R", "2", "R"]
    },

    {
      type: "song",
      title: "Žízeň",
      author: "Spirituál kvintet",
      source: "Zpěvník 4, str. 60",
      parts: {
        "1": {
          label: "1.",
          lines: [
            "[C]Když kapky deště buší na [F]rozpálenou [C]zem,",
            "[C]já toužím celou duší dát [F]živou vodu [C]všem.",
            "[C]Už v Knize knih je psáno: [F]bez vody nelze [C]žít,",
            "[C]však ne každému je dáno z [F]řeky pravdy [C]pít."
          ]
        },
        "R": {
          label: "Ref.",
          lines: [
            "[G7]Já mám žízeň, [C]věčnou [C7]žízeň.",
            "Stačí [F]říct, kde najdu [C]vláhu,",
            "a zchladím [F]žáhu páli[G]vou.",
            "---",
            "Já mám [G7]žízeň, věčnou [C]žíze[C7]ň.",
            "Stačí [F]říct, kde najdu [C]vláhu,",
            "a zmizí [F]ží[C]zeň, [F]ží[C]zeň, [G]ží[C]zeň."
          ]
        },
        "2": {
          label: "2.",
          lines: [
            "[C]Stokrát víc než slova hladká [F]jeden čin [C]znamená,",
            "[C]však musíš zadní vrátka [F]nechat [C]zavřená.",
            "[C]Mně čistá voda schází, [F]mně chybí její [C]třpyt,",
            "[C]však z moře lží a frází [F]se voda nedá [C]pít."
          ]
        },
        "3": {
          label: "3.",
          lines: [
            "[C]Jak vytékají říčky [F]zpod úbočí [C]hor,",
            "[C]tak pod očními víčky [F]já ukrývám svůj [C]vzdor.",
            "[C]Ten pramen vody živé [F]má v sobě každý z [C]nás",
            "[C]a vytryskne jak gejzír, [F]když přijde jeho [C]čas."
          ]
        }
      },
      order: ["1", "R", "2", "R", "3", "R"]
    },

    { type: "section", title: "Vysvětlení hry" },

    {
      type: "song",
      title: "Zlaté město",
      author: "Max Lucado",
      source: "Zpěvník 4, str. 55",
      parts: {
        "1": {
          label: "1.",
          lines: [
            "[a]Zkoušky [G]tvé již brzy [d]skončí,",
            "[a]Jeho [G]dlaň ti milost [d]dá.",
            "[F]Zraně[G]ní tvá uzdra[C(/E)]ví se,",
            "[F]novou [a]zem ti otví[G]rá."
          ]
        },
        "2": {
          label: "2.",
          lines: [
            "[a]K Tvému [G]trůnu přichá[d]zíme,",
            "[a]domů [G]shromáždil jsi [d]nás.",
            "[F]Vítá[G]ni jsme Otcem z [C(/E)]nebes,",
            "[F]oče[a]kávání je [G]čas."
          ]
        },
        "R": {
          label: "Ref.",
          lines: [
            "Setká[a]me se ve městě [C]zlatém, čeká [G]nás Jeruza[d]lém,",
            "žádná [F]bolest ani [G]pláč už nebu[a]dou.",
            "---",
            "Budem [a]stát s anděly a [C]zpívat: „Svatý, [G]svatý Berán[d]ek“,",
            "navě[F]ky stát v uctí[G]vání před Te[a]bou."
          ]
        },
        "3": {
          label: "3.",
          lines: [
            "[a]Žádná [G]síla mocí [d]temných,",
            "[a]ani [G]život, ani [d]smrt,",
            "[F]nic nás [G]více neo[C(/E)]dělí",
            "[F]od Tvé [a]lásky, Bože [G]náš."
          ]
        },
        "Z": {
          label: "Závěr",
          lines: [
            "navě[F]ky stát v uctí[G]vání před Te[a]bou,",
            "navě[F]ky stát v uctí[G]vání před Te[a]bou."
          ]
        }
      },
      order: ["1", "2", "R", "3", "R", "Z"]
    },

    {
      type: "song",
      title: "Hymna pathfinderů",
      author: "",
      source: "Zpěvník 4, str. 2",
      parts: {
        "1": {
          label: "Hymna",
          lines: [
            "[G]My jdem hledat cíl stezky své,",
            "víry, lásky, na[C]děje.",
            "Po stezce si šlapem [A]dál,",
            "Boží [D]láska svítí [G]nám.",
            "---",
            "Bůh nás všechny má hodně rád,",
            "chceme světu vyzpí[C]vat,",
            "Ježíš brzy přijde [G]jako [C]Král,",
            "už [G]při[D]chá[G]zí."
          ]
        }
      },
      order: ["1"]
    }
  ]
};

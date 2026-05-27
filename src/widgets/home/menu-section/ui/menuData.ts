export type MenuItem = {
  name: string;
  description?: string;
  price: string;
  note?: string;
};

export type MenuCategory = {
  id: string;
  label: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "vorspeisen",
    label: "Vorspeisen",
    items: [
      { name: "El Nigo Platte Mix-Vorspeise", description: "Knoblauchbrot, Alioli, Putenspieß, Dateln, Chorizo, Hähnchenpflügel, Mini-Mozzarella, Hackfleischbällchen, Fettakäse, Lammkrone", price: "€35,80", note: "2 Personen" },
      { name: "Haus gemachte Chorizo Rosario", price: "€9,50" },
      { name: "Mediterrane Oliven", price: "€6,00" },
      { name: "Serrano Schinken", price: "€11,90" },
      { name: "Haus Platte", description: "Käse, Kartoffel, Speck und Kajmak Dip", price: "€17,10" },
      { name: "Gemüse Mediterran", description: "Dazu Knoblauchbrot", price: "€10,40" },
      { name: "Gambas in Knoblauchsoße", description: "Pikant", price: "€10,80" },
      { name: "Panierte Champignons", description: "Mit Alioli Dip", price: "€8,80" },
      { name: "Knoblauchbrot mit Alioli", price: "€5,60" },
      { name: "Hähnchenpflügel mariniert", description: "In BBQ Soße", price: "€6,90" },
      { name: "Gebratene Sardellen", description: "Mit Alioli Dip", price: "€9,80" },
      { name: "Octopus Salat", description: "Kartoffeln und Oliven", price: "€14,10" },
      { name: "Hähnchenspiess", description: "In Erdnussbuttersoße und Mandeln", price: "€7,80" },
      { name: "Gefüllte Aubergine", description: "Mit Schafskäse in Tomatensoße", price: "€9,10" },
      { name: "Flambierter Schafskäse", description: "Mit Chili und Honig", price: "€9,10" },
      { name: "Parmesan Kartoffelecken", description: "Mit geriebenem Käse", price: "€7,40" },
      { name: "Datteln im Speckmantel", description: "Mit Alioli Dip", price: "€7,90" },
    ],
  },
  {
    id: "suppen-salate",
    label: "Suppen & Salate",
    items: [
      { name: "Tomatencremesuppe", price: "€7,20" },
      { name: "Fischsuppe", price: "€7,20" },
      { name: "Hühnersuppe", price: "€6,50" },
      { name: "Salat mit Hähnchen", description: "Bunter Salat mit panierten Hähnchenbruststreifen und Aliolisoße", price: "€16,50" },
      { name: "Salat mit Rinderstreifen", description: "Bunter Salat, Knoblauchbrot und BBQ Soße", price: "€21,50" },
      { name: "Vegetarischer Salat", description: "Bunter Salat mit Gemüse, gegrillten Oliven, Schafskäse und Avocado Dip", price: "€15,90" },
    ],
  },
  {
    id: "steaks",
    label: "Steaks",
    items: [
      { name: "Filetsteak 180g", price: "€26,10" },
      { name: "Filetsteak 250g", price: "€35,50" },
      { name: "Filetsteak 300g", price: "€40,60" },
      { name: "Rumpsteak 180g", price: "€22,40" },
      { name: "Rumpsteak 250g", price: "€29,70" },
      { name: "Rumpsteak 300g", price: "€33,30" },
      { name: "Rib-Eye Steak 300g", price: "€31,10" },
      { name: "Rib-Eye Steak 400g", price: "€38,20" },
      { name: "Rib-Eye Steak 500g", price: "€42,60" },
    ],
  },
  {
    id: "grillplatten",
    label: "Grillplatten",
    items: [
      { name: "El Nigo Grillplatte", description: "Rindersteak, Cordon Bleu, gefüllte Pljeskavica, Speck & Raznjici, Geschmortes Gemüse, Pommes & Djuvecreis", price: "€46,80", note: "2 Personen" },
      { name: "El Nigo Gourmet Grillplatte", description: "Rindersteak, Schnitzel (Kalb) Wiener Art, Hähnchen-Raznjici, Lammkrone, Hähnchensteak, Geschmortes Gemüse, Pommes & Djuvecreis", price: "€52,60", note: "2 Personen" },
      { name: "Surf & Turf", description: "2 Filet Mignon, 3 Scampi serviert mit Tagliatelle in einer Tomatensoße", price: "€37,20" },
    ],
  },
  {
    id: "hauptspeisen",
    label: "Hauptspeisen",
    items: [
      { name: "El Nigo Schnitzel", description: "Mit Bratkartoffeln und Frankfurter Grüner Soße", price: "€16,30" },
      { name: "Wiener Schnitzel", description: "Vom Kalb mit Bratkartoffeln und Preiselbeersoße", price: "€23,50" },
      { name: "Jägerschnitzel", description: "Mit Bratkartoffeln", price: "€17,50" },
      { name: "Cordon Bleu", description: "Vom Schwein gefüllt mit Schinken und Käse, dazu Pommes", price: "€19,70" },
      { name: "Kalbsschnitzel Natur", description: "In einer Jägersoße, dazu Bratkartoffeln", price: "€27,30" },
      { name: "Paniertes Hähnchenbrustfilet", description: "Dazu Pommes", price: "€16,30" },
      { name: "Hähnchenschnitzel", description: "Vom Grill mit Djuvecreis und Pommes", price: "€18,60" },
      { name: "Hähnchenkeule Grill", description: "Ohne Knochen mit Djuvecreis und Pommes", price: "€18,40" },
      { name: "Hähnchenbrustfilet", description: "Überbacken mit Spinat, Mozzarella dazu Rosmarinkartoffel", price: "€21,30" },
      { name: "El Nigo Rumpsteak", description: "Vom Lavasteingrill mit Kräuterbutter und Pommes", price: "€28,80" },
      { name: "El Nigo Grillteller", description: "Rindersteak, Hähnchensteak, Schweinesteak und Speck, dazu geschmortes Gemüse, Pommes & Kräuterbutter", price: "€21,90" },
      { name: "Rumpsteak Gefüllt", description: "Mit Schafskäse und Serrano-Schinken, dazu Pommes und Kräuterbutter", price: "€31,50" },
      { name: "Raznjici", description: "Vom Schwein mit Djuvecreis und Pommes", price: "€17,50" },
      { name: "Pljeskavica Spezial", description: "Gefüllt mit Schafskäse und Serrano-Schinken, dazu Djuvecreis und Pommes", price: "€18,60" },
      { name: "Pljeskavica Grill", description: "Mit Speck und Kräuterbutter, dazu Djuvecreis und Pommes", price: "€17,50" },
      { name: "Rinder Pfefferspieß", description: "Mit grüner Pfeffersoße und Bratkartoffeln", price: "€25,90" },
      { name: "El Nigo Pfanne", description: "Div. Filets in Rotweinsaße, Pflaumen, Champignons mit Bratkartoffeln", price: "€27,30" },
      { name: "Duroc Schweine-Kotelett", description: "Vom Lavasteingrill mit Rosmarinkartoffeln, Sauercremesoße und Kräuterbutter", price: "€22,90" },
      { name: "Wildschein Spareribs", description: "Mariniert und Honig & BBQ überbacken, dazu Pommes und BBQ-Soße", price: "€23,90" },
      { name: "Lammkrone Grill", description: "Rosmarinkartoffeln und geschmortes Gemüse", price: "€34,80" },
      { name: "Ladies-Steak", description: "Filetsteak ~120–140g mit Bernaissoße und Folienkartoffel", price: "€23,60" },
    ],
  },
  {
    id: "fisch",
    label: "Fischgerichte",
    items: [
      { name: "Lachsfilet vom Grill", description: "Dazu Runzelkartoffeln und Gemüse", price: "€23,40" },
      { name: "Tintenfisch vom Grill", description: "Dazu Kartoffel und Spinat", price: "€23,90" },
      { name: "Tintenfisch frittiert", description: "Mit Pommes und Aliolisauce", price: "€21,40" },
      { name: "Riesengarnelen / Scampi", description: "Mit Tagliatelle in Tomatensoße", price: "€25,70" },
      { name: "El Nigo Seafood Platte", description: "Gambas in Knoblauchsoße, Tintenfisch, Octopussalat, Sardellen, Alioli", price: "€38,30", note: "2 Personen" },
    ],
  },
  {
    id: "nudeln-burger",
    label: "Nudeln & Burger",
    items: [
      { name: "Tagliarini Aglio e Olio", description: "Mit Gambas, Cherry-Tomaten, Knoblauch und Chilisoße", price: "€17,80" },
      { name: "Tagliatelle Polo", description: "Mit Hähnchenstreifen in Tomatensoße und Pesto Genovese, mit geriebenem Käse", price: "€17,10" },
      { name: "Tagliatelle Lachs", description: "Mit einer Sahne-Tomatensoße", price: "€17,80" },
      { name: "Hamburger", description: "Mit hausgemachter Soße, Gurke, Tomaten und Salat. Pommes und BBQ Soße", price: "€15,90" },
      { name: "Burger Special", description: "Mit paniertem Schafskäse, Tomaten, Gurke und Salat. Pommes und BBQ Soße", price: "€17,60" },
      { name: "Burger Vegie", description: "Mit hausgemachtem Hummus, Falafel, Tomaten, Gurke, Salat und Pommes", price: "€15,90" },
      { name: "Burger Hähnchen", description: "Käse, Avocado und Pommes", price: "€16,70" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { name: "Palacinke", description: "Wahlweise Nutella, Eis oder Heiße Liebe", price: "€7,20" },
      { name: "Schoko Soufflé", description: "Vanilleeis und Vanillesoße", price: "€8,50" },
      { name: "Apfelstrudel", description: "Vanilleeis und Vanillesoße", price: "€8,50" },
      { name: "Semifredo", description: "Hausgemacht", price: "€7,20" },
      { name: "Kugel Eis", description: "Schokolade, Vanille, Erdbeere", price: "€1,70" },
    ],
  },
  {
    id: "weine-offen",
    label: "Offene Weine",
    items: [
      { name: "Chardonnay Dika", description: "Ein harmonischer Weißwein mit Aromen von Orangen, leichtem Hauch von Banane und Buttercreme. Vielseitig und fein.", price: "€7 / 0,2l", note: "Weißwein · Flasche €26" },
      { name: "g.tocka by Galic", description: "Aromen von grünem Apfel, reifer Quitte und Kamille. Angenehmer Trinkfluss mit straffer Struktur und anhaltendem Nachhall.", price: "€8 / 0,2l", note: "Weißwein · Flasche €30" },
      { name: "Rosé Premium Kutjevo", description: "Eleganter lachsfarbener Rosé mit Aromen von Erdbeere, Granatapfel und feiner Mineralität. Trocken, lebendig und ausgewogen.", price: "€8 / 0,2l", note: "Rosé · Flasche €30" },
      { name: "Cabernet Sauvignon Dika", description: "Kraftvoller, trockener Cabernet mit Noten von schwarzen Johannisbeeren und einem Hauch von Eichenholz.", price: "€7 / 0,2l", note: "Rotwein · Flasche €26" },
      { name: "Terra Rossa Laguna", description: "Würziger Rotwein mit Anklang von Waldfrüchten und reifen Kirschen. Dicht und strukturiert mit süßen Tanninen.", price: "€8 / 0,2l", note: "Rotwein · Flasche €30" },
      { name: "Plavac Skaramuca", description: "Ausdrucksstarker Rotwein mit Aromen von dunklen Beeren, Pflaumen und einem Hauch von Kakao. Vollmundig mit harmonischem Finale.", price: "€7 / 0,2l", note: "Rotwein · Flasche €28" },
    ],
  },
  {
    id: "flaschenweine",
    label: "Flaschenweine",
    items: [
      { name: "Stina Bijeli Cuvée", description: "Dicht strukturiert, frisch-fruchtiger Geschmack, mit Aromen von getrockneten Feigen und Aprikosen.", price: "€27,00", note: "Weißwein 0,75 l" },
      { name: "G*Tocka by Galic", description: "Außergewöhnliche Frische, fruchtige Aromen vom grünen Apfel sowie Noten von Weinbergfirsich und Kamille. Harmonisch abgerundeter Wein.", price: "€26,00", note: "Weißwein 0,75 l" },
      { name: "Grasevina Galic", description: "Feine fruchtige Aromen von Ananas, grünen Äpfeln und Weinbergfirsich. Aromen von Kamille und Heu bilden einen charakteristischen Duft.", price: "€35,00", note: "Weißwein 0,75 l" },
      { name: "Xtriana Malvazija Organic Veralda", description: "Kristalline Farbe. Frisch-fruchtiger Duft nach Traubenpfirsich, Sommerbirne, kräuterduften wie Basilikum, Linde und Holunder.", price: "€45,00", note: "Weißwein 0,75 l" },
      { name: "Malvazija Kozlovic", description: "Blumige Note, die an Orangen erinnern, Grapefruit und Zitrone. Am Gaumen trocken und volle Frische. Funkelnd, milden Noten.", price: "€39,00", note: "Weißwein 0,75 l" },
      { name: "Zlatna Vrbnicka Zlathina", description: "In der Farbe blassgelb und im Gaumen entfaltet sich ein angenehmes Akazienaroma. Passen zu Meeresfrüchten und leichten Vorspeisen.", price: "€28,00", note: "Weißwein 0,75 l" },
      { name: "Posip Stina Majstor", description: "Komplexer, zarter und eleganter Wein, hauch von Pfirsich und Apfel. Gleichgewicht Frische und Säure.", price: "€55,00", note: "Weißwein 0,75 l" },
      { name: "Rosé Kutjevo Premium", description: "Sanftes Lachsros. Beerenfrüchte, Preiselbeeren und frische Kräuter. Kraftvoll und seidig, ausgewogener Wein.", price: "€35,00", note: "Rosé 0,75 l" },
      { name: "Stina Crni Cuvée", description: "Lebendige tiefrote Farbe mit violetten Reflexen. Am Gaumen elegant und eine außerordentliche Komplexität. Frischer runder Geschmack.", price: "€31,00", note: "Rotwein 0,75 l" },
      { name: "Plavac Skaramuca", description: "Intensives dunkles Rot. Am Gaumen schwarze Kirschen unterlegt mit Noten von dunklen Beeren. Sehr vollmundig.", price: "€27,00", note: "Rotwein 0,75 l" },
      { name: "Korlat Cabernet Sauvignon", description: "Tiefe dunkle Farbe vollmundig, harmonisch. Am Gaumen Pflaume, Heidelbeere sowie schwarze Johannisbeeren mit würziger Note.", price: "€59,00", note: "Rotwein 0,75 l" },
      { name: "Dingac Skarmuca", description: "Tiefrote Farbe. Am Gaumen Noten von Kirsche, Kaffee, Vanille, Trüffel und dalmatinischen Graskitzel.", price: "€32,00", note: "Rotwein 0,75 l" },
      { name: "Plavac Stina Majstor", description: "Saftiger und enorm fruchtiger Plavac. Aromen von schwarzen Kirschen, Brombeere, Himbeeren. Mundfüllend, druckvoll und körperlich.", price: "€69,00", note: "Rotwein 0,75 l" },
      { name: "Prosper Peljesac", description: "Leuchtend rubinrote Farbe, zeichnet sich durch sein üppiges Bukket mit fruchtigen Aromen aus.", price: "€32,00", note: "Dessertwein 0,75 l" },
      { name: "Prosek Jakov Sibenik", description: "Duftet nach getrockneten Früchten und Honig, leicht ausgeprägte Säure. Edle Farbe von Bernsteingelb bis dunkelblau.", price: "€37,00", note: "Dessertwein 0,75 l" },
    ],
  },
];

export const beilagen = [
  { name: "Trüffelpüree", price: "€7,00" },
  { name: "Pommes", price: "€5,00" },
  { name: "Rosmarinkartoffeln", price: "€6,00" },
  { name: "Geschmortes Gemüse", price: "€6,00" },
  { name: "Gebratene Champignons", price: "€5,00" },
  { name: "Bratkartoffel", price: "€5,50" },
  { name: "Folienkartoffel", price: "€6,00" },
  { name: "Beilagen Salat", price: "€5,50" },
  { name: "Kräuterbutter", price: "€1,20" },
  { name: "Kartoffelecken", price: "€5,00" },
  { name: "Hollandaise Soße", price: "€4,50" },
  { name: "Jägersoße", price: "€4,50" },
  { name: "Pfeffersoße", price: "€4,50" },
  { name: "Béarnaise Soße", price: "€4,50" },
  { name: "Alioli", price: "€4,50" },
];

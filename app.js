(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* =========================================================
     DANE
     BRAVRY: nazwy, ceny (PLN), opisy, lateks i kroje z bravry-polska.pl (28.10.2026).
     Dostępność rozmiarów = stan dystrybutora (przykładowa).
     Marki inne niż BRAVRY i ich produkty: PRZYKŁADOWE (bez zdjęć, neutralna grafika).
     ========================================================= */
  const MARKI = [
    { s: 'bravry', n: 'BRAVRY', wlasna: true, opis: 'Marka własna sklepu. Rękawice projektuje Andrii Brychko, bramkarz, który od 2012 roku testuje materiały i lateks. Lateks 4 + 4 mm, silikon Fix Fit, pasek z okienkiem na personalizację.' },
    { s: 'adidas', n: 'adidas' },
    { s: 'puma', n: 'Puma' },
    { s: 'reusch', n: 'Reusch' },
    { s: 'uhlsport', n: 'uhlsport' },
    { s: 'sells', n: 'Sells' }
  ];
  const marka = s => MARKI.find(m => m.s === s);
  const KROJE = { roll: 'Roll finger', hyb: 'Hybrid Roll', 'hyb-neg': 'Hybrid Roll / Negative', 'hyb-flat': 'Hybrid Roll / Flat', negative: 'Negative cut', flat: 'Flat', hybrid: 'Hybrid' };
  const KROJ_GRUPA = { roll: 'roll', hyb: 'hybrid', 'hyb-neg': 'hybrid', 'hyb-flat': 'hybrid', negative: 'negative', flat: 'flat', hybrid: 'hybrid' };
  const SUB = { pilki: 'Piłki', skarpety: 'Skarpety', bielizna: 'Bielizna termiczna', ochraniacze: 'Ochraniacze', pielegnacja: 'Pielęgnacja rękawic' };
  const SENIOR = [7, 8, 9, 10, 11];
  const R = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

  const BR = [
    { s: 'king', n: 'KING', c: 290, k: 'hyb-flat', kol: 'Biało-czarne', img: 4, etyk: 'Bestseller', roz: SENIOR, dost: [7, 8, 9, 10, 11],
      krotko: 'Rękawice klasy premium na każdą pogodę. Tył z miękkiej siatki mesh i lateksu z odciskiem 3D, lateksowa strefa do piąstkowania.',
      spec: [['Lateks', 'Contact 4 mm + 4 mm wyściółki amortyzującej'], ['Krój', 'Hybrid Roll / Flat'], ['Tył', 'siatka mesh + lateks z odciskiem 3D'], ['Zapięcie', 'pasek z okienkiem do personalizacji'], ['Warunki', 'na każdą pogodę']],
      opis: 'Model premium z innowacyjnym tyłem: siatka mesh przyjemna dla skóry i lateks z odciskiem 3D. Lateksowa strefa do piąstkowania piłki i mankiet z paskiem, na którym zmieścisz imię albo numer.' },
    { s: 'aqua-neg', n: 'Aqua II Negative', c: 290, k: 'hyb-neg', mokro: true, kol: 'Białe', img: 4, etyk: 'Bestseller', roz: SENIOR, dost: [8, 9, 10],
      krotko: 'Lateks Supreme Aqua Contact, który trzyma mokrą piłkę: deszcz, rosa, śnieg, mróz.',
      spec: [['Lateks', 'Supreme Aqua Contact 4 mm + 4 mm'], ['Krój', 'Hybrid Roll / Negative'], ['System', 'Fix Fit - silikon wewnątrz'], ['Zapięcie', 'rzep, pasek w całości z lateksu'], ['Szwy', 'podwójne na całym obwodzie'], ['Warunki', 'deszcz i mokra murawa']],
      opis: 'Hybrydowy krój Roll/Negative: palce owinięte lateksem, ergonomiczny kształt odwzorowujący dłoń. Supreme Aqua Contact to lateks do gry w deszczu. Miękki lateksowy tył, mocny rzep i podwójne szwy.' },
    { s: 'aqua-flat', n: 'Aqua II Hybrid Flat', c: 290, k: 'hyb-flat', mokro: true, kol: 'Białe', img: 3, roz: SENIOR, dost: [8, 10],
      krotko: 'Wersja Aqua II z krojem Roll/Flat - więcej miejsca w dłoni, ten sam lateks na mokrą piłkę.',
      spec: [['Lateks', 'Supreme Aqua Contact 4 mm + 4 mm'], ['Krój', 'Hybrid Roll / Flat'], ['System', 'Fix Fit - silikon wewnątrz'], ['Zapięcie', 'rzep, pasek z lateksu'], ['Warunki', 'deszcz i mokra murawa']],
      opis: 'Palce owinięte lateksem i płaska dłoń. Lateks Supreme Aqua Contact zapewnia chwyt mokrej piłki niezależnie od pogody.' },
    { s: 'orzel', n: 'Catalyst Orzeł', c: 290, k: 'hyb-neg', kol: 'Biało-czerwone', img: 3, etyk: 'Nowość', roz: SENIOR, dost: [7, 8, 9, 10],
      krotko: 'Kontynuacja Catalyst z motywem orła i barwami narodowymi. Lekkie i bardzo elastyczne.',
      spec: [['Lateks', 'Supreme Contact 4 mm + pianka 4 mm'], ['Krój', 'Hybrid Roll / Negative'], ['System', 'Fix Fit - silikon wewnątrz'], ['Mankiet', 'elastyczny'], ['Warunki', 'na każdą pogodę']],
      opis: 'Profesjonalne rękawice premium dla bramkarzy na każdym poziomie rozgrywek. Biało-czerwony wzór z orłem.' },
    { s: 'explosion', n: 'Catalyst Explosion', c: 290, k: 'hyb-neg', kol: 'Pomarańczowo-grafitowe', img: 4, roz: SENIOR, dost: [7, 8],
      krotko: 'Lekki Catalyst z lateksem Control Grip i krojem Roll/Negative.',
      spec: [['Lateks', 'Control Grip 4 mm + pianka 4 mm'], ['Krój', 'Hybrid Roll / Negative'], ['System', 'Fix Fit - silikon wewnątrz'], ['Mankiet', 'elastyczny'], ['Warunki', 'na każdą pogodę']],
      opis: 'Lekkie i bardzo elastyczne rękawice z pomarańczowym lateksem na dłoni. Silikon Fix Fit trzyma dłoń w miejscu.' },
    { s: 'pr2-white', n: 'Perfect Roll II White', c: 290, k: 'roll', kol: 'Białe', img: 4, etyk: 'Nowość', roz: SENIOR, dost: [8, 9, 10],
      krotko: 'EVO Rollfinger: zaokrąglone palce całkowicie owinięte lateksem Mega Grip.',
      spec: [['Lateks', 'Mega Grip 4 mm + 4 mm'], ['Krój', 'EVO Roll finger'], ['System', 'Fix Fit - silikon wewnątrz'], ['Zapięcie', 'lateksowy pasek z okienkiem do personalizacji'], ['Szwy', 'podwójne na całym obwodzie']],
      opis: 'Rękawice premium z mocnym rzepem i podwójnymi szwami. Lateks Mega Grip na każdą pogodę, maksymalna powierzchnia kontaktu z piłką.' },
    { s: 'pr2-black', n: 'Perfect Roll II Black', c: 290, k: 'roll', kol: 'Czarne', img: 4, etyk: 'Nowość', roz: SENIOR, dost: [8, 9, 10],
      krotko: 'Czarna wersja Perfect Roll II. Lateks Mega Grip 4 + 4 mm, krój EVO Rollfinger.',
      spec: [['Lateks', 'Mega Grip 4 mm + 4 mm'], ['Krój', 'EVO Roll finger'], ['System', 'Fix Fit - silikon wewnątrz'], ['Zapięcie', 'lateksowy pasek z okienkiem do personalizacji'], ['Szwy', 'podwójne na całym obwodzie']],
      opis: 'Zaokrąglone palce owinięte lateksem dla lepszej kontroli piłki. Mocny rzep, podwójne szwy, chwyt także przy mokrej piłce.' },
    { s: 'lions-pride', n: 'Lions Pride', c: 279, k: 'roll', kol: 'Biało-niebieskie', img: 4, roz: SENIOR, dost: [7],
      krotko: 'Jasny, biało-niebieski projekt dla bardzo wymagających bramkarzy.',
      spec: [['Lateks', 'Mega Grip 4 mm + 4 mm'], ['Krój', 'EVO Roll finger'], ['System', 'Fix Fit - silikon wewnątrz'], ['Szwy', 'podwójne na całym obwodzie'], ['Warunki', 'na każdą pogodę']],
      opis: 'Profesjonalne rękawice premium. Zaokrąglone palce owinięte lateksem, mocny rzep i chwyt w deszczu, śniegu i na rosie.' },
    { s: 'strong2', n: 'Strong II', c: 265, k: 'hyb', kol: 'Biało-fioletowe', img: 3, etyk: 'Bestseller', roz: R(4, 11), dost: [4, 5, 6, 7, 11],
      krotko: 'Bardzo trwały lateks Extreme Quartz - na mecze i codzienny trening.',
      spec: [['Lateks', 'Extreme Quartz 4 mm + podszewka 4 mm'], ['Krój', 'Hybrid Roll'], ['System', 'Fix Fit - silikon wewnątrz'], ['Zapięcie', 'pasek z lateksu z okienkiem, gumowa końcówka'], ['Mankiet', 'elastyczny']],
      opis: 'Wygodny krój, lekkość i przyczepność. Pasek w całości z lateksu, z gumową końcówką, którą łatwo odpiąć.' },
    { s: 'confidence-fp', n: 'Confidence Finger Protection', c: 250, k: 'hyb', fs: true, kol: 'Biało-niebieskie', img: 4, etyk: 'Bestseller', roz: R(6, 10), dost: R(6, 10),
      krotko: 'Wyjmowane usztywnienia: usztywnisz wszystkie palce albo tylko jeden.',
      spec: [['Lateks', 'Giga Grip 4 mm + pianka 4 mm'], ['Krój', 'Hybrid Roll'], ['Ochrona palców', 'wyjmowane usztywnienia (fingersave)'], ['System', 'Fix Fit'], ['Zapięcie', 'pasek z okienkiem do personalizacji']],
      opis: 'Pewność chwytu i bezpieczeństwo palców. Ty decydujesz, gdzie potrzebujesz ochrony. Lateks Giga Grip amortyzuje strzały.' },
    { s: 'confidence', n: 'Confidence', c: 240, k: 'roll', kol: 'Czarno-czerwone', img: 3, etyk: 'Nowość', roz: R(6, 10), dost: R(6, 10),
      krotko: 'Ergo Roll Finger i niemiecki lateks G2. Lekkie, z tyłem z siatki Air Mesh.',
      spec: [['Lateks', 'niemiecki G2 4 mm + podszewka 4 mm'], ['Krój', 'Ergo Roll finger'], ['Tył', 'lateks PK 4 mm + Air Mesh 8 mm'], ['System', 'Fix Fit'], ['Zapięcie', 'pasek z lateksu z okienkiem']],
      opis: 'Materiał dopasowuje się do kształtu dłoni, dając kontrolę nad piłką. Czarno-czerwony design.' },
    { s: 'lion', n: 'Lion', c: 220, k: 'hyb', kol: 'Czarne', img: 4, roz: R(4, 10), dost: R(4, 10),
      krotko: 'Całe czarne, lateks Giga Grip. Rozmiary od 4 do 10 - dla juniora i seniora.',
      spec: [['Lateks', 'Giga Grip 4 mm + podszewka 4 mm'], ['Krój', 'Hybrid Roll'], ['System', 'Fix Fit'], ['Zapięcie', 'pasek z lateksu z okienkiem, gumowa końcówka'], ['Mankiet', 'elastyczny']],
      opis: 'Bardzo trwały lateks, na każdą pogodę. Pasek łatwo odpiąć dzięki gumowej końcówce.' },
    { s: 'hurricane', n: 'Hurricane', c: 200, k: 'hyb', kol: 'Czarno-zielone', img: 4, roz: R(3, 6), dost: [3, 4, 5],
      krotko: 'Juniorskie rękawice z lateksem SP i silikonem Fix Fit.',
      spec: [['Lateks', 'SP 4 mm + pianka 4 mm'], ['Krój', 'Hybrid Roll'], ['System', 'Fix Fit'], ['Zapięcie', 'pasek z lateksu z okienkiem'], ['Mankiet', 'elastyczny']],
      opis: 'Wygodny krój, lekkość i dobra przyczepność dla młodszych bramkarzy.' },
    { s: 'sunrise3', n: 'Sunrise III', c: 179, k: 'hyb', kol: 'Czarno-zielone', img: 2, roz: R(4, 7), dost: [4, 5, 6],
      krotko: 'Niemiecki lateks SP2 i konstrukcja hybrydowa bez ryzyka rozdarcia na szwach palców.',
      spec: [['Lateks', 'niemiecki SP2 3,5 mm + podszewka 4 mm'], ['Krój', 'hybrydowy'], ['Tył', 'miękki lateks PK'], ['Zapięcie', 'mocny rzep'], ['Szwy', 'podwójne']],
      opis: 'Pewny chwyt także przy mokrej piłce i w niskich temperaturach. Dobry wybór na pierwsze lata w bramce.' }
  ].map(p => ({ ...p, m: 'bravry', kat: 'rekawice' }));

  const BR_AKC = [
    { s: 'coldproof', n: 'Bluza termoaktywna Coldproof', c: 119, sub: ['bielizna'], kol: 'Czarna', img: 3, roz: ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL'], dost: ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL'],
      krotko: 'Na treningi w ujemnych temperaturach: wewnętrzny polar i gęsta warstwa zewnętrzna.',
      spec: [['Materiał', 'polar wewnątrz + gęsta tkanina na zewnątrz'], ['Ochraniacze', 'bez ochraniaczy'], ['Kolor', 'czarny']],
      opis: 'Utrzymuje ciepło ciała przy mrozie i chroni przed zimnym powietrzem. Sprawdzi się też do biegania i na co dzień.' },
    { s: 'spodnie', n: 'Spodnie termoaktywne Coldproof', c: 119, sub: ['bielizna'], kol: 'Czarne', img: 2, roz: ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL'], dost: ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL'],
      krotko: 'Ciepłe spodnie na zimowe treningi - polar od środka, gęsta tkanina na zewnątrz.',
      spec: [['Materiał', 'polar wewnątrz + gęsta tkanina na zewnątrz'], ['Kolor', 'czarny']],
      opis: 'Para do bluzy Coldproof. Utrzymuje ciepło przy mrozie i nie krępuje ruchów.' },
    { s: 'silversky', n: 'Koszulka Silver Sky z ochraniaczami', c: 175, sub: ['bielizna', 'ochraniacze'], kol: 'Czarno-niebieska', img: 3, roz: ['XXS', 'XS', 'S', 'M', 'L', 'XL'], dost: ['XXS', 'XS', 'XL'],
      krotko: 'Bramkarska koszulka z długim rękawem i ochraniaczami łokci.',
      spec: [['Typ', 'koszulka bramkarska z ochraniaczami'], ['Kolor', 'czarno-niebieski']],
      opis: 'Koszulka bramkarska Silver Sky z ochraniaczami na łokciach.' },
    { s: 'comfort', n: 'Podspodenki Comfort z ochraniaczami', c: 139, sub: ['ochraniacze', 'bielizna'], kol: 'Czarne', img: 4, roz: ['XXS', 'XS', 'S', 'M', 'L', 'XL'], dost: ['XXS', 'XS', 'S', 'XL'],
      krotko: 'Elastyczne podspodenki z bocznymi ochraniaczami z pianki EVA - na upadki na twardej nawierzchni.',
      spec: [['Ochraniacze', 'boczne, lekka i gęsta pianka EVA'], ['Materiał', 'elastyczny, odprowadza wilgoć, odporny na ścieranie'], ['Pas', 'elastyczna guma']],
      opis: 'Miękki i bardzo elastyczny materiał wspiera mięśnie w chłodne dni i odprowadza pot na zewnątrz. Boczne ochraniacze EVA chronią przy upadkach nawet na najtwardszych nawierzchniach.' },
    { s: 'skarpety', n: 'Skarpety antypoślizgowe', c: 39, sub: ['skarpety'], kol: 'Białe', img: 4, roz: ['36-40', '41-45'], dost: ['36-40', '41-45'],
      krotko: 'Antypoślizgowa powłoka na spodzie, oddychający i elastyczny materiał.',
      spec: [['Spód', 'powłoka antypoślizgowa'], ['Rozmiary', '36-40, 41-45']],
      opis: 'Stabilność stopy w bucie na różnych nawierzchniach. Oddychające i elastyczne.' }
  ].map(p => ({ ...p, m: 'bravry', kat: 'akcesoria' }));

  // PRZYKŁADY - marki i produkty pokazowe, bez zdjęć
  const PRZ_OPIS = 'Produkt przykładowy. Pokazuje, jak w sklepie będą prezentowane rękawice i akcesoria innych marek: z marką, krojem, rozmiarami i ceną.';
  const prz = (m, s, n, c, extra) => ({ m, s, n, c, przyklad: true, img: 0, ikona: 'glove', kat: 'rekawice', kol: '-', krotko: PRZ_OPIS, opis: PRZ_OPIS, ...extra });
  const PRZ = [
    prz('adidas', 'adidas-neg', 'Rękawice meczowe Negative', 399, { k: 'negative', roz: SENIOR, dost: SENIOR, spec: [['Krój', 'Negative cut'], ['Poziom', 'mecz']] }),
    prz('adidas', 'adidas-hyb', 'Rękawice treningowe Hybrid', 189, { k: 'hybrid', roz: R(6, 10), dost: R(6, 10), spec: [['Krój', 'Hybrid'], ['Poziom', 'trening']] }),
    prz('puma', 'puma-hyb', 'Rękawice meczowe Hybrid', 349, { k: 'hybrid', roz: SENIOR, dost: [8, 9, 10], spec: [['Krój', 'Hybrid'], ['Poziom', 'mecz']] }),
    prz('puma', 'puma-flat', 'Rękawice junior Flat', 129, { k: 'flat', roz: R(4, 7), dost: R(4, 7), spec: [['Krój', 'Flat'], ['Poziom', 'junior']] }),
    prz('reusch', 'reusch-fs', 'Rękawice Roll finger z fingersave', 299, { k: 'roll', fs: true, roz: R(6, 10), dost: R(6, 10), spec: [['Krój', 'Roll finger'], ['Ochrona palców', 'fingersave']] }),
    prz('reusch', 'reusch-neg', 'Rękawice meczowe Negative', 459, { k: 'negative', roz: SENIOR, dost: [7, 8, 9], spec: [['Krój', 'Negative cut'], ['Poziom', 'mecz']] }),
    prz('uhlsport', 'uhl-flat', 'Rękawice treningowe Flat', 159, { k: 'flat', roz: R(6, 10), dost: R(6, 10), spec: [['Krój', 'Flat'], ['Poziom', 'trening']] }),
    prz('uhlsport', 'uhl-neg-jr', 'Rękawice junior Negative', 149, { k: 'negative', roz: R(4, 7), dost: R(4, 7), spec: [['Krój', 'Negative cut'], ['Poziom', 'junior']] }),
    prz('sells', 'sells-hyb', 'Rękawice meczowe Hybrid', 329, { k: 'hybrid', roz: SENIOR, dost: SENIOR, spec: [['Krój', 'Hybrid'], ['Poziom', 'mecz']] }),
    prz('adidas', 'pilka-mecz', 'Piłka meczowa, rozmiar 5', 249, { kat: 'akcesoria', sub: ['pilki'], ikona: 'ball', roz: ['5'], dost: ['5'], spec: [['Rozmiar', '5']] }),
    prz('puma', 'pilka-tren', 'Piłka treningowa', 119, { kat: 'akcesoria', sub: ['pilki'], ikona: 'ball', roz: ['4', '5'], dost: ['4', '5'], spec: [['Rozmiary', '4, 5']] }),
    prz('reusch', 'plyn', 'Płyn do mycia rękawic 250 ml', 49, { kat: 'akcesoria', sub: ['pielegnacja'], ikona: 'bottle', roz: ['250 ml'], dost: ['250 ml'], spec: [['Pojemność', '250 ml'], ['Zastosowanie', 'mycie lateksu bez niszczenia chwytu']] }),
    prz('uhlsport', 'grip', 'Spray poprawiający chwyt 120 ml', 59, { kat: 'akcesoria', sub: ['pielegnacja'], ikona: 'bottle', roz: ['120 ml'], dost: ['120 ml'], spec: [['Pojemność', '120 ml']] })
  ];
  const WSZ = [...BR, ...BR_AKC, ...PRZ];
  const znajdz = s => WSZ.find(p => p.s === s);
  const kroj = p => p.k ? KROJ_GRUPA[p.k] : null;
  const jestJunior = p => p.kat === 'rekawice' && typeof p.roz[0] === 'number' && p.roz[0] <= 6;
  const jestSenior = p => p.kat === 'rekawice' && typeof p.roz[0] === 'number' && p.roz[p.roz.length - 1] >= 7;

  /* ---------- grafiki zastępcze (produkty przykładowe) ---------- */
  const SVG = {
    glove: '<svg viewBox="0 0 120 150" aria-hidden="true"><g fill="#cfd6df"><rect x="30" y="22" width="15" height="58" rx="7.5"/><rect x="47" y="12" width="15" height="66" rx="7.5"/><rect x="64" y="15" width="15" height="62" rx="7.5"/><rect x="81" y="26" width="14" height="52" rx="7"/><rect x="29" y="56" width="67" height="54" rx="16"/><rect x="11" y="62" width="15" height="44" rx="7.5" transform="rotate(-32 18.5 84)"/></g><rect x="34" y="106" width="58" height="30" rx="4" fill="#b8c1cc"/><rect x="34" y="114" width="58" height="9" fill="#a6b0bc"/></svg>',
    ball: '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="48" fill="#dfe4ea" stroke="#b8c1cc" stroke-width="3"/><path d="M60 40 77 52 71 72H49L43 52Z" fill="#a6b0bc"/><path d="M60 40V14M77 52l24-8M71 72l14 22M49 72 35 94M43 52l-24-8" stroke="#b8c1cc" stroke-width="3" fill="none"/></svg>',
    bottle: '<svg viewBox="0 0 120 150" aria-hidden="true"><rect x="48" y="10" width="24" height="18" rx="3" fill="#a6b0bc"/><rect x="52" y="28" width="16" height="10" fill="#b8c1cc"/><rect x="34" y="38" width="52" height="100" rx="12" fill="#cfd6df"/><rect x="40" y="70" width="40" height="34" rx="4" fill="#e9edf2"/></svg>'
  };

  /* ---------- waluta i język ---------- */
  let jezyk = 'pl';
  const KURS = 4.3;
  const cena = zl => jezyk === 'en' ? '€' + Math.round(zl / KURS) : zl.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' zł';
  const DARMOWA = 300;
  const KOSZT = { paczkomat: 13.99, kurier: 16.99 };
  const odm = (n, a, b, c) => n === 1 ? a : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? b : c;

  /* ---------- pamięć ---------- */
  const KLUCZ = 'bravry_koszyk_v1';
  const czytaj = () => { try { const v = JSON.parse(localStorage.getItem(KLUCZ)); return Array.isArray(v) ? v.filter(x => znajdz(x.s)) : []; } catch (e) { return []; } };
  const zapisz = () => { try { localStorage.setItem(KLUCZ, JSON.stringify(koszyk)); } catch (e) { /* tryb prywatny */ } };
  let koszyk = czytaj();

  const toastEl = $('#toast'); let toastT;
  const toast = t => { toastEl.textContent = t; toastEl.classList.add('widac'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('widac'), 2200); };

  /* ---------- marki: menu, kafle ---------- */
  const kafelMarki = m => `<a class="marka-kafel${m.wlasna ? ' wlasna' : ''}" href="#/marka/${m.s}">${m.wlasna ? '<img src="img/logo.png" alt="BRAVRY" width="640" height="177" loading="lazy">' : `<span class="mk-nazwa">${m.n}</span>`}<small>${m.wlasna ? 'marka własna' : 'marka przykładowa'}</small></a>`;
  $$('[data-marki-rzad],[data-marki-kafle],[data-marki-strona]').forEach(el => el.innerHTML = MARKI.map(kafelMarki).join(''));
  $$('[data-marki]').forEach(el => el.innerHTML = MARKI.filter(m => !m.wlasna).map(m => `<a href="#/marka/${m.s}">${m.n}</a>`).join(''));
  $$('[data-marki-mob]').forEach(el => el.innerHTML = MARKI.map(m => `<a href="#/marka/${m.s}">${m.n}${m.wlasna ? ' - marka własna' : ''}</a>`).join(''));

  /* ---------- menu telefon ---------- */
  const burger = $('#burger'), menuMob = $('#menuMob');
  const zamknijMenu = () => { menuMob.classList.remove('otwarte'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Otwórz menu'); document.body.style.overflow = ''; };
  burger.addEventListener('click', () => {
    const o = menuMob.classList.toggle('otwarte');
    burger.setAttribute('aria-expanded', String(o)); burger.setAttribute('aria-label', o ? 'Zamknij menu' : 'Otwórz menu');
    document.body.style.overflow = o ? 'hidden' : '';
  });
  menuMob.addEventListener('click', e => { if (e.target.closest('a')) zamknijMenu(); });
  addEventListener('scroll', () => document.body.classList.toggle('przewiniety', scrollY > 30), { passive: true });
  // mega menu: zamknij po kliknięciu
  $$('.mega a').forEach(a => a.addEventListener('click', () => { a.blur(); const m = a.closest('.mega'); m.style.display = 'none'; setTimeout(() => m.style.display = '', 250); }));

  /* ---------- wyszukiwarka ---------- */
  const szukaj = (f, inp) => f.addEventListener('submit', e => { e.preventDefault(); const q = inp.value.trim(); location.hash = '#/k/wszystko' + (q ? '?q=' + encodeURIComponent(q) : ''); inp.blur(); zamknijMenu(); });
  szukaj($('#szukaj'), $('#q')); szukaj($('#szukajMob'), $('#qm'));

  /* ---------- karta produktu w siatce ---------- */
  const zakres = p => {
    const r = p.roz; if (typeof r[0] !== 'number') return r.length > 2 ? r[0] + '-' + r[r.length - 1] : r.join(', ');
    return 'rozm. ' + r[0] + '-' + r[r.length - 1];
  };
  const opisKarty = p => p.kat === 'rekawice' ? KROJE[p.k] + (p.fs ? ' + fingersave' : '') : p.sub.map(s => SUB[s]).join(' · ');
  const fotoKarty = p => p.przyklad
    ? `<div class="k-foto zastep"><span class="k-etyk przyklad">Przykład</span>${SVG[p.ikona]}<span class="zastep-marka">${marka(p.m).n}</span></div>`
    : `<div class="k-foto">${p.etyk ? `<span class="k-etyk${p.etyk === 'Nowość' ? ' nowosc' : ''}">${p.etyk}</span>` : ''}<img class="k-1" src="img/${p.s}-0s.webp" alt="${marka(p.m).n} ${p.n}" loading="lazy" width="400" height="500">${p.img > 1 ? `<img class="k-2" src="img/${p.s}-1.webp" alt="" loading="lazy">` : ''}</div>`;
  function karta(p) {
    const el = document.createElement('article');
    el.className = 'karta';
    el.innerHTML = `<a class="k-link" href="#/p/${p.s}">${fotoKarty(p)}
      <p class="k-marka${p.m === 'bravry' ? ' bravry' : ''}">${marka(p.m).n}</p>
      <h3 class="k-nazwa">${p.n}</h3>
      <p class="k-kroj">${opisKarty(p)}</p>
      <div class="k-dol"><span class="k-cena">${cena(p.c)}</span><span class="k-roz">${zakres(p)}</span></div></a>`;
    return el;
  }
  const miniFoto = p => p.przyklad ? `<span class="ks-zastep">${SVG[p.ikona]}</span>` : `<img src="img/${p.s}-0s.webp" alt="" loading="lazy">`;

  /* =========================================================
     LISTING + FILTRY
     ========================================================= */
  const GRUPY = {
    marka: { opcje: () => MARKI.map(m => [m.s, m.n]), test: (p, v) => p.m === v },
    sub: { opcje: () => Object.entries(SUB), test: (p, v) => (p.sub || []).includes(v) },
    kroj: { opcje: () => [['negative', 'Negative cut'], ['roll', 'Roll finger'], ['hybrid', 'Hybrid'], ['flat', 'Flat']], test: (p, v) => kroj(p) === v },
    fs: { opcje: () => [['1', 'Z fingersave']], test: p => !!p.fs },
    dla: { opcje: () => [['senior', 'Senior (7-11)'], ['junior', 'Junior (3-6)']], test: (p, v) => v === 'junior' ? jestJunior(p) : jestSenior(p) },
    roz: { opcje: () => R(3, 11).map(n => [String(n), String(n)]), test: (p, v) => p.roz.includes(+v) },
    cena: { opcje: () => [['a', 'do 200 zł'], ['b', '200-300 zł'], ['c', 'od 300 zł']], test: (p, v) => v === 'a' ? p.c < 200 : v === 'b' ? (p.c >= 200 && p.c < 300) : p.c >= 300 }
  };
  const filtr = Object.fromEntries(Object.keys(GRUPY).map(k => [k, new Set()]));
  const stanL = { kat: 'rekawice', q: '', sort: 'pol', markaStr: null };
  const baza = () => WSZ.filter(p => (stanL.kat === 'wszystko' || p.kat === stanL.kat) && (!stanL.markaStr || p.m === stanL.markaStr) && pasujeQ(p));
  const pasujeQ = p => {
    if (!stanL.q) return true;
    const t = (marka(p.m).n + ' ' + p.n + ' ' + (p.k ? KROJE[p.k] + ' ' + kroj(p) : '') + ' ' + (p.sub || []).map(s => SUB[s]).join(' ') + (p.fs ? ' fingersave' : '')).toLowerCase();
    return stanL.q.toLowerCase().split(/\s+/).every(w => t.includes(w));
  };
  const pasuje = (p, pomin) => Object.entries(filtr).every(([g, set]) => g === pomin || !set.size || [...set].some(v => GRUPY[g].test(p, v)));
  const siatka = $('#siatka');

  function rysujFiltry() {
    const b = baza();
    Object.keys(GRUPY).forEach(g => {
      const box = $(`[data-f="${g}"]`); if (!box) return;
      const fs = box.closest('fieldset');
      const opcje = GRUPY[g].opcje().map(([v, l]) => [v, l, b.filter(p => pasuje(p, g) && GRUPY[g].test(p, v)).length, b.some(p => GRUPY[g].test(p, v))]);
      const widoczne = opcje.filter(o => o[3]);
      fs.hidden = !widoczne.length || (g === 'marka' && !!stanL.markaStr);
      if (g === 'roz') {
        box.innerHTML = widoczne.map(([v, l, n]) => `<button type="button" data-v="${v}" aria-pressed="${filtr[g].has(v)}"${n ? '' : ' disabled'}>${l}</button>`).join('');
      } else {
        box.innerHTML = widoczne.map(([v, l, n]) => `<label class="${n || filtr[g].has(v) ? '' : 'zero'}"><input type="checkbox" value="${v}" ${filtr[g].has(v) ? 'checked' : ''}><span>${l}</span><i>${n}</i></label>`).join('');
      }
    });
    // drzewo kategorii
    const lic = k => WSZ.filter(p => p.kat === k && (!stanL.markaStr || p.m === stanL.markaStr)).length;
    const on = (k, g, v) => stanL.kat === k && (!g || (filtr[g].size === 1 && filtr[g].has(v))) ? ' on' : '';
    $('#fgrKat').innerHTML = `<span class="kat-h">Kategorie</span>
      <a href="#/k/rekawice" class="${on('rekawice')}">Rękawice <span>${lic('rekawice')}</span></a>
      ${[['negative', 'Negative cut'], ['roll', 'Roll finger'], ['hybrid', 'Hybrid'], ['flat', 'Flat']].map(([v, l]) => `<a class="pod${on('rekawice', 'kroj', v)}" href="#/k/rekawice?kroj=${v}">${l}</a>`).join('')}
      <a class="pod${on('rekawice', 'fs', '1')}" href="#/k/rekawice?fs=1">Fingersave</a>
      <a class="pod${on('rekawice', 'dla', 'junior')}" href="#/k/rekawice?dla=junior">Junior</a>
      <a href="#/k/akcesoria" class="${on('akcesoria')}">Akcesoria <span>${lic('akcesoria')}</span></a>
      ${Object.entries(SUB).map(([v, l]) => `<a class="pod${on('akcesoria', 'sub', v)}" href="#/k/akcesoria?sub=${v}">${l}</a>`).join('')}`;
    // szybki wybór marki
    const mc = $('#markiChipy');
    mc.hidden = !!stanL.markaStr;
    mc.innerHTML = MARKI.filter(m => b.some(p => p.m === m.s)).map(m => `<button type="button" data-m="${m.s}" class="${m.wlasna ? 'wlasna' : ''}" aria-pressed="${filtr.marka.has(m.s)}">${m.n}</button>`).join('');
  }
  function rysujSiatke() {
    let lista = baza().filter(p => pasuje(p));
    if (stanL.sort === 'tanie') lista.sort((a, b) => a.c - b.c);
    if (stanL.sort === 'drogie') lista.sort((a, b) => b.c - a.c);
    if (stanL.sort === 'nazwa') lista.sort((a, b) => (marka(a.m).n + a.n).localeCompare(marka(b.m).n + b.n, 'pl'));
    if (stanL.sort === 'pol') lista.sort((a, b) => (a.przyklad ? 1 : 0) - (b.przyklad ? 1 : 0));
    siatka.innerHTML = ''; lista.forEach(p => siatka.appendChild(karta(p)));
    const n = lista.length;
    $('#ile').textContent = n + ' ' + odm(n, 'produkt', 'produkty', 'produktów');
    $('#pusto').hidden = n > 0;
    $('#filtryPokaz').textContent = 'Pokaż ' + n;
    $('#listaPrzyp').hidden = !lista.some(p => p.przyklad);
    const akt = $('#aktywne'); akt.innerHTML = ''; let ile = 0;
    Object.entries(filtr).forEach(([g, set]) => set.forEach(v => {
      ile++;
      const opc = GRUPY[g].opcje().find(o => o[0] === v);
      const b = document.createElement('button'); b.type = 'button';
      b.textContent = g === 'roz' ? 'Rozmiar ' + v : opc ? opc[1] : v;
      b.setAttribute('aria-label', 'Usuń filtr ' + b.textContent);
      b.addEventListener('click', () => { set.delete(v); odswiezListe(); });
      akt.appendChild(b);
    }));
    if (stanL.q) {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = '„' + stanL.q + '”';
      b.addEventListener('click', () => { location.hash = '#/k/' + stanL.kat; }); akt.prepend(b); ile++;
    }
    if (ile > 1) { const c = document.createElement('button'); c.type = 'button'; c.className = 'wyczysc-wsz'; c.textContent = 'Wyczyść wszystko'; c.addEventListener('click', wyczysc); akt.appendChild(c); }
    const fi = $('#filtryIle'); fi.hidden = !ile; fi.textContent = ile;
  }
  const odswiezListe = () => { rysujFiltry(); rysujSiatke(); };
  $('#filtryPanel').addEventListener('change', e => {
    const box = e.target.closest('[data-f]'); if (!box) return;
    const set = filtr[box.dataset.f]; e.target.checked ? set.add(e.target.value) : set.delete(e.target.value);
    odswiezListe();
  });
  $('#filtryPanel').addEventListener('click', e => {
    const b = e.target.closest('.chipy button'); if (!b) return;
    const set = filtr[b.closest('[data-f]').dataset.f];
    set.has(b.dataset.v) ? set.delete(b.dataset.v) : set.add(b.dataset.v);
    odswiezListe();
  });
  $('#markiChipy').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    filtr.marka.has(b.dataset.m) ? filtr.marka.delete(b.dataset.m) : filtr.marka.add(b.dataset.m);
    odswiezListe();
  });
  const wyczysc = () => { Object.values(filtr).forEach(s => s.clear()); if (stanL.q) { location.hash = '#/k/' + stanL.kat; return; } odswiezListe(); };
  $('#filtryWyczysc').addEventListener('click', wyczysc);
  $('#pustoWyczysc').addEventListener('click', wyczysc);
  $('#sort').addEventListener('change', e => { stanL.sort = e.target.value; rysujSiatke(); });
  const fPanel = $('#filtryPanel'), fBtn = $('#filtryOtworz'), zaslona = $('#zaslona');
  const otworzFiltry = o => { fPanel.classList.toggle('otwarte', o); fBtn.setAttribute('aria-expanded', String(o)); pokazZaslone(o, 'filtry'); };
  fBtn.addEventListener('click', () => otworzFiltry(true));
  $('#filtryZamknij').addEventListener('click', () => otworzFiltry(false));
  $('#filtryPokaz').addEventListener('click', () => { otworzFiltry(false); $('.lista-glowna').scrollIntoView({ behavior: 'smooth' }); });
  let zaslonaDla = null;
  function pokazZaslone(o, kto) {
    if (o) { zaslonaDla = kto; zaslona.hidden = false; requestAnimationFrame(() => zaslona.classList.add('widac')); document.body.style.overflow = 'hidden'; }
    else { zaslona.classList.remove('widac'); document.body.style.overflow = ''; setTimeout(() => { if (!zaslona.classList.contains('widac')) zaslona.hidden = true; }, 260); }
  }
  zaslona.addEventListener('click', () => { if (zaslonaDla === 'filtry') otworzFiltry(false); else zamknijKoszyk(); });

  function pokazListe(kat, params, markaStr) {
    stanL.kat = kat; stanL.markaStr = markaStr || null; stanL.q = params.get('q') || '';
    Object.values(filtr).forEach(s => s.clear());
    ['marka', 'sub', 'kroj', 'fs', 'dla', 'roz', 'cena'].forEach(g => { const v = params.get(g); if (v) v.split(',').forEach(x => filtr[g].add(x)); });
    const tyt = markaStr ? (marka(markaStr).wlasna ? 'Kolekcja BRAVRY' : marka(markaStr).n + ' - produkty') : stanL.q ? 'Wyniki wyszukiwania' : kat === 'akcesoria' ? (filtr.sub.size === 1 ? SUB[[...filtr.sub][0]] : 'Akcesoria dla bramkarzy') : kat === 'wszystko' ? 'Wszystkie produkty' : 'Rękawice bramkarskie';
    $('#listaH').textContent = tyt;
    document.title = tyt + ' - Rękawice Bramkarskie';
    $('#listaOkr').innerHTML = `<a href="#/">Sklep</a><span>/</span>${markaStr ? `<a href="#/marki">Marki</a><span>/</span><b>${marka(markaStr).n}</b>` : `<b>${kat === 'akcesoria' ? 'Akcesoria' : kat === 'wszystko' ? 'Szukaj' : 'Rękawice'}</b>`}`;
    // baner marki
    const bn = $('#listaBaner');
    if (markaStr) {
      const m = marka(markaStr);
      bn.hidden = false;
      bn.innerHTML = m.wlasna
        ? `<div class="wrap lb-in"><div><img class="lb-logo" src="img/logo.png" alt="BRAVRY" width="640" height="177"><p>${m.opis}</p><a class="link-strz" href="#/craft">#bravrycraft - BRAVRY z Twoim projektem</a></div><div class="lb-foto"><img src="img/hero-king.webp" alt="Rękawica BRAVRY KING z piłką na murawie"></div></div>`
        : `<div class="wrap lb-in lb-in-1"><div><p class="lb-nazwa">${m.n}</p><p>Strona marki z pełnym asortymentem: rękawice, akcesoria, filtry po kroju i rozmiarze.</p><span class="lb-przyk">Marka przykładowa - asortyment w wizualizacji jest pokazowy</span></div></div>`;
    } else bn.hidden = true;
    $('#sort').value = stanL.sort;
    odswiezListe();
  }

  /* ---------- miarka rozmiaru ---------- */
  const TAB = [[3, 15], [4, 15.5], [5, 16], [6, 16.5], [7, 17], [8, 18], [9, 19], [10, 20]];
  const rozmiarDla = cm => { if (!(cm >= 13 && cm <= 24)) return null; if (cm > 20.4) return 11; let best = TAB[0]; TAB.forEach(t => { if (Math.abs(t[1] - cm) < Math.abs(best[1] - cm)) best = t; }); return best[0]; };
  $$('[data-miarka]').forEach(f => {
    f.addEventListener('submit', e => e.preventDefault());
    $('input', f).addEventListener('input', e => {
      const r = rozmiarDla(parseFloat(String(e.target.value).replace(',', '.')));
      $('output', f).textContent = r ? 'Rozmiar: ' + r : 'Rozmiar: -';
      $$('#tabela tbody tr').forEach(tr => tr.classList.toggle('on', +tr.dataset.r === r));
    });
  });

  /* =========================================================
     KARTA PRODUKTU
     ========================================================= */
  let biezacy = null, wybranyRoz = null, ilosc = 1;
  const galTasma = $('#galTasma'), galMini = $('#galMini'), galKropki = $('#galKropki');
  function pokazProdukt(s) {
    const p = znajdz(s); if (!p) { location.hash = '#/'; return; }
    const m = marka(p.m);
    biezacy = p; wybranyRoz = null; ilosc = 1; $('#ilWart').value = 1;
    document.title = `${m.n} ${p.n} - Rękawice Bramkarskie`;
    const katL = p.kat === 'rekawice' ? ['Rękawice', '#/k/rekawice'] : ['Akcesoria', '#/k/akcesoria'];
    $('#prodOkr').innerHTML = `<a href="#/">Sklep</a><span>/</span><a href="${katL[1]}">${katL[0]}</a><span>/</span><a href="#/marka/${m.s}">${m.n}</a><span>/</span><b>${p.n}</b>`;
    const pm = $('#pMarka'); pm.textContent = m.n + (m.wlasna ? ' · marka własna' : ''); pm.href = '#/marka/' + m.s; pm.classList.toggle('bravry', !!m.wlasna);
    $('#pNazwa').textContent = p.n;
    $('#pEtyk').textContent = opisKarty(p);
    $('#pCena').textContent = cena(p.c);
    $('#pPrzyk').hidden = !p.przyklad;
    $('#pKrotko').textContent = p.przyklad ? '' : p.krotko; $('#pKrotko').hidden = !!p.przyklad;
    $('#pSpec').innerHTML = p.spec.map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join('') + (p.przyklad ? '' : `<li><b>Kolor</b><span>${p.kol}</span></li>`);
    $('#pOpis').innerHTML = `<p>${p.opis}</p>`;
    $('#kpNazwa').textContent = p.n; $('#kpCena').textContent = cena(p.c);
    const rek = p.kat === 'rekawice';
    $('#pokazTabele').hidden = !rek; $('#detRoz').hidden = !rek; $('#detPiel').hidden = !rek;
    $('#pCraft').hidden = !(rek && p.m === 'bravry');
    $('#rozEtyk').textContent = p.roz.length === 1 && typeof p.roz[0] === 'string' && p.roz[0].includes('ml') ? 'Pojemność' : 'Rozmiar';
    $('#pTabela').innerHTML = TAB.filter(t => p.roz.includes(t[0])).map(t => `<span><b>${t[0]}</b>${String(t[1]).replace('.', ',')} cm</span>`).join('') + (p.roz.includes(11) ? '<span><b>11</b>pow. 20 cm</span>' : '');
    galTasma.innerHTML = ''; galMini.innerHTML = ''; galKropki.innerHTML = '';
    if (p.przyklad) {
      const f = document.createElement('figure'); f.className = 'zastep';
      f.innerHTML = SVG[p.ikona] + `<span>${m.n} · przykład</span>`; galTasma.appendChild(f);
    } else for (let i = 0; i < p.img; i++) {
      const src = `img/${p.s}-${i}.webp`;
      const f = document.createElement('figure');
      f.innerHTML = `<img src="${src}" alt="${m.n} ${p.n} - zdjęcie ${i + 1}" ${i ? 'loading="lazy"' : ''}>`;
      galTasma.appendChild(f);
      const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Zdjęcie ' + (i + 1));
      b.innerHTML = `<img src="${i ? src : `img/${p.s}-0s.webp`}" alt="" loading="lazy">`;
      b.addEventListener('click', () => galTasma.scrollTo({ left: galTasma.clientWidth * i, behavior: 'smooth' }));
      galMini.appendChild(b); galKropki.appendChild(document.createElement('i'));
    }
    galTasma.scrollLeft = 0; zaznaczFoto(0);
    const box = $('#pRozmiary'); box.innerHTML = ''; box.classList.remove('zle'); $('#rozBlad').hidden = true;
    p.roz.forEach(r => {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = r;
      b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', 'false');
      if (!p.dost.includes(r)) { b.disabled = true; b.title = 'Chwilowo niedostępny'; b.setAttribute('aria-label', r + ' - niedostępny'); }
      b.addEventListener('click', () => {
        wybranyRoz = r; $$('button', box).forEach(x => x.setAttribute('aria-checked', String(x === b)));
        box.classList.remove('zle'); $('#rozBlad').hidden = true;
        $('#kpCena').textContent = cena(p.c) + ' · ' + r;
      });
      box.appendChild(b);
    });
    if (p.roz.length === 1) box.firstChild.click();
    const pod = WSZ.filter(x => x !== p && x.kat === p.kat).sort((a, b) => (a.przyklad ? 1 : 0) - (b.przyklad ? 1 : 0) || (kroj(a) === kroj(p) ? -1 : 1) - (kroj(b) === kroj(p) ? -1 : 1) || Math.abs(a.c - p.c) - Math.abs(b.c - p.c)).slice(0, 4);
    $('#podobne').innerHTML = ''; $('#podobne').append(...pod.map(karta));
    $$('.akordeon details').forEach((d, i) => d.open = i === 0);
  }
  function zaznaczFoto(i) {
    $$('button', galMini).forEach((b, j) => b.classList.toggle('on', j === i));
    $$('i', galKropki).forEach((b, j) => b.classList.toggle('on', j === i));
  }
  galTasma.addEventListener('scroll', () => zaznaczFoto(Math.round(galTasma.scrollLeft / Math.max(1, galTasma.clientWidth))), { passive: true });
  $('#ilMinus').addEventListener('click', () => { ilosc = Math.max(1, ilosc - 1); $('#ilWart').value = ilosc; });
  $('#ilPlus').addEventListener('click', () => { ilosc = Math.min(10, ilosc + 1); $('#ilWart').value = ilosc; });
  const dodajBiezacy = () => {
    if (wybranyRoz == null) { $('#pRozmiary').classList.add('zle'); $('#rozBlad').hidden = false; $('.prod-wybor').scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    dodaj(biezacy.s, wybranyRoz, ilosc); otworzKoszyk();
  };
  $('#dodaj').addEventListener('click', dodajBiezacy);
  $('#kpDodaj').addEventListener('click', dodajBiezacy);
  const kupPasek = $('#kupPasek');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      const w = !e.isIntersecting && e.boundingClientRect.top < 0 && !$('#v-produkt').hidden;
      kupPasek.classList.toggle('widac', w); kupPasek.setAttribute('aria-hidden', String(!w)); $('#kpDodaj').tabIndex = w ? 0 : -1;
    }).observe($('#prodKup'));
  }
  const okno = $('#oknoTab');
  $('#pokazTabele').addEventListener('click', () => { okno.hidden = false; $('[data-zamknij]', okno).focus(); });
  okno.addEventListener('click', e => { if (e.target === okno || e.target.closest('[data-zamknij]')) okno.hidden = true; });

  /* =========================================================
     KOSZYK
     ========================================================= */
  function dodaj(s, r, n) {
    const poz = koszyk.find(x => x.s === s && String(x.r) === String(r));
    if (poz) poz.n = Math.min(10, poz.n + n); else koszyk.push({ s, r, n });
    zapisz(); rysujKoszyk(true);
  }
  const suma = () => koszyk.reduce((a, x) => a + znajdz(x.s).c * x.n, 0);
  const sztuk = () => koszyk.reduce((a, x) => a + x.n, 0);
  const ksEl = $('#koszyk'), ksBtn = $('#koszykBtn');
  function rysujKoszyk(puls) {
    const n = sztuk(), sm = suma();
    const l = $('#licznik'); l.hidden = !n; l.textContent = n;
    if (puls) { l.classList.remove('puls'); void l.offsetWidth; l.classList.add('puls'); }
    ksBtn.setAttribute('aria-label', `Koszyk, ${n} ${odm(n, 'produkt', 'produkty', 'produktów')}`);
    $('#ksIle').textContent = n ? `(${n})` : '';
    const lista = $('#ksLista'); lista.innerHTML = '';
    koszyk.forEach((x, i) => {
      const p = znajdz(x.s), m = marka(p.m);
      const li = document.createElement('li'); li.className = 'ks-poz';
      li.innerHTML = `<a href="#/p/${p.s}">${miniFoto(p)}</a>
        <div><h3><a href="#/p/${p.s}">${m.wlasna ? '' : m.n + ' '}${p.n}</a></h3><p>${p.kat === 'rekawice' ? 'Rozmiar ' + x.r + ' · ' + KROJE[p.k] : x.r}${p.przyklad ? ' · przykład' : ''}</p>
        <div class="ks-wiersz"><div class="ilosc" aria-label="Ilość"><button type="button" data-a="-" aria-label="Zmniejsz ilość">−</button><input type="text" value="${x.n}" readonly aria-label="Ilość"><button type="button" data-a="+" aria-label="Zwiększ ilość">+</button></div>
        <span class="ks-cena">${cena(p.c * x.n)}</span></div>
        <button type="button" class="ks-usun" data-a="x">Usuń</button></div>`;
      li.addEventListener('click', e => {
        const a = e.target.closest('[data-a]'); if (!a) return;
        if (a.dataset.a === '+') x.n = Math.min(10, x.n + 1);
        if (a.dataset.a === '-') { x.n -= 1; if (x.n < 1) koszyk.splice(i, 1); }
        if (a.dataset.a === 'x') koszyk.splice(i, 1);
        zapisz(); rysujKoszyk();
        if (!$('#v-zamowienie').hidden && $('#dziekujemy').hidden) { rysujPods(); $('#zam').hidden = !koszyk.length; $('#zamPusty').hidden = !!koszyk.length; }
        const fokus = lista.children[i] && lista.children[i].querySelector(`[data-a="${a.dataset.a}"]`); if (fokus) fokus.focus();
      });
      lista.appendChild(li);
    });
    $('#ksDobierz').hidden = !n || koszyk.some(x => x.s === 'skarpety');
    $('#ksDobCena').textContent = cena(39);
    $('#ksPusty').hidden = !!n; $('#ksDol').hidden = !n; $('#ksDostawa').hidden = !n;
    const brak = DARMOWA - sm;
    $('#ksDostTxt').innerHTML = brak > 0 ? `Do darmowej dostawy brakuje <b>${cena(brak)}</b>` : '<b>Masz darmową dostawę.</b>';
    $('#ksPasek').style.width = Math.min(100, sm / DARMOWA * 100) + '%';
    $('#ksSuma').textContent = cena(sm);
  }
  let fokusPrzed = null;
  function otworzKoszyk() { fokusPrzed = document.activeElement; ksEl.classList.add('otwarty'); ksEl.setAttribute('aria-hidden', 'false'); pokazZaslone(true, 'koszyk'); setTimeout(() => $('#ksZamknij').focus(), 50); }
  function zamknijKoszyk(bezFokusu) { ksEl.classList.remove('otwarty'); ksEl.setAttribute('aria-hidden', 'true'); pokazZaslone(false); if (!bezFokusu && fokusPrzed && fokusPrzed.focus) fokusPrzed.focus(); }
  ksBtn.addEventListener('click', otworzKoszyk);
  $('#ksZamknij').addEventListener('click', () => zamknijKoszyk());
  $('#ksKontynuuj').addEventListener('click', () => zamknijKoszyk());
  $('#okrKoszyk').addEventListener('click', otworzKoszyk);
  $$('#ksDobierz [data-r]').forEach(b => b.addEventListener('click', () => { dodaj('skarpety', b.dataset.r, 1); toast('Dodano skarpety ' + b.dataset.r); }));
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!okno.hidden) okno.hidden = true;
    else if (ksEl.classList.contains('otwarty')) zamknijKoszyk();
    else if (fPanel.classList.contains('otwarte')) otworzFiltry(false);
    else zamknijMenu();
  });
  addEventListener('storage', e => { if (e.key === KLUCZ) { koszyk = czytaj(); rysujKoszyk(); } });

  /* =========================================================
     ZAMÓWIENIE
     ========================================================= */
  const form = $('#zamForm');
  const dostawa = () => form.dostawa.value;
  function rysujPods() {
    const sm = suma(), d = sm >= DARMOWA ? 0 : KOSZT[dostawa()];
    $('#zpLista').innerHTML = koszyk.map(x => { const p = znajdz(x.s); return `<li>${miniFoto(p)}<span>${marka(p.m).wlasna ? '' : marka(p.m).n + ' '}${p.n}<small>${x.r} · ${x.n} szt.</small></span><b>${cena(p.c * x.n)}</b></li>`; }).join('');
    $('#zpProd').textContent = cena(sm);
    $('#zpDost').textContent = d ? cena(d) : 'gratis';
    $('#zpRazem').textContent = cena(sm + d);
    $$('[data-koszt]').forEach(el => { el.textContent = sm >= DARMOWA ? 'gratis' : cena(KOSZT[el.dataset.koszt]); });
    $('#zamBtn').innerHTML = 'Zamawiam i płacę <span>' + cena(sm + d) + '</span>';
  }
  $$('input[name="dostawa"]').forEach(r => r.addEventListener('change', () => {
    const k = dostawa() === 'kurier';
    $('#poleAdres').hidden = !k; $('#poleParcz').hidden = k;
    form.paczkomat.required = !k; ['ulica', 'kod', 'miasto'].forEach(n => form[n].required = k);
    rysujPods();
  }));
  $$('input[name="platnosc"]').forEach(r => r.addEventListener('change', () => { $('#blik').hidden = form.platnosc.value !== 'blik'; }));
  $('#mapaPacz').addEventListener('click', () => { form.paczkomat.value = 'WAW22M'; form.paczkomat.classList.remove('zle'); toast('W gotowym sklepie otworzy się mapa paczkomatów InPost.'); });
  form.addEventListener('input', e => { if (e.target.classList) e.target.classList.remove('zle'); });
  const waliduj = f => {
    let ok = true, pierwszy = null;
    $$('input[required]', f).forEach(i => {
      const zle = i.type === 'checkbox' ? !i.checked : (!i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value)));
      i.classList.toggle('zle', zle); if (zle) { ok = false; pierwszy = pierwszy || i; }
    });
    if (pierwszy) pierwszy.focus();
    return ok;
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!koszyk.length) { toast('Koszyk jest pusty.'); return; }
    const ok = waliduj(form); $('#zamBlad').hidden = ok; if (!ok) return;
    const nr = 'RB-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));
    $('#dzNr').textContent = `Numer zamówienia: ${nr}. Kwota: ${$('#zpRazem').textContent}.`;
    koszyk = []; zapisz(); rysujKoszyk();
    $('#zam').hidden = true; $('#dziekujemy').hidden = false; $('.zam-h').hidden = true;
    scrollTo(0, 0); $('#dziekujemy').focus();
  });

  /* =========================================================
     #BRAVRYCRAFT - formularz
     ========================================================= */
  const cf = $('#craftForm');
  $('#cfModel').innerHTML = BR.map(p => `<option value="${p.s}">${p.n} - ${KROJE[p.k]}</option>`).join('') + '<option value="doradzcie">Nie wiem - doradźcie</option>';
  $('#cfPlik').addEventListener('change', e => {
    const f = e.target.files && e.target.files[0]; const pg = $('#cfPodglad');
    $('#cfPlikTxt').textContent = f ? f.name : 'Wybierz plik';
    pg.hidden = true;
    if (f && f.type.startsWith('image/')) { const rd = new FileReader(); rd.onload = () => { pg.src = rd.result; pg.hidden = false; }; rd.readAsDataURL(f); }
  });
  cf.addEventListener('input', e => { if (e.target.classList) e.target.classList.remove('zle'); });
  cf.addEventListener('submit', e => {
    e.preventDefault();
    const ok = waliduj(cf); $('#cfBlad').hidden = ok; if (!ok) return;
    const p = znajdz(cf.model.value);
    const pary = Math.max(1, parseInt(cf.pary.value, 10) || 1);
    $('#cfPods').textContent = `Model: ${p ? p.n : 'do doradzenia'} · ${pary} ${odm(pary, 'para', 'pary', 'par')}${cf.napis.value ? ' · napis: ' + cf.napis.value.toUpperCase() : ''}${cf.numer.value ? ' · numer ' + cf.numer.value : ''}${cf.logo.files && cf.logo.files[0] ? ' · logo: ' + cf.logo.files[0].name : ''}.`;
    cf.hidden = true; $('#cfOk').hidden = false; $('#cfOk').focus();
  });

  /* =========================================================
     JĘZYK (pokaz na stronie głównej)
     ========================================================= */
  function ustawJezyk(l) {
    jezyk = l; document.documentElement.lang = l;
    $$('[data-lang]').forEach(b => { const on = b.dataset.lang === l; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
    $$('[data-pl]').forEach(el => { const t = el.dataset[l]; if (t != null) el.textContent = t; });
    const q = $('#q'); q.placeholder = q.dataset[l + 'Ph'] || q.placeholder;
    rysujBest(); rysujKoszyk();
  }
  $$('[data-lang]').forEach(b => b.addEventListener('click', () => ustawJezyk(b.dataset.lang)));
  const rysujBest = () => { const s = $('#siatkaBest'); s.innerHTML = ''; ['king', 'aqua-neg', 'confidence-fp', 'pr2-white'].forEach(x => s.appendChild(karta(znajdz(x)))); };

  /* =========================================================
     ROUTING
     ========================================================= */
  const widoki = { home: '#v-home', lista: '#v-lista', marki: '#v-marki', produkt: '#v-produkt', craft: '#v-craft', rozmiar: '#v-rozmiar', zam: '#v-zamowienie' };
  const pokazWidok = k => Object.entries(widoki).forEach(([n, sel]) => $(sel).hidden = n !== k);
  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const [sciezka, qs] = h.split('?');
    const cz = sciezka.split('/');
    const params = new URLSearchParams(qs || '');
    kupPasek.classList.remove('widac');
    if (ksEl.classList.contains('otwarty')) zamknijKoszyk(true);
    if (fPanel.classList.contains('otwarte')) otworzFiltry(false);
    if (!okno.hidden) okno.hidden = true;
    zamknijMenu();
    $$('.kn-a').forEach(a => { const href = a.getAttribute('href').slice(2); a.classList.toggle('on', !!href && (sciezka === href || (href.startsWith('k/') && sciezka.startsWith(href)))); });
    if (jezyk !== 'pl' && cz[0] !== '') ustawJezyk('pl');
    if (cz[0] === 'kontakt') { if ($(widoki.zam).hidden === false || true) { requestAnimationFrame(() => $('#kontakt').scrollIntoView({ behavior: 'smooth' })); } return; }
    let gora = true;
    if (cz[0] === 'p' && cz[1]) { pokazWidok('produkt'); pokazProdukt(cz[1]); }
    else if (cz[0] === 'k') { pokazWidok('lista'); pokazListe(cz[1] || 'rekawice', params, null); }
    else if (cz[0] === 'marka' && marka(cz[1])) { pokazWidok('lista'); pokazListe('wszystko', params, cz[1]); }
    else if (cz[0] === 'marki') { pokazWidok('marki'); document.title = 'Marki - Rękawice Bramkarskie'; }
    else if (cz[0] === 'craft') { pokazWidok('craft'); document.title = '#bravrycraft - rękawice z własnym projektem | Rękawice Bramkarskie'; cf.hidden = false; $('#cfOk').hidden = true; }
    else if (cz[0] === 'rozmiar') { pokazWidok('rozmiar'); document.title = 'Dobór rozmiaru rękawic - Rękawice Bramkarskie'; }
    else if (cz[0] === 'zamowienie') {
      pokazWidok('zam'); document.title = 'Zamówienie - Rękawice Bramkarskie';
      $('#dziekujemy').hidden = true; $('.zam-h').hidden = false;
      $('#zam').hidden = !koszyk.length; $('#zamPusty').hidden = !!koszyk.length; rysujPods();
    } else { pokazWidok('home'); document.title = 'Rękawice Bramkarskie - sklep dla bramkarzy | BRAVRY i inne marki'; }
    if (gora) scrollTo(0, 0);
  }
  // linki kotwic wewnątrz podstrony #bravrycraft
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]:not([href^="#/"])'); if (!a) return;
    const cel = document.getElementById(a.getAttribute('href').slice(1)); if (!cel) return;
    e.preventDefault(); cel.scrollIntoView({ behavior: 'smooth' });
  });
  addEventListener('hashchange', route);
  rysujBest(); rysujKoszyk(); route();
})();

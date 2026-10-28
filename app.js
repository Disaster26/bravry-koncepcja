(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- dane ----------
     Nazwy, ceny (PLN), opisy, lateks i kroje: bravry-polska.pl (sklep dystrybutora), 28.10.2026.
     Dostępność rozmiarów = stan dystrybutora (przykładowa). Podział "poziom" - nasz, przykładowy. */
  const KROJE = { roll: 'Roll finger', hyb: 'Hybrid Roll', 'hyb-neg': 'Hybrid Roll / Negative', 'hyb-flat': 'Hybrid Roll / Flat' };
  const SENIOR = [7, 8, 9, 10, 11];
  const P = [
    { s: 'king', n: 'KING', c: 290, k: 'hyb-flat', poz: 'mecz', kol: 'Biało-czarne', img: 4, etyk: 'Bestseller',
      roz: SENIOR, dost: [7, 8, 9, 10, 11],
      krotko: 'Rękawice klasy premium na każdą pogodę. Tył z miękkiej siatki mesh i lateksu z odciskiem 3D, lateksowa strefa do piąstkowania.',
      spec: [['Lateks', 'Contact 4 mm + 4 mm wyściółki amortyzującej'], ['Krój', 'Hybrid Roll / Flat'], ['Tył', 'siatka mesh + lateks z odciskiem 3D'], ['Zapięcie', 'pasek z okienkiem do personalizacji'], ['Warunki', 'na każdą pogodę']],
      opis: 'Model premium z innowacyjnym tyłem: siatka mesh przyjemna dla skóry i lateks z odciskiem 3D. Lateksowa strefa do piąstkowania piłki i mankiet z paskiem, na którym zmieścisz imię albo numer.' },
    { s: 'aqua-neg', n: 'Aqua II Negative', c: 290, k: 'hyb-neg', poz: 'mecz', mokro: true, kol: 'Białe', img: 4, etyk: 'Bestseller',
      roz: SENIOR, dost: [8, 9, 10],
      krotko: 'Lateks Supreme Aqua Contact, który trzyma mokrą piłkę: deszcz, rosa, śnieg, mróz.',
      spec: [['Lateks', 'Supreme Aqua Contact 4 mm + 4 mm'], ['Krój', 'Hybrid Roll / Negative'], ['System', 'Fix Fit - silikon wewnątrz'], ['Zapięcie', 'rzep, pasek w całości z lateksu'], ['Szwy', 'podwójne na całym obwodzie'], ['Warunki', 'deszcz i mokra murawa']],
      opis: 'Hybrydowy krój Roll/Negative: palce owinięte lateksem, ergonomiczny kształt odwzorowujący dłoń. Supreme Aqua Contact to lateks do gry w deszczu. Miękki lateksowy tył, mocny rzep i podwójne szwy.' },
    { s: 'aqua-flat', n: 'Aqua II Hybrid Flat', c: 290, k: 'hyb-flat', poz: 'mecz', mokro: true, kol: 'Białe', img: 3,
      roz: SENIOR, dost: [8, 10],
      krotko: 'Wersja Aqua II z krojem Roll/Flat - więcej miejsca w dłoni, ten sam lateks na mokrą piłkę.',
      spec: [['Lateks', 'Supreme Aqua Contact 4 mm + 4 mm'], ['Krój', 'Hybrid Roll / Flat'], ['System', 'Fix Fit - silikon wewnątrz'], ['Zapięcie', 'rzep, pasek z lateksu'], ['Warunki', 'deszcz i mokra murawa']],
      opis: 'Palce owinięte lateksem i płaska dłoń. Lateks Supreme Aqua Contact zapewnia chwyt mokrej piłki niezależnie od pogody.' },
    { s: 'orzel', n: 'Catalyst Orzeł', c: 290, k: 'hyb-neg', poz: 'mecz', kol: 'Biało-czerwone', img: 3, etyk: 'Nowość',
      roz: SENIOR, dost: [7, 8, 9, 10],
      krotko: 'Kontynuacja Catalyst z motywem orła i barwami narodowymi. Lekkie i bardzo elastyczne.',
      spec: [['Lateks', 'Supreme Contact 4 mm + pianka 4 mm'], ['Krój', 'Hybrid Roll / Negative'], ['System', 'Fix Fit - silikon wewnątrz'], ['Mankiet', 'elastyczny'], ['Warunki', 'na każdą pogodę']],
      opis: 'Profesjonalne rękawice premium dla bramkarzy na każdym poziomie rozgrywek. Biało-czerwony wzór z orłem.' },
    { s: 'explosion', n: 'Catalyst Explosion', c: 290, k: 'hyb-neg', poz: 'mecz', kol: 'Pomarańczowo-grafitowe', img: 4,
      roz: SENIOR, dost: [7, 8],
      krotko: 'Lekki Catalyst z lateksem Control Grip i krojem Roll/Negative.',
      spec: [['Lateks', 'Control Grip 4 mm + pianka 4 mm'], ['Krój', 'Hybrid Roll / Negative'], ['System', 'Fix Fit - silikon wewnątrz'], ['Mankiet', 'elastyczny'], ['Warunki', 'na każdą pogodę']],
      opis: 'Lekkie i bardzo elastyczne rękawice z pomarańczowym lateksem na dłoni. Silikon Fix Fit trzyma dłoń w miejscu.' },
    { s: 'pr2-white', n: 'Perfect Roll II White', c: 290, k: 'roll', poz: 'mecz', kol: 'Białe', img: 4, etyk: 'Nowość',
      roz: SENIOR, dost: [8, 9, 10],
      krotko: 'EVO Rollfinger: zaokrąglone palce całkowicie owinięte lateksem Mega Grip.',
      spec: [['Lateks', 'Mega Grip 4 mm + 4 mm'], ['Krój', 'EVO Roll finger'], ['System', 'Fix Fit - silikon wewnątrz'], ['Zapięcie', 'lateksowy pasek z okienkiem do personalizacji'], ['Szwy', 'podwójne na całym obwodzie']],
      opis: 'Rękawice premium z mocnym rzepem i podwójnymi szwami. Lateks Mega Grip na każdą pogodę, maksymalna powierzchnia kontaktu z piłką.' },
    { s: 'pr2-black', n: 'Perfect Roll II Black', c: 290, k: 'roll', poz: 'mecz', kol: 'Czarne', img: 4, etyk: 'Nowość',
      roz: SENIOR, dost: [8, 9, 10],
      krotko: 'Czarna wersja Perfect Roll II. Lateks Mega Grip 4 + 4 mm, krój EVO Rollfinger.',
      spec: [['Lateks', 'Mega Grip 4 mm + 4 mm'], ['Krój', 'EVO Roll finger'], ['System', 'Fix Fit - silikon wewnątrz'], ['Zapięcie', 'lateksowy pasek z okienkiem do personalizacji'], ['Szwy', 'podwójne na całym obwodzie']],
      opis: 'Zaokrąglone palce owinięte lateksem dla lepszej kontroli piłki. Mocny rzep, podwójne szwy, chwyt także przy mokrej piłce.' },
    { s: 'lions-pride', n: 'Lions Pride', c: 279, k: 'roll', poz: 'mecz', kol: 'Biało-niebieskie', img: 4,
      roz: SENIOR, dost: [7],
      krotko: 'Jasny, biało-niebieski projekt dla bardzo wymagających bramkarzy.',
      spec: [['Lateks', 'Mega Grip 4 mm + 4 mm'], ['Krój', 'EVO Roll finger'], ['System', 'Fix Fit - silikon wewnątrz'], ['Szwy', 'podwójne na całym obwodzie'], ['Warunki', 'na każdą pogodę']],
      opis: 'Profesjonalne rękawice premium. Zaokrąglone palce owinięte lateksem, mocny rzep i chwyt w deszczu, śniegu i na rosie.' },
    { s: 'strong2', n: 'Strong II', c: 265, k: 'hyb', poz: 'trening', kol: 'Biało-fioletowe', img: 3, etyk: 'Bestseller',
      roz: [4, 5, 6, 7, 8, 9, 10, 11], dost: [4, 5, 6, 7, 11],
      krotko: 'Bardzo trwały lateks Extreme Quartz - na mecze i codzienny trening.',
      spec: [['Lateks', 'Extreme Quartz 4 mm + podszewka 4 mm'], ['Krój', 'Hybrid Roll'], ['System', 'Fix Fit - silikon wewnątrz'], ['Zapięcie', 'pasek z lateksu z okienkiem, gumowa końcówka'], ['Mankiet', 'elastyczny']],
      opis: 'Wygodny krój, lekkość i przyczepność. Pasek w całości z lateksu, z gumową końcówką, którą łatwo odpiąć.' },
    { s: 'confidence-fp', n: 'Confidence Finger Protection', c: 250, k: 'hyb', fs: true, poz: 'trening', kol: 'Biało-niebieskie', img: 4, etyk: 'Bestseller',
      roz: [6, 7, 8, 9, 10], dost: [6, 7, 8, 9, 10],
      krotko: 'Wyjmowane usztywnienia: usztywnisz wszystkie palce albo tylko jeden.',
      spec: [['Lateks', 'Giga Grip 4 mm + pianka 4 mm'], ['Krój', 'Hybrid Roll'], ['Ochrona palców', 'wyjmowane usztywnienia (fingersave)'], ['System', 'Fix Fit'], ['Zapięcie', 'pasek z okienkiem do personalizacji']],
      opis: 'Pewność chwytu i bezpieczeństwo palców. Ty decydujesz, gdzie potrzebujesz ochrony. Lateks Giga Grip amortyzuje strzały.' },
    { s: 'confidence', n: 'Confidence', c: 240, k: 'roll', poz: 'trening', kol: 'Czarno-czerwone', img: 3, etyk: 'Nowość',
      roz: [6, 7, 8, 9, 10], dost: [6, 7, 8, 9, 10],
      krotko: 'Ergo Roll Finger i niemiecki lateks G2. Lekkie, z tyłem z siatki Air Mesh.',
      spec: [['Lateks', 'niemiecki G2 4 mm + podszewka 4 mm'], ['Krój', 'Ergo Roll finger'], ['Tył', 'lateks PK 4 mm + Air Mesh 8 mm'], ['System', 'Fix Fit'], ['Zapięcie', 'pasek z lateksu z okienkiem']],
      opis: 'Materiał dopasowuje się do kształtu dłoni, dając kontrolę nad piłką. Czarno-czerwony design.' },
    { s: 'lion', n: 'Lion', c: 220, k: 'hyb', poz: 'trening', kol: 'Czarne', img: 4,
      roz: [4, 5, 6, 7, 8, 9, 10], dost: [4, 5, 6, 7, 8, 9, 10],
      krotko: 'Całe czarne, lateks Giga Grip. Rozmiary od 4 do 10 - dla juniora i seniora.',
      spec: [['Lateks', 'Giga Grip 4 mm + podszewka 4 mm'], ['Krój', 'Hybrid Roll'], ['System', 'Fix Fit'], ['Zapięcie', 'pasek z lateksu z okienkiem, gumowa końcówka'], ['Mankiet', 'elastyczny']],
      opis: 'Bardzo trwały lateks, na każdą pogodę. Pasek łatwo odpiąć dzięki gumowej końcówce.' },
    { s: 'hurricane', n: 'Hurricane', c: 200, k: 'hyb', poz: 'junior', kol: 'Czarno-zielone', img: 4,
      roz: [3, 4, 5, 6], dost: [3, 4, 5],
      krotko: 'Juniorskie rękawice z lateksem SP i silikonem Fix Fit.',
      spec: [['Lateks', 'SP 4 mm + pianka 4 mm'], ['Krój', 'Hybrid Roll'], ['System', 'Fix Fit'], ['Zapięcie', 'pasek z lateksu z okienkiem'], ['Mankiet', 'elastyczny']],
      opis: 'Wygodny krój, lekkość i dobra przyczepność dla młodszych bramkarzy.' },
    { s: 'sunrise3', n: 'Sunrise III', c: 179, k: 'hyb', poz: 'junior', kol: 'Czarno-zielone', img: 2,
      roz: [4, 5, 6, 7], dost: [4, 5, 6],
      krotko: 'Niemiecki lateks SP2 i konstrukcja hybrydowa bez ryzyka rozdarcia na szwach palców.',
      spec: [['Lateks', 'niemiecki SP2 3,5 mm + podszewka 4 mm'], ['Krój', 'hybrydowy'], ['Tył', 'miękki lateks PK'], ['Zapięcie', 'mocny rzep'], ['Szwy', 'podwójne']],
      opis: 'Pewny chwyt także przy mokrej piłce i w niskich temperaturach. Dobry wybór na pierwsze lata w bramce.' }
  ];
  const ODZ = [
    { s: 'coldproof', n: 'Bluza termoaktywna Coldproof', c: 119, typ: 'odziez', kol: 'Czarna', img: 3,
      roz: ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL'], dost: ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL'],
      krotko: 'Na treningi w ujemnych temperaturach: wewnętrzny polar i gęsta warstwa zewnętrzna.',
      spec: [['Materiał', 'polar wewnątrz + gęsta tkanina na zewnątrz'], ['Ochraniacze', 'bez ochraniaczy'], ['Kolor', 'czarny']],
      opis: 'Utrzymuje ciepło ciała przy mrozie i chroni przed zimnym powietrzem. Sprawdzi się też do biegania i na co dzień.' },
    { s: 'silversky', n: 'Silver Sky z ochraniaczami', c: 175, typ: 'odziez', kol: 'Czarno-niebieska', img: 3,
      roz: ['XXS', 'XS', 'S', 'M', 'L', 'XL'], dost: ['XXS', 'XS', 'XL'],
      krotko: 'Bramkarska koszulka z długim rękawem i ochraniaczami łokci.',
      spec: [['Typ', 'koszulka bramkarska z ochraniaczami'], ['Kolor', 'czarno-niebieski']],
      opis: 'Koszulka bramkarska Silver Sky z ochraniaczami na łokciach.' },
    { s: 'comfort', n: 'Podspodenki Comfort z ochraniaczami', c: 139, typ: 'odziez', kol: 'Czarne', img: 4,
      roz: ['XXS', 'XS', 'S', 'M', 'L', 'XL'], dost: ['XXS', 'XS', 'S', 'XL'],
      krotko: 'Elastyczne podspodenki z bocznymi ochraniaczami z pianki EVA - na upadki na twardej nawierzchni.',
      spec: [['Ochraniacze', 'boczne, lekka i gęsta pianka EVA'], ['Materiał', 'elastyczny, odprowadza wilgoć, odporny na ścieranie'], ['Pas', 'elastyczna guma']],
      opis: 'Miękki i bardzo elastyczny materiał wspiera mięśnie w chłodne dni i odprowadza pot na zewnątrz. Boczne ochraniacze EVA chronią przy upadkach nawet na najtwardszych nawierzchniach.' },
    { s: 'skarpety', n: 'Skarpety antypoślizgowe', c: 39, typ: 'odziez', kol: 'Białe', img: 4,
      roz: ['36-40', '41-45'], dost: ['36-40', '41-45'],
      krotko: 'Antypoślizgowa powłoka na spodzie, oddychający i elastyczny materiał.',
      spec: [['Spód', 'powłoka antypoślizgowa'], ['Rozmiary', '36-40, 41-45']],
      opis: 'Stabilność stopy w bucie na różnych nawierzchniach. Oddychające i elastyczne.' }
  ];
  const WSZ = [...P, ...ODZ];
  const znajdz = s => WSZ.find(p => p.s === s);

  /* ---------- waluta i język ---------- */
  let jezyk = 'pl';
  const KURS = 4.3; // orientacyjny przelicznik PLN -> EUR (pokaz wersji EN)
  const cena = zl => jezyk === 'en'
    ? '€' + Math.round(zl / KURS)
    : zl.toLocaleString('pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' zł';
  const DARMOWA = 300;
  const KOSZT = { paczkomat: 13.99, kurier: 16.99 };

  /* ---------- pamięć ---------- */
  const KLUCZ = 'bravry_koszyk_v1';
  const czytaj = () => { try { const v = JSON.parse(localStorage.getItem(KLUCZ)); return Array.isArray(v) ? v.filter(x => znajdz(x.s)) : []; } catch (e) { return []; } };
  const zapisz = () => { try { localStorage.setItem(KLUCZ, JSON.stringify(koszyk)); } catch (e) { /* tryb prywatny */ } };
  let koszyk = czytaj();

  /* ---------- toast ---------- */
  const toastEl = $('#toast'); let toastT;
  const toast = t => { toastEl.textContent = t; toastEl.classList.add('widac'); clearTimeout(toastT); toastT = setTimeout(() => toastEl.classList.remove('widac'), 2200); };

  /* ---------- menu ---------- */
  const burger = $('#burger'), menu = $('#menu');
  const zamknijMenu = () => { menu.classList.remove('otwarte'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Otwórz menu'); document.body.style.overflow = ''; };
  burger.addEventListener('click', () => {
    const o = menu.classList.toggle('otwarte');
    burger.setAttribute('aria-expanded', String(o));
    burger.setAttribute('aria-label', o ? 'Zamknij menu' : 'Otwórz menu');
    document.body.style.overflow = o ? 'hidden' : '';
  });
  $$('a', menu).forEach(a => a.addEventListener('click', zamknijMenu));
  addEventListener('scroll', () => document.body.classList.toggle('przewiniety', scrollY > 30), { passive: true });

  /* ---------- karta produktu w siatce ---------- */
  const zakres = p => {
    const r = p.roz; if (typeof r[0] !== 'number') return r.length > 2 ? r[0] + '-' + r[r.length - 1] : r.join(', ');
    return 'rozm. ' + r[0] + '-' + r[r.length - 1];
  };
  function karta(p) {
    const li = document.createElement('article');
    li.className = 'karta';
    const etyk = p.etyk ? `<span class="k-etyk${p.etyk === 'Nowość' ? ' nowosc' : ''}">${p.etyk}</span>` : '';
    const opis = p.k ? KROJE[p.k] + (p.fs ? ' + fingersave' : '') : p.kol;
    li.innerHTML = `<a class="k-link" href="#/p/${p.s}">
      <div class="k-foto">${etyk}<img class="k-1" src="img/${p.s}-0s.webp" alt="Rękawice BRAVRY ${p.n}" loading="lazy" width="400" height="500">${p.img > 1 ? `<img class="k-2" src="img/${p.s}-1.webp" alt="" loading="lazy">` : ''}</div>
      <h3 class="k-nazwa">${p.n}</h3>
      <p class="k-kroj">${opis}</p>
      <div class="k-dol"><span class="k-cena">${cena(p.c)}</span><span class="k-roz">${zakres(p)}</span></div></a>`;
    if (!p.k) li.querySelector('.k-1').alt = 'BRAVRY ' + p.n;
    return li;
  }

  /* ---------- filtry ---------- */
  const filtr = { kroj: new Set(), roz: new Set(), poz: new Set(), cena: new Set() };
  let sort = 'pol';
  const pasuje = p => {
    if (filtr.kroj.size && ![...filtr.kroj].some(v => v === 'fs' ? p.fs : p.k === v)) return false;
    if (filtr.roz.size && ![...filtr.roz].some(v => p.roz.includes(+v))) return false;
    if (filtr.poz.size && ![...filtr.poz].some(v => v === 'mokro' ? p.mokro : v === 'junior' ? (p.poz === 'junior' || p.roz[0] <= 5) : p.poz === v)) return false;
    if (filtr.cena.size && ![...filtr.cena].some(v => v === 'a' ? p.c <= 220 : v === 'b' ? (p.c > 220 && p.c < 270) : p.c >= 270)) return false;
    return true;
  };
  const siatka = $('#siatka');
  const NAZWY_F = { mecz: 'Mecz premium', trening: 'Mecz i trening', junior: 'Junior', mokro: 'Mokra murawa', a: 'do 220 zł', b: '220-270 zł', c: 'od 270 zł', roll: 'Roll finger', hyb: 'Hybrid Roll', 'hyb-neg': 'Roll / Negative', 'hyb-flat': 'Roll / Flat', fs: 'Fingersave' };
  function rysujSiatke() {
    let lista = P.filter(pasuje);
    if (sort === 'tanie') lista = [...lista].sort((a, b) => a.c - b.c);
    if (sort === 'drogie') lista = [...lista].sort((a, b) => b.c - a.c);
    siatka.innerHTML = '';
    lista.forEach(p => siatka.appendChild(karta(p)));
    const n = lista.length;
    $('#ile').textContent = jezyk === 'en' ? n + (n === 1 ? ' model' : ' models') : n + (n === 1 ? ' model' : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? ' modele' : ' modeli');
    $('#pusto').hidden = n > 0;
    $('#filtryPokaz').textContent = (jezyk === 'en' ? 'Show ' : 'Pokaż ') + n;
    // aktywne filtry
    const akt = $('#aktywne'); akt.innerHTML = '';
    let ile = 0;
    Object.entries(filtr).forEach(([f, set]) => set.forEach(v => {
      ile++;
      const b = document.createElement('button'); b.type = 'button';
      b.textContent = f === 'roz' ? 'Rozmiar ' + v : (NAZWY_F[v] || v);
      b.setAttribute('aria-label', 'Usuń filtr ' + b.textContent);
      b.addEventListener('click', () => { set.delete(v); synchChipy(); rysujSiatke(); });
      akt.appendChild(b);
    }));
    const fi = $('#filtryIle'); fi.hidden = !ile; fi.textContent = ile;
  }
  function synchChipy() {
    $$('.chipy').forEach(g => { const set = filtr[g.dataset.f]; $$('button', g).forEach(b => b.setAttribute('aria-pressed', String(set.has(b.dataset.v)))); });
  }
  $$('.chipy').forEach(g => g.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const set = filtr[g.dataset.f];
    set.has(b.dataset.v) ? set.delete(b.dataset.v) : set.add(b.dataset.v);
    synchChipy(); rysujSiatke();
  }));
  const wyczysc = () => { Object.values(filtr).forEach(s => s.clear()); synchChipy(); rysujSiatke(); };
  $('#filtryWyczysc').addEventListener('click', wyczysc);
  $('#pustoWyczysc').addEventListener('click', wyczysc);
  $('#sort').addEventListener('change', e => { sort = e.target.value; rysujSiatke(); });
  const fPanel = $('#filtryPanel'), fBtn = $('#filtryOtworz'), zaslona = $('#zaslona');
  const otworzFiltry = o => {
    fPanel.classList.toggle('otwarte', o); fBtn.setAttribute('aria-expanded', String(o));
    pokazZaslone(o, 'filtry');
  };
  fBtn.addEventListener('click', () => otworzFiltry(true));
  $('#filtryZamknij').addEventListener('click', () => otworzFiltry(false));
  $('#filtryPokaz').addEventListener('click', () => { otworzFiltry(false); $('#kolekcja').scrollIntoView({ behavior: 'smooth' }); });

  let zaslonaDla = null;
  function pokazZaslone(o, kto) {
    if (o) { zaslonaDla = kto; zaslona.hidden = false; requestAnimationFrame(() => zaslona.classList.add('widac')); document.body.style.overflow = 'hidden'; }
    else { zaslona.classList.remove('widac'); document.body.style.overflow = ''; setTimeout(() => { if (!zaslona.classList.contains('widac')) zaslona.hidden = true; }, 260); }
  }
  zaslona.addEventListener('click', () => { if (zaslonaDla === 'filtry') otworzFiltry(false); else zamknijKoszyk(); });

  $('#siatkaOdz').append(...ODZ.map(karta));

  /* ---------- miarka rozmiaru ---------- */
  const TAB = [[3, 15], [4, 15.5], [5, 16], [6, 16.5], [7, 17], [8, 18], [9, 19], [10, 20]];
  const rozmiarDla = cm => { if (!(cm >= 13 && cm <= 24)) return null; if (cm > 20.4) return 11; let best = TAB[0]; TAB.forEach(t => { if (Math.abs(t[1] - cm) < Math.abs(best[1] - cm)) best = t; }); return best[0]; };
  $('#dlon').addEventListener('input', e => {
    const cm = parseFloat(String(e.target.value).replace(',', '.'));
    const r = rozmiarDla(cm);
    $('#wynik').textContent = r ? 'Rozmiar: ' + r : 'Rozmiar: -';
    $$('#tabela tbody tr').forEach(tr => tr.classList.toggle('on', +tr.dataset.r === r));
  });
  $('#miarka').addEventListener('submit', e => e.preventDefault());

  /* ---------- karta produktu ---------- */
  let biezacy = null, wybranyRoz = null, ilosc = 1;
  const galTasma = $('#galTasma'), galMini = $('#galMini'), galKropki = $('#galKropki');
  function pokazProdukt(s) {
    const p = znajdz(s); if (!p) { location.hash = '#/'; return; }
    biezacy = p; wybranyRoz = null; ilosc = 1; $('#ilWart').value = 1;
    document.title = `BRAVRY ${p.n} - ${p.k ? 'rękawice bramkarskie' : 'odzież bramkarska'}`;
    $('#okrKat').textContent = p.k ? 'Rękawice' : 'Odzież';
    $('#okrKat').href = p.k ? '#/kolekcja' : '#/odziez';
    $('#okrNazwa').textContent = p.n;
    $('#pEtyk').textContent = p.k ? `Rękawice bramkarskie · ${KROJE[p.k]}${p.fs ? ' + fingersave' : ''}` : 'Odzież bramkarska';
    $('#pNazwa').textContent = 'BRAVRY ' + p.n;
    $('#pCena').textContent = cena(p.c);
    $('#pKrotko').textContent = p.krotko;
    $('#pSpec').innerHTML = p.spec.map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join('') + `<li><b>Kolor</b><span>${p.kol}</span></li>`;
    $('#pOpis').innerHTML = `<p>${p.opis}</p>`;
    $('#kpNazwa').textContent = p.n; $('#kpCena').textContent = cena(p.c);
    // tabela rozmiarów tylko przy rękawicach
    const rek = !!p.k;
    $('#pokazTabele').hidden = !rek; $('#detRoz').hidden = !rek;
    $('#pTabela').innerHTML = TAB.filter(t => p.roz.includes(t[0])).map(t => `<span><b>${t[0]}</b>${String(t[1]).replace('.', ',')} cm</span>`).join('') + (p.roz.includes(11) ? '<span><b>11</b>pow. 20 cm</span>' : '');
    // galeria
    galTasma.innerHTML = ''; galMini.innerHTML = ''; galKropki.innerHTML = '';
    for (let i = 0; i < p.img; i++) {
      const src = `img/${p.s}-${i}.webp`;
      const f = document.createElement('figure');
      f.innerHTML = `<img src="${src}" alt="BRAVRY ${p.n} - zdjęcie ${i + 1}" ${i ? 'loading="lazy"' : ''}>`;
      galTasma.appendChild(f);
      const b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Zdjęcie ' + (i + 1));
      b.innerHTML = `<img src="${i ? src : `img/${p.s}-0s.webp`}" alt="" loading="lazy">`;
      b.addEventListener('click', () => galTasma.scrollTo({ left: galTasma.clientWidth * i, behavior: 'smooth' }));
      galMini.appendChild(b);
      galKropki.appendChild(document.createElement('i'));
    }
    galTasma.scrollLeft = 0; zaznaczFoto(0);
    // rozmiary
    const box = $('#pRozmiary'); box.innerHTML = ''; box.classList.remove('zle'); $('#rozBlad').hidden = true;
    p.roz.forEach(r => {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = r;
      b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', 'false');
      const jest = p.dost.includes(r);
      if (!jest) { b.disabled = true; b.title = 'Chwilowo niedostępny'; b.setAttribute('aria-label', r + ' - niedostępny'); }
      b.addEventListener('click', () => {
        wybranyRoz = r; $$('button', box).forEach(x => x.setAttribute('aria-checked', String(x === b)));
        box.classList.remove('zle'); $('#rozBlad').hidden = true;
        $('#kpCena').textContent = cena(p.c) + ' · rozmiar ' + r;
      });
      box.appendChild(b);
    });
    if (p.roz.length === 1) box.firstChild.click();
    // podobne
    const pod = WSZ.filter(x => x !== p && (p.k ? x.k : !x.k)).sort((a, b) => (a.poz === p.poz ? -1 : 1) - (b.poz === p.poz ? -1 : 1) || Math.abs(a.c - p.c) - Math.abs(b.c - p.c)).slice(0, 4);
    $('#podobne').innerHTML = ''; $('#podobne').append(...pod.map(karta));
    // mini-podgląd: zamknij akordeony poza pierwszym
    $$('.akordeon details').forEach((d, i) => d.open = i === 0);
  }
  function zaznaczFoto(i) {
    $$('button', galMini).forEach((b, j) => b.classList.toggle('on', j === i));
    $$('i', galKropki).forEach((b, j) => b.classList.toggle('on', j === i));
  }
  galTasma.addEventListener('scroll', () => { zaznaczFoto(Math.round(galTasma.scrollLeft / Math.max(1, galTasma.clientWidth))); }, { passive: true });
  $('#ilMinus').addEventListener('click', () => { ilosc = Math.max(1, ilosc - 1); $('#ilWart').value = ilosc; });
  $('#ilPlus').addEventListener('click', () => { ilosc = Math.min(10, ilosc + 1); $('#ilWart').value = ilosc; });
  const dodajBiezacy = () => {
    if (wybranyRoz == null) {
      $('#pRozmiary').classList.add('zle'); $('#rozBlad').hidden = false;
      $('.prod-wybor').scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    dodaj(biezacy.s, wybranyRoz, ilosc);
    otworzKoszyk();
  };
  $('#dodaj').addEventListener('click', dodajBiezacy);
  $('#kpDodaj').addEventListener('click', dodajBiezacy);
  // pasek "dodaj do koszyka" po przewinięciu za przycisk
  const kupPasek = $('#kupPasek');
  let poKup = false;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      poKup = !e.isIntersecting && e.boundingClientRect.top < 0;
      const w = poKup && !$('#v-produkt').hidden;
      kupPasek.classList.toggle('widac', w); kupPasek.setAttribute('aria-hidden', String(!w)); $('#kpDodaj').tabIndex = w ? 0 : -1;
    }).observe($('#prodKup'));
  }
  // okno tabeli rozmiarów
  const okno = $('#oknoTab');
  $('#pokazTabele').addEventListener('click', () => { okno.hidden = false; $('[data-zamknij]', okno).focus(); });
  okno.addEventListener('click', e => { if (e.target === okno || e.target.closest('[data-zamknij]')) okno.hidden = true; });

  /* ---------- koszyk ---------- */
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
    ksBtn.setAttribute('aria-label', `Koszyk, ${n} ${n === 1 ? 'produkt' : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? 'produkty' : 'produktów'}`);
    $('#ksIle').textContent = n ? `(${n})` : '';
    const lista = $('#ksLista'); lista.innerHTML = '';
    koszyk.forEach((x, i) => {
      const p = znajdz(x.s);
      const li = document.createElement('li'); li.className = 'ks-poz';
      li.innerHTML = `<a href="#/p/${p.s}"><img src="img/${p.s}-0s.webp" alt="" loading="lazy"></a>
        <div><h3><a href="#/p/${p.s}">${p.n}</a></h3><p>Rozmiar ${x.r}${p.k ? ' · ' + KROJE[p.k] : ''}</p>
        <div class="ks-wiersz"><div class="ilosc" aria-label="Ilość"><button type="button" data-a="-" aria-label="Zmniejsz ilość">−</button><input type="text" value="${x.n}" readonly aria-label="Ilość"><button type="button" data-a="+" aria-label="Zwiększ ilość">+</button></div>
        <span class="ks-cena">${cena(p.c * x.n)}</span></div>
        <button type="button" class="ks-usun" data-a="x">Usuń</button></div>`;
      li.addEventListener('click', e => {
        const a = e.target.closest('[data-a]'); if (!a) return;
        if (a.dataset.a === '+') x.n = Math.min(10, x.n + 1);
        if (a.dataset.a === '-') { x.n -= 1; if (x.n < 1) koszyk.splice(i, 1); }
        if (a.dataset.a === 'x') koszyk.splice(i, 1);
        zapisz(); rysujKoszyk(); if (!$('#v-zamowienie').hidden && $('#dziekujemy').hidden) { rysujPods(); $('#zam').hidden = !koszyk.length; $('#zamPusty').hidden = !!koszyk.length; }
        const fokus = lista.children[i] && lista.children[i].querySelector(`[data-a="${a.dataset.a}"]`);
        if (fokus) fokus.focus();
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
  function otworzKoszyk() {
    fokusPrzed = document.activeElement;
    ksEl.classList.add('otwarty'); ksEl.setAttribute('aria-hidden', 'false'); pokazZaslone(true, 'koszyk');
    setTimeout(() => $('#ksZamknij').focus(), 50);
  }
  function zamknijKoszyk() {
    ksEl.classList.remove('otwarty'); ksEl.setAttribute('aria-hidden', 'true'); pokazZaslone(false);
    if (fokusPrzed && fokusPrzed.focus) fokusPrzed.focus();
  }
  ksBtn.addEventListener('click', otworzKoszyk);
  $$('#ksDobierz [data-r]').forEach(b => b.addEventListener('click', () => { dodaj('skarpety', b.dataset.r, 1); toast('Dodano skarpety ' + b.dataset.r); }));
  $('#ksZamknij').addEventListener('click', zamknijKoszyk);
  $('#ksKontynuuj').addEventListener('click', zamknijKoszyk);
  $('#ksDalej').addEventListener('click', () => { ksEl.classList.remove('otwarty'); ksEl.setAttribute('aria-hidden', 'true'); pokazZaslone(false); });
  $('#ksDoSklepu').addEventListener('click', () => { ksEl.classList.remove('otwarty'); pokazZaslone(false); });
  $('#okrKoszyk').addEventListener('click', otworzKoszyk);
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (!okno.hidden) okno.hidden = true;
    else if (ksEl.classList.contains('otwarty')) zamknijKoszyk();
    else if (fPanel.classList.contains('otwarte')) otworzFiltry(false);
    else zamknijMenu();
  });
  addEventListener('storage', e => { if (e.key === KLUCZ) { koszyk = czytaj(); rysujKoszyk(); } });

  /* ---------- zamówienie ---------- */
  const form = $('#zamForm');
  const dostawa = () => form.dostawa.value;
  function rysujPods() {
    const sm = suma(), d = sm >= DARMOWA ? 0 : KOSZT[dostawa()];
    $('#zpLista').innerHTML = koszyk.map(x => { const p = znajdz(x.s); return `<li><img src="img/${p.s}-0s.webp" alt=""><span>${p.n}<small>Rozmiar ${x.r} · ${x.n} szt.</small></span><b>${cena(p.c * x.n)}</b></li>`; }).join('');
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
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!koszyk.length) { toast('Koszyk jest pusty.'); return; }
    let ok = true, pierwszy = null;
    $$('input[required]', form).forEach(i => {
      const zle = i.type === 'checkbox' ? !i.checked : (!i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value)));
      i.classList.toggle('zle', zle); if (zle) { ok = false; pierwszy = pierwszy || i; }
    });
    $('#zamBlad').hidden = ok;
    if (!ok) { pierwszy.focus(); return; }
    const nr = 'BR-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));
    $('#dzNr').textContent = `Numer zamówienia: ${nr}. Kwota: ${$('#zpRazem').textContent}.`;
    koszyk = []; zapisz(); rysujKoszyk();
    $('#zam').hidden = true; $('#dziekujemy').hidden = false; $('.zam-h').hidden = true;
    scrollTo(0, 0); $('#dziekujemy').focus();
  });

  /* ---------- język (pokaz na stronie głównej) ---------- */
  function ustawJezyk(l) {
    jezyk = l;
    document.documentElement.lang = l;
    $$('[data-lang]').forEach(b => { const on = b.dataset.lang === l; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
    $$('[data-pl]').forEach(el => { const t = el.dataset[l]; if (t != null) el.textContent = t; });
    $('.cena-a').textContent = l === 'en' ? 'up to €51' : 'do 220 zł';
    $('.cena-b').textContent = l === 'en' ? '€51-63' : '220-270 zł';
    $('.cena-c').textContent = l === 'en' ? 'from €63' : 'od 270 zł';
    NAZWY_F.a = $('.cena-a').textContent; NAZWY_F.b = $('.cena-b').textContent; NAZWY_F.c = $('.cena-c').textContent;
    rysujSiatke(); $('#siatkaOdz').innerHTML = ''; $('#siatkaOdz').append(...ODZ.map(karta));
    rysujKoszyk(); if (biezacy && !$('#v-produkt').hidden) { $('#pCena').textContent = cena(biezacy.c); }
  }
  $$('[data-lang]').forEach(b => b.addEventListener('click', () => ustawJezyk(b.dataset.lang)));

  /* ---------- routing ---------- */
  const widoki = { home: $('#v-home'), produkt: $('#v-produkt'), zam: $('#v-zamowienie') };
  const pokazWidok = k => Object.entries(widoki).forEach(([n, el]) => el.hidden = n !== k);
  const SEKCJE = { kolekcja: '#kolekcja', odziez: '#odziez', rozmiar: '#rozmiar', marka: '#marka', kontakt: '#kontakt', technologia: '#technologia' };
  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const [sciezka, q] = h.split('?');
    const cz = sciezka.split('/');
    $$('.menu a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#/' + h));
    kupPasek.classList.remove('widac');
    if (ksEl.classList.contains('otwarty')) { ksEl.classList.remove('otwarty'); ksEl.setAttribute('aria-hidden', 'true'); pokazZaslone(false); }
    if (fPanel.classList.contains('otwarte')) otworzFiltry(false);
    if (!okno.hidden) okno.hidden = true;
    if (cz[0] === 'p' && cz[1]) {
      if (jezyk !== 'pl') ustawJezyk('pl');
      pokazWidok('produkt'); pokazProdukt(cz[1]); scrollTo(0, 0); return;
    }
    if (cz[0] === 'zamowienie') {
      if (jezyk !== 'pl') ustawJezyk('pl');
      document.title = 'Zamówienie - BRAVRY';
      pokazWidok('zam'); $('#dziekujemy').hidden = true; $('.zam-h').hidden = false;
      $('#zam').hidden = !koszyk.length; $('#zamPusty').hidden = !!koszyk.length;
      rysujPods(); scrollTo(0, 0);
      return;
    }
    document.title = 'BRAVRY - rękawice bramkarskie | oficjalny sklep';
    const bylUkryty = widoki.home.hidden;
    pokazWidok('home');
    if (cz[0] === 'kolekcja' && q) {
      Object.values(filtr).forEach(s => s.clear());
      if (q === 'junior') filtr.poz.add('junior');
      if (q === 'fingersave') filtr.kroj.add('fs');
      synchChipy(); rysujSiatke();
    }
    const sel = SEKCJE[cz[0]];
    if (sel) { const el = $(sel); requestAnimationFrame(() => el.scrollIntoView({ behavior: bylUkryty ? 'auto' : 'smooth' })); }
    else if (bylUkryty || !cz[0]) scrollTo(0, 0);
  }
  addEventListener('hashchange', route);

  rysujSiatke(); rysujKoszyk(); route();
})();

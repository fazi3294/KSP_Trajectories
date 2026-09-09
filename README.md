# KSP_Trajectories

Interaktywna wizualizacja 3D stockowego układu planet Kerbal Space Program i ich księżyców dla wybranego czasu w grze.

## 🌐 Uruchomienie Online

Wizualizacja jest dostępna online na GitHub Pages:

**[https://fazi3294.github.io/KSP_Trajectories/](https://fazi3294.github.io/KSP_Trajectories/)**

Możesz natychmiast otworzyć wizualizację w przeglądarce bez konieczności instalacji.

## 💻 Uruchomienie Lokalnie

Jeśli chcesz pracować z kodem lub testować zmiany lokalnie:

```bash
npm install
npm start
```

Następnie otwórz `http://localhost:4173/`.

## 🧪 Testy

```bash
npm test
```

## 🎮 Funkcje

- **3D wizualizacja układu** – Kerbol, planety i księżyce w rzeczywistych pozycjach orbitalnych
- **Stałe markery ekranowe** – Słońce i planety utrzymują czytelny rozmiar punktu przy oddaleniu, a przy zbliżeniu płynnie przechodzą do skali rzeczywistej
- **Kontrola kamery** – zoom, rotacja, dowolny kąt oglądania
- **Filtrowanie księżyców** – księżyce i ich nazwy pojawiają się dopiero po zbliżeniu do planety (SOI planety > 3/4 ekranu)
- **Interakcja** – podwójne kliknięcie na planetę ustawia fokus kamery
- **Toggles** – pokaż/ukryj orbity, nazwy ciał niebieskich, sfery SOI
- **Sterowanie czasem** – sekundy oraz pola rok/dzień/godzina/minuta/sekunda, przełącznik czasu gry/UT i odtwarzanie czasu (Play/Pause) z regulacją prędkości
- **Wizualizacja transferu** – wprowadź start, cel i czasy, aby zobaczyć trajektorię transferu ze statkiem
- **Wyszukiwacz okien transferowych** – przeszukuje zakres czasu odlotu i czasu lotu siatką kandydatów, rozwiązuje transfer Lambert i zwraca najlepsze okna z estymacją Δv oraz kątem fazowym

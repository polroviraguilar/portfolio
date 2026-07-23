# Integració de Weekly Meal Planner al portfoli

Aquest paquet conté els tres fitxers complets del portfoli ja actualitzats:

- `index.html`
- `style.css`
- `script.js`

## 1. Substitució dels fitxers

A l'arrel del repositori del portfoli:

1. Substitueix l'`index.html` actual pel d'aquest paquet.
2. Substitueix el `style.css` actual pel d'aquest paquet.
3. Substitueix el `script.js` actual pel d'aquest paquet. El JavaScript no necessita lògica nova, però s'inclou perquè els tres fitxers quedin sincronitzats.

## 2. Crea la carpeta d'imatges

Crea exactament aquesta carpeta:

```text
assets/images/weekly-meal-planner/
```

## 3. Afegeix les cinc imatges

Els noms han de ser exactament aquests:

```text
weekly-meal-planner-cover.webp
weekly-meal-planner-desktop.webp
weekly-meal-planner-mobile.webp
weekly-meal-planner-menu.webp
weekly-meal-planner-shopping.webp
```

Rutes finals:

```text
assets/images/weekly-meal-planner/weekly-meal-planner-cover.webp
assets/images/weekly-meal-planner/weekly-meal-planner-desktop.webp
assets/images/weekly-meal-planner/weekly-meal-planner-mobile.webp
assets/images/weekly-meal-planner/weekly-meal-planner-menu.webp
assets/images/weekly-meal-planner/weekly-meal-planner-shopping.webp
```

## 4. Comportament de la demo

La integració no enllaça la web publicada perquè l'aplicació utilitza dades privades i, sense autenticació, una visita anònima podria escriure al mateix Firestore.

El detall mostra només:

- L'enllaç al repositori públic.
- Una nota indicant que el desplegament es manté privat per protegir les dades de la llar.

## 5. Què s'ha incorporat

- Segona targeta dins de `Web applications`.
- Cas d'estudi complet de Weekly Meal Planner.
- Disseny visual verd propi, coherent amb l'aplicació.
- Captura d'escriptori i mòbil al hero.
- Galeries per al planificador, el gestor de menús i la llista de compra.
- Etiquetes React, TypeScript, Firebase, Tailwind, PWA i Firestore.
- Actualització de `Technical experience` amb React, TypeScript i Firebase.

## 6. Correccions incloses

També s'han corregit dos errors que ja hi havia a l'HTML rebut:

- El detall de `Pokéitems` mostrava per error el casc de Malenia i reutilitzava el seu identificador.
- El detall de Malenia encara apuntava a `maleniahelmet.gif`; ara utilitza `malenia.gif`, igual que la targeta.

## 7. Comprovació després de publicar

Comprova aquestes rutes:

```text
#webapps
#/portfolio/weekly-meal-planner
```

I obre directament cadascuna de les cinc imatges per assegurar que no dona error 404.

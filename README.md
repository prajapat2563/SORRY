# Adhya ke liye ❤️

React + TypeScript + Tailwind CSS + Framer Motion + Lucide se bani romantic sorry website.

## Local pe chalane ke liye

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

`dist/index.html` ek single file banti hai (saara JS/CSS andar hi hota hai), isko kahin bhi host kar sakte ho.

## GitHub Pages pe live karna

1. GitHub pe naya repository banao aur ye poora folder push karo (branch: `main`).
2. Repository mein **Settings → Pages** kholo aur **Source** mein **GitHub Actions** select karo.
3. Push hote hi `.github/workflows/deploy.yml` build karke site deploy kar dega.
4. Site ka link **Settings → Pages** mein ya **Actions** tab ke deploy step mein milega.

## Text badalna

Saara text `src/screens/` ke andar hai. Letter ke end mein apna naam `src/screens/Letter.tsx` mein "Tumhara..." ki jagah likh sakte ho.

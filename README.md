# Adhya ke liye ❤️

Romantic Hinglish sorry website. React + TypeScript + Tailwind CSS + Framer Motion + Lucide.

## GitHub Pages pe live karna (sabse aasan, bina build ke)

Root mein `index.html` already bani-banayi (built) hai, isme saara code andar hi hai.

1. GitHub pe naya repository banao.
2. Is folder ki **saari files** (hidden `.nojekyll` aur `.github` folder samet) repo mein upload/push karo, branch `main`.
3. Repo mein **Settings → Pages** kholo.
4. **Source: Deploy from a branch**, **Branch: main**, **Folder: / (root)**, phir Save.
5. 1-2 minute baad Pages ka link khul jayega (Settings → Pages ke upar dikhta hai).

Agar white screen aaye: check karo ki Folder `/ (root)` select hai aur repo ke root mein `index.html` hai
(kisi subfolder ke andar nahi). `app/index.html` ko host mat karo, wo sirf source hai.

## Source code badalna (`app/` folder)

```bash
cd app
npm install
npm run dev      # local preview
npm run build    # app/dist/index.html banti hai
```

Naya build live karna ho to `app/dist/index.html` ko root wali `index.html` ki jagah copy kar do aur push karo.

Saara text `app/src/screens/` mein hai. Letter ke end mein apna naam `app/src/screens/Letter.tsx` mein "Tumhara..." ke baad jodo.

## Optional: GitHub Actions se auto build

Pages ka Source "GitHub Actions" rakho, phir Actions tab se "Build and deploy (optional)" manually run karo.

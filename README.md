# COVENANT / FORM

A responsive Christian streetwear e-commerce concept built with plain HTML, CSS and JavaScript.

> **Portfolio note:** COVENANT / FORM is a fictional brand created to demonstrate front-end web design and development. Products, testimonials, prices and contact details are sample content.

## Live Demo

Add your GitHub Pages URL here after publishing:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`

## Purpose

This project was created as a reusable starter framework for a modern clothing brand. It combines a premium editorial aesthetic with subtle Christian identity and can later be upgraded to a real e-commerce stack.

## Features

- Responsive multi-page layout
- Home, Shop, Product, Collections, Mission and Contact pages
- Product filtering and sorting
- Dynamic product detail page using URL parameters
- Shopping bag stored in `localStorage`
- Quantity controls and cart counter
- Responsive mobile navigation
- Newsletter and contact form UI
- Local SVG placeholder artwork
- SEO-friendly page titles and meta descriptions
- No build tools or dependencies required
- Works on GitHub Pages

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`

## Project Structure

```text
faithwear-site/
├── index.html
├── shop.html
├── product.html
├── collections.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── hero.svg
│   ├── feature-called.svg
│   ├── category-men.svg
│   ├── category-women.svg
│   ├── collection-called.svg
│   ├── collection-light.svg
│   ├── collection-renewed.svg
│   ├── about-hero.svg
│   └── product-*.svg
└── README.md
```

## Run Locally

### Easiest method
Double-click `index.html`.

### Better method using VS Code
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Choose **Open with Live Server**.

### Python alternative

From inside the project folder:

```bash
python -m http.server 8000
```

Then open:

`http://localhost:8000`

## Image Replacement

The included `.svg` files are visual placeholders so the site works immediately.

Replace them with your own licensed images while keeping the same filenames, or change the paths in the HTML/JavaScript.

Recommended sizes:

| File type | Recommended size | Ratio |
|---|---:|---:|
| Hero | 1800 × 1200 px | 3:2 |
| Category photos | 1400 × 1800 px | 7:9 |
| Product photos | 1200 × 1500 px | 4:5 |
| Collection/editorial | 1600 × 1200 px | 4:3 |
| About hero | 1800 × 900 px | 2:1 |

Use WebP or optimized JPEGs for production.

## GitHub Pages

1. Create a GitHub repository.
2. Upload all project files while preserving the folder structure.
3. Open **Settings** → **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save.
7. GitHub will show the published URL after deployment.

## Git Commands

```bash
git init
git add .
git commit -m "Initial COVENANT FORM site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

For future updates:

```bash
git add .
git commit -m "Update site"
git push
```

## Future Improvements

- Real checkout with Shopify or Stripe
- Product database/CMS
- Authentication
- Inventory
- Real contact/newsletter backend
- Search
- Product color variants
- Customer accounts
- React or Next.js migration
- Analytics
- Production accessibility audit
- Automated testing

## Screenshots

Create a folder called `screenshots/` and add:

- `home-desktop.png`
- `shop-desktop.png`
- `product-desktop.png`
- `home-mobile.png`

Then embed them here:

```md
![Home page](screenshots/home-desktop.png)
```

## License

For learning and portfolio use. Replace all placeholder branding and images before adapting this for a real commercial client.

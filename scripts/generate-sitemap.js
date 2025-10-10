// scripts/generate-sitemap.js
// Script para gerar sitemap.xml automaticamente

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.streetpaint.pt';
const TODAY = new Date().toISOString().split('T')[0];

// Todas as URLs do site com suas configurações
const urls = [
  {
    loc: '/',
    priority: '1.0',
    changefreq: 'weekly',
    alternates: true,
    images: [
      {
        loc: '/logo-street-paint.jpg',
        title: 'Street Paint - Oficina Chapa e Pintura Sintra',
        caption: 'Oficina especializada em reparação automóvel em Sintra',
      },
    ],
  },
  {
    loc: '/services',
    priority: '0.9',
    changefreq: 'monthly',
    alternates: true,
  },
  {
    loc: '/orcamento',
    priority: '0.9',
    changefreq: 'weekly',
    alternates: true,
  },
  {
    loc: '/orcamento/sport',
    priority: '0.7',
    changefreq: 'monthly',
    alternates: false,
  },
  {
    loc: '/orcamento/hatchback',
    priority: '0.7',
    changefreq: 'monthly',
    alternates: false,
  },
  {
    loc: '/orcamento/sedan',
    priority: '0.7',
    changefreq: 'monthly',
    alternates: false,
  },
  {
    loc: '/orcamento/suv',
    priority: '0.7',
    changefreq: 'monthly',
    alternates: false,
  },
  {
    loc: '/orcamento/van',
    priority: '0.7',
    changefreq: 'monthly',
    alternates: false,
  },
  {
    loc: '/orcamento/pickup',
    priority: '0.7',
    changefreq: 'monthly',
    alternates: false,
  },
  {
    loc: '/contact',
    priority: '0.8',
    changefreq: 'monthly',
    alternates: true,
  },
];

function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  urls.forEach(url => {
    xml += '\n  <url>';
    xml += `\n    <loc>${SITE_URL}${url.loc}</loc>`;
    xml += `\n    <lastmod>${TODAY}</lastmod>`;
    xml += `\n    <changefreq>${url.changefreq}</changefreq>`;
    xml += `\n    <priority>${url.priority}</priority>`;

    // Adicionar links alternativos para idiomas
    if (url.alternates) {
      xml += `\n    <xhtml:link rel="alternate" hreflang="pt-PT" href="${SITE_URL}${url.loc}"/>`;
      xml += `\n    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${url.loc}?lang=en"/>`;
    }

    // Adicionar imagens se existirem
    if (url.images) {
      url.images.forEach(img => {
        xml += '\n    <image:image>';
        xml += `\n      <image:loc>${SITE_URL}${img.loc}</image:loc>`;
        xml += `\n      <image:title>${img.title}</image:title>`;
        xml += `\n      <image:caption>${img.caption}</image:caption>`;
        xml += '\n    </image:image>';
      });
    }

    xml += '\n  </url>';
  });

  xml += '\n</urlset>';

  // Salvar o arquivo
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log('✅ Sitemap gerado com sucesso em:', outputPath);
  console.log(`📊 Total de URLs: ${urls.length}`);
}

// Executar
generateSitemap();

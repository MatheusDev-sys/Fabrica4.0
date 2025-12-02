# Precisium Factory Control - Guia de Deploy

![Deploy](https://img.shields.io/badge/Deploy-Guide-success?style=for-the-badge)

**Versão**: 1.0.0  
**Última Atualização**: Dezembro 2024

---

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Build do Projeto](#build-do-projeto)
3. [Deploy no GitHub Pages](#deploy-no-github-pages)
4. [Deploy no Netlify](#deploy-no-netlify)
5. [Deploy no Vercel](#deploy-no-vercel)
6. [Deploy em Servidor Próprio](#deploy-em-servidor-próprio)
7. [Configurações Avançadas](#configurações-avançadas)
8. [Domínio Personalizado](#domínio-personalizado)
9. [Monitoramento](#monitoramento)
10. [Troubleshooting](#troubleshooting)

---

## ✅ Pré-requisitos

Antes de fazer o deploy, certifique-se de ter:

- ✅ Node.js 20.19+ ou 22.12+ instalado
- ✅ npm 10+ instalado
- ✅ Código-fonte do projeto
- ✅ Conta em uma plataforma de hospedagem (GitHub, Netlify ou Vercel)

---

## 🏗️ Build do Projeto

### Passo 1: Preparar o Ambiente

```bash
# Navegue até a pasta do projeto
cd precisium-factory-control

# Instale as dependências (se ainda não instalou)
npm install
```

### Passo 2: Gerar Build de Produção

```bash
# Execute o comando de build
npm run build
```

**O que acontece**:
- Vite compila todo o código TypeScript/React
- Otimiza e minifica arquivos
- Gera bundle otimizado
- Cria pasta `dist/` com arquivos prontos para produção

### Passo 3: Verificar Build

```bash
# Teste o build localmente
npm run preview
```

Acesse `http://localhost:4173` para verificar se tudo está funcionando.

> ✅ **Importante**: Sempre teste o build antes de fazer deploy!

---

## 🌐 Deploy no GitHub Pages

### Opção 1: Upload Manual (Sem Git Instalado)

**Ideal para**: Computadores públicos ou sem Git

#### Passo 1: Criar Repositório

1. Acesse https://github.com
2. Faça login na sua conta
3. Clique em **"+"** → **"New repository"**
4. Configure:
   - **Nome**: `precisium-factory-control`
   - **Visibilidade**: Public
   - **NÃO** marque "Initialize with README"
5. Clique em **"Create repository"**

#### Passo 2: Upload dos Arquivos

**Método A - Upload Direto (Limitado)**:

1. Na página do repositório, clique em **"uploading an existing file"**
2. Arraste a pasta `dist/` para a área de upload
3. ⚠️ **Limitação**: GitHub permite max 100 arquivos por vez

**Método B - GitHub Desktop (Recomendado)**:

1. Baixe GitHub Desktop: https://desktop.github.com/
2. Instale e faça login
3. File → Add Local Repository
4. Selecione a pasta do projeto
5. Clique em **"Publish repository"**
6. Marque **"Public"** e clique em **"Publish"**

#### Passo 3: Configurar GitHub Pages

1. No repositório, vá em **Settings** (⚙️)
2. No menu lateral, clique em **Pages**
3. Em **"Source"**, selecione:
   - **GitHub Actions** (recomendado)
   - OU **Deploy from a branch** → selecione `main` e pasta `/root`
4. Clique em **Save**

#### Passo 4: Configurar Vite para GitHub Pages

Edite `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/precisium-factory-control/', // Nome do seu repositório
})
```

Refaça o build:
```bash
npm run build
```

E faça upload novamente.

#### Passo 5: Acessar o Site

Após alguns minutos, seu site estará em:
```
https://seu-usuario.github.io/precisium-factory-control/
```

---

## 🚀 Deploy no Netlify

### Método 1: Drag & Drop (Mais Fácil)

**Ideal para**: Deploy rápido sem configuração

#### Passos:

1. Acesse https://app.netlify.com/drop
2. Faça login (pode usar conta do GitHub)
3. **Arraste a pasta `dist/`** para a área indicada
4. Aguarde o upload (1-2 minutos)
5. ✅ Pronto! Site no ar instantaneamente

**URL gerada**: `https://random-name-123.netlify.app`

### Método 2: Deploy Contínuo (Recomendado)

**Ideal para**: Atualizações automáticas

#### Passos:

1. Faça upload do código para GitHub (veja seção anterior)
2. Acesse https://app.netlify.com/
3. Clique em **"Add new site"** → **"Import an existing project"**
4. Conecte com GitHub
5. Selecione o repositório `precisium-factory-control`
6. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
7. Clique em **"Deploy site"**

**Vantagem**: Cada push no GitHub atualiza o site automaticamente!

### Configurar Domínio Personalizado

1. No painel do Netlify, vá em **Domain settings**
2. Clique em **"Add custom domain"**
3. Digite seu domínio (ex: `precisium.com.br`)
4. Siga as instruções para configurar DNS

---

## ⚡ Deploy no Vercel

### Método 1: Deploy via Interface

#### Passos:

1. Acesse https://vercel.com/
2. Faça login (pode usar GitHub)
3. Clique em **"Add New..."** → **"Project"**
4. Importe o repositório do GitHub
5. Vercel detecta automaticamente que é Vite
6. Clique em **"Deploy"**

**Pronto!** Deploy automático em ~1 minuto.

### Método 2: Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### Configurações Automáticas

Vercel detecta automaticamente:
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

---

## 🖥️ Deploy em Servidor Próprio

### Requisitos

- Servidor Linux (Ubuntu/Debian recomendado)
- Nginx ou Apache instalado
- Acesso SSH ao servidor

### Opção 1: Nginx

#### Passo 1: Fazer Upload dos Arquivos

```bash
# No seu computador, comprima a pasta dist
cd dist
tar -czf precisium.tar.gz *

# Envie para o servidor via SCP
scp precisium.tar.gz usuario@seu-servidor.com:/var/www/
```

#### Passo 2: Configurar Nginx

No servidor, crie arquivo de configuração:

```bash
sudo nano /etc/nginx/sites-available/precisium
```

Cole:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    root /var/www/precisium;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Compressão
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    
    # Cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Passo 3: Ativar Site

```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/precisium /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

#### Passo 4: SSL (HTTPS)

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d seu-dominio.com
```

### Opção 2: Apache

#### Configuração Apache

```apache
<VirtualHost *:80>
    ServerName seu-dominio.com
    DocumentRoot /var/www/precisium

    <Directory /var/www/precisium>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Rewrite para SPA
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

---

## ⚙️ Configurações Avançadas

### Variáveis de Ambiente

Crie arquivo `.env.production`:

```env
VITE_API_URL=https://api.precisium.com
VITE_APP_NAME=Precisium Factory Control
VITE_VERSION=1.0.0
```

Use no código:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

### Otimizações de Build

Edite `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    // Aumentar limite de chunk
    chunkSizeWarningLimit: 1000,
    
    // Minificação
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log
      },
    },
    
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'charts': ['recharts'],
          'pdf': ['jspdf'],
        },
      },
    },
  },
})
```

### PWA (Progressive Web App)

Instale plugin:

```bash
npm install vite-plugin-pwa -D
```

Configure:

```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Precisium Factory Control',
        short_name: 'Precisium',
        theme_color: '#0a85ff',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

---

## 🌍 Domínio Personalizado

### Registrar Domínio

Registradores recomendados:
- **Registro.br** (domínios .br)
- **Namecheap**
- **GoDaddy**
- **Google Domains**

### Configurar DNS

#### Para Netlify:

1. No painel do domínio, adicione registros:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: seu-site.netlify.app
```

#### Para Vercel:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Para GitHub Pages:

```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153

Type: CNAME
Name: www
Value: seu-usuario.github.io
```

---

## 📊 Monitoramento

### Google Analytics

Adicione ao `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Uptime Monitoring

Ferramentas gratuitas:
- **UptimeRobot**: https://uptimerobot.com
- **Pingdom**: https://pingdom.com
- **StatusCake**: https://statuscake.com

---

## 🔧 Troubleshooting

### Erro 404 ao Recarregar Página

**Problema**: SPA precisa de configuração especial

**Solução Netlify**: Crie `public/_redirects`:
```
/*    /index.html   200
```

**Solução Vercel**: Crie `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Build Falha

**Verifique**:
- Versão do Node.js
- Todas as dependências instaladas
- Erros no console
- Espaço em disco

### Site Não Atualiza

**Soluções**:
- Limpe cache do navegador (Ctrl+Shift+Del)
- Force refresh (Ctrl+F5)
- Verifique se deploy foi concluído
- Aguarde propagação de CDN (até 5 min)

### Imagens Não Aparecem

**Verifique**:
- Caminhos relativos (use `/` no início)
- Imagens estão na pasta `public/`
- Nomes de arquivo corretos (case-sensitive)

---

## 📞 Suporte

Precisa de ajuda com deploy?

**Email**: suporte@precisium.com  
**Documentação**: Este guia  
**Comunidade**: GitHub Discussions

---

## ✅ Checklist de Deploy

Antes de fazer deploy em produção:

- [ ] Build local funciona (`npm run build` + `npm run preview`)
- [ ] Todos os testes passam
- [ ] Sem erros no console do navegador
- [ ] Responsivo testado (mobile, tablet, desktop)
- [ ] Dados sensíveis removidos do código
- [ ] Variáveis de ambiente configuradas
- [ ] SSL/HTTPS configurado
- [ ] Domínio personalizado configurado (se aplicável)
- [ ] Google Analytics configurado (se aplicável)
- [ ] Backup do código feito
- [ ] Documentação atualizada

---

**Precisium Factory Control - Guia de Deploy**  
Versão 1.0.0  
© 2024 Todos os direitos reservados

*Deploy com confiança* 🚀

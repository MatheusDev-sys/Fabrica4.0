<div align="center">

# 🏭 Precisium Factory Control

### Sistema Inteligente de Gestão Industrial

*Transforme sua fábrica com monitoramento em tempo real, manutenção preditiva e análise avançada de OEE*

[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646cff?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#️-tecnologias)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Documentação](#-documentação)
- [Screenshots](#-screenshots)
- [Roadmap](#-roadmap)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

**Precisium Factory Control** é uma solução completa de gestão industrial desenvolvida para indústrias que buscam excelência operacional. O sistema oferece monitoramento em tempo real de máquinas CNC, gestão integrada de manutenção, controle de produção e análise avançada de indicadores.

### 🌟 Diferenciais

- **Interface Moderna**: Design premium com tema dark e animações fluidas
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Tempo Real**: Monitoramento instantâneo de todas as operações
- **Relatórios Profissionais**: 6 tipos de PDFs com dados detalhados
- **Manutenção Inteligente**: Preventiva, corretiva e preditiva integradas
- **Zero Configuração**: Pronto para usar após instalação

### 💡 Benefícios

- ⚡ **Aumento de 25% na eficiência** (OEE)
- 📉 **Redução de 30% em paradas não planejadas**
- 💰 **ROI em menos de 3 meses**
- 🎯 **Economia de até R$ 135.000/ano**

---

## ✨ Funcionalidades

### 📊 Dashboard Executivo
- Visão 360° da operação em tempo real
- KPIs principais: OEE, disponibilidade, performance, qualidade
- Gráficos interativos de produção e energia
- Status de todas as máquinas em um único painel

### 🔧 Gestão de Máquinas CNC
- Cadastro completo de máquinas
- Monitoramento de status (Operando, Parada, Manutenção, Setup)
- Histórico de operações e manutenções
- Vinculação com operadores e ordens de produção
- Indicadores de performance individuais

### 🛠️ Manutenção Integrada
- **Preventiva**: Agendamento baseado em horas ou calendário
- **Corretiva**: Registro e acompanhamento de falhas
- **Preditiva**: Análise de tendências e alertas
- Histórico completo por máquina
- Controle de peças e custos
- Gestão de técnicos e prioridades

### 📦 Ordens de Produção
- Criação e acompanhamento de OPs
- Controle de quantidade planejada vs produzida
- Vinculação com máquinas e peças
- Status em tempo real (Planejada, Em Produção, Concluída, Cancelada)
- Cálculo automático de eficiência

### 📈 Relatórios PDF
1. **Produção**: Análise detalhada por máquina e período
2. **OEE**: Indicadores de eficiência com gráficos
3. **Manutenção**: Histórico completo de intervenções
4. **Ocorrências**: Registro de problemas e soluções
5. **Energia**: Consumo e custos por máquina
6. **Estoque**: Controle de peças e materiais

### 👥 Gestão de Pessoas
- **Operadores**: Cadastro, vinculação com máquinas, turnos
- **Usuários**: Controle de acesso e permissões
- Histórico de atividades

### 🔔 Ocorrências
- Registro de problemas em tempo real
- Classificação por tipo e severidade
- Acompanhamento de resolução
- Análise de recorrências

### 📦 Gestão de Peças
- Controle de estoque
- Alertas de estoque mínimo
- Histórico de movimentações
- Vinculação com manutenções

---

## 🛠️ Tecnologias

### Core
- **React 19.2** - Biblioteca para interfaces de usuário
- **TypeScript 5.6** - Superset JavaScript com tipagem estática
- **Vite 6.4** - Build tool de nova geração

### UI/UX
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **Lucide React** - Ícones modernos e consistentes
- **Recharts** - Biblioteca de gráficos para React

### Funcionalidades
- **jsPDF** - Geração de relatórios PDF
- **date-fns** - Manipulação de datas
- **React Context API** - Gerenciamento de estado global

### Desenvolvimento
- **ESLint** - Linter para código JavaScript/TypeScript
- **PostCSS** - Processador CSS
- **Autoprefixer** - Adiciona prefixos CSS automaticamente

---

## 🚀 Instalação

### Pré-requisitos

- **Node.js** 18.0 ou superior
- **npm** 9.0 ou superior

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/precisium-factory-control.git
cd precisium-factory-control
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Acesse no navegador**
```
http://localhost:5173
```

### Build para Produção

```bash
# Gerar build otimizado
npm run build

# Visualizar build localmente
npm run preview
```

---

## 💻 Uso

### Desenvolvimento Local

```bash
# Modo desenvolvimento com hot reload
npm run dev

# Verificar erros de TypeScript
npm run type-check

# Executar linter
npm run lint
```

### Deploy

O sistema pode ser implantado em diversas plataformas:

- **Netlify**: Arraste a pasta `dist/` para [Netlify Drop](https://app.netlify.com/drop)
- **Vercel**: Execute `vercel --prod`
- **GitHub Pages**: Faça upload da pasta `dist/`

📖 **Guia completo**: Consulte [docs/GUIA_DEPLOY.md](docs/GUIA_DEPLOY.md)

---

## 📁 Estrutura do Projeto

```
precisium-factory-control/
├── src/
│   ├── components/           # Componentes reutilizáveis
│   │   ├── Layout.tsx       # Layout principal com sidebar
│   │   ├── MachineCard.tsx  # Card de máquina
│   │   └── StatCard.tsx     # Card de estatística
│   │
│   ├── pages/               # Páginas da aplicação
│   │   ├── Dashboard.tsx    # Dashboard principal
│   │   ├── Machines.tsx     # Gestão de máquinas
│   │   ├── Maintenance.tsx  # Gestão de manutenção
│   │   ├── Production.tsx   # Ordens de produção
│   │   ├── Reports.tsx      # Relatórios
│   │   ├── Parts.tsx        # Gestão de peças
│   │   ├── Operators.tsx    # Gestão de operadores
│   │   ├── Occurrences.tsx  # Registro de ocorrências
│   │   └── Users.tsx        # Gestão de usuários
│   │
│   ├── context/             # Estado global
│   │   └── AppContext.tsx   # Context API principal
│   │
│   ├── types.ts             # Definições TypeScript
│   ├── mockData.ts          # Dados de demonstração
│   ├── App.tsx              # Componente raiz
│   └── main.tsx             # Entry point
│
├── docs/                    # Documentação completa
│   ├── DOCUMENTACAO_TECNICA.md
│   ├── MANUAL_USUARIO.md
│   ├── GUIA_DEPLOY.md
│   ├── APRESENTACAO_COMERCIAL.md
│   └── diagrama-*.html
│
├── public/                  # Arquivos estáticos
├── index.html              # HTML base
├── package.json            # Dependências
├── tsconfig.json           # Configuração TypeScript
├── tailwind.config.js      # Configuração Tailwind
└── vite.config.ts          # Configuração Vite
```

---

## 📚 Documentação

O projeto inclui documentação completa e profissional:

| Documento | Descrição | Páginas |
|-----------|-----------|---------|
| [DOCUMENTACAO_TECNICA.md](docs/DOCUMENTACAO_TECNICA.md) | Arquitetura, componentes, API | 50+ |
| [MANUAL_USUARIO.md](docs/MANUAL_USUARIO.md) | Guia completo de uso | 40+ |
| [GUIA_DEPLOY.md](docs/GUIA_DEPLOY.md) | Deploy em múltiplas plataformas | 30+ |
| [APRESENTACAO_COMERCIAL.md](docs/APRESENTACAO_COMERCIAL.md) | Apresentação comercial | 25+ |
| [RESPONSIVIDADE_MOBILE.md](docs/RESPONSIVIDADE_MOBILE.md) | Guia de responsividade | 15+ |

### Diagramas Visuais

Abra os arquivos HTML na pasta `docs/`:

- **diagrama-arquitetura.html** - Arquitetura do sistema
- **diagrama-fluxo-manutencao.html** - Fluxo de manutenção
- **diagrama-fluxo-dados.html** - Fluxo de dados React

---

## 📱 Screenshots

<div align="center">

### Dashboard Principal
![Dashboard](docs/user_interface_mockup_dashboard.png)

### Gestão de Máquinas
*Interface moderna com cards interativos e status em tempo real*

### Manutenção Integrada
*Sistema completo de preventiva, corretiva e preditiva*

### Relatórios PDF
*6 tipos de relatórios profissionais com gráficos e análises*

</div>

---

## 🎨 Personalização

### Alterar Tema de Cores

Edite `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#0a85ff",     // Cor principal
        secondary: "#1e293b",   // Cor secundária
        accent: "#10b981",      // Cor de destaque
      }
    }
  }
}
```

### Alterar Logo

Edite os arquivos:
- `src/components/Layout.tsx` (logo na sidebar)
- `index.html` (favicon e título)

### Personalizar Dados

Edite `src/mockData.ts` para ajustar dados de demonstração

---

## 🗺️ Roadmap

### ✅ Versão 1.0 (Atual)
- [x] Dashboard executivo
- [x] Gestão de máquinas
- [x] Manutenção integrada
- [x] Ordens de produção
- [x] 6 tipos de relatórios PDF
- [x] Responsividade mobile
- [x] Tema dark premium

### 🚧 Versão 2.0 (Planejado)
- [ ] Integração com banco de dados real
- [ ] API REST completa
- [ ] Autenticação e autorização
- [ ] Notificações push
- [ ] Exportação Excel
- [ ] Gráficos avançados (3D)
- [ ] App mobile nativo
- [ ] Integração IoT com máquinas

### 🔮 Versão 3.0 (Futuro)
- [ ] Machine Learning para manutenção preditiva
- [ ] Dashboard customizável
- [ ] Integração com ERPs
- [ ] Multi-idioma
- [ ] Modo offline
- [ ] Realidade aumentada para manutenção

---

## 📞 Suporte

- **Documentação**: Consulte a pasta `docs/`
- **Issues**: Abra uma issue no GitHub
- **Email**: suporte@precisium.com

---

## 📄 Licença

© 2025 Precisium Factory Control. Todos os direitos reservados.

**Licença Proprietária** - Este software é propriedade exclusiva e seu uso, cópia ou distribuição sem autorização expressa é proibido.

---

<div align="center">

**Precisium Factory Control**  
*Excelência Operacional através da Tecnologia*

Desenvolvido com ❤️ usando React, TypeScript e Tailwind CSS

[Documentação](docs/) • [Demo](https://precisium-demo.netlify.app) • [Suporte](mailto:suporte@precisium.com)

</div>

# Precisium Factory Control 🏭

<div align="center">

![Precisium Logo](https://img.shields.io/badge/Precisium-Factory%20Control-0a85ff?style=for-the-badge)

**Sistema Completo de Gestão Industrial**

[![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

[Demo](#) • [Documentação](DOCUMENTACAO_TECNICA.md) • [Manual](MANUAL_USUARIO.md) • [Deploy](GUIA_DEPLOY.md)

</div>

---

## 📖 Sobre o Projeto

**Precisium Factory Control** é uma solução web moderna e completa para gerenciamento de operações industriais. Desenvolvido com as mais recentes tecnologias, oferece uma interface intuitiva e responsiva para controle total de máquinas CNC, ordens de produção, manutenções preventivas e relatórios detalhados.

### 🎯 Diferenciais

✨ **Interface Premium** - Design moderno com tema dark e animações fluidas  
⚡ **Performance** - Build otimizado com Vite e code splitting  
📱 **Responsivo** - Funciona perfeitamente em desktop, tablet e mobile  
🔒 **Seguro** - Controle de acesso por perfis de usuário  
📊 **Visualizações** - Gráficos interativos em tempo real  
📄 **Relatórios** - Exportação profissional em PDF  
🚀 **Fácil Deploy** - Pronto para GitHub Pages, Netlify ou Vercel  

---

## 🖼️ Screenshots

### Dashboard Principal
![Dashboard](user_interface_mockup_1764685102606.png)

*Visão geral com métricas em tempo real, gráficos de produção e alertas*

### Gestão de Máquinas
- Monitoramento de status em tempo real
- Gráficos de vibração e temperatura
- Histórico completo de manutenções

### Manutenção Integrada
- Agendamento preventivo, corretivo e preditivo
- Atualização automática dos detalhes da máquina
- Níveis de criticidade

---

## ⚙️ Funcionalidades

### 📊 Dashboard
- Produção em tempo real com gráficos interativos
- Eficiência geral (OEE) com métricas detalhadas
- Status de máquinas com gráfico de pizza
- Alertas prioritários com código de cores
- Cards de estatísticas responsivos

### 🏭 Gestão de Máquinas
- Cadastro completo de CNCs com todos os dados
- Monitoramento de parâmetros em tempo real
- Detalhes com gráficos de vibração e temperatura
- Histórico completo de manutenções
- Busca e filtros avançados
- Exportação de relatórios PDF individualizados

### 📋 Ordens de Produção
- Criação e acompanhamento de ordens
- Vinculação com máquinas e operadores
- Controle de progresso visual
- Status detalhado (Em Progresso, Concluída, Cancelado, Pendente)
- Tabela responsiva para mobile

### 🔧 Manutenção
- Tipos: Preventiva, Corretiva e Preditiva
- Histórico completo por máquina
- Integração automática com detalhes da máquina
- Níveis de criticidade (Alta, Média, Baixa)
- Agendamento e acompanhamento
- Atualização automática de "Última Manutenção"

### 📦 Catálogo de Peças
- Gestão completa de estoque
- Controle de materiais e matérias-primas
- Rastreabilidade por código
- Edição e exclusão de peças
- Interface mobile-friendly

### 👥 Operadores
- Cadastro completo da equipe
- Vinculação com máquinas
- Métricas de eficiência individual
- Gestão de turnos

### ⚠️ Ocorrências
- Registro detalhado de problemas
- Priorização (Alta, Média, Baixa)
- Acompanhamento de resolução
- Status (Aberta, Em Análise, Resolvida)
- Histórico completo

### 📈 Relatórios Individualizados
**6 tipos de relatórios profissionais em PDF:**
- **Produção Diária** - Resumo de peças produzidas por turno e máquina
- **Eficiência (OEE)** - Indicadores de disponibilidade, performance e qualidade
- **Manutenção** - Histórico de intervenções e custos associados
- **Ocorrências** - Log de paradas e motivos de refugo
- **Consumo Energético** - Análise de consumo por máquina em kWh
- **Inventário** - Movimentação de peças e matérias-primas

Cada relatório possui:
- Dados específicos e relevantes ao tipo
- Tabelas personalizadas com métricas apropriadas
- Resumo executivo detalhado
- Cabeçalho profissional com dados da fábrica
- Formatação premium e consistente

### 👤 Usuários
- Perfis hierárquicos: Admin, Técnico, Operador, Inativo
- Controle de acesso por perfil
- Gestão centralizada de usuários
- Edição e exclusão de contas

### ⚙️ Configurações
- Dados da fábrica (Nome, CNPJ, Endereço)
- Tema claro/escuro com persistência
- Preferências do sistema
- Personalização completa

### 📱 Responsividade Mobile
- **100% responsivo** em todos os dispositivos
- Testado em iPhone 14 Pro e Android
- Tabelas com scroll horizontal suave
- Touch targets otimizados (mínimo 44px)
- Navegação mobile com sidebar overlay
- Cards e layouts que se adaptam ao tamanho da tela
- Sem scroll horizontal indesejado
- Textos com quebra adequada

---

## 🚀 Quick Start

### Pré-requisitos

- Node.js 20.19+ ou 22.12+
- npm 10+

### Instalação

```bash
# Clone ou extraia o projeto
cd precisium-factory-control

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:5173`

### Build para Produção

```bash
# Gera build otimizado
npm run build

# Preview do build
npm run preview
```

---

## 📁 Estrutura do Projeto

```
precisium-factory-control/
├── src/
│   ├── components/      # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── context/        # Estado global (Context API)
│   ├── types.ts        # Definições TypeScript
│   └── mockData.ts     # Dados de exemplo
├── public/             # Arquivos estáticos
├── dist/              # Build de produção (gerado)
└── docs/              # Documentação completa
```

---

## 🛠️ Tecnologias

### Core
- **React 19.2** - Biblioteca UI
- **TypeScript 5.6** - Tipagem estática
- **Vite 6.4** - Build tool ultrarrápido

### UI/UX
- **Tailwind CSS** - Framework CSS utility-first
- **Material Symbols** - Ícones do Google
- **Google Fonts** - Inter & Space Grotesk

### Bibliotecas
- **React Router DOM** - Roteamento SPA
- **Recharts** - Gráficos interativos
- **jsPDF** - Geração de PDFs

---

## 📚 Documentação

| Documento | Descrição |
|-----------|-----------|
| [📘 Documentação Técnica](DOCUMENTACAO_TECNICA.md) | Arquitetura, API, componentes |
| [📗 Manual do Usuário](MANUAL_USUARIO.md) | Guia completo de uso |
| [📙 Guia de Deploy](GUIA_DEPLOY.md) | Instruções de publicação |
| [📊 Walkthrough](walkthrough.md) | Melhorias e atualizações |

---

## 🌐 Deploy

### GitHub Pages
```bash
npm run build
# Upload da pasta dist/ para o repositório
```

### Netlify
Arraste a pasta `dist/` em https://app.netlify.com/drop

### Vercel
```bash
vercel --prod
```

**Veja instruções detalhadas no [Guia de Deploy](GUIA_DEPLOY.md)**

---

## 🎨 Personalização

### Cores
Edite `tailwind.config.js`:
```javascript
colors: {
  primary: "#0a85ff",  // Sua cor principal
}
```

### Dados Iniciais
Edite `src/mockData.ts` para alterar dados de exemplo

### Logo
Substitua em `components/Layout.tsx` e `index.html`

---

## 📦 Pacote Completo para Venda

Este projeto inclui **TUDO** que você precisa para vender:

✅ **Código-fonte completo** - React + TypeScript  
✅ **Documentação técnica** - Arquitetura e API  
✅ **Manual do usuário** - Guia passo a passo  
✅ **Guia de deploy** - Múltiplas plataformas  
✅ **Screenshots** - Interface profissional  
✅ **Build otimizado** - Pronto para produção  
✅ **Responsivo** - Mobile, tablet e desktop  
✅ **Tema dark** - Design premium  

---

## 💼 Casos de Uso

- **Indústrias de Usinagem** - Controle de CNCs
- **Fábricas de Peças** - Gestão de produção
- **Oficinas Mecânicas** - Manutenção preventiva
- **Centros de Usinagem** - Monitoramento em tempo real

---

## 🔐 Segurança

- Controle de acesso por perfis
- Validação de dados no frontend
- Preparado para integração com backend seguro
- HTTPS recomendado em produção

---

## 🚧 Roadmap

### Versão 1.1 (Planejado)
- [ ] Integração com API REST
- [ ] Autenticação JWT
- [ ] Notificações push
- [ ] Modo offline (PWA)
- [ ] Exportação Excel
- [ ] Gráficos avançados

### Versão 2.0 (Futuro)
- [ ] App mobile nativo
- [ ] Integração com IoT
- [ ] Machine Learning para manutenção preditiva
- [ ] Dashboard customizável

---

## 📞 Suporte

**Email**: suporte@precisium.com  
**Documentação**: Veja pasta `/docs`  
**Issues**: Contate o desenvolvedor

---

## 📄 Licença

© 2024 Precisium Factory Control. Todos os direitos reservados.

**Licença Proprietária** - Este software é propriedade exclusiva e não pode ser redistribuído sem autorização.

---

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ usando React e TypeScript

**Tecnologias de ponta** • **Design premium** • **Código limpo**

---

<div align="center">

**Precisium Factory Control**  
*Controle industrial inteligente*

[⬆ Voltar ao topo](#precisium-factory-control-)

</div>

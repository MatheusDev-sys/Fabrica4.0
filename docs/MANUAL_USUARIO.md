# Precisium Factory Control - Manual do Usuário

![Precisium](https://img.shields.io/badge/Precisium-Manual%20do%20Usu%C3%A1rio-0a85ff?style=for-the-badge)

**Versão**: 1.0.0  
**Data**: Dezembro 2024

---

## 📖 Índice

1. [Introdução](#introdução)
2. [Primeiros Passos](#primeiros-passos)
3. [Dashboard](#dashboard)
4. [Gestão de Máquinas](#gestão-de-máquinas)
5. [Ordens de Produção](#ordens-de-produção)
6. [Manutenção](#manutenção)
7. [Catálogo de Peças](#catálogo-de-peças)
8. [Operadores](#operadores)
9. [Ocorrências](#ocorrências)
10. [Usuários](#usuários)
11. [Relatórios](#relatórios)
12. [Configurações](#configurações)
13. [Perguntas Frequentes](#perguntas-frequentes)
14. [Solução de Problemas](#solução-de-problemas)

---

## 🎯 Introdução

Bem-vindo ao **Precisium Factory Control**! Este sistema foi desenvolvido para facilitar o gerenciamento completo de operações industriais, permitindo monitorar máquinas, controlar produção, agendar manutenções e gerar relatórios de forma simples e eficiente.

### Para Quem é Este Sistema?

- **Gestores de Produção**: Acompanhamento em tempo real
- **Técnicos de Manutenção**: Agendamento e histórico
- **Operadores**: Controle de ordens de produção
- **Administradores**: Gestão completa do sistema

---

## 🚀 Primeiros Passos

### Acessando o Sistema

1. Abra seu navegador (Chrome, Firefox, Edge ou Safari)
2. Digite o endereço do sistema (fornecido pelo administrador)
3. Você verá a tela de login

### Login

**Credenciais Padrão** (altere após primeiro acesso):
- **Usuário**: admin@precisium.com
- **Senha**: admin123

> ⚠️ **Importante**: Altere sua senha no primeiro acesso em Configurações → Segurança

### Interface Principal

Após o login, você verá:

- **Barra Superior**: Logo, notificações e perfil do usuário
- **Menu Lateral**: Navegação entre módulos
- **Área Central**: Conteúdo da página atual

#### Navegação

Clique nos itens do menu lateral para acessar:
- 📊 **Dashboard** - Visão geral
- 🏭 **Máquinas** - Gestão de equipamentos
- 📋 **Ordens de Produção** - Controle de produção
- 🔧 **Manutenção** - Agendamento e histórico
- 📦 **Catálogo de Peças** - Estoque
- 👥 **Operadores** - Gestão de equipe
- ⚠️ **Ocorrências** - Registro de problemas
- 📈 **Relatórios** - Análises e exportações
- 👤 **Usuários** - Gestão de acessos
- ⚙️ **Configurações** - Preferências

---

## 📊 Dashboard

O Dashboard é sua central de comando, mostrando informações em tempo real.

### Métricas Principais

**Cards de Estatísticas**:
1. **Produção do Dia**: Total de peças produzidas
2. **Eficiência Geral (OEE)**: Percentual de eficiência
3. **CNCs em Operação**: Máquinas ativas / total
4. **Paradas Ativas**: Máquinas paradas no momento

### Gráficos

**Produção por Hora**:
- Mostra a produção das últimas 8 horas
- Linha azul indica quantidade produzida
- Passe o mouse sobre o gráfico para ver detalhes

**Status das Máquinas**:
- Gráfico de pizza mostrando distribuição
- 🟢 Verde: Operando
- 🔴 Vermelho: Parada
- 🔵 Azul: Manutenção
- 🟡 Amarelo: Ociosa

### Alertas Recentes

Seção inferior mostra alertas por prioridade:
- 🔴 **Alta**: Requer ação imediata
- 🟡 **Média**: Atenção necessária
- 🔵 **Baixa**: Informativo

---

## 🏭 Gestão de Máquinas

### Visualizar Máquinas

1. Clique em **Máquinas** no menu lateral
2. Veja a lista de todas as máquinas CNC
3. Cada card mostra:
   - Nome e modelo da máquina
   - Status atual (com indicador colorido)
   - Horas trabalhadas
   - Data da última manutenção

### Filtrar Máquinas

Use os botões no topo para filtrar por status:
- **Todas**: Mostra todas as máquinas
- **Operando**: Apenas máquinas em operação
- **Parada**: Máquinas paradas
- **Manutenção**: Em manutenção

### Ver Detalhes de uma Máquina

1. Clique em qualquer máquina da lista
2. Você verá:
   - **Informações Gerais**: Nome, modelo, fabricante, ano
   - **Status Atual**: Indicador visual grande
   - **Gráfico de Vibração**: Níveis em tempo real
   - **Parâmetros de Usinagem**: Avanço, rotação, temperatura
   - **Histórico de Manutenção**: Última manutenção e próxima agendada

### Exportar Relatório da Máquina

1. Na página de detalhes, clique em **Exportar Relatório**
2. Um PDF será gerado automaticamente com:
   - Dados da máquina
   - Status atual
   - Métricas
   - Histórico de manutenção
3. O arquivo será baixado para seu computador

> 💡 **Dica**: Use este relatório para documentar inspeções

---

## 📋 Ordens de Produção

### Visualizar Ordens

1. Acesse **Ordens de Produção** no menu
2. Veja todas as ordens em formato de tabela
3. Colunas mostram:
   - ID da ordem
   - Peça a ser produzida
   - Quantidade
   - Operador responsável
   - Máquina utilizada
   - Progresso (%)
   - Status

### Criar Nova Ordem

1. Clique no botão **+ Nova Ordem**
2. Preencha o formulário:
   - **Peça**: Selecione do catálogo
   - **Quantidade**: Número de peças
   - **Operador**: Selecione da lista
   - **Máquina**: Escolha a máquina CNC
3. Clique em **Criar Ordem**

### Acompanhar Progresso

- A barra de progresso mostra % de conclusão
- Status possíveis:
  - 🔵 **Pendente**: Aguardando início
  - 🟡 **Em Progresso**: Em produção
  - 🟢 **Concluída**: Finalizada
  - 🔴 **Cancelado**: Cancelada

### Ver Detalhes de uma Ordem

1. Clique no ID da ordem (ex: OP-10531)
2. Veja informações completas:
   - Todos os dados da ordem
   - Histórico de alterações
   - Tempo estimado vs real

---

## 🔧 Manutenção

### Tipos de Manutenção

- **Preventiva**: Agendada regularmente
- **Corretiva**: Após falha ou problema
- **Preditiva**: Baseada em análise de dados

### Visualizar Manutenções

1. Acesse **Manutenção** no menu
2. Escolha a visualização:
   - **Histórico**: Todas as manutenções
   - **Preventivas**: Apenas preventivas pendentes

### Agendar Manutenção

1. Clique em **Agendar**
2. Preencha o formulário:
   - **Máquina**: Selecione da lista
   - **Tipo**: Preventiva, Corretiva ou Preditiva
   - **Data**: Quando será realizada
   - **Descrição**: Detalhes do serviço
3. Clique em **Agendar**

> ✅ **Importante**: Ao agendar, a manutenção aparecerá automaticamente nos detalhes da máquina

### Marcar Manutenção como Concluída

1. Na lista de manutenções, encontre a manutenção realizada
2. Clique no botão **✓** (check verde)
3. O sistema automaticamente:
   - Muda o status para "Concluída"
   - Atualiza a data de última manutenção da máquina
   - Registra o tipo de manutenção realizada

### Níveis de Criticidade

- 🔴 **Alta**: Urgente, pode afetar produção
- 🟡 **Média**: Importante, agendar em breve
- 🔵 **Baixa**: Rotina, sem urgência

---

## 📦 Catálogo de Peças

### Visualizar Peças

1. Acesse **Catálogo de Peças**
2. Veja todas as peças cadastradas
3. Informações mostradas:
   - Código da peça
   - Nome
   - Material
   - Estoque disponível

### Adicionar Nova Peça

1. Clique em **+ Nova Peça**
2. Preencha:
   - **Código**: Identificador único (ex: PFC-001)
   - **Nome**: Nome descritivo
   - **Material**: Tipo de material
   - **Estoque**: Quantidade inicial
3. Clique em **Adicionar**

### Editar Peça

1. Clique no ícone de edição (lápis) na linha da peça
2. Altere as informações necessárias
3. Clique em **Salvar**

### Excluir Peça

1. Clique no ícone de lixeira
2. Confirme a exclusão

> ⚠️ **Atenção**: Peças em uso em ordens ativas não podem ser excluídas

---

## 👥 Operadores

### Visualizar Operadores

1. Acesse **Operadores**
2. Veja lista com:
   - Nome do operador
   - Turno de trabalho
   - Eficiência (%)
   - Máquinas vinculadas

### Adicionar Operador

1. Clique em **+ Novo Operador**
2. Preencha:
   - **Nome**: Nome completo
   - **Email**: Email corporativo
   - **Turno**: Manhã, Tarde ou Noite
3. Clique em **Adicionar**

### Vincular Máquinas a um Operador

1. Clique no botão **Editar** do operador
2. Selecione as máquinas que ele opera
3. Clique em **Salvar**

> 💡 **Dica**: Vincular máquinas ajuda no controle de responsabilidades

---

## ⚠️ Ocorrências

### Registrar Ocorrência

1. Acesse **Ocorrências**
2. Clique em **+ Nova Ocorrência**
3. Preencha:
   - **Título**: Resumo do problema
   - **Máquina**: Equipamento afetado
   - **Prioridade**: Alta, Média ou Baixa
   - **Descrição**: Detalhes completos
4. Clique em **Registrar**

### Acompanhar Ocorrências

Status possíveis:
- 🔴 **Aberta**: Recém registrada
- 🟡 **Em Análise**: Sendo investigada
- 🟢 **Resolvida**: Problema solucionado

### Resolver Ocorrência

1. Encontre a ocorrência na lista
2. Clique no botão **Resolver**
3. Status muda para "Resolvida"

---

## 👤 Usuários

> 🔒 **Acesso Restrito**: Apenas administradores

### Perfis de Usuário

- **Admin**: Acesso total ao sistema
- **Técnico**: Acesso a manutenção e máquinas
- **Operador**: Acesso a ordens e produção
- **Inativo**: Sem acesso (desativado)

### Adicionar Usuário

1. Acesse **Usuários**
2. Clique em **+ Novo Usuário**
3. Preencha:
   - **Nome**: Nome completo
   - **Email**: Email de acesso
   - **Perfil**: Selecione o nível de acesso
4. Clique em **Adicionar**

> 📧 **Nota**: O usuário receberá email com instruções de primeiro acesso

### Editar Usuário

1. Clique no ícone de edição
2. Altere informações ou perfil
3. Clique em **Salvar**

### Desativar Usuário

1. Edite o usuário
2. Altere perfil para **Inativo**
3. O usuário não poderá mais acessar o sistema

---

## 📈 Relatórios

### Tipos de Relatórios

1. **Produção**: Análise de produtividade
2. **Manutenção**: Histórico de intervenções
3. **Eficiência**: Métricas de OEE
4. **Ocorrências**: Problemas registrados

### Gerar Relatório

1. Acesse **Relatórios**
2. Selecione o tipo de relatório
3. Defina o período (data início e fim)
4. Clique em **Gerar Relatório**
5. O PDF será baixado automaticamente

### Informações nos Relatórios

Cada relatório contém:
- Cabeçalho com logo e data
- Dados da fábrica
- Métricas do período selecionado
- Gráficos e tabelas
- Rodapé com informações adicionais

---

## ⚙️ Configurações

### Dados da Fábrica

1. Acesse **Configurações**
2. Edite:
   - Nome da unidade
   - CNPJ
   - Código da fábrica
   - Endereço
3. Clique em **Salvar**

> 📄 **Nota**: Estes dados aparecem em todos os relatórios PDF

### Tema

Alterne entre tema claro e escuro:
1. Clique no botão de tema no canto superior
2. Escolha sua preferência
3. A mudança é instantânea

### Notificações

Configure alertas:
- Email para eventos críticos
- Notificações no navegador
- Frequência de alertas

---

## ❓ Perguntas Frequentes

### Como altero minha senha?

1. Vá em Configurações → Segurança
2. Digite senha atual
3. Digite nova senha
4. Confirme nova senha
5. Clique em Salvar

### Posso acessar pelo celular?

Sim! O sistema é totalmente responsivo e funciona perfeitamente em smartphones e tablets.

### Como exporto dados para Excel?

Atualmente o sistema exporta em PDF. Para Excel, copie os dados da tabela e cole em uma planilha.

### Perdi minha senha, o que faço?

Entre em contato com o administrador do sistema para redefinição.

### Posso ter múltiplas abas abertas?

Sim, você pode abrir várias abas do sistema simultaneamente.

### Os dados são salvos automaticamente?

Sim, todas as alterações são salvas imediatamente ao clicar em "Salvar" ou "Adicionar".

### Como sei se uma máquina está parada há muito tempo?

No Dashboard, verifique os alertas. Paradas prolongadas geram alertas de prioridade alta.

### Posso cancelar uma ordem de produção?

Sim, edite a ordem e altere o status para "Cancelado".

---

## 🔧 Solução de Problemas

### O sistema está lento

**Soluções**:
- Feche abas desnecessárias do navegador
- Limpe o cache do navegador
- Verifique sua conexão com a internet
- Tente usar outro navegador

### Não consigo fazer login

**Verifique**:
- Email e senha estão corretos
- Caps Lock não está ativado
- Seu usuário não está inativo
- Contate o administrador se persistir

### Gráficos não aparecem

**Soluções**:
- Atualize a página (F5)
- Limpe o cache do navegador
- Verifique se JavaScript está habilitado
- Tente outro navegador

### PDF não baixa

**Soluções**:
- Verifique se pop-ups estão bloqueados
- Permita downloads no navegador
- Verifique espaço em disco
- Tente novamente

### Dados não aparecem

**Soluções**:
- Verifique sua conexão
- Atualize a página
- Faça logout e login novamente
- Contate suporte se persistir

### Erro ao salvar

**Soluções**:
- Verifique se todos os campos obrigatórios estão preenchidos
- Verifique formato dos dados (datas, números)
- Tente novamente
- Anote o erro e contate suporte

---

## 📞 Suporte

### Precisa de Ajuda?

**Email**: suporte@precisium.com  
**Telefone**: (47) 3000-0000  
**Horário**: Segunda a Sexta, 8h às 18h

### Reportar Problema

Ao reportar um problema, informe:
1. O que você estava fazendo
2. O que esperava que acontecesse
3. O que realmente aconteceu
4. Mensagem de erro (se houver)
5. Navegador e versão

---

## 📚 Recursos Adicionais

- **Documentação Técnica**: Para desenvolvedores
- **Vídeos Tutoriais**: Canal no YouTube (em breve)
- **Base de Conhecimento**: FAQ expandido online

---

**Precisium Factory Control**  
Versão 1.0.0 - Manual do Usuário  
© 2024 Todos os direitos reservados

*Desenvolvido para simplificar o controle industrial* ⚙️

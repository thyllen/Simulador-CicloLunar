# 🌙 Ciclo da Lua - Simulador RPG

Aplicação web moderna para acompanhar o ciclo lunar do seu personagem no sistema **Ordem Paranormal**, com persistência de estado garantida e interface imersiva.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Características

- 🌙 **4 Fases Lunares**: Nova, Crescente, Cheia, Minguante
- 💾 **Persistência Garantida**: Estado salvo automaticamente no navegador
- ⚡ **Sem Perda de Dados**: Funciona offline, recupera progresso ao voltar
- 🎨 **Design Lunar Elegante**: Tema escuro com paleta azul + prata
- 📱 **Totalmente Responsivo**: Funciona em celular, tablet e desktop
- ⌨️ **Controles Intuitivos**: Avançar, Resetar, Pausar, Novo Ciclo
- 📊 **Histórico Completo**: Registra todas as mudanças de fase com timestamps
- ⚙️ **Tecnologia Moderna**: React 19 + TypeScript + Vite

---

## 🚀 Quick Start

### Opção 1: Online (Recomendado para Usuários)

Acesse diretamente no navegador - nenhuma instalação necessária!

### Opção 2: Localmente (Para Desenvolvedores)

```bash
# 1. Clonar ou baixar o projeto
git clone <repo-url>
cd ciclo-lua-simulator

# 2. Instalar dependências
pnpm install

# 3. Iniciar dev server
pnpm run dev

# 4. Abrir no navegador
# http://localhost:3000
```

---

## 📖 Como Usar

### Iniciar um Novo Ciclo

1. Abra a aplicação
2. Uma fase lunar será sorteada aleatoriamente
3. Você verá a fase, o contador de turnos e os controles

### Avançar Turno

- Clique em **"Avançar Turno"**
- O contador aumenta (1/2 → 2/2)
- Após 2 turnos, a lua muda de fase automaticamente

### Resetar para Fase Inicial

- Clique em **"Resetar"**
- Volta para a fase inicial do ciclo atual
- Contador de turnos volta para 0

### Pausar Execução

- Clique em **"Pausar"**
- A execução pausa
- Você pode retomar depois com **"Retomar Execução"**

### Iniciar Novo Ciclo

- Clique em **"Novo Ciclo"** (quando pausado)
- Uma nova fase inicial será sorteada
- Histórico anterior é preservado

### Ver Histórico

- Clique em **"Histórico de Fases"** para expandir
- Veja todas as mudanças de fase com horários
- Limpe o histórico se desejar

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2.1** - UI framework
- **TypeScript 5.6.3** - Type safety
- **Tailwind CSS 4.1.14** - Styling
- **Vite 7.1.7** - Build tool & dev server

### Componentes
- **shadcn/ui** - Componentes acessíveis
- **Lucide React** - Ícones SVG
- **Wouter** - Client-side routing

### Ferramentas
- **pnpm** - Package manager
- **Prettier** - Code formatter
- **ESLint** - Code linting

---

## 📁 Estrutura do Projeto

```
ciclo-lua-simulator/
├── client/
│   ├── src/
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── LunarPhaseDisplay.tsx
│   │   │   └── CicloControls.tsx
│   │   ├── pages/               # Páginas (rotas)
│   │   │   └── Home.tsx
│   │   ├── hooks/               # Custom React hooks
│   │   │   └── useCicloLua.ts
│   │   ├── contexts/            # React contexts
│   │   ├── lib/                 # Utilitários
│   │   ├── App.tsx              # Componente raiz
│   │   ├── main.tsx             # Entry point
│   │   └── index.css            # Estilos globais
│   ├── public/                  # Assets estáticos
│   └── index.html               # Template HTML
├── DOCUMENTACAO_TECNICA.md      # Documentação técnica completa
├── SETUP_VSCODE.md              # Guia de setup para VS Code
├── ideas.md                     # Filosofia de design
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🔧 Desenvolvimento

### Executar Localmente

```bash
pnpm install
pnpm run dev
```

### Build para Produção

```bash
pnpm run build
```

### Verificar Tipos TypeScript

```bash
pnpm run check
```

### Formatar Código

```bash
pnpm run format
```

---

## 📚 Documentação

- **[DOCUMENTACAO_TECNICA.md](./DOCUMENTACAO_TECNICA.md)** - Documentação técnica completa
  - Stack tecnológico detalhado
  - Arquitetura do projeto
  - Explicação de cada componente
  - Sistema de persistência
  - Fluxo de dados

- **[SETUP_VSCODE.md](./SETUP_VSCODE.md)** - Guia de setup para VS Code
  - Pré-requisitos
  - Setup inicial
  - Fluxo de desenvolvimento
  - Troubleshooting

- **[ideas.md](./ideas.md)** - Filosofia de design
  - Decisões de design
  - Paleta de cores
  - Tipografia
  - Animações

---

## 🎮 Mecânicas do Jogo

### Fases Lunares

| Fase | Duração | Descrição |
|------|---------|-----------|
| **Nova** | 2 turnos | Lua invisível, poder mínimo |
| **Crescente** | 2 turnos | Lua crescendo, poder aumentando |
| **Cheia** | 2 turnos | Lua completa, poder máximo |
| **Minguante** | 2 turnos | Lua diminuindo, poder reduzindo |

### Ciclo Completo

- Total: **8 turnos** (4 fases × 2 turnos)
- Depois de Minguante, volta para Nova
- Ciclo infinito

### Persistência

- Estado salvo automaticamente no localStorage
- Funciona offline
- Recupera progresso ao voltar
- Nunca perde dados por inatividade

---

## 🌐 Compatibilidade

| Navegador | Suporte |
|-----------|---------|
| Chrome/Edge | ✅ Completo |
| Firefox | ✅ Completo |
| Safari | ✅ Completo |
| Opera | ✅ Completo |
| IE 11 | ❌ Não suportado |

---

## 💡 Próximas Funcionalidades Sugeridas

1. **Modificadores de Fase**
   - Bônus/penalidades baseados na fase lunar
   - Integração com mecânicas de RPG

2. **Exportar/Importar Estado**
   - Backup em JSON
   - Compartilhar progresso com outros jogadores

3. **Múltiplos Personagens**
   - Gerenciar ciclos de vários personagens
   - Abas ou seletor de personagem

4. **Notificações**
   - Alerta quando fase muda
   - Lembrete de turnos

5. **Temas Customizáveis**
   - Modo claro/escuro
   - Paletas de cores alternativas

---

## 🐛 Troubleshooting

### Problema: Mudanças não aparecem

**Solução**: Reinicie o dev server
```bash
# Ctrl + C para parar
# pnpm run dev para iniciar novamente
```

### Problema: Porta 3000 ocupada

**Solução**: Use porta diferente
```bash
pnpm run dev -- --port 3001
```

### Problema: localStorage não persiste

**Solução**: 
- Verifique se não está em modo privado
- Limpe dados do site (F12 → Application → Clear Site Data)

---

## 📝 Licença

MIT License - Veja LICENSE para detalhes

---

## 🤝 Contribuindo

Sugestões e melhorias são bem-vindas!

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📞 Suporte

Dúvidas ou problemas?

- Consulte a [DOCUMENTACAO_TECNICA.md](./DOCUMENTACAO_TECNICA.md)
- Consulte o [SETUP_VSCODE.md](./SETUP_VSCODE.md)
- Abra uma issue no repositório

---

## 🎯 Roadmap

- [x] Implementação básica do ciclo lunar
- [x] Persistência de estado
- [x] Interface responsiva
- [x] Histórico de eventos
- [ ] Modificadores de fase
- [ ] Exportar/importar estado
- [ ] Múltiplos personagens
- [ ] Notificações
- [ ] Temas customizáveis

---

## 👨‍💻 Desenvolvido com ❤️

**Ciclo da Lua** foi criado como ferramenta de apoio para jogadores do sistema **Ordem Paranormal**.

Versão: **1.0.0**  
Última atualização: **30 de Junho de 2026**

---

**Bom jogo! 🌙✨**

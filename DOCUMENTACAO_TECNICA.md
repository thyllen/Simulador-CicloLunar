# Ciclo da Lua - Documentação Técnica Completa

## 📋 Índice
1. [Stack Tecnológico](#stack-tecnológico)
2. [Arquitetura do Projeto](#arquitetura-do-projeto)
3. [Componentes Principais](#componentes-principais)
4. [Sistema de Persistência](#sistema-de-persistência)
5. [Execução no VS Code com Live Server](#execução-no-vs-code-com-live-server)
6. [Fluxo de Dados](#fluxo-de-dados)
7. [Guia de Desenvolvimento](#guia-de-desenvolvimento)

---

## Stack Tecnológico

### Frontend Framework
- **React 19.2.1**: Framework JavaScript moderno para construção de interfaces de usuário
  - Componentes funcionais com hooks
  - Estado gerenciado com `useState` e `useEffect`
  - Contexto para temas com `ThemeProvider`

### Build & Bundling
- **Vite 7.1.7**: Bundler e dev server ultrarrápido
  - HMR (Hot Module Replacement) para reload instantâneo
  - Otimização automática de assets
  - Suporte nativo a ES modules

### Styling
- **Tailwind CSS 4.1.14**: Framework CSS utilitário
  - Design tokens em OKLCH (espaço de cor perceptualmente uniforme)
  - Customização via variáveis CSS
  - Tema lunar com paleta azul-escuro + prata

- **Tailwind Animate 1.0.7**: Animações CSS pré-construídas
  - Transições suaves para mudanças de fase
  - Efeitos de pulse e flash

### Componentes UI
- **shadcn/ui**: Biblioteca de componentes React acessíveis
  - Button, Card, Dialog, etc.
  - Construída sobre Radix UI
  - Totalmente customizável

- **Lucide React 0.453.0**: Ícones SVG
  - Plus, Pause, Play, RotateCcw, ChevronDown
  - Escaláveis e responsivos

### Roteamento
- **Wouter 3.3.5**: Router minimalista para React
  - Client-side routing sem bundle overhead
  - Suporte a parâmetros dinâmicos

### Tipagem
- **TypeScript 5.6.3**: Linguagem tipada que compila para JavaScript
  - Type safety em tempo de desenvolvimento
  - Melhor autocompletar no editor

### Gerenciamento de Dependências
- **pnpm 10.15.1**: Package manager rápido e eficiente
  - Instalação de dependências mais rápida que npm/yarn
  - Gerenciamento de monorepos

---

## Arquitetura do Projeto

```
ciclo-lua-simulator/
├── client/                          # Código frontend
│   ├── public/                      # Assets estáticos
│   │   ├── favicon.ico
│   │   └── __manus__/              # Arquivos de debug
│   ├── src/
│   │   ├── components/             # Componentes reutilizáveis
│   │   │   ├── LunarPhaseDisplay.tsx    # Exibe fase lunar
│   │   │   ├── CicloControls.tsx        # Botões de controle
│   │   │   ├── ui/                     # Componentes shadcn/ui
│   │   │   └── ErrorBoundary.tsx       # Tratamento de erros
│   │   ├── pages/                  # Páginas (rotas)
│   │   │   ├── Home.tsx            # Página principal
│   │   │   └── NotFound.tsx        # Página 404
│   │   ├── hooks/                  # Custom React hooks
│   │   │   └── useCicloLua.ts      # Lógica de estado + persistência
│   │   ├── contexts/               # React contexts
│   │   │   └── ThemeContext.tsx    # Gerenciamento de tema
│   │   ├── lib/                    # Utilitários
│   │   │   └── utils.ts            # Funções auxiliares
│   │   ├── App.tsx                 # Componente raiz + rotas
│   │   ├── main.tsx                # Entry point React
│   │   └── index.css               # Estilos globais + design tokens
│   └── index.html                  # Template HTML
├── server/                         # Código backend (placeholder)
├── shared/                         # Código compartilhado
├── package.json                    # Dependências e scripts
├── vite.config.ts                  # Configuração do Vite
├── tsconfig.json                   # Configuração do TypeScript
├── tailwind.config.js              # Configuração do Tailwind
└── ideas.md                        # Documentação de design
```

---

## Componentes Principais

### 1. **useCicloLua Hook** (`client/src/hooks/useCicloLua.ts`)

**Responsabilidade**: Gerenciar todo o estado da aplicação e persistência

```typescript
interface CicloState {
  fases: string[];              // ['Nova', 'Crescente', 'Cheia', 'Minguante']
  indexInicial: number;         // Fase inicial sorteada (0-3)
  indexAtual: number;           // Fase atual (0-3)
  contadorTurnos: number;       // Turnos na fase atual (0-1)
  emExecucao: boolean;          // true = em execução, false = pausado
  historico: Array<{            // Histórico de mudanças
    fase: string;
    timestamp: number;
  }>;
}
```

**Funções Exportadas**:
- `avancarTurno()`: Incrementa contador, muda fase se necessário
- `resetar()`: Volta à fase inicial
- `pausar()`: Pausa execução
- `retomar()`: Retoma execução
- `novaExecucao()`: Inicia novo ciclo com fase sorteada
- `limparHistorico()`: Remove histórico anterior

**Persistência**:
```javascript
// Salva no localStorage após cada mudança
localStorage.setItem('ciclo-lua-state', JSON.stringify(state))

// Carrega ao iniciar
const stored = localStorage.getItem('ciclo-lua-state')
```

### 2. **LunarPhaseDisplay** (`client/src/components/LunarPhaseDisplay.tsx`)

**Responsabilidade**: Renderizar a fase lunar com animações

**Props**:
```typescript
interface LunarPhaseDisplayProps {
  fase: string;              // Nome da fase ('Nova', 'Crescente', etc)
  contadorTurnos: number;    // Turnos na fase (0 ou 1)
  isAnimating?: boolean;     // Ativa animação de flash
}
```

**Elementos Visuais**:
- Imagem da lua (gerada por IA, 4 variações)
- Nome da fase em tipografia Playfair Display
- Barra de progresso circular (0-100%)
- Efeito glow com sombra lunar

**Animações**:
- `phase-pulse`: Pulsação contínua (2s)
- `turno-advance`: Flash ao avançar turno (0.4s)

### 3. **CicloControls** (`client/src/components/CicloControls.tsx`)

**Responsabilidade**: Renderizar botões de controle

**Estados**:
- **Em Execução**: Mostra "Avançar Turno", "Resetar", "Pausar"
- **Pausado**: Mostra "Retomar Execução", "Novo Ciclo"

**Callbacks**:
```typescript
interface CicloControlsProps {
  emExecucao: boolean;
  onAvancarTurno: () => void;
  onResetar: () => void;
  onPausar: () => void;
  onRetomar: () => void;
  onNovaExecucao: () => void;
}
```

### 4. **Home Page** (`client/src/pages/Home.tsx`)

**Responsabilidade**: Orquestrar componentes e gerenciar estado local

**Estrutura**:
```
Header (Logo + Título)
  ↓
Título Principal
  ↓
[Display Lunar] [Controles]
  ↓
Info Cards (Fase Inicial, Status, Total de Eventos)
  ↓
Histórico Colapsível
  ↓
Footer
```

**Gerenciamento de Animação**:
```javascript
const [isAnimating, setIsAnimating] = useState(false);

const handleAvancarTurno = () => {
  setIsAnimating(true);           // Ativa animação
  avancarTurno();                 // Executa lógica
  // Timeout de 400ms desativa animação
};
```

---

## Sistema de Persistência

### Como Funciona

**1. Inicialização**
```javascript
// Ao montar o componente
const [state, setState] = useState<CicloState>(getInitialState);

function getInitialState() {
  const stored = localStorage.getItem('ciclo-lua-state');
  if (stored) {
    return JSON.parse(stored);  // Carrega estado anterior
  }
  // Cria novo estado se não existir
  return { fases, indexInicial, indexAtual, ... };
}
```

**2. Salvamento Automático**
```javascript
// Salva sempre que state muda
useEffect(() => {
  localStorage.setItem('ciclo-lua-state', JSON.stringify(state));
}, [state]);
```

**3. Recuperação Automática**
- Ao recarregar a página: localStorage é lido automaticamente
- Ao fechar o navegador: dados persistem
- Ao deixar inativo: nenhuma perda de dados

### Estrutura de Dados Armazenada

```json
{
  "fases": ["Nova", "Crescente", "Cheia", "Minguante"],
  "indexInicial": 2,
  "indexAtual": 3,
  "contadorTurnos": 1,
  "emExecucao": true,
  "historico": [
    { "fase": "Cheia", "timestamp": 1719776400000 },
    { "fase": "Minguante", "timestamp": 1719776410000 }
  ]
}
```

---

## Execução no VS Code com Live Server

### ⚠️ Importante: Este Projeto NÃO é Compatível com Live Server Padrão

**Por quê?**
- O projeto usa **React + JSX**, que requer compilação
- **Vite** é necessário para transformar JSX em JavaScript
- **Live Server** serve apenas arquivos HTML/CSS/JS estáticos

### ✅ Solução Recomendada: Usar o Vite Dev Server

#### Passo 1: Preparar o Ambiente

```bash
# 1. Instalar Node.js (se não tiver)
# Baixe de: https://nodejs.org/ (versão LTS recomendada)

# 2. Instalar pnpm globalmente
npm install -g pnpm

# 3. Navegar até o projeto
cd ciclo-lua-simulator

# 4. Instalar dependências
pnpm install
```

#### Passo 2: Executar o Dev Server

```bash
# No terminal do VS Code (Ctrl + `)
pnpm run dev

# Saída esperada:
# VITE v7.1.9  ready in 397 ms
# ➜  Local:   http://localhost:3000/
# ➜  Network: http://169.254.0.21:3000/
```

#### Passo 3: Acessar a Aplicação

- Abra o navegador em: `http://localhost:3000`
- O Vite ativa **HMR** (Hot Module Replacement)
- Qualquer mudança no código recarrega automaticamente

### 🔄 Fluxo de Desenvolvimento com Vite

```
Você edita um arquivo (.tsx, .css, .ts)
         ↓
Vite detecta a mudança
         ↓
Recompila apenas o módulo alterado
         ↓
Envia mudança ao navegador via WebSocket
         ↓
React atualiza o componente sem perder estado
         ↓
Você vê a mudança em tempo real (< 100ms)
```

### 📁 Estrutura de Arquivos para Edição

**Arquivos que você provavelmente editará**:

```
client/src/
├── pages/Home.tsx              ← Página principal
├── components/
│   ├── LunarPhaseDisplay.tsx   ← Display da lua
│   └── CicloControls.tsx       ← Botões
├── hooks/useCicloLua.ts        ← Lógica de estado
└── index.css                   ← Estilos globais
```

**Exemplo de Edição**:

1. Abra `client/src/components/CicloControls.tsx`
2. Mude o texto do botão de "Avançar Turno" para "Próximo Turno"
3. Salve (Ctrl + S)
4. Vite recompila automaticamente
5. Navegador atualiza em < 1 segundo

### 🚫 Por Que Live Server Não Funciona

| Aspecto | Live Server | Vite |
|--------|------------|------|
| **Suporta JSX?** | ❌ Não | ✅ Sim |
| **Compila TypeScript?** | ❌ Não | ✅ Sim |
| **HMR (Hot Reload)?** | ⚠️ Full reload | ✅ Preserva estado |
| **Otimização?** | ❌ Nenhuma | ✅ Automática |
| **Velocidade** | Lenta | ⚡ Ultrarrápida |

---

## Fluxo de Dados

### Fluxo de Execução: "Avançar Turno"

```
Usuário clica "Avançar Turno"
         ↓
handleAvancarTurno() dispara
         ↓
setIsAnimating(true)  ← Ativa animação
         ↓
avancarTurno()  ← Chama hook
         ↓
setState() atualiza contadorTurnos
         ↓
useEffect() detecta mudança
         ↓
localStorage.setItem() salva estado
         ↓
Componentes re-renderizam com novos valores
         ↓
LunarPhaseDisplay recebe props atualizadas
         ↓
Animação turno-advance executa (0.4s)
         ↓
setTimeout() desativa animação após 400ms
         ↓
Se contadorTurnos == 2:
  └─ indexAtual avança para próxima fase
  └─ contadorTurnos reseta para 0
  └─ Histórico registra mudança
```

### Fluxo de Persistência

```
App inicia
  ↓
useCicloLua() executa
  ↓
getInitialState() lê localStorage
  ↓
Se localStorage.ciclo-lua-state existe:
  └─ Carrega estado anterior
Senão:
  └─ Cria novo estado com fase sorteada
  ↓
useState() inicializa com estado
  ↓
useEffect() monitora mudanças
  ↓
Qualquer mudança em state:
  └─ localStorage.setItem() salva automaticamente
  ↓
Usuário fecha navegador
  ↓
Dados persistem em localStorage
  ↓
Usuário reabre aplicação
  ↓
Estado anterior é restaurado automaticamente
```

---

## Guia de Desenvolvimento

### Estrutura de um Componente React

```typescript
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface MeuComponenteProps {
  titulo: string;
  onClique: () => void;
}

export const MeuComponente = ({ titulo, onClique }: MeuComponenteProps) => {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    // Executa quando componente monta
    console.log('Componente montado');
    
    return () => {
      // Cleanup ao desmontar
    };
  }, []);

  return (
    <div className="p-4 bg-card rounded-lg">
      <h2 className="text-lg font-bold">{titulo}</h2>
      <p>Contador: {contador}</p>
      <Button onClick={() => setContador(contador + 1)}>
        Incrementar
      </Button>
    </div>
  );
};
```

### Adicionar Novo Hook Customizado

```typescript
// client/src/hooks/meuHook.ts
import { useState, useCallback } from 'react';

export const useMeuHook = () => {
  const [valor, setValor] = useState('');

  const atualizar = useCallback((novoValor: string) => {
    setValor(novoValor);
  }, []);

  return { valor, atualizar };
};

// Uso em componente:
const { valor, atualizar } = useMeuHook();
```

### Adicionar Novo Componente UI (shadcn/ui)

```bash
# Instalar componente do shadcn/ui
pnpm dlx shadcn-ui@latest add dialog

# Usar em componente:
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger>Abrir</DialogTrigger>
  <DialogContent>Conteúdo do diálogo</DialogContent>
</Dialog>
```

### Modificar Tema de Cores

Edite `client/src/index.css`:

```css
:root {
  --primary: oklch(0.5 0.18 260);        /* Azul lunar */
  --accent: oklch(0.85 0.08 260);        /* Prata */
  --background: oklch(0.15 0.02 260);    /* Azul escuro */
  --foreground: oklch(0.92 0.01 260);    /* Branco */
}
```

Cores OKLCH são mais intuitivas que RGB/HSL:
- Primeiro número: Luminância (0-1)
- Segundo número: Saturação (0-0.4)
- Terceiro número: Matiz (0-360)

---

## Scripts Disponíveis

```bash
pnpm run dev      # Inicia dev server (http://localhost:3000)
pnpm run build    # Compila para produção
pnpm run preview  # Visualiza build de produção localmente
pnpm run check    # Verifica tipos TypeScript
pnpm run format   # Formata código com Prettier
```

---

## Troubleshooting

### Problema: "Cannot find module 'react'"

**Solução**:
```bash
pnpm install
```

### Problema: Porta 3000 já está em uso

**Solução**:
```bash
# Vite usa porta 5173 como fallback automaticamente
# Ou especifique porta diferente:
pnpm run dev -- --port 3001
```

### Problema: Mudanças no código não aparecem

**Solução**:
1. Verifique se o Vite está rodando (`pnpm run dev`)
2. Limpe o cache do navegador (Ctrl + Shift + Delete)
3. Reinicie o dev server (Ctrl + C, depois `pnpm run dev`)

### Problema: localStorage não persiste

**Solução**:
- Verifique se o navegador não está em modo privado/incógnito
- Limpe dados do site (F12 → Application → Clear Site Data)
- Verifique console para erros de permissão

---

## Recursos Adicionais

- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
- **TypeScript**: https://www.typescriptlang.org

---

**Última atualização**: 30 de Junho de 2026
**Versão do Projeto**: 1.0.0

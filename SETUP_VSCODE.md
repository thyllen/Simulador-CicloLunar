# 🚀 Guia Rápido: Executar no VS Code

## Pré-requisitos

1. **Node.js instalado** (versão 18+)
   - Baixe em: https://nodejs.org/
   - Verifique: `node --version`

2. **VS Code instalado**
   - Baixe em: https://code.visualstudio.com/

3. **Extensão Recomendada**
   - Instale "ES7+ React/Redux/React-Native snippets" (dsznajder.es7-react-js-snippets)

---

## Setup Inicial (Primeira Vez)

### 1️⃣ Abrir o Projeto

```bash
# Opção A: Via terminal
cd /caminho/para/ciclo-lua-simulator
code .

# Opção B: Abrir VS Code e File → Open Folder
# Selecione a pasta ciclo-lua-simulator
```

### 2️⃣ Instalar Dependências

```bash
# Abra o terminal integrado do VS Code (Ctrl + `)
# Digite:
pnpm install

# Ou se não tiver pnpm:
npm install -g pnpm
pnpm install
```

### 3️⃣ Iniciar Dev Server

```bash
pnpm run dev

# Saída esperada:
# VITE v7.1.9  ready in 397 ms
# ➜  Local:   http://localhost:3000/
```

### 4️⃣ Abrir no Navegador

- Clique no link `http://localhost:3000/` no terminal
- Ou abra manualmente: `http://localhost:3000`

---

## Fluxo de Desenvolvimento

### Editar Arquivo

```
1. Abra client/src/pages/Home.tsx
2. Faça uma mudança (ex: mude um texto)
3. Salve (Ctrl + S)
4. Navegador atualiza automaticamente (< 1 segundo)
```

### Estrutura de Pastas para Edição

```
ciclo-lua-simulator/
└── client/src/
    ├── pages/
    │   └── Home.tsx              ← Página principal
    ├── components/
    │   ├── LunarPhaseDisplay.tsx ← Display da lua
    │   └── CicloControls.tsx     ← Botões
    ├── hooks/
    │   └── useCicloLua.ts        ← Lógica de estado
    └── index.css                 ← Estilos
```

---

## Atalhos Úteis no VS Code

| Atalho | Função |
|--------|--------|
| `Ctrl + `` | Abrir/fechar terminal integrado |
| `Ctrl + S` | Salvar arquivo |
| `Ctrl + /` | Comentar/descomentar linha |
| `Alt + Shift + F` | Formatar código |
| `Ctrl + Shift + P` | Abrir command palette |
| `F12` | Abrir DevTools do navegador |

---

## Parar o Dev Server

```bash
# No terminal do VS Code:
Ctrl + C

# Depois pode fechar o terminal ou rodar outro comando
```

---

## ❌ Por Que Não Usar Live Server?

**Live Server** é para HTML/CSS/JS estático.

Este projeto usa:
- ✅ **React** (requer compilação)
- ✅ **TypeScript** (requer compilação)
- ✅ **JSX** (requer compilação)
- ✅ **Tailwind CSS** (requer processamento)

**Live Server não consegue compilar nenhum desses.**

---

## ✅ Solução Correta: Vite

**Vite** faz tudo automaticamente:
- Compila React/TypeScript
- Processa Tailwind CSS
- Recarrega o navegador (HMR)
- Otimiza para produção

**Comando**: `pnpm run dev`

---

## Troubleshooting Rápido

### "pnpm: command not found"
```bash
npm install -g pnpm
pnpm install
pnpm run dev
```

### Porta 3000 ocupada
```bash
# Vite usa 5173 automaticamente como fallback
# Ou especifique porta:
pnpm run dev -- --port 3001
```

### Mudanças não aparecem
```bash
# Reinicie o dev server:
# 1. Ctrl + C no terminal
# 2. pnpm run dev
```

### Erro "Cannot find module"
```bash
# Limpe node_modules e reinstale:
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm run dev
```

---

## Próximos Passos

1. **Explorar o código**
   - Abra `client/src/pages/Home.tsx`
   - Leia os comentários
   - Entenda o fluxo

2. **Fazer uma mudança pequena**
   - Mude um texto ou cor
   - Veja o resultado em tempo real

3. **Ler a documentação completa**
   - Abra `DOCUMENTACAO_TECNICA.md`
   - Entenda cada componente

4. **Adicionar novas funcionalidades**
   - Use os exemplos como referência
   - Consulte a documentação quando necessário

---

## Dúvidas?

Consulte:
- `DOCUMENTACAO_TECNICA.md` - Documentação completa
- `ideas.md` - Filosofia de design
- Terminal do VS Code - Mensagens de erro

**Happy coding! 🚀**

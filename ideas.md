# Ciclo da Lua - Simulador RPG

## Referência de Implementação
Esta aplicação replica fielmente a mecânica do sistema **Ordem Paranormal** para acompanhamento do Ciclo Lunar de um personagem. O usuário necessita de persistência de estado para evitar perda de progresso ao deixar o aplicativo inativo.

## Mecânicas Principais
- **4 Fases Lunares**: Nova → Crescente → Cheia → Minguante (ciclo contínuo)
- **Sistema de Turnos**: Cada fase dura 2 turnos
- **Progressão Automática**: Após 2 turnos, avança para a próxima fase
- **Fase Inicial**: Sorteada aleatoriamente ao iniciar
- **Persistência**: Salva estado em localStorage para recuperação após inatividade

## Abordagem de Design
**Tema: Místico & Lunar**
- Estética noturna com elementos lunares
- Paleta de cores baseada em tons de azul, roxo e prata
- Animações suaves que refletem o movimento lunar
- Design responsivo para uso em celular e desktop

### Design Movement
Minimalismo Místico com influências de interfaces de RPG

### Core Principles
1. **Clareza Funcional**: Interface intuitiva que não requer leitura de instruções
2. **Feedback Imediato**: Cada ação do usuário gera resposta visual clara
3. **Estética Lunar**: Elementos visuais que reforçam o tema do ciclo lunar
4. **Persistência Invisível**: Salvamento automático sem interrupção

### Color Philosophy
- **Fundo Primário**: Azul escuro profundo (noite lunar)
- **Accent Principal**: Prata/Branco (luz lunar)
- **Fases Lunares**: Cores distintas para cada fase
  - Nova: Cinza escuro
  - Crescente: Azul pálido
  - Cheia: Branco/Prata brilhante
  - Minguante: Roxo/Azul escuro
- **Ação**: Verde suave para botões de ação

### Layout Paradigm
- **Card Central**: Exibição da fase atual em destaque
- **Informações Secundárias**: Contador de turnos e controles abaixo
- **Controles Simples**: Botões grandes e responsivos
- **Histórico Opcional**: Visualização do progresso do ciclo

### Signature Elements
1. **Ícone Lunar Animado**: Representa a fase atual com transições suaves
2. **Barra de Progresso Circular**: Mostra progresso dentro da fase
3. **Efeito Glow**: Elementos lunares com brilho sutil

### Interaction Philosophy
- Cliques/toques imediatos sem confirmações desnecessárias
- Animações suaves que indicam mudanças de estado
- Feedback visual para cada ação (turnos avançados, fases mudadas)
- Modo pausado com opção de reiniciar

### Animation
- Transições de fase: 600ms fade + scale
- Progresso de turno: 300ms pulse suave
- Hover em botões: 200ms scale e glow
- Mudança de fase: Flash suave de luz lunar

### Typography System
- **Títulos**: Fonte serif elegante (Playfair Display) para "Ciclo da Lua"
- **Fase Atual**: Fonte grande e clara (Poppins Bold)
- **Texto Secundário**: Poppins Regular para informações
- **Números**: Monospace para contador de turnos

### Brand Essence
**Posicionamento**: Ferramenta de acompanhamento lunar para jogadores de RPG Ordem Paranormal que precisam manter o estado do ciclo persistente e visível.

**Personalidade**: Místico, Confiável, Elegante

### Brand Voice
- Títulos: Poéticos mas claros ("Fase Lunar Atual", "Turno Avançado")
- CTAs: Diretos e acionáveis ("Avançar Turno", "Resetar Ciclo", "Iniciar Nova Execução")
- Microcopy: Informativo sem ser verboso

### Wordmark & Logo
Logo: Símbolo de lua crescente em prata/branco sobre fundo azul escuro, com pequenas estrelas ao redor

### Signature Brand Color
**Azul Lunar**: `#1a3a52` (fundo) com acentos em `#e8e8e8` (prata lunar)

## Estrutura de Estado
```typescript
interface CicloState {
  fases: string[];
  indexInicial: number;
  indexAtual: number;
  contadorTurnos: number;
  emExecucao: boolean;
  historico: Array<{ fase: string; timestamp: number }>;
}
```

## Funcionalidades
1. **Iniciar**: Sorteio de fase inicial, começar novo ciclo
2. **Avançar Turno**: Incrementar contador, mudar fase se necessário
3. **Resetar**: Voltar à fase inicial
4. **Pausar/Retomar**: Pausar execução e retomar depois
5. **Novo Ciclo**: Iniciar novo ciclo com nova fase inicial sorteada
6. **Persistência**: Salvar e carregar estado automaticamente

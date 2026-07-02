interface LunarPhaseDisplayProps {
  fase: string;
  contadorTurnos: number;
  isAnimating?: boolean;
}

export const LunarPhaseDisplay = ({
  fase,
  contadorTurnos,
  isAnimating = false,
}: LunarPhaseDisplayProps) => {
  const progressPercentage = ((contadorTurnos + 1) / 2) * 100;

  const getPhaseStyles = (faseAtual: string) => {
    switch (faseAtual) {
      case 'Crescente':
        return {
          opacityDireita: 0,
          opacityEsquerda: 1,
          ellipseScaleX: -0.5,
          ellipseColor: 'rgba(0,0,0,1)',
        };
      case 'Cheia':
        return {
          opacityDireita: 1,
          opacityEsquerda: 1,
          ellipseScaleX: 1,
          ellipseColor: 'var(--color-accent, currentColor)',
        };
      case 'Minguante':
        return {
          opacityDireita: 1,
          opacityEsquerda: 0,
          ellipseScaleX: 0.5,
          ellipseColor: 'rgba(0,0,0,1)',
        };
      case 'Nova':
      default:
        return {
          opacityDireita: 0,
          opacityEsquerda: 0,
          ellipseScaleX: 0,
          ellipseColor: 'transparent',
        };
    }
  };

  const config = getPhaseStyles(fase);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Container da Lua (Estático, limpo e sem pulsação/brilho adicionais) */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Efeito de aura original em segundo plano */}
        <div className="absolute inset-0 rounded-full lunar-glow-strong"></div>
        
        {/* Sistema de Iluminação Esférica SVG com Rotação Invertida */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-40 h-40 relative z-10"
        >
          {/* MÁSCARA: Mantém o recorte esférico perfeito */}
          <defs>
            <clipPath id="lunar-sphere">
              <circle cx="50" cy="50" r="46" />
            </clipPath>
          </defs>

          {/* Grupo com a máscara aplicada */}
          <g clipPath="url(#lunar-sphere)">
            {/* 1. Fundo Escuro da Lua */}
            <circle cx="50" cy="50" r="46" fill="rgba(255, 255, 255, 0.03)" />

            {/* 2. Metade Direita da Luz */}
            <path 
              d="M 50 4 A 46 46 0 0 1 50 96 Z" 
              className="fill-accent transition-all duration-700 ease-in-out"
              style={{ opacity: config.opacityDireita }}
            />

            {/* 3. Metade Esquerda da Luz */}
            <path 
              d="M 50 4 A 46 46 0 0 0 50 96 Z" 
              className="fill-accent transition-all duration-700 ease-in-out"
              style={{ opacity: config.opacityEsquerda }}
            />

            {/* 4. Elipse Central de Sombra (Gira no sentido inverso cruzando o eixo zero) */}
            <ellipse 
              cx="50" 
              cy="50" 
              rx="46" 
              ry="46" 
              className="transition-all duration-700 ease-in-out"
              style={{ 
                transform: `scaleX(${config.ellipseScaleX})`, 
                transformOrigin: '50px 50px',
                fill: config.ellipseColor 
              }}
            />
          </g>

          {/* 5. Contorno Fino Externo */}
          <circle 
            cx="50" 
            cy="50" 
            r="46" 
            className="stroke-accent fill-none" 
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        </svg>
      </div>

      {/* Identificação da Fase */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-accent mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          {fase}
        </h2>
        <p className="text-muted-foreground text-sm">Fase Lunar Atual</p>
      </div>

      {/* Barra de Progresso do Turno */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Progresso da Fase</span>
          <span className="text-sm font-mono text-accent">
            {contadorTurnos + 1} / 2
          </span>
        </div>
        <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-primary rounded-full phase-transition"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
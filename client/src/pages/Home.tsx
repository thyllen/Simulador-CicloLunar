import { useState, useEffect } from 'react';
import { useCicloLua } from '@/hooks/useCicloLua';
import { LunarPhaseDisplay } from '@/components/LunarPhaseDisplay';
import { CicloControls } from '@/components/CicloControls';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function Home() {
  const {
    state,
    avancarTurno,
    resetar,
    pausar,
    retomar,
    novaExecucao,
    limparHistorico,
  } = useCicloLua();

  const [isAnimating, setIsAnimating] = useState(false);
  const [showHistorico, setShowHistorico] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const handleAvancarTurno = () => {
    setIsAnimating(true);
    avancarTurno();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>
              WebApp1 - Ciclo Lunar
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12 flex flex-col items-center gap-12">
        {/* Title Section */}
        <div className="text-center space-y-2 max-w-2xl">
          <h2 className="text-4xl font-bold text-accent" style={{ fontFamily: "'Playfair Display', serif" }}>
            Simulador do Ciclo Lunar
          </h2>
          <p className="text-muted-foreground">
            para: Rudger Lanthier
          </p>
        </div>

        {/* Display e Controles */}
        <div className="flex flex-col lg:flex-row gap-12 items-center justify-center w-full max-w-4xl">
          <LunarPhaseDisplay
            fase={state.fases[state.indexAtual]}
            contadorTurnos={state.contadorTurnos}
            isAnimating={isAnimating}
          />

          <CicloControls
            emExecucao={state.emExecucao}
            onAvancarTurno={handleAvancarTurno}
            onResetar={resetar}
            onPausar={pausar}
            onRetomar={retomar}
            onNovaExecucao={novaExecucao}
          />
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
          <Card className="p-4 bg-card border-border">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Fase Inicial</p>
              <p className="text-lg font-semibold text-accent">
                {state.fases[state.indexInicial]}
              </p>
            </div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Status</p>
              <p className="text-lg font-semibold text-accent">
                {state.emExecucao ? 'Em Execução' : 'Pausado'}
              </p>
            </div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Total de Eventos</p>
              <p className="text-lg font-semibold text-accent">
                {state.historico.length}
              </p>
            </div>
          </Card>
        </div>

        {/* Histórico */}
        <div className="w-full max-w-4xl">
          <button
            onClick={() => setShowHistorico(!showHistorico)}
            className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-secondary transition-colors"
          >
            <span className="font-semibold text-foreground">Histórico de Fases</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${showHistorico ? 'rotate-180' : ''}`}
            />
          </button>

          {showHistorico && (
            <Card className="mt-4 p-6 bg-card border-border">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {state.historico.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Nenhum evento registrado
                  </p>
                ) : (
                  state.historico.map((evento, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-secondary rounded-lg border border-border/50"
                    >
                      <span className="text-sm font-medium text-foreground">
                        #{idx + 1} - {evento.fase}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(evento.timestamp).toLocaleTimeString('pt-BR')}
                      </span>
                    </div>
                  ))
                )}
              </div>
              {state.historico.length > 0 && (
                <Button
                  onClick={limparHistorico}
                  variant="outline"
                  className="w-full mt-4 border-border hover:bg-secondary"
                  size="sm"
                >
                  Limpar Histórico
                </Button>
              )}
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16 py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            Simulador do Ciclo da Lua - Desenvolvido por Thyllen
          </p>
        </div>
      </footer>
    </div>
  );
}

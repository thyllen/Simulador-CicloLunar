import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, RotateCcw, Plus, RotateCw } from 'lucide-react';

interface CicloControlsProps {
  emExecucao: boolean;
  onAvancarTurno: () => void;
  onResetar: () => void;
  onPausar: () => void;
  onRetomar: () => void;
  onNovaExecucao: () => void;
}

export const CicloControls = ({
  emExecucao,
  onAvancarTurno,
  onResetar,
  onPausar,
  onRetomar,
  onNovaExecucao,
}: CicloControlsProps) => {
  return (
    <Card className="w-full max-w-md p-6 bg-card border-border">
      <div className="space-y-4">
        {/* Controles Principais */}
        {emExecucao ? (
          <div className="space-y-3">
            <Button
              onClick={onAvancarTurno}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-6 text-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Avançar Turno
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={onResetar}
                variant="outline"
                className="border-border hover:bg-secondary"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Resetar
              </Button>
              <Button
                onClick={onPausar}
                variant="outline"
                className="border-border hover:bg-secondary"
              >
                <Pause className="w-4 h-4 mr-2" />
                Pausar
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-4 bg-secondary rounded-lg border border-border">
              <p className="text-sm text-muted-foreground text-center">
                Execução pausada
              </p>
            </div>

            <Button
              onClick={onRetomar}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
            >
              <Play className="w-5 h-5 mr-2" />
              Retomar Execução
            </Button>

            <Button
              onClick={onNovaExecucao}
              variant="outline"
              className="w-full border-border hover:bg-secondary"
            >
              <RotateCw className="w-4 h-4 mr-2" />
              Novo Ciclo
            </Button>
          </div>
        )}

        {/* Info Footer */}
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Estado salvo automaticamente
          </p>
        </div>
      </div>
    </Card>
  );
};

import { useState, useEffect, useCallback } from 'react';

export interface CicloState {
  fases: string[];
  indexInicial: number;
  indexAtual: number;
  contadorTurnos: number;
  emExecucao: boolean;
  historico: Array<{ fase: string; timestamp: number }>;
}

const STORAGE_KEY = 'ciclo-lua-state';
const FASES = ['Nova', 'Crescente', 'Cheia', 'Minguante'];

const getInitialState = (): CicloState => {
  // Tentar carregar do localStorage
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Se falhar, criar novo estado
    }
  }

  // Criar novo estado
  const indexInicial = Math.floor(Math.random() * 4);
  return {
    fases: FASES,
    indexInicial,
    indexAtual: indexInicial,
    contadorTurnos: 0,
    emExecucao: true,
    historico: [{ fase: FASES[indexInicial], timestamp: Date.now() }],
  };
};

export const useCicloLua = () => {
  const [state, setState] = useState<CicloState>(getInitialState);

  // Salvar estado no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const avancarTurno = useCallback(() => {
    setState((prev) => {
      const novoContador = prev.contadorTurnos + 1;
      let novoIndex = prev.indexAtual;
      let novoContadorTurnos = novoContador;

      if (novoContador === 2) {
        novoIndex = (prev.indexAtual + 1) % 4;
        novoContadorTurnos = 0;
      }

      return {
        ...prev,
        indexAtual: novoIndex,
        contadorTurnos: novoContadorTurnos,
        historico: [
          ...prev.historico,
          { fase: prev.fases[novoIndex], timestamp: Date.now() },
        ],
      };
    });
  }, []);

  const resetar = useCallback(() => {
    setState((prev) => ({
      ...prev,
      indexAtual: prev.indexInicial,
      contadorTurnos: 0,
      historico: [
        ...prev.historico,
        { fase: prev.fases[prev.indexInicial], timestamp: Date.now() },
      ],
    }));
  }, []);

  const pausar = useCallback(() => {
    setState((prev) => ({
      ...prev,
      emExecucao: false,
    }));
  }, []);

  const retomar = useCallback(() => {
    setState((prev) => ({
      ...prev,
      emExecucao: true,
    }));
  }, []);

  const novaExecucao = useCallback(() => {
    const novoIndexInicial = Math.floor(Math.random() * 4);
    setState({
      fases: FASES,
      indexInicial: novoIndexInicial,
      indexAtual: novoIndexInicial,
      contadorTurnos: 0,
      emExecucao: true,
      historico: [{ fase: FASES[novoIndexInicial], timestamp: Date.now() }],
    });
  }, []);

  const limparHistorico = useCallback(() => {
    setState((prev) => ({
      ...prev,
      historico: [{ fase: prev.fases[prev.indexAtual], timestamp: Date.now() }],
    }));
  }, []);

  return {
    state,
    avancarTurno,
    resetar,
    pausar,
    retomar,
    novaExecucao,
    limparHistorico,
  };
};

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export default function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

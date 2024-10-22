'use client';

import { PropsWithChildren, ReactNode } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';
import { isMultiplayerEnabled } from '../helpers/featureFlags';
import { initialPresence } from '../helpers/multiplayerConfig';

export function RoomWithoutWrapper({ children }: { children: ReactNode }) {
  return (
    <LiveblocksProvider throttle={16} publicApiKey="pk_dev_VSQ8XgsEo_gHGV05fm021iUDLbCs-eJ4Awy8fvUor2L4swGGpkwVDa7r4tK_qSUn">
      <RoomProvider
        id="main-room"
        initialPresence={initialPresence}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

export function Room({ children } : PropsWithChildren) {
  return isMultiplayerEnabled ? (<RoomWithoutWrapper>{children}</RoomWithoutWrapper>) : children;
}

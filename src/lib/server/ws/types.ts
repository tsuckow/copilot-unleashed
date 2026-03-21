import type { WebSocket } from 'ws';
import type { PoolEntry } from './session-pool.js';

export type SessionMiddleware = (req: any, res: any, next: (err?: any) => void) => void;

export interface MessageContext {
  connectionEntry: PoolEntry;
  githubToken: string;
  userLogin: string;
  poolKey: string;
  ws: WebSocket;
}

/** SDK attachment union – mirrors the types accepted by session.send(). */
export type SdkAttachment =
  | { type: 'file'; path: string; displayName?: string }
  | { type: 'directory'; path: string; displayName?: string }
  | { type: 'selection'; filePath: string; displayName: string; selection?: { start: { line: number; character: number }; end: { line: number; character: number } }; text?: string };

/** Minimal ChatMessage shape for session history reconstruction (mirrors src/lib/types/index.ts) */
export interface HistoryMessage {
  id: string;
  role: string;
  content: string;
  timestamp: number;
  toolCallId?: string;
  toolName?: string;
  toolStatus?: string;
  mcpServerName?: string;
  mcpToolName?: string;
  agentName?: string;
}

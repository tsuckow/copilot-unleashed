// ─── Shared enums & constants ───────────────────────────────────────────────

export type SessionMode = 'interactive' | 'plan' | 'autopilot';
export type ReasoningEffort = 'low' | 'medium' | 'high' | 'xhigh';
export type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'reconnecting' | 'error';

// ─── Model types ────────────────────────────────────────────────────────────

export interface ModelCapabilities {
  limits?: {
    max_context_window_tokens?: number;
    max_prompt_tokens?: number;
  };
  supports?: {
    vision?: boolean;
    reasoningEffort?: boolean;
  };
}

export interface ModelInfo {
  id: string;
  name: string;
  billing?: { multiplier: number };
  capabilities?: ModelCapabilities;
  defaultReasoningEffort?: ReasoningEffort;
  supportedReasoningEfforts?: string[];
}

// ─── Custom tool definitions ────────────────────────────────────────────────

export interface CustomToolDefinition {
  name: string;
  description: string;
  webhookUrl: string;
  method: 'GET' | 'POST';
  headers: Record<string, string>;
  parameters: Record<string, { type: string; description: string }>;
}

// ─── Tool / Agent types ─────────────────────────────────────────────────────

export interface McpServerDefinition {
  name: string;
  url: string;
  type: 'http' | 'sse';
  headers: Record<string, string>;
  tools: string[];
  enabled: boolean;
  timeout?: number;
}

export interface ToolInfo {
  name: string;
  namespacedName?: string;
  description?: string;
  mcpServerName?: string;
}

export interface AgentInfo {
  name: string;
  description?: string;
}

// ─── Quota types ────────────────────────────────────────────────────────────

export interface QuotaSnapshot {
  remainingPercentage?: number;
  percentageUsed?: number;
  resetDate?: string;
  usedRequests?: number;
  entitlementRequests?: number;
  overage?: number;
  isUnlimitedEntitlement?: boolean;
}

export type QuotaSnapshots = Record<string, QuotaSnapshot>;

/** Priority order for picking the most relevant quota snapshot */
const QUOTA_PRIORITY = ['copilot_premium', 'premium_requests', 'premium_interactions'] as const;

/** Pick the most relevant quota snapshot: premium types first, then any other key */
export function pickPrimaryQuota(snapshots: QuotaSnapshots | null): { key: string; label: string; snapshot: QuotaSnapshot } | null {
  if (!snapshots) return null;
  const keys = Object.keys(snapshots);
  if (keys.length === 0) return null;

  for (const k of QUOTA_PRIORITY) {
    if (snapshots[k]) return { key: k, label: formatQuotaLabel(k), snapshot: snapshots[k] };
  }
  // Fallback: first available key
  const k = keys[0];
  return { key: k, label: formatQuotaLabel(k), snapshot: snapshots[k] };
}

function formatQuotaLabel(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ─── Session list types ─────────────────────────────────────────────────────

export interface SessionSummary {
  id: string;
  title?: string;
  model?: string;
  updatedAt?: string;
  cwd?: string;
  repository?: string;
  branch?: string;
  checkpointCount?: number;
  hasPlan?: boolean;
  isRemote?: boolean;
  /** Where the session was found: 'sdk' = indexed by Copilot CLI, 'filesystem' = on-disk only (bundled) */
  source?: 'sdk' | 'filesystem';
}

export interface CheckpointEntry {
  number: number;
  title: string;
  filename: string;
}

export interface SessionDetail {
  id: string;
  cwd?: string;
  repository?: string;
  branch?: string;
  summary?: string;
  createdAt?: string;
  updatedAt?: string;
  checkpoints: CheckpointEntry[];
  plan?: string;
  isRemote?: boolean;
}

// ─── Incoming server messages (discriminated union on `type`) ────────────────

export interface ConnectedMessage {
  type: 'connected';
  user: string;
  sdkSessionId?: string | null;
  hasPersistedState?: boolean;
}

export interface ColdResumeMessage {
  type: 'cold_resume';
  messages: Array<Record<string, unknown>>;
  model: string;
  mode: string;
  sdkSessionId: string | null;
}

export interface SessionCreatedMessage {
  type: 'session_created';
  model: string;
  sessionId?: string;
}

export interface SessionReconnectedMessage {
  type: 'session_reconnected';
  user: string;
  hasSession: boolean;
  isProcessing?: boolean;
}

export interface TurnStartMessage {
  type: 'turn_start';
}

export interface DeltaMessage {
  type: 'delta';
  content: string;
}

export interface TurnEndMessage {
  type: 'turn_end';
  /** True when this message was replayed from the server buffer after reconnecting. */
  replayed?: boolean;
}

export interface DoneMessage {
  type: 'done';
  /** True when this message was replayed from the server buffer after reconnecting. */
  replayed?: boolean;
}

export interface ReasoningDeltaMessage {
  type: 'reasoning_delta';
  content: string;
  reasoningId: string;
}

export interface ReasoningDoneMessage {
  type: 'reasoning_done';
  reasoningId: string;
  content?: string;
}

export interface IntentMessage {
  type: 'intent';
  intent: string;
}

export interface ToolStartMessage {
  type: 'tool_start';
  toolCallId: string;
  toolName: string;
  mcpServerName?: string;
  mcpToolName?: string;
}

export interface ToolProgressMessage {
  type: 'tool_progress';
  toolCallId: string;
  message: string;
}

export interface ToolEndMessage {
  type: 'tool_end';
  toolCallId: string;
}

export interface ModelsMessage {
  type: 'models';
  models: (ModelInfo | string)[];
}

export interface ModeChangedMessage {
  type: 'mode_changed';
  mode: SessionMode;
}

export interface ModelChangedMessage {
  type: 'model_changed';
  model: string;
  source?: 'sdk' | string;
}

export interface TitleChangedMessage {
  type: 'title_changed';
  title: string;
}

export interface CopilotUsageItem {
  type: string;
  model?: string;
  tokens?: number;
  premiumRequests?: number;
}

export interface UsageMessage {
  type: 'usage';
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
  reasoningTokens?: number;
  cacheReadTokens?: number;
  cacheWriteTokens?: number;
  duration?: number;
  cost?: number;
  quotaSnapshots?: QuotaSnapshots;
  copilotUsage?: CopilotUsageItem[];
}

export interface WarningMessage {
  type: 'warning';
  message: string;
}

export interface ErrorMessage {
  type: 'error';
  message: string;
}

export interface AbortedMessage {
  type: 'aborted';
}

export interface UserInputRequestMessage {
  type: 'user_input_request';
  question: string;
  choices?: string[];
  allowFreeform: boolean;
}

export interface PermissionRequestMessage {
  type: 'permission_request';
  requestId: string;
  kind: string;
  toolName: string;
  toolArgs: Record<string, unknown>;
}

export interface ToolsMessage {
  type: 'tools';
  tools: ToolInfo[];
}

export interface AgentsMessage {
  type: 'agents';
  agents: (AgentInfo | string)[];
  current: string | null;
}

export interface AgentChangedMessage {
  type: 'agent_changed';
  agent: string | null;
}

export interface QuotaMessage {
  type: 'quota';
  quotaSnapshots?: QuotaSnapshots;
}

export interface SessionsMessage {
  type: 'sessions';
  sessions: SessionSummary[];
}

export interface SessionDetailMessage {
  type: 'session_detail';
  detail: SessionDetail;
}

export interface SessionHistoryMessage {
  type: 'session_history';
  messages: ChatMessage[];
}

export interface SessionResumedMessage {
  type: 'session_resumed';
  sessionId: string;
}

export interface SessionDeletedMessage {
  type: 'session_deleted';
  sessionId: string;
}

export interface PlanMessage {
  type: 'plan';
  exists: boolean;
  content?: string;
  path?: string;
}

export interface PlanChangedMessage {
  type: 'plan_changed';
  content?: string;
  path?: string;
}

export interface PlanUpdatedMessage {
  type: 'plan_updated';
  content?: string;
  path?: string;
}

export interface PlanDeletedMessage {
  type: 'plan_deleted';
}

export interface CompactionStartMessage {
  type: 'compaction_start';
}

export interface CompactionCompleteMessage {
  type: 'compaction_complete';
  tokensRemoved?: number;
  messagesRemoved?: number;
  preCompactionTokens?: number;
  postCompactionTokens?: number;
}

export interface CompactionResultMessage {
  type: 'compaction_result';
  tokensRemoved?: number;
  messagesRemoved?: number;
}

export interface SkillInvokedMessage {
  type: 'skill_invoked';
  skillName: string;
}

export interface SubagentStartMessage {
  type: 'subagent_start';
  agentName: string;
  description?: string;
}

export interface SubagentEndMessage {
  type: 'subagent_end';
  agentName: string;
}

export interface SubagentFailedMessage {
  type: 'subagent_failed';
  agentName?: string;
  error?: string;
}

export interface SubagentSelectedMessage {
  type: 'subagent_selected';
  agentName: string;
}

{
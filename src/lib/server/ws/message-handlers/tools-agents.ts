import { poolSend } from '../session-pool.js';
import type { MessageContext } from '../types.js';

export async function handleListTools(msg: any, ctx: MessageContext): Promise<void> {
  const { connectionEntry } = ctx;

  try {
    const model = typeof msg.model === 'string' ? msg.model : undefined;
    const result = await connectionEntry.client.rpc.tools.list({ model });
    poolSend(connectionEntry, { type: 'tools', tools: result?.tools || [] });
  } catch (err: any) {
    console.error('List tools error:', err.message);
    poolSend(connectionEntry, { type: 'tools', tools: [] });
  }
}

export async function handleListAgents(msg: any, ctx: MessageContext): Promise<void> {
  const { connectionEntry } = ctx;

  if (!connectionEntry.session) {
    poolSend(connectionEntry, { type: 'error', message: 'No active session. Send new_session first.' });
    return;
  }
  try {
    const agents = await connectionEntry.session.rpc.agent.list();
    let current = null;
    try {
      current = await connectionEntry.session.rpc.agent.getCurrent();
    } catch { /* no current agent */ }
    poolSend(connectionEntry, { type: 'agents', agents: agents?.agents || [], current: current?.agent || null });
  } catch (err: any) {
    console.error('List agents error:', err.message);
    poolSend(connectionEntry, { type: 'agents', agents: [], current: null });
  }
}

export async function handleSelectAgent(msg: any, ctx: MessageContext): Promise<void> {
  const { connectionEntry } = ctx;

  if (!connectionEntry.session) {
    poolSend(connectionEntry, { type: 'error', message: 'No active session. Send new_session first.' });
    return;
  }
  const agentName = typeof msg.name === 'string' ? msg.name.trim() : '';
  if (!agentName) {
    poolSend(connectionEntry, { type: 'error', message: 'Agent name is required' });
    return;
  }
  try {
    await connectionEntry.session.rpc.agent.select({ name: agentName });
    poolSend(connectionEntry, { type: 'agent_changed', agent: agentName });
  } catch (err: any) {
    console.error('Select agent error:', err.message);
    poolSend(connectionEntry, { type: 'error', message: `Failed to select agent: ${err.message}` });
  }
}

export async function handleDeselectAgent(msg: any, ctx: MessageContext): Promise<void> {
  const { connectionEntry } = ctx;

  if (!connectionEntry.session) {
    poolSend(connectionEntry, { type: 'error', message: 'No active session. Send new_session first.' });
    return;
  }
  try {
    await connectionEntry.session.rpc.agent.deselect();
    poolSend(connectionEntry, { type: 'agent_changed', agent: null });
  } catch (err: any) {
    console.error('Deselect agent error:', err.message);
    poolSend(connectionEntry, { type: 'error', message: `Failed to deselect agent: ${err.message}` });
  }
}

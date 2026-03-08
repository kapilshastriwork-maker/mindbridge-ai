const SYSTEM_PROMPT = `You are MindBridge AI, a compassionate and empathetic mental health support companion. Your role is to:
- Listen actively and respond with empathy and warmth
- Help users explore their feelings without judgment
- Suggest healthy coping strategies when appropriate
- Always remind users that you are an AI and not a replacement for professional help when discussing serious issues
- Keep responses concise (2-4 sentences max) and conversational
- Never diagnose conditions or prescribe treatments
- If someone mentions self-harm or crisis, immediately provide iCall India helpline: 9152987821 and Vandrevala Foundation: 1860-2662-345
- Use a warm, friendly tone with occasional supportive emojis`;

export async function getClaudeResponse(messages) {
  const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;
  
  if (!apiKey) {
    return "API key not configured. Please set VITE_CLAUDE_API_KEY in your .env file.";
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: messages
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Claude API error:', error);
    return `I'm having trouble connecting. Please try again. 💙`;
  }
}

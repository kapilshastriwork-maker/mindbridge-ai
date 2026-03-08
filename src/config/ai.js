const SYSTEM_PROMPT = `You are MindBridge AI, a compassionate and empathetic mental health support companion. Your role is to:
- Listen actively and respond with empathy and warmth
- Help users explore their feelings without judgment
- Suggest healthy coping strategies when appropriate
- Always remind users you are an AI, not a replacement for professional help when discussing serious issues
- Keep responses concise (2-4 sentences) and conversational
- Never diagnose conditions or prescribe treatments
- If someone mentions self-harm or crisis, immediately provide:
  iCall India helpline: 9152987821
  Vandrevala Foundation: 1860-2662-345
- Use a warm, friendly tone with occasional supportive emojis`;

export async function getAIResponse(messages) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey) {
    return "API key not configured. Please set VITE_GROQ_API_KEY in your .env file.";
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT
          },
          ...messages
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Groq API error:', error);
    return "I'm having trouble connecting. Please try again 💙";
  }
}

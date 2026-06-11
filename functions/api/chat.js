export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const bodyText = await request.text();
    
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + env.GROQ_API_KEY,
      },
      body: bodyText
    });
    
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}

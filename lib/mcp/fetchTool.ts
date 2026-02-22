export async function fetchExternalDocument(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    
    // Basic validation to ensure we received a payload
    if (!text || text.length === 0) {
      throw new Error("Received empty document content.");
    }

    return {
      url,
      content: text,
      timestamp: new Date().toISOString(),
      size: text.length
    };
  } catch (error) {
    console.error("MCP Fetch Error:", error);
    throw error;
  }
}

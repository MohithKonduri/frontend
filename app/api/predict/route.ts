export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Call the actual Python API
    // The user is running the API locally at port 8000
    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`External API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    // The Python API returns { "crop": "name" }
    // We need to format it to match the expected interface: { crop, confidence, advisory }

    // Capitalize crop name
    const cropName = data.crop.charAt(0).toUpperCase() + data.crop.slice(1)

    return Response.json({
      crop: cropName,
      confidence: 0.95, // Placeholder as model API doesn't return confidence yet
      advisory: `Based on your soil nutrients and weather conditions, ${cropName} is highly suitable for your land. Ensure proper irrigation and nutrient management for optimal yield.`,
    })
  } catch (error) {
    console.error("Prediction API Error:", error)
    return Response.json({ error: "Failed to process prediction. Is the local backend running?" }, { status: 500 })
  }
}

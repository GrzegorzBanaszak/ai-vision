import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Pobieramy dane binarne zdjęcia z żądania
    const blob = await req.blob();
    const arrayBuffer = await blob.arrayBuffer();

    const key = process.env.AZURE_VISION_KEY;
    const endpoint = process.env.AZURE_VISION_ENDPOINT;

    const url = `${endpoint}computervision/imageanalysis:analyze?api-version=2024-02-01&features=caption`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key!,
        "Content-Type": "application/octet-stream",
      },
      body: arrayBuffer,
    });

    const data = await response.json();

    if (!response.ok) {
      // Jeśli Azure zwróci błąd (np. zły format), przekaż go z odpowiednim statusem
      return NextResponse.json(
        { error: data.message || "Błąd analizy obrazu" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 });
  }
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface RequestBody {
  pdfData: string;
  fileName: string;
}

// Helper function to parse Vision API response into CSV format
function parseVisionResponseToCSV(visionResponse: any): string {
  try {
    const textAnnotations = visionResponse.responses?.[0]?.textAnnotations;
    
    if (!textAnnotations || textAnnotations.length === 0) {
      throw new Error('No text found in the document');
    }

    // Get the full text
    const fullText = textAnnotations[0].description;
    
    // Split into lines and process
    const lines = fullText.split('\n').filter(line => line.trim().length > 0);
    
    // Simple heuristic to detect table-like structure
    const csvRows: string[] = [];
    
    for (const line of lines) {
      // Look for common separators and patterns
      const cleanLine = line.trim();
      
      if (cleanLine) {
        // Split by multiple spaces, tabs, or common separators
        const columns = cleanLine
          .split(/\s{2,}|\t|,/)
          .map(col => col.trim())
          .filter(col => col.length > 0);
        
        if (columns.length > 1) {
          // Escape CSV special characters
          const escapedColumns = columns.map(col => {
            if (col.includes('"') || col.includes(',') || col.includes('\n')) {
              return `"${col.replace(/"/g, '""')}"`;
            }
            return col;
          });
          
          csvRows.push(escapedColumns.join(','));
        } else if (columns.length === 1) {
          // Single column data
          csvRows.push(columns[0]);
        }
      }
    }
    
    if (csvRows.length === 0) {
      // If no structured data found, create a simple single-column CSV
      csvRows.push('Extracted Text');
      lines.forEach(line => {
        if (line.trim()) {
          const escaped = line.trim().includes(',') || line.trim().includes('"') || line.trim().includes('\n')
            ? `"${line.trim().replace(/"/g, '""')}"`
            : line.trim();
          csvRows.push(escaped);
        }
      });
    }
    
    return csvRows.join('\n');
  } catch (error) {
    console.error('Error parsing Vision API response:', error);
    throw new Error('Failed to parse document structure');
  }
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const { pdfData, fileName }: RequestBody = await req.json();

    if (!pdfData || !fileName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: pdfData and fileName" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get Google Cloud Vision API key from environment
    const apiKey = Deno.env.get('GOOGLE_CLOUD_VISION_API_KEY');
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Google Cloud Vision API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Prepare the request for Google Cloud Vision API
    const visionRequest = {
      requests: [
        {
          image: {
            content: pdfData,
          },
          features: [
            {
              type: "DOCUMENT_TEXT_DETECTION",
              maxResults: 1,
            },
          ],
        },
      ],
    };

    // Call Google Cloud Vision API
    const visionResponse = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visionRequest),
      }
    );

    if (!visionResponse.ok) {
      const errorText = await visionResponse.text();
      console.error('Vision API Error:', errorText);
      throw new Error(`Vision API error: ${visionResponse.status}`);
    }

    const visionData = await visionResponse.json();
    
    // Check for API errors
    if (visionData.responses?.[0]?.error) {
      throw new Error(`Vision API error: ${visionData.responses[0].error.message}`);
    }

    // Convert the Vision API response to CSV
    const csvData = parseVisionResponseToCSV(visionData);

    return new Response(
      JSON.stringify({
        success: true,
        csvData,
        fileName: fileName.replace('.pdf', '.csv'),
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error('Error processing PDF:', error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
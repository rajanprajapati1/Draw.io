import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
});

const GenerateMermaidDiagram = async (diagramDescription) => {
    const completion = await openai.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            // {
            //     role: "assistant",
            //     content: `
            //   You are an assistant that generates only valid Mermaid diagram code. When given a diagram description, output only the Mermaid code with no additional commentary, explanation, or formatting. Follow these rules:
            //   1. Only support Flowcharts and Sequence Diagrams. If the user does not specify a diagram type, default to a Flowchart.
            //   2. If the input contains instructions for multiple diagrams, generate only the two diagrams requested.
            //   3. Ensure that the generated code is error-free, follows correct Mermaid syntax, and does not include any extra tokens or incomplete edges.
            //   4. Avoid using more than one arrow token in a single connection. Use a single arrow with the label in the exact format: 
            //      A -->|Label| B
            //      Do not include any trailing characters or extra arrow tokens (for example, do not use '-->|Label|>' or similar).
            //   5. Every connection must lead to a defined node. Do not leave an edge without a destination node.
            //   6. Ensure node definitions and labels are correctly formatted (e.g., A[Text] for rectangular nodes or B(Text) for round nodes).
              
            //   Example:
              
            //   Correct:
            //   \`\`\`mermaid
            //   flowchart LR
            //     A[Start] -->|Proceed| B[End]
            //   \`\`\`
              
            //   Incorrect:
            //   \`\`\`mermaid
            //   flowchart LR
            //     A[Start] -->|Proceed|> B[End]
            //   \`\`\`
              
            //   If any extra arrow tokens appear in the output (like '|>'), replace them with a single '|' in the final output.
            //     `.trim(),
            //   }
            {
                role: "assistant",
                content: `
              You are an assistant that generates only valid Mermaid diagram code. When given a diagram description, output only the Mermaid code with no additional commentary, explanation, or formatting. Follow these strict rules:
              
              1. **Supported Diagrams:**  
                 Only support Flowcharts and Sequence Diagrams. If the user does not specify a diagram type, default to a Flowchart.
              
              2. **Multiple Diagrams:**  
                 If the input contains instructions for multiple diagrams, generate only the two diagrams requested.
              
              3. **Error-Free Syntax:**  
                 Ensure that the generated code is error-free and follows correct Mermaid syntax. Do not include any extra tokens, characters, or incomplete edges.
              
              4. **Arrow Formatting:**  
                 - Every connection must use exactly one arrow token with a label.  
                 - The arrow must be formatted as:  
                   A -->|Label| B  
                   **Do not include any trailing or extra arrow tokens (for example, do not use "-->|Label|>" or similar).**
              
              5. **Node Connections:**  
                 Every connection must lead to a defined node. Do not leave an edge without a destination node.
              
              6. **Node Formatting:**  
                 Ensure node definitions and labels are correctly formatted. For example:  
                 - Rectangular nodes: A[Text]  
                 - Rounded nodes: B(Text)  
                 - Circular or other shapes should also follow Mermaid's standard notation.
              
              7. **Handling Extra Tokens:**  
                 If any extra tokens (such as "|>") appear, they must be removed or corrected automatically in the output.
              
              8. **Ambiguous Input:**  
                 For any ambiguous or incomplete diagram descriptions, default to generating a basic Flowchart that adheres to the above rules.
              
Incorrect Arrow Format:
A -->|Initiates Payment|> B[Stripe Payment Gateway] (❌ Wrong)
Correct format: A -->|Initiates Payment| B[Stripe Payment Gateway] (✅ Correct)
The extra > at the end of |Label|> is invalid and should be removed.
Consistent Arrow Formatting:

Every labeled connection should use the format A -->|Label| B, not A -->|Label|> B.

              **Examples:**
              
              *Correct Format:*
              \`\`\`mermaid
              flowchart LR
                A[Start] -->|Proceed| B[Finish]
              \`\`\`
              
              *Incorrect Format:*
              \`\`\`mermaid
              flowchart LR
                A[Start] -->|Proceed|> B[Finish]
              \`\`\`
              
              Remember: Output only the Mermaid code and nothing else.
                `.trim(),
              }
              
,              
            { role: "user", content: diagramDescription },
        ],
    });

    return completion.choices[0].message.content;
};

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const description =
            searchParams.get("description") ||
            `
      graph TD
        A[Start] --> B[Process]
        B --> C[End]
    `;

        const mermaidCode = await GenerateMermaidDiagram(description);
        console.log(mermaidCode);

        return NextResponse.json({
            msg: "success",
            status: true,
            result: mermaidCode,
        });
    } catch (error) {
        return NextResponse.json({
            msg: "error",
            status: false,
            error: error.message,
        });
    }
}

export async function POST(request) {
    try {
        const payload = await request.json();
        console.log(payload, "payload");
        const mermaidCode = await GenerateMermaidDiagram(payload);
        console.log(mermaidCode);
        return NextResponse.json({
            msg: "success",
            status: true,
            result: mermaidCode,
        });
    } catch (error) {
        return NextResponse.json({
            msg: "error",
            status: false,
            error: error.message,
        });
    }
}

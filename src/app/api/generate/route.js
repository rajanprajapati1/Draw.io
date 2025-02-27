import { NextResponse } from "next/server";
import OpenAI from "openai";
import {Prompt} from '../../../constants/Prompt'

const openai = new OpenAI({

});

const GenerateMermaidDiagram = async (diagramDescription) => {
    const completion = await openai.chat.completions.create({

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
                content: Prompt,
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

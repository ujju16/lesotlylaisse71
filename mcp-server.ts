#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  {
    name: "lesotlylaisse71-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Liste des outils disponibles
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "echo",
        description: "Renvoie le texte fourni",
        inputSchema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Le message à renvoyer",
            },
          },
          required: ["message"],
        },
      },
      {
        name: "get_time",
        description: "Renvoie l'heure actuelle",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

// Gestionnaire pour exécuter les outils
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "echo":
      return {
        content: [
          {
            type: "text",
            text: request.params.arguments?.message as string,
          },
        ],
      };

    case "get_time":
      return {
        content: [
          {
            type: "text",
            text: new Date().toISOString(),
          },
        ],
      };

    default:
      throw new Error(`Outil inconnu: ${request.params.name}`);
  }
});

// Démarrer le serveur
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Serveur MCP démarré");
}

main().catch((error) => {
  console.error("Erreur lors du démarrage du serveur:", error);
  process.exit(1);
});

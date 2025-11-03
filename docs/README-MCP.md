# Configuration du Serveur MCP

Ce projet inclut un serveur MCP (Model Context Protocol) pour permettre l'intégration avec des outils compatibles MCP.

## Installation

Les dépendances sont déjà installées. Si vous devez les réinstaller :

```bash
npm install
```

## Compilation

Compilez le serveur TypeScript en JavaScript :

```bash
npx tsc mcp-server.ts --module nodenext --moduleResolution nodenext --target es2022 --outDir .
```

## Utilisation

### Démarrage du serveur

```bash
node mcp-server.js
```

### Configuration pour Claude Desktop

Ajoutez cette configuration dans votre fichier de configuration Claude Desktop (`~/Library/Application Support/Claude/claude_desktop_config.json` sur Mac ou `%APPDATA%\Claude\claude_desktop_config.json` sur Windows) :

```json
{
  "mcpServers": {
    "lesotlylaisse71": {
      "command": "node",
      "args": ["/chemin/absolu/vers/votre/projet/mcp-server.js"]
    }
  }
}
```

## Outils disponibles

Le serveur MCP fournit les outils suivants :

1. **echo** : Renvoie le texte fourni
   - Paramètre : `message` (string)

2. **get_time** : Renvoie l'heure actuelle au format ISO

## Personnalisation

Vous pouvez ajouter vos propres outils en modifiant `mcp-server.ts` :

1. Ajoutez la définition de l'outil dans `ListToolsRequestSchema`
2. Ajoutez le gestionnaire correspondant dans `CallToolRequestSchema`
3. Recompilez avec `npx tsc`

## Exemple d'outil personnalisé

```typescript
// Dans ListToolsRequestSchema
{
  name: "mon_outil",
  description: "Description de mon outil",
  inputSchema: {
    type: "object",
    properties: {
      param1: {
        type: "string",
        description: "Description du paramètre",
      },
    },
    required: ["param1"],
  },
}

// Dans CallToolRequestSchema
case "mon_outil":
  return {
    content: [
      {
        type: "text",
        text: `Résultat: ${request.params.arguments?.param1}`,
      },
    ],
  };
```

## Ressources

- [Documentation MCP](https://modelcontextprotocol.io/)
- [SDK MCP](https://github.com/modelcontextprotocol/sdk)

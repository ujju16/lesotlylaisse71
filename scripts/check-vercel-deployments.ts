#!/usr/bin/env bun

/**
 * Script de vérification des déploiements Vercel
 * Vérifie que les déploiements sont correctement nommés et configurés
 */

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

interface Deployment {
  url: string;
  state: string;
  target: string;
  alias?: string[];
}

async function _getDeployments(): Promise<Deployment[]> {
  try {
    const { stdout: _stdout } = await execAsync("vercel ls --yes");
    // Parse the output manually since --json is not supported
    return [];
  } catch (_error) {
    console.error(
      "❌ Erreur lors de la récupération des déploiements:",
      _error
    );
    return [];
  }
}

async function checkDeploymentConfiguration() {
  console.log(
    "🔍 Vérification de la configuration des déploiements Vercel...\n"
  );

  try {
    const { stdout } = await execAsync(
      'vercel ls --yes 2>&1 | grep -E "(Production|Preview|Ready|Building)" | head -10 || true'
    );
    console.log("📊 Déploiements récents:\n");
    console.log(stdout || "   Aucun déploiement trouvé");
  } catch {
    console.log("   ⚠️  Impossible de récupérer les déploiements");
  }

  console.log("\n✅ Vérification des branches configurées:");
  try {
    const { stdout: branches } = await execAsync(
      'git branch -a | grep -E "(main|dev)"'
    );
    console.log(branches);
  } catch {
    console.log("   ⚠️  Erreur lors de la vérification des branches");
  }
}

async function checkDomainConfiguration() {
  console.log("\n🌐 Vérification de la configuration des domaines...\n");

  try {
    const { stdout } = await execAsync("vercel domains ls");
    console.log(stdout);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des domaines:", error);
  }
}

async function main() {
  console.log("╔════════════════════════════════════════════════════════╗");
  console.log("║     Vérification Déploiements Vercel                  ║");
  console.log("║     Projet: lesotlylaisse71                           ║");
  console.log("╚════════════════════════════════════════════════════════╝\n");

  await checkDeploymentConfiguration();
  await checkDomainConfiguration();

  console.log("\n📝 Recommendations:");
  console.log(
    "   1. La branche main doit déployer sur https://lesotlylaisse71.fr (Production)"
  );
  console.log("   2. La branche dev doit déployer sur Preview");
  console.log(
    "   3. Les Pull Requests doivent créer des déploiements Preview uniques"
  );
  console.log("\n💡 Pour configurer les environnements:");
  console.log(
    "   - Dashboard Vercel: https://vercel.com/ujju16s-projects/lesotlylaisse71/settings"
  );
  console.log(
    "   - Git Settings: https://vercel.com/ujju16s-projects/lesotlylaisse71/settings/git"
  );
  console.log(
    "   - Domain Settings: https://vercel.com/ujju16s-projects/lesotlylaisse71/settings/domains"
  );
}

main().catch(console.error);

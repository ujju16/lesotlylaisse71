#!/usr/bin/env bun

/**
 * Script de vérification des déploiements Vercel
 * Vérifie que les déploiements sont correctement nommés et configurés
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface Deployment {
  url: string;
  state: string;
  target: string;
  alias?: string[];
}

async function getDeployments(): Promise<Deployment[]> {
  try {
    const { stdout } = await execAsync('vercel ls --yes --json');
    const lines = stdout.trim().split('\n');
    const deployments = lines
      .filter(line => line.trim())
      .map(line => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
    
    return deployments;
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des déploiements:', error);
    return [];
  }
}

async function checkDeploymentConfiguration() {
  console.log('🔍 Vérification de la configuration des déploiements Vercel...\n');

  const deployments = await getDeployments();
  
  if (deployments.length === 0) {
    console.log('⚠️  Aucun déploiement trouvé');
    return;
  }

  console.log(`📊 Nombre total de déploiements: ${deployments.length}\n`);

  // Compter par type
  const productionDeployments = deployments.filter(d => d.target === 'production');
  const previewDeployments = deployments.filter(d => d.target !== 'production');

  console.log('📈 Répartition des déploiements:');
  console.log(`   - Production: ${productionDeployments.length}`);
  console.log(`   - Preview: ${previewDeployments.length}\n`);

  // Vérifier le déploiement production actuel
  console.log('🚀 Déploiement Production (main):');
  if (productionDeployments.length > 0) {
    const latestProd = productionDeployments[0];
    console.log(`   ✅ URL: ${latestProd.url}`);
    console.log(`   ✅ État: ${latestProd.state}`);
    if (latestProd.alias && latestProd.alias.length > 0) {
      console.log(`   ✅ Aliases: ${latestProd.alias.join(', ')}`);
    }
  } else {
    console.log('   ⚠️  Aucun déploiement en production');
  }

  console.log('\n🔍 Déploiements Preview (dev):');
  const recentPreviews = previewDeployments.slice(0, 3);
  recentPreviews.forEach((deployment, index) => {
    console.log(`   ${index + 1}. ${deployment.url}`);
    console.log(`      État: ${deployment.state}`);
  });

  console.log('\n✅ Vérification terminée!');
}

async function checkDomainConfiguration() {
  console.log('\n🌐 Vérification de la configuration des domaines...\n');

  try {
    const { stdout } = await execAsync('vercel domains ls');
    console.log(stdout);
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des domaines:', error);
  }
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║     Vérification Déploiements Vercel                  ║');
  console.log('║     Projet: lesotlylaisse71                           ║');
  console.log('╚════════════════════════════════════════════════════════╝\n');

  await checkDeploymentConfiguration();
  await checkDomainConfiguration();

  console.log('\n📝 Recommendations:');
  console.log('   1. La branche main doit déployer sur https://lesotlylaisse71.fr (Production)');
  console.log('   2. La branche dev doit déployer sur Preview');
  console.log('   3. Les Pull Requests doivent créer des déploiements Preview uniques');
  console.log('\n💡 Pour configurer les environnements:');
  console.log('   - Dashboard Vercel: https://vercel.com/ujju16s-projects/lesotlylaisse71/settings');
  console.log('   - Git Settings: https://vercel.com/ujju16s-projects/lesotlylaisse71/settings/git');
  console.log('   - Domain Settings: https://vercel.com/ujju16s-projects/lesotlylaisse71/settings/domains');
}

main().catch(console.error);

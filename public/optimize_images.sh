#!/bin/bash

# Script d'optimisation des images du carrousel
echo "🖼️  Optimisation des images du carrousel..."

# Créer le dossier si nécessaire
mkdir -p images/carousel

for i in {1..13}; do
    input="photo${i}.jpg"
    output="images/carousel/photo${i}.webp"
    
    if [ -f "$input" ]; then
        echo "📸 Traitement de $input..."
        
        # Convertir en WebP avec qualité 85% et redimensionner à 1200px max
        magick "$input" \
            -resize '1200x800>' \
            -quality 85 \
            "$output"
        
        # Afficher les tailles
        if [ -f "$output" ]; then
            size_before=$(du -h "$input" | cut -f1)
            size_after=$(du -h "$output" | cut -f1)
            echo "   ✅ Avant: $size_before → Après: $size_after"
        fi
    fi
done

echo ""
echo "✅ Optimisation terminée!"
echo ""
echo "📊 Résumé:"
echo "Images originales:"
du -ch photo*.jpg | tail -1
echo "Images optimisées:"
du -ch images/carousel/*.webp 2>/dev/null | tail -1 || echo "Aucune image optimisée"

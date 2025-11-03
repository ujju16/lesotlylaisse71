#!/bin/bash

echo "🚀 Starting Grafana Monitoring Stack..."
echo ""

cd grafana

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start the stack
echo "📦 Starting containers..."
docker-compose up -d

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check service health
echo ""
echo "🔍 Checking services..."

if curl -s http://localhost:3100/api/health > /dev/null; then
    echo "✅ Grafana is ready at http://localhost:3100"
    echo "   Login: admin / admin"
else
    echo "⚠️  Grafana is starting..."
fi

if curl -s http://localhost:3101/ready > /dev/null; then
    echo "✅ Loki is ready at http://localhost:3101"
else
    echo "⚠️  Loki is starting..."
fi

if curl -s http://localhost:3102/status > /dev/null; then
    echo "✅ Tempo is ready at http://localhost:3102"
else
    echo "⚠️  Tempo is starting..."
fi

if curl -s http://localhost:12345/health > /dev/null; then
    echo "✅ Faro Collector is ready at http://localhost:12345"
else
    echo "⚠️  Faro Collector is starting..."
fi

echo ""
echo "📊 Monitoring stack is ready!"
echo ""
echo "Next steps:"
echo "  1. Add to .env.local: NEXT_PUBLIC_FARO_URL=http://localhost:12345/collect"
echo "  2. Run: bun run dev"
echo "  3. Open: http://localhost:3100"
echo ""
echo "To stop: cd grafana && docker-compose down"
echo "To view logs: cd grafana && docker-compose logs -f"

#!/bin/bash
echo "Testing all product image URLs..."
echo ""

sqlite3 prisma/dev.db "SELECT id, name, image FROM Product;" | while IFS='|' read -r id name image; do
  echo -n "Testing: $name (ID: $id)... "
  status=$(curl -s -o /dev/null -w "%{http_code}" -I "$image" 2>/dev/null)
  if [ "$status" = "200" ]; then
    echo "✅ OK"
  else
    echo "❌ BROKEN (HTTP $status)"
    echo "   URL: $image"
  fi
done

#!/bin/bash
echo "COMPLETE PRODUCT IMAGE STATUS REPORT"
echo "====================================="
echo ""

total=0
working=0
broken=0

sqlite3 prisma/dev.db "SELECT id, name, image FROM Product ORDER BY id;" | while IFS='|' read -r id name image; do
  ((total++))
  echo -n "$id. $name... "
  status=$(curl -s -o /dev/null -w "%{http_code}" -I "$image" 2>/dev/null)
  if [ "$status" = "200" ]; then
    echo "✅"
    ((working++))
  else
    echo "❌ (HTTP $status)"
    echo "   URL: $image"
    ((broken++))
  fi
done

echo ""
echo "====================================="
echo "SUMMARY:"
echo "Total Products: $total"
echo "Working Images: $working ✅"
echo "Broken Images: $broken ❌"
echo "Success Rate: $((working * 100 / total))%"

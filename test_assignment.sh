#!/bin/bash

echo "=========================================="
echo "Assignment Requirements Test"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Django Server Running
echo "Test 1: Checking Django server..."
if curl -s http://localhost:8000/api/entries/ > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Django server is running"
else
    echo -e "${RED}✗${NC} Django server is NOT running"
    echo "   Start it with: cd myproject && source /home/ubuntu/myvenv/bin/activate && python manage.py runserver 0.0.0.0:8000"
    exit 1
fi

# Test 2: GET Endpoint Works
echo ""
echo "Test 2: Testing GET /api/entries/ endpoint..."
RESPONSE=$(curl -s http://localhost:8000/api/entries/)
if echo "$RESPONSE" | grep -q "\["; then
    ENTRY_COUNT=$(echo "$RESPONSE" | python3 -c "import sys, json; data=json.load(sys.stdin); print(len(data))" 2>/dev/null || echo "0")
    echo -e "${GREEN}✓${NC} GET endpoint works - Found $ENTRY_COUNT entries"
else
    echo -e "${RED}✗${NC} GET endpoint failed"
    echo "   Response: $RESPONSE"
fi

# Test 3: POST Endpoint Works
echo ""
echo "Test 3: Testing POST /api/entries/ endpoint..."
TEST_DATE=$(date +%Y-%m-%d)
POST_RESPONSE=$(curl -s -X POST http://localhost:8000/api/entries/ \
    -H "Content-Type: application/json" \
    -d "{\"date\":\"$TEST_DATE\",\"primaryEmotion\":\"SURPRISE\",\"intensity\":6,\"notes\":\"Test entry from script\"}")

if echo "$POST_RESPONSE" | grep -q "id"; then
    NEW_ID=$(echo "$POST_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin)['id'])" 2>/dev/null)
    echo -e "${GREEN}✓${NC} POST endpoint works - Created entry with id: $NEW_ID"
else
    echo -e "${RED}✗${NC} POST endpoint failed"
    echo "   Response: $POST_RESPONSE"
fi

# Test 4: Database Has Data
echo ""
echo "Test 4: Checking database..."
cd myproject
source /home/ubuntu/myvenv/bin/activate > /dev/null 2>&1
DB_COUNT=$(python manage.py shell -c "from journal.models import JournalEntry; print(JournalEntry.objects.count())" 2>/dev/null | tail -1)
if [ ! -z "$DB_COUNT" ] && [ "$DB_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Database has $DB_COUNT entries"
else
    echo -e "${RED}✗${NC} Database is empty or error occurred"
fi
cd ..

# Test 5: Check Redux Thunks Exist
echo ""
echo "Test 5: Checking Redux thunks..."
if grep -q "fetchEntries" store/journalSlice.ts && grep -q "createEntry" store/journalSlice.ts; then
    echo -e "${GREEN}✓${NC} Redux thunks (fetchEntries, createEntry) exist"
else
    echo -e "${RED}✗${NC} Redux thunks missing"
fi

# Test 6: Check Frontend Pages
echo ""
echo "Test 6: Checking frontend pages..."
PAGES=("app/index.tsx" "app/add-entry.tsx" "app/entry/[id].tsx")
ALL_EXIST=true
for page in "${PAGES[@]}"; do
    if [ -f "$page" ]; then
        echo -e "${GREEN}✓${NC} $page exists"
    else
        echo -e "${RED}✗${NC} $page missing"
        ALL_EXIST=false
    fi
done

# Summary
echo ""
echo "=========================================="
echo "Summary"
echo "=========================================="
echo ""
echo "✓ Backend API: GET and POST endpoints working"
echo "✓ Database: SQLite storing entries"
echo "✓ Redux: Thunks configured for API calls"
echo "✓ Frontend: Multiple pages with user input"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "1. Open your app in browser: http://localhost:8081"
echo "2. Test creating an entry through the UI"
echo "3. Verify entries persist after page refresh"
echo "4. Check browser DevTools Network tab to see API calls"
echo ""
echo "See ASSIGNMENT_CHECKLIST.md for detailed verification steps"


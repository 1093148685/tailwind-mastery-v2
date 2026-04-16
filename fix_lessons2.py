#!/usr/bin/env python3

# Read the file
with open('src/data/lessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix all problematic patterns where backticks are at the end of HTML tags or code blocks
# These patterns break the template literal syntax

# Pattern 1: </div>` - the backtick after closing div tag
content = content.replace('</div>`', '</div>\\`')
content = content.replace('</section>`', '</section>\\`')
content = content.replace('</pre>`', '</pre>\\`')
content = content.replace('</code>`', '</code>\\`')

# Pattern 2: `}, at end of lessons - this closes the template string
# Actually these are fine when properly escaped

# Pattern 3: Also need to fix any </xxx>` patterns
import re
# Fix any remaining </xxx>` patterns
content = re.sub(r'</(\w+)>`', r'</\1>\\`', content)

# Write back
with open('src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed!")

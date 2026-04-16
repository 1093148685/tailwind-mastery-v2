#!/usr/bin/env python3

# Read the file
with open('src/data/lessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Count backticks
backtick_count = content.count('`')
print(f"Found {backtick_count} backticks")

# We need to escape ALL backticks in the content that are inside template literals
# The issue is that the content strings use template literals but have unescaped backticks
# Let's use a different approach - replace all standalone backticks that would break the template

# First, let's see what patterns we have
# The content fields are template literals starting with `content: \` and ending with \`,
# with hints: [...] following

# Replace all backticks with escaped version in the entire file
fixed_content = content.replace('`', '\\`')

# However, this will break things that weren't meant to be escaped
# Let's be more careful - look for patterns like "...`" in content strings

# Actually, a simpler approach: let's use regular strings instead of template literals
# But that's too complex. Let's try to fix specific patterns

# Looking at the errors, the issue is specifically in content: strings that contain ` characters
# These need to be escaped as \`

# Let's find all content: `...` patterns and escape the backticks inside
import re

# This regex finds content: `...` patterns
# But it's complex because the content spans multiple lines

# Alternative approach: Since this is a TypeScript file, we can use string concatenation
# or we can manually fix by looking at each lesson

# Let me check what patterns are breaking:
# 1. Lines ending with `}, - the backtick before } is breaking
# 2. Lines with </code></pre>` - backtick breaking the template

# Let's manually look at the problematic areas and create targeted fixes

# First, let's see all the lines that have `}, pattern
lines_with_problem = []
for i, line in enumerate(content.split('\n'), 1):
    if '`},' in line or '</div>`,' in line or '`</code>' in line:
        lines_with_problem.append((i, line.strip()[:60]))

print("\nProblematic patterns found:")
for line_num, line in lines_with_problem[:20]:
    print(f"Line {line_num}: {line}")

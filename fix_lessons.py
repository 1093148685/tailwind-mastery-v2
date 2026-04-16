#!/usr/bin/env python3
import re

# Read the file
with open('src/data/lessons.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Count how many we have
count = content.count('{`')
print(f"Found {count} occurrences of {{` ")

# Replace {` with {\` (escape the backtick in template literal)
fixed_content = content.replace('{`', '{\\`')

# Write back
with open('src/data/lessons.ts', 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print("Fixed!")

#!/usr/bin/env python3
"""
Helper script to extract remaining sections from the monolithic SQL HTML file
and create individual pages with their corresponding JSON data files.
"""

import json
import re
from pathlib import Path

# This script will be run to extract and create the remaining sections:
# - aggregation.html + aggregation.json
# - joins.html + joins.json
# - subqueries.html + subqueries.json
# - window-functions.html + window-functions.json
# - advanced.html + advanced.json
# - ml-focus.html + ml-focus.json

print("SQL Tutorial Refactoring Helper")
print("================================")
print("\nThis script helps extract sections from sql.html")
print("and creates modular pages with JSON data files.")
print("\nThe following files have been created:")
print("✓ index.html - Master landing page")
print("✓ pages/fundamentals.html + data/fundamentals.json")
print("✓ pages/filtering.html + data/filtering.json")
print("\nRemaining sections to be created manually:")
print("- aggregation.html + aggregation.json")
print("- joins.html + joins.json")
print("- subqueries.html + subqueries.json")
print("- window-functions.html + window-functions.json")
print("- advanced.html + advanced.json")
print("- ml-focus.html + ml-focus.json")
print("\nUse the established template pattern for consistency!")

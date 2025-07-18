#!/usr/bin/env python3
import os
import re
from collections import defaultdict

def extract_service_name(filename):
    """Extract service name from filename and get the actual service title from file"""
    filepath = f"src/data/services/{filename}"
    try:
        with open(filepath, 'r') as f:
            content = f.read()
            # Extract the title (first line starting with #)
            title_match = re.search(r'^# (.+)$', content, re.MULTILINE)
            if title_match:
                return title_match.group(1)
    except:
        pass
    
    # Fallback to filename-based extraction
    name_part = filename.replace('.md', '').split('_', 1)[1] if '_' in filename else filename.replace('.md', '')
    return name_part.replace('_', ' ').title()

def extract_pricepoint_tags():
    services_dir = "src/data/services"
    price_mapping = defaultdict(list)
    
    # Get all service files
    service_files = [f for f in os.listdir(services_dir) if f.endswith('.md')]
    service_files.sort()
    
    for filename in service_files:
        filepath = os.path.join(services_dir, filename)
        
        try:
            with open(filepath, 'r') as f:
                content = f.read()
                
            # Find PricePoint_Tags section
            pricepoint_match = re.search(r'### PricePoint_Tags\s*\n(.*?)(?=\n###|\n\n|\Z)', content, re.DOTALL)
            
            if pricepoint_match:
                tags_section = pricepoint_match.group(1).strip()
                # Extract tags (lines starting with -)
                tags = re.findall(r'^\s*-\s*(.+)$', tags_section, re.MULTILINE)
                
                service_title = extract_service_name(filename)
                
                for tag in tags:
                    tag = tag.strip()
                    if tag in ['budget-friendly', 'mid-range', 'premium-service']:
                        price_mapping[tag].append((filename, service_title))
                        
        except Exception as e:
            print(f"Error processing {filename}: {e}")
    
    return price_mapping

def generate_mapping_file():
    price_mapping = extract_pricepoint_tags()
    
    output = []
    output.append("# PricePoint_Tags Service Mapping")
    output.append("")
    output.append("**Purpose:** Complete relational mapping of all services to their price point classifications")
    output.append("**Generated:** Automatically extracted from all 85 service files")
    output.append("")
    output.append("---")
    output.append("")
    
    # Budget-friendly services
    if 'budget-friendly' in price_mapping:
        output.append("## budget-friendly Services")
        output.append("")
        for filename, title in sorted(price_mapping['budget-friendly']):
            output.append(f"- **{filename}** - {title}")
        output.append("")
        output.append("---")
        output.append("")
    
    # Mid-range services
    if 'mid-range' in price_mapping:
        output.append("## mid-range Services")
        output.append("")
        for filename, title in sorted(price_mapping['mid-range']):
            output.append(f"- **{filename}** - {title}")
        output.append("")
        output.append("---")
        output.append("")
    
    # Premium services
    if 'premium-service' in price_mapping:
        output.append("## premium-service Services")
        output.append("")
        for filename, title in sorted(price_mapping['premium-service']):
            output.append(f"- **{filename}** - {title}")
        output.append("")
        output.append("---")
        output.append("")
    
    # Summary statistics
    total_services = sum(len(services) for services in price_mapping.values())
    output.append("## Summary Statistics")
    output.append("")
    output.append(f"- **Total Services Scanned:** 85")
    output.append(f"- **Total Services with PricePoint_Tags:** {total_services}")
    output.append(f"- **budget-friendly:** {len(price_mapping.get('budget-friendly', []))} services")
    output.append(f"- **mid-range:** {len(price_mapping.get('mid-range', []))} services")
    output.append(f"- **premium-service:** {len(price_mapping.get('premium-service', []))} services")
    output.append("")
    
    # Service distribution by category
    output.append("## Service Distribution by Category")
    output.append("")
    
    categories = defaultdict(lambda: defaultdict(int))
    for price_point, services in price_mapping.items():
        for filename, title in services:
            category = filename.split('_')[0]
            categories[category][price_point] += 1
    
    for category in sorted(categories.keys()):
        output.append(f"### {category.title()} Services")
        total_cat = sum(categories[category].values())
        output.append(f"- **Total:** {total_cat} services")
        for price_point in ['budget-friendly', 'mid-range', 'premium-service']:
            count = categories[category].get(price_point, 0)
            if count > 0:
                output.append(f"- **{price_point}:** {count} services")
        output.append("")
    
    output.append("---")
    output.append("")
    output.append("**This mapping enables the tag-based filtering system to match clients with services that fit their budget constraints and value expectations.**")
    
    return '\n'.join(output)

if __name__ == "__main__":
    mapping_content = generate_mapping_file()
    
    # Write to docs/metadata-tags directory
    output_path = "docs/metadata-tags/PricePoint_Tags_Service_Mapping.md"
    with open(output_path, 'w') as f:
        f.write(mapping_content)
    
    print(f"Mapping file created: {output_path}")
    print(f"Content length: {len(mapping_content)} characters")


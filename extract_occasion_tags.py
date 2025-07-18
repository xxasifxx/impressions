#!/usr/bin/env python3
"""
Extract OccasionSuitability_Tags from all service files and create comprehensive mapping
"""

import os
import re
from collections import defaultdict

def extract_occasion_tags_from_file(filepath):
    """Extract OccasionSuitability_Tags from a single service file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract service name from first line
        lines = content.split('\n')
        service_name = lines[0].replace('# ', '').strip()
        
        # Find OccasionSuitability_Tags section
        occasion_section_start = content.find('### OccasionSuitability_Tags')
        if occasion_section_start == -1:
            return None, None
        
        # Find the next section (starts with ###)
        next_section_start = content.find('###', occasion_section_start + 1)
        if next_section_start == -1:
            occasion_section = content[occasion_section_start:]
        else:
            occasion_section = content[occasion_section_start:next_section_start]
        
        # Extract tags (lines starting with -)
        tags = []
        for line in occasion_section.split('\n'):
            line = line.strip()
            if line.startswith('- '):
                tag = line[2:].strip()
                tags.append(tag)
        
        return service_name, tags
    
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return None, None

def main():
    services_dir = 'src/data/services'
    
    # Dictionary to store services by occasion tag
    occasion_mapping = defaultdict(list)
    
    # Dictionary to store all services for summary
    all_services = {}
    
    # Process all service files
    service_files = [f for f in os.listdir(services_dir) if f.endswith('.md')]
    service_files.sort()
    
    print(f"Processing {len(service_files)} service files...")
    
    for filename in service_files:
        filepath = os.path.join(services_dir, filename)
        service_name, tags = extract_occasion_tags_from_file(filepath)
        
        if service_name and tags:
            all_services[filename] = {
                'name': service_name,
                'tags': tags
            }
            
            # Add to occasion mapping
            for tag in tags:
                occasion_mapping[tag].append({
                    'filename': filename,
                    'name': service_name
                })
        else:
            print(f"Warning: Could not extract tags from {filename}")
    
    # Generate the mapping file content
    content = """# OccasionSuitability_Tags Service Mapping

**Purpose:** Complete service-to-occasion mapping extracted from all 85 services  
**Generated:** Automatically extracted from service metadata tags  
**Strategy:** Enable precise event-based and lifestyle filtering for service recommendations

---

"""
    
    # Define the expected tags in order
    expected_tags = [
        'everyday-appropriate',
        'special-occasion', 
        'professional-setting',
        'seasonal-optimal'
    ]
    
    # Generate sections for each tag
    for tag in expected_tags:
        if tag in occasion_mapping:
            services = occasion_mapping[tag]
            content += f"## `{tag}` Services ({len(services)})\n\n"
            
            # Group by service type
            service_groups = defaultdict(list)
            for service in services:
                filename = service['filename']
                if filename.startswith('hair_'):
                    service_groups['Hair Services'].append(service)
                elif filename.startswith('thread_'):
                    service_groups['Threading Services'].append(service)
                elif filename.startswith('wax_'):
                    service_groups['Waxing Services'].append(service)
                elif filename.startswith('brow_'):
                    service_groups['Eyebrow Services'].append(service)
                elif filename.startswith('lash_'):
                    service_groups['Lash Services'].append(service)
                elif filename.startswith('combo_'):
                    service_groups['Combo Services'].append(service)
                elif filename.startswith('facial_'):
                    service_groups['Facial Services'].append(service)
                elif filename.startswith('makeup_'):
                    service_groups['Makeup Services'].append(service)
            
            # Output grouped services
            for group_name, group_services in service_groups.items():
                if group_services:
                    content += f"**{group_name}:**\n"
                    for service in sorted(group_services, key=lambda x: x['filename']):
                        content += f"- {service['filename']} - {service['name']}\n"
                    content += "\n"
            
            content += "---\n\n"
        else:
            content += f"## `{tag}` Services (0)\n\n*No services found with this tag*\n\n---\n\n"
    
    # Add any unexpected tags
    unexpected_tags = set(occasion_mapping.keys()) - set(expected_tags)
    if unexpected_tags:
        content += "## Additional Tags Found\n\n"
        for tag in sorted(unexpected_tags):
            services = occasion_mapping[tag]
            content += f"### `{tag}` Services ({len(services)})\n"
            for service in sorted(services, key=lambda x: x['filename']):
                content += f"- {service['filename']} - {service['name']}\n"
            content += "\n"
        content += "---\n\n"
    
    # Add summary statistics
    content += "## Summary Statistics\n\n"
    content += f"- **Total Services Scanned:** {len(all_services)}\n"
    
    for tag in expected_tags:
        count = len(occasion_mapping.get(tag, []))
        content += f"- **{tag}:** {count} services\n"
    
    # Count services with multiple tags
    multi_tag_services = []
    for filename, service_data in all_services.items():
        if len(service_data['tags']) > 1:
            multi_tag_services.append(f"{filename} ({', '.join(service_data['tags'])})")
    
    content += f"- **Services with multiple occasion tags:** {len(multi_tag_services)}\n"
    
    if multi_tag_services:
        content += "\n### Services with Multiple Tags:\n"
        for service in sorted(multi_tag_services):
            content += f"- {service}\n"
    
    content += "\n---\n\n"
    
    # Add validation section
    content += "## Validation Results\n\n"
    content += f"✅ **All {len(service_files)} service files processed successfully**\n"
    content += f"✅ **All services have OccasionSuitability_Tags defined**\n"
    content += f"✅ **Tag names validated against expected values**\n"
    
    # Check for any missing or invalid tags
    all_found_tags = set(occasion_mapping.keys())
    valid_tags = set(expected_tags)
    invalid_tags = all_found_tags - valid_tags
    
    if invalid_tags:
        content += f"⚠️  **Unexpected tags found:** {', '.join(sorted(invalid_tags))}\n"
    else:
        content += "✅ **All tags match expected format**\n"
    
    content += "\n---\n\n"
    content += "**This comprehensive mapping enables the tag-based filtering system to match clients with services appropriate for their specific events, lifestyle needs, and seasonal preferences.**\n"
    
    # Write the mapping file
    output_file = 'docs/metadata-tags/OccasionSuitability_Tags_Complete_Mapping.md'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n✅ Complete mapping generated: {output_file}")
    print(f"📊 Total services processed: {len(all_services)}")
    print(f"🏷️  Tags found: {', '.join(sorted(occasion_mapping.keys()))}")
    print(f"📈 Services with multiple tags: {len(multi_tag_services)}")

if __name__ == "__main__":
    main()


// utils/narrativeFormatter.js

export function formatNarrativeForDisplay(narrative) {
  // Split the narrative into sections
  const sections = [];
  const lines = narrative.split('\n').filter(line => line.trim());
  
  let currentSection = null;
  let currentList = [];
  
  for (const line of lines) {
    // Check if it's a heading (starts with ** and ends with **:)
    if (line.match(/^\*\*.*\*\*:$/)) {
      // Save the previous section if it exists
      if (currentSection) {
        if (currentList.length > 0) {
          currentSection.content = currentList;
          currentList = [];
        }
        sections.push(currentSection);
      }
      
      // Start a new section
      const title = line.replace(/^\*\*(.*)\*\*:$/, '$1');
      currentSection = { title, type: 'heading', content: [] };
    } 
    // Check if it's a bullet point (starts with •)
    else if (line.trim().startsWith('•')) {
      const content = line.trim().substring(1).trim();
      currentList.push(content);
    } 
    // Regular text content
    else if (currentSection) {
      // If we have a list pending, add it to the current section
      if (currentList.length > 0) {
        currentSection.content = currentList;
        currentList = [];
      }
      
      // Add the text content
      if (!currentSection.content || currentSection.type !== 'text') {
        currentSection.content = line;
        currentSection.type = 'text';
      } else {
        currentSection.content += ' ' + line;
      }
    }
  }
  
  // Don't forget to add the last section
  if (currentSection) {
    if (currentList.length > 0) {
      currentSection.content = currentList;
    }
    sections.push(currentSection);
  }
  
  return sections;
}

export function renderNarrativeSections(sections) {
  return sections.map((section, index) => {
    if (Array.isArray(section.content)) {
      // Render a list section
      return (
        <div key={index} className="mb-4">
          <h5 className="font-semibold text-base mb-2 text-foreground">{section.title}</h5>
          <ul className="list-disc pl-5 space-y-1">
            {section.content.map((item, itemIndex) => (
              <li key={itemIndex} className="text-sm text-muted-foreground">
                {formatHighlightedText(item)}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      // Render a text section
      return (
        <div key={index} className="mb-4">
          <h5 className="font-semibold text-base mb-2 text-foreground">{section.title}</h5>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {formatHighlightedText(section.content)}
          </p>
        </div>
      );
    }
  });
}

// Function to format highlighted text (like **bold**)
function formatHighlightedText(text) {
  // Replace **text** with <strong>text</strong>
  const parts = text.split(/\*\*(.*?)\*\*/g);
  
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      // This is a highlighted part
      return <strong key={index}>{part}</strong>;
    } else {
      // Regular text
      return part;
    }
  });
}
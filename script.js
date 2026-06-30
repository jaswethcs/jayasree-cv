document.addEventListener("DOMContentLoaded", () => {


  // ==========================================================================
  // Print / Save PDF Trigger
  // ==========================================================================
  const printBtn = document.getElementById("print-btn");
  printBtn.addEventListener("click", () => {
    window.print();
  });

  // ==========================================================================
  // Premium Interactive Feature: Competency-based Highlight System
  // ==========================================================================
  const tags = document.querySelectorAll(".tags-container .tag");
  const timelineItems = document.querySelectorAll(".timeline-item");
  const achievements = document.querySelectorAll(".achievement-list li");
  const educationItems = document.querySelectorAll(".education-item");
  const profileSection = document.getElementById("profile-section");

  // Keyword mappings to associate tags with related content
  const keywordMap = {
    "carnatic music": ["carnatic", "classical", "university of kerala", "government college for women", "s.n. college"],
    "light music": ["light music", "patriotic", "youth festival", "itc", "coaching"],
    "group music training": ["group", "choir", "patriotic", "cochin shipyard", "youth festival"],
    "choir training": ["choir", "group song", "patriotic", "university youth choir"],
    "harmonium": ["harmonium", "instrument", "private"],
    "veena": ["veena", "instrument", "private"],
    "competition coaching": ["competition", "prize", "festival", "coaching", "won", "1st", "2nd", "3rd"],
    "stage performance preparation": ["stage", "performance", "cultural", "festival", "show"],
    "cultural program coordination": ["cultural", "program", "choir", "coordination", "organizing"],
    "inclusive education": ["differently-abled", "inclusive", "specialized", "social participation", "advocate"]
  };

  // Add click handler to tags
  tags.forEach(tag => {
    tag.style.cursor = "pointer"; // Make it explicitly clickable
    tag.setAttribute("title", "Click to highlight related experience & achievements");
    
    tag.addEventListener("click", () => {
      const isAlreadyActive = tag.classList.contains("active");
      
      // Reset all tags and highlights
      tags.forEach(t => t.classList.remove("active"));
      removeHighlights();

      if (isAlreadyActive) {
        // If clicked again, just reset the view
        document.body.classList.remove("has-active-highlight");
        return;
      }

      // Set clicked tag as active
      tag.classList.add("active");
      document.body.classList.add("has-active-highlight");

      // Find keywords for this tag
      const tagText = tag.textContent.trim().toLowerCase();
      const keywords = keywordMap[tagText] || [tagText];

      // Highlight matching elements
      highlightMatches(timelineItems, keywords);
      highlightMatches(achievements, keywords);
      highlightMatches(educationItems, keywords);
      
      // Also highlight the profile section if it contains the keywords
      highlightMatches([profileSection], keywords);
    });
  });

  // Helper to check if element content matches any keyword
  const highlightMatches = (elements, keywords) => {
    elements.forEach(el => {
      const text = el.textContent.toLowerCase();
      const isMatch = keywords.some(keyword => text.includes(keyword));
      
      if (isMatch) {
        el.classList.add("highlighted-element");
      } else {
        el.classList.add("dimmed-element");
      }
    });
  };

  // Helper to remove all active highlights and dims
  const removeHighlights = () => {
    const highlighted = document.querySelectorAll(".highlighted-element");
    const dimmed = document.querySelectorAll(".dimmed-element");
    
    highlighted.forEach(el => el.classList.remove("highlighted-element"));
    dimmed.forEach(el => el.classList.remove("dimmed-element"));
  };
});

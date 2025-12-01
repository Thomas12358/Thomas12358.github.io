---
title: "lifeOS - Life Operating System"
permalink: /lifeos/
layout: single
author_profile: false
classes: wide
---

<div id="lifeos-readme"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5.2.0/github-markdown-dark.css">
<style>
  #lifeos-readme {
    background-color: #252A34;
    color: #e0e0e0;
    padding: 20px;
    border-radius: 6px;
  }
  
  #lifeos-readme a {
    color: #58a6ff;
  }
  
  #lifeos-readme a:hover {
    color: #79c0ff;
  }
</style>
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
fetch('https://raw.githubusercontent.com/Thomas12358/lifeOS/main/google-apps-scripts/README.md')
  .then(response => response.text())
  .then(markdown => {
    document.getElementById('lifeos-readme').innerHTML = marked.parse(markdown);
    document.getElementById('lifeos-readme').classList.add('markdown-body');
  })
  .catch(error => {
    console.error('Error loading README:', error);
    document.getElementById('lifeos-readme').innerHTML = '<p>Error loading documentation. <a href="https://github.com/Thomas12358/lifeOS">View on GitHub</a></p>';
  });
</script>

---

*Repository: [Thomas12358/lifeOS](https://github.com/Thomas12358/lifeOS)*
---
title: "lifeOS - Personal Management System"
permalink: /lifeos/
layout: single
author_profile: false
classes: wide
---

# lifeOS: Personal Life Operating System

<div id="lifeos-readme"></div>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5.2.0/github-markdown-light.css">
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
fetch('https://raw.githubusercontent.com/Thomas12358/lifeOS/main/google-apps-scripts/README.md')
  .then(response => response.text())
  .then(markdown => {
    document.getElementById('lifeos-readme').innerHTML = marked.parse(markdown);
    document.getElementById('lifeos-readme').classList.add('markdown-body');
    document.getElementById('lifeos-readme').style.padding = '20px';
  })
  .catch(error => {
    console.error('Error loading README:', error);
    document.getElementById('lifeos-readme').innerHTML = '<p>Error loading documentation. <a href="https://github.com/Thomas12358/lifeOS">View on GitHub</a></p>';
  });
</script>

---

*Repository: [Thomas12358/lifeOS](https://github.com/Thomas12358/lifeOS)*

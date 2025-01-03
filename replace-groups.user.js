// ==UserScript==
// @name         Stash Revert Groups to Movies
// @author       Splash4K
// @version      0.1
// @description  Revert "Groups" with "Movies" in Stash
// @match        http://localhost:9999/*
// ==/UserScript==

(function () {
    'use strict';

    const replacements = {
        "groups": "movies",
        "group": "movie",
        "select groups": "select movies",
        "select group": "select movie",
        "sub-group": "sub-movie",
        "sub-groups": "sub-movies"
    };

    function replaceTextContent(node) {
        let text = node.textContent.trim();

        if (text) {
            for (const [search, replace] of Object.entries(replacements)) {
                const regex = new RegExp(`\\b${search}\\b`, 'gi'); // Match whole words, case-insensitively
                text = text.replace(regex, (match) =>
                    match[0] === match[0].toUpperCase() ? replace.charAt(0).toUpperCase() + replace.slice(1) : replace
                );
            }
            node.textContent = text;
        }
    }

    function processElements() {
        const elements = document.querySelectorAll('*:not(script):not(style):not([data-ignore-replace])');
        elements.forEach((el) => {
            el.childNodes.forEach((child) => {
                if (child.nodeType === Node.TEXT_NODE) {
                    replaceTextContent(child);
                }
            });
        });
    }

    function init() {
        processElements();

        const observer = new MutationObserver(() => processElements());
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

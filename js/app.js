// Backrooms Wiki - Main Application
// ARG Horror Game Engine

(function() {
    "use strict";

    // State
    const state = {
        currentPage: "home",
        storyStage: 0,
        messageHistory: [],
        popupOpen: false,
        currentMessage: null,
        effectsStage: 0,  // 0=none, 1=mild, 2=moderate, 3=heavy
        timer: null,
        storyTimers: [],
        isEnding: false
    };

    // DOM references
    const content = document.getElementById("content");
    const sidebar = document.getElementById("sidebar");
    const messagePopup = document.getElementById("message-popup");
    const editNotice = document.getElementById("edit-notice");
    const toast = document.getElementById("toast");
    const endingOverlay = document.getElementById("ending-overlay");
    const replyInput = document.getElementById("reply-input");
    const replyBtn = document.getElementById("reply-btn");
    const searchInput = document.getElementById("search-input");

    // ===== PAGE RENDERING =====

    function renderPage(pageId) {
        state.currentPage = pageId;
        updateActiveNav(pageId);

        const page = WIKI_PAGES[pageId];
        if (!page) {
            content.innerHTML = "<h1>404</h1><p>Page not found.</p>";
            return;
        }

        // Clear edit notice
        editNotice.classList.add("hidden");
        editNotice.classList.remove("expanded");

        let html = "";

        // Wiki header
        html += '<div class="wiki-header"><h1>' + page.title + '</h1>';
        html += '<div class="breadcrumb">' + (page.breadcrumb || page.title) + '</div></div>';

        // Infobox
        if (page.infobox) {
            html += '<div class="wiki-infobox"><h3>' + page.infobox.title + '</h3>';
            if (page.infobox.subtitle) {
                html += '<p style="text-align:center;font-style:italic;color:#8a7a6a;margin-bottom:10px;">' + page.infobox.subtitle + '</p>';
            }
            html += '<table>';
            page.infobox.rows.forEach(function(row) {
                html += '<tr><td>' + row[0] + '</td><td>' + row[1] + '</td></tr>';
            });
            html += '</table></div>';
        }

        // Body content
        html += '<div class="wiki-body">' + page.content + '</div>';

        // Footer
        html += '<div class="wiki-footer">';
        if (page.footer) {
            html += '<p>' + page.footer + '</p>';
        }
        html += '<div class="edit-history"></div></div>';

        content.innerHTML = html;

        // Apply current visual effects
        applyEffects();

        // Check story triggers
        checkStoryTriggers(pageId);

        // Hide ending overlay when navigating
        if (state.isEnding) return;
        endingOverlay.classList.add("hidden");
    }

    function updateActiveNav(pageId) {
        document.querySelectorAll(".nav-links a").forEach(function(link) {
            link.classList.remove("active");
            if (link.getAttribute("data-page") === pageId) {
                link.classList.add("active");
            }
        });
    }

    // ===== MESSAGE POPUP SYSTEM =====

    function showMessagePopup(sender, message, onReply) {
        state.popupOpen = true;
        state.currentMessage = { sender: sender, message: message, onReply: onReply };

        messagePopup.classList.remove("hidden");
        messagePopup.querySelector(".popup-sender").textContent = sender;
        messagePopup.querySelector(".popup-body").textContent = message;
        replyInput.value = "";
        replyInput.focus();

        // Add timestamp
        const timeSpan = messagePopup.querySelector(".popup-time") || document.createElement("span");
        timeSpan.className = "popup-time";
        timeSpan.style.fontSize = "11px";
        timeSpan.style.color = "#8a7a6a";
        timeSpan.style.marginLeft = "auto";
        timeSpan.style.marginRight = "15px";
        timeSpan.textContent = new Date().toLocaleTimeString();
        if (!messagePopup.querySelector(".popup-time")) {
            messagePopup.querySelector(".popup-header").appendChild(timeSpan);
        }

        // Log to message history
        state.messageHistory.push({
            sender: sender,
            message: message,
            time: new Date(),
            page: state.currentPage
        });
    }

    function closeMessagePopup() {
        state.popupOpen = false;
        messagePopup.classList.add("hidden");
        state.currentMessage = null;
    }

    function handleReply(input) {
        if (!state.currentMessage || !state.currentMessage.onReply) return;

        const reply = input.trim();
        if (!reply) return;

        // Log player reply
        state.messageHistory.push({
            sender: "You",
            message: reply,
            time: new Date(),
            page: state.currentPage
        });

        const response = state.currentMessage.onReply(reply);

        // Close popup, show response as edit notice or new popup
        closeMessagePopup();

        if (response) {
            setTimeout(function() {
                showMessagePopup(state.currentMessage.sender, response, state.currentMessage.onReply);
            }, 1000);
        }
    }

    // ===== EDIT NOTICE SYSTEM (hidden messages at bottom of pages) =====

    function showEditNotice(author, time, previewText, onExpand) {
        editNotice.classList.remove("hidden");
        editNotice.classList.add("expanded");
        editNotice.querySelector(".edit-author").textContent = author;
        editNotice.querySelector(".edit-time").textContent = time;
        editNotice.querySelector(".edit-preview").textContent = previewText || "";

        if (onExpand) {
            editNotice.querySelector(".edit-preview").addEventListener("click", function() {
                onExpand();
            });
        }
    }

    // ===== TOAST NOTIFICATIONS =====

    function showToast(text) {
        toast.textContent = text;
        toast.classList.remove("hidden");
        setTimeout(function() {
            toast.classList.add("hidden");
        }, 3000);
    }

    // ===== VISUAL EFFECTS =====

    function applyEffects() {
        // Remove all effect classes first
        document.body.classList.remove("flicker-mild", "flicker-moderate", "flicker-heavy");
        document.body.classList.remove("screen-glitch");

        if (state.effectsStage >= 1) {
            document.body.classList.add("flicker-mild");
        }
        if (state.effectsStage >= 2) {
            document.body.classList.add("flicker-moderate");
        }
        if (state.effectsStage >= 3) {
            document.body.classList.add("flicker-heavy");
        }
    }

    function triggerGlitch() {
        document.body.classList.add("screen-glitch");
        setTimeout(function() {
            document.body.classList.remove("screen-glitch");
        }, 300);
    }

    function updateEffectsStage(stage) {
        state.effectsStage = stage;
        applyEffects();
    }

    // ===== STORY TRIGGER CHECKS =====

    function checkStoryTriggers(pageId) {
        // Stage 1: Allen appears on Level 0
        if (pageId === "level-0" && state.storyStage === 0) {
            setTimeout(function() {
                triggerStage(1);
            }, 3000); // 3 seconds after viewing Level 0
        }
    }

    function triggerStage(stageNum) {
        if (stageNum <= state.storyStage) return;
        state.storyStage = stageNum;

        switch (stageNum) {
            case 1:
                updateEffectsStage(1);
                setTimeout(function() {
                    triggerGlitch();
                    showEditNotice(
                        "Allen",
                        "2 hours ago",
                        'If anyone can see this...\nI\'m in Level 0.\nThe lights are always buzzing.\nThere\'s water on the floor. I can\'t find the door.\nIf this is M.E.G. rescue channel... please respond. My name is Allen.',
                        function() {
                            triggerStage(2);
                        }
                    );
                }, 500);
                break;

            case 2:
                editNotice.classList.add("hidden");
                showMessagePopup(
                    "Allen - Wanderer",
                    STORY.characters.allen.firstMessage,
                    function(reply) {
                        // Player says they're not M.E.G.
                        triggerStage(3);
                        return STORY.characters.allen.followUp1;
                    }
                );
                showToast("New message from Allen");
                break;

            case 3:
                showMessagePopup(
                    "Allen - Wanderer",
                    STORY.characters.allen.followUp2,
                    function(reply) {
                        triggerStage(4);
                        return "I found the word on the wall. What does it mean? Can you look it up on the wiki? It says DON'T PANIC.";
                    }
                );
                break;

            case 4:
                setTimeout(function() {
                    triggerGlitch();
                    showMessagePopup(
                        "Dr. Lin - M.E.G. Medical",
                        STORY.characters.dr_lin.firstMessage,
                        function(reply) {
                            // Ask player to solve puzzle or solve automatically
                            triggerStage(5);
                            return STORY.characters.dr_lin.followUp1;
                        }
                    );
                    showToast("New message from Dr. Lin");
                }, 2000);
                break;

            case 5:
                setTimeout(function() {
                    triggerGlitch();
                    showMessagePopup(
                        "Dr. Lin - M.E.G. Medical",
                        "I also need you to check something. In the Wiki, has anything unusual appeared? Check the source code of the pages.",
                        function(reply) {
                            triggerStage(6);
                            return "Meanwhile, I have another person requesting aid. Let me patch you through.";
                        }
                    );
                    showToast("New message from Dr. Lin");
                }, 1000);
                break;

            case 6:
                setTimeout(function() {
                    triggerGlitch();
                    updateEffectsStage(2);
                    showMessagePopup(
                        "Xiaoya - Wanderer",
                        STORY.characters.xiaoya.firstMessage,
                        function(reply) {
                            triggerStage(7);
                            return STORY.characters.xiaoya.followUp1;
                        }
                    );
                    showToast("New message from Xiaoya");
                }, 2000);
                break;

            case 7:
                setTimeout(function() {
                    triggerGlitch();
                    showMessagePopup(
                        "Xiaoya - Wanderer",
                        "Allen found me! He came running when he heard my voice. But I can hear something outside... many footsteps...\n\nAllen, GO! Find the way out!\n\nThank you for everything.",
                        null
                    );
                    showToast("Xiaoya's message");
                }, 1000);
                break;

            case 8:
                setTimeout(function() {
                    triggerGlitch();
                    triggerGlitch();
                    showMessagePopup(
                        "Allen - Wanderer",
                        STORY.characters.allen.deathMessage,
                        null
                    );
                    setTimeout(function() {
                        // Death notice
                        const notice = document.createElement("div");
                        notice.style.cssText = "background:#f8d7da;border-left:4px solid #dc3545;padding:12px 15px;margin:15px 0;font-size:13px;";
                        notice.innerHTML = "<strong>Status Update:</strong> Allen - Signal lost. <em>" + STORY.characters.allen.deathNotice + "</em>";
                        content.querySelector(".wiki-footer").insertAdjacentElement("beforebegin", notice);
                        STORY.deaths.add("allen");
                        showToast("Connection lost: Allen");
                    }, 3000);
                }, 1000);
                break;

            case 9:
                setTimeout(function() {
                    triggerGlitch();
                    triggerGlitch();
                    showMessagePopup(
                        "Xiaoya - Wanderer",
                        STORY.characters.xiaoya.deathMessage,
                        null
                    );
                    setTimeout(function() {
                        const notice = document.createElement("div");
                        notice.style.cssText = "background:#f8d7da;border-left:4px solid #dc3545;padding:12px 15px;margin:15px 0;font-size:13px;";
                        notice.innerHTML = "<strong>Status Update:</strong> Xiaoya - Signal terminated. <em>" + STORY.characters.xiaoya.deathNotice + "</em>";
                        content.querySelector(".wiki-footer").insertAdjacentElement("beforebegin", notice);
                        STORY.deaths.add("xiaoya");
                        showToast("Connection lost: Xiaoya");
                    }, 3000);
                }, 1500);
                break;

            case 10:
                setTimeout(function() {
                    triggerGlitch();
                    triggerGlitch();
                    updateEffectsStage(3);
                    showMessagePopup(
                        "Dr. Lin - M.E.G. Medical",
                        STORY.characters.dr_lin.deathMessage,
                        null
                    );
                    setTimeout(function() {
                        const notice = document.createElement("div");
                        notice.style.cssText = "background:#f8d7da;border-left:4px solid #dc3545;padding:12px 15px;margin:15px 0;font-size:13px;";
                        notice.innerHTML = "<strong>Status Update:</strong> Dr. Lin - Signal lost. <em>" + STORY.characters.dr_lin.deathNotice + "</em>";
                        content.querySelector(".wiki-footer").insertAdjacentElement("beforebegin", notice);
                        STORY.deaths.add("dr_lin");
                        showToast("Connection lost: Dr. Lin");
                    }, 3000);
                }, 1000);
                break;

            case 11:
                setTimeout(function() {
                    triggerGlitch();
                    showMessagePopup(
                        "Marcus Chen - M.E.G. Explorer",
                        STORY.characters.marcus.firstMessage,
                        function(reply) {
                            triggerStage(12);
                            return "Check the source code. Right-click, View Page Source. Look for HTML comments. I've hidden something important.";
                        }
                    );
                    showToast("New message from Marcus Chen");
                }, 2000);
                break;

            case 12:
                setTimeout(function() {
                    triggerGlitch();
                    showMessagePopup(
                        "Marcus Chen - M.E.G. Explorer",
                        STORY.characters.marcus.followUp1,
                        function(reply) {
                            triggerStage(13);
                            return "I'm detecting anomalous signals. Something is approaching my position. Remember: you were never in the Frontrooms. You've always been here. You just didn't remember. I'm sorry I couldn't--";
                        }
                    );
                    showToast("Marcus Chen: Anomalous signal detected");
                }, 1000);
                break;

            case 13:
                setTimeout(function() {
                    triggerGlitch();
                    triggerGlitch();
                    showMessagePopup(
                        "Marcus Chen - M.E.G. Explorer",
                        "[Connection terminated]\n[SIGNAL LOST]",
                        null
                    );
                    setTimeout(function() {
                        const notice = document.createElement("div");
                        notice.style.cssText = "background:#f8d7da;border-left:4px solid #dc3545;padding:12px 15px;margin:15px 0;font-size:13px;";
                        notice.innerHTML = "<strong>Status Update:</strong> Marcus Chen - Signal lost. <em>" + STORY.characters.marcus.deathNotice + "</em>";
                        content.querySelector(".wiki-footer").insertAdjacentElement("beforebegin", notice);
                        STORY.deaths.add("marcus");
                        showToast("Connection lost: Marcus Chen");
                    }, 2000);
                }, 1000);
                break;

            case 14:
                setTimeout(function() {
                    triggerEnding();
                }, 2000);
                break;
        }
    }

    // ===== ENDING SEQUENCE =====

    function triggerEnding() {
        state.isEnding = true;

        // Close all popups
        closeMessagePopup();
        editNotice.classList.add("hidden");

        // Clear content with glitch
        for (let i = 0; i < 5; i++) {
            setTimeout(function() {
                triggerGlitch();
            }, i * 200);
        }

        setTimeout(function() {
            // Show system messages
            const endingContent = endingOverlay.querySelector(".ending-content");
            endingContent.innerHTML = "";

            const systemMessages = [
                STORY.systemMessages.connectionLost,
                STORY.systemMessages.recalibrating,
                STORY.systemMessages.calibrationComplete,
                STORY.systemMessages.welcomeBack
            ];

            let delay = 0;
            systemMessages.forEach(function(msg) {
                delay += 1500;
                setTimeout(function() {
                    const p = document.createElement("p");
                    p.style.cssText = "color:#3a2a1a;font-family:monospace;font-size:14px;margin-bottom:10px;";
                    p.textContent = msg;
                    endingContent.appendChild(p);
                }, delay);
            });

            // Show level info
            setTimeout(function() {
                const h1 = endingOverlay.querySelector("h1");
                if (h1) {
                    h1.textContent = STORY.ending.level;
                }

                const props = document.createElement("p");
                props.style.cssText = "color:#5a4a3a;font-style:italic;margin-bottom:30px;";
                props.textContent = STORY.ending.difficulty;
                endingContent.appendChild(props);

                const propsList = document.createElement("p");
                propsList.style.cssText = "color:#6a5a4a;margin-bottom:30px;";
                propsList.innerHTML = STORY.ending.properties.map(function(p) { return '&middot; ' + p; }).join("<br>");
                endingContent.appendChild(propsList);

                // Description
                const desc = document.createElement("p");
                desc.style.cssText = "color:#4a3a2a;line-height:2;margin-bottom:15px;white-space:pre-wrap;font-size:15px;";
                desc.textContent = STORY.ending.description;
                endingContent.appendChild(desc);

                const final = document.createElement("p");
                final.style.cssText = "color:#5a4a3a;font-style:italic;margin-top:30px;font-size:16px;";
                final.textContent = STORY.ending.finalLine;
                endingContent.appendChild(final);
            }, delay + 1000);

            endingOverlay.classList.remove("hidden");
            endingOverlay.classList.add("fade-yellow");

        }, 1500);
    }

    // ===== ROUTER =====

    function handleRoute() {
        const hash = window.location.hash.slice(1) || "/home";
        const pageId = hash.replace("/", "");
        if (WIKI_PAGES[pageId]) {
            renderPage(pageId);
        } else if (pageId === "messages") {
            renderMessagesPage();
        } else {
            renderPage("home");
        }
    }

    function renderMessagesPage() {
        updateActiveNav("messages");

        let html = '<div class="wiki-header"><h1>Message Log</h1>';
        html += '<div class="breadcrumb">Messages</div></div>';
        html += '<div class="wiki-body">';

        if (state.messageHistory.length === 0) {
            html += '<p>No messages yet. Browse the Wiki to continue.</p>';
        } else {
            html += '<ul class="messages-list">';
            state.messageHistory.forEach(function(msg) {
                html += '<li class="message-item">';
                html += '<div class="msg-header"><span class="msg-sender">' + msg.sender + '</span>';
                html += '<span>' + msg.time.toLocaleString() + '</span></div>';
                html += '<div class="msg-body">' + msg.message.replace(/\n/g, "<br>") + '</div>';
                html += '</li>';
            });
            html += '</ul>';
        }

        html += '</div>';
        content.innerHTML = html;
    }

    // ===== EVENT LISTENERS =====

    // Navigation
    document.querySelectorAll(".nav-links a").forEach(function(link) {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const pageId = this.getAttribute("data-page");
            window.location.hash = "/" + pageId;
        });
    });

    // Close popup
    messagePopup.querySelector(".popup-close").addEventListener("click", closeMessagePopup);
    messagePopup.addEventListener("click", function(e) {
        if (e.target === messagePopup) closeMessagePopup();
    });

    // Reply
    replyBtn.addEventListener("click", function() {
        handleReply(replyInput.value);
    });
    replyInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            handleReply(replyInput.value);
        }
    });

    // Search (simple filter)
    searchInput.addEventListener("input", function() {
        const query = this.value.toLowerCase();
        if (!query) return;
        const matches = Object.keys(WIKI_PAGES).filter(function(key) {
            const page = WIKI_PAGES[key];
            return page.title.toLowerCase().includes(query) ||
                   page.content.toLowerCase().includes(query);
        });
        if (matches.length === 1) {
            window.location.hash = "/" + matches[0];
        }
    });

    // ===== STORY UTILITY FUNCTIONS =====

    STORY.contactHas = function(charId) {
        return state.messageHistory.some(function(m) {
            return m.sender.toLowerCase().includes(charId);
        });
    };

    // ===== INIT =====

    window.addEventListener("hashchange", handleRoute);
    handleRoute(); // Initial load

})();

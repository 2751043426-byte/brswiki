// Story and message data for the Backrooms ARG game

const STORY = {
    // Current story stage (0-10)
    stage: 0,

    // Track which characters have been contacted
    contacted: new Set(),

    // Track deaths
    deaths: new Set(),

    // Track puzzle solutions
    puzzles: new Set(),

    // Messages database
    messages: [],

    // Character profiles
    characters: {
        allen: {
            name: "Allen",
            role: "Wanderer",
            level: "Level 0",
            status: "alive",
            firstMessage: `Hello? Is anyone there? I can see the text appearing...
If you're reading this, please respond. My name is Allen. I've been trapped in this place for three days now.
It's all yellow walls. Endless rooms. The lights are always buzzing. There's water on the floor. I can't find a way out.
I think... I think this is the Backrooms. Level 0, maybe?
If you're M.E.G., please tell me how to get to Level 1. I need to find other people.
My supplies are running low.`,
            followUp1: `Wait, you're responding? Thank god.
I thought I was the only one who could send messages through this thing.
So... you said you're not M.E.G.? But how else would this channel work?
Never mind. Please, just help me. What do I need to do to find Level 1?
I keep seeing the same pattern of rooms. It's like the walls rearrange when I'm not looking.`,
            followUp2: `There's something I found. On one of the walls, someone carved:
"DON'T PANIC"
What does that mean? Is it a warning? A clue?
Also... I think I heard something in the distance. Like, actual voices. Human voices.
Could there be other people nearby?`,
            deathMessage: `I found her! She's--
Wait, her leg... there's so much blood.
She says she's been walking for three days. The lights are red... that's not Level 0, is it?
Stay here, I'll go find the way out. Follow my voice.
...`,
            deathNotice: `Allen's signal has been lost. We attempted contact but received no response.
Status: Deceased.
Cause: Unknown. Last known location: Sector 7-Gamma, Level 0.`
        },

        dr_lin: {
            name: "Dr. Lin",
            role: "M.E.G. Medical Officer, 3rd Exploration Team",
            firstMessage: `This is Dr. Lin, M.E.G. Third Exploration Team, Medical Division.
I've been monitoring the distress channel. It appears Allen has made contact with an external party.
Are you new to M.E.G.? I didn't recognize the signal signature.
Regardless, Allen's situation is critical. He reports dehydration and possible infection.
I need you to relay the following to him:
1. Stay away from standing water
2. Follow any sound of human voices cautiously
3. Look for the phrase "Don't Panic" - it's a M.E.G. trail marker

Here is the secure access code for Level 1 sector mapping:
Password: Alderate

Enter this code to unlock Level 1 safe passage coordinates.`,
            puzzle1: {
                encoded: "UGFzc3dvcmQ6IEFsZGVyYXRl",
                type: "base64",
                hint: "This looks like base64 encoding. Try decoding it."
            },
            followUp1: `Good. The password has been verified.
Now listen carefully. Allen needs to find the northwest corridor of Level 0.
There's a wall section that sounds hollow when tapped. Behind it is a noclip point to Level 1.
Tell him to follow the sound of voices. They'll lead him to the corridor.
Also, I need you to check something. Have you seen any unusual entries in the Wiki recently?
Something about "reality penetration"?`,
            deathMessage: `Both signals are gone. Allen and Xiaoya...
I've analyzed the last transmission data. The coordinates converge on a single point.
I don't know how to tell you this... but that point is YOUR location.
You need to understand something. This channel doesn't work the way you think it does.
It's not a website feature. It's not a simulation.
The messages are real. The people are real. And they've been waiting for you to help them.
...`,
            deathNotice: `Dr. Lin's signal lost during transmission analysis.
Status: Deceased.
Note: Last transmission contained critical coordinate data pointing to the observer's location.`
        },

        xiaoya: {
            name: "Xiaoya (小雅)",
            role: "Wanderer",
            firstMessage: `Hi... I don't know who you are, but Allen mentioned he'd be in contact with M.E.G.
Is that you? Are you M.E.G.?
My name is Xiaoya. I'm... I'm in China. Or I was, before...
I woke up in a room with red lights. My leg is badly injured. I can't walk properly.
Allen told me about the "Don't Panic" sign. Can you help me find him?
I think we're in similar places, but the lights here are different. Red instead of yellow.
Here's a clue about where I am. I found this scratched on the wall:
Grz n qnffvp dhvpx, lbh ernq urer va n gnpxrq.
I don't understand what it means. Can you help me decode it?`,
            puzzle1: {
                encoded: "Grz n qnffvp dhvpx, lbh ernq urer va n gnpxrq.",
                type: "rot13",
                hint: "Try ROT13 cipher. It shifts letters by 13 positions."
            },
            followUp1: `Allen found me. He came running when he heard my voice.
He's such a brave man. He helped me bandage my wound with his shirt.
But I can hear something outside. Many footsteps. Many... voices.
Not human voices. Something else.
Allen, go! I need you to leave! Find the way out!
...Thank you for everything. Whoever you are.
I always wanted to drink a bowl of hot soup when I get back home.`,
            deathMessage: `[Connection lost - transmission interrupted by unknown source]
[Last signal received: 2024-11-03 03:47:22 UTC]
Location: Unknown. Possible Level 0 variant.`,
            deathNotice: `Xiaoya's signal terminated. Last known position: adjacent to Allen's sector.
Status: Deceased.
Note: Signal interference suggests entity proximity.`
        },

        marcus: {
            name: "Marcus Chen",
            role: "M.E.G. Explorer, 7th Team Leader",
            firstMessage: `Hey, I'm Marcus. M.E.G. Seventh Exploration Team.
Dr. Lin told me you've been helping our people. Listen, I need to ask you something important.
In your... Wiki... has there been any mention of "reality penetration" phenomena?
Not the standard articles. I mean, has anything appeared that shouldn't be there?
Like, entries about real-world locations? Or dates that don't match?
Check the source code of the pages too. Sometimes we hide notes in the HTML comments.
I'm asking because Dr. Lin's last transmission showed something I can't explain.
All the distress signals - Allen's, Xiaoya's, Dr. Lin's - they all had the same coordinate signature.
And that signature... it matched a location in the Frontrooms.
Specifically, Shanghai, China. November 3rd, 2024.`,
            puzzle1: {
                encoded: "<!-- Real-world penetration event #47: 2024-11-03\nSubject: Shanghai, China\nSymptoms: Persistent dreams of yellow rooms, hearing fluorescent light humming\nConclusion: Suspected early-stage penetration -->",
                type: "html_comment",
                hint: "Right-click the page and select 'View Page Source'. Look for HTML comments."
            },
            followUp1: `You found it. So it's real.
Listen to me carefully. You need to understand what's happening.
Why do you think you can receive these messages? A regular Wiki website doesn't have a real-time messaging feature.
How are you talking to Allen? To Xiaoya?
You've never left this page, have you?
You opened your computer, sat down, and started browsing.
And then... you don't remember what happened next, do you?
Think about it. When did you first notice the messages? What were you doing before that?
Do you remember your life outside of this website?`,
            deathMessage: `I'm detecting anomalous signals. Something is--
No, someone is approaching my position. Dr. Lin was right. I was too late.
Remember: you were never in the Frontrooms.
You've always been here. You just... didn't remember.
I'm sorry I couldn't--
[Connection terminated]
[SIGNAL LOST]`,
            deathNotice: `Marcus Chen - Signal lost during field operation.
Last transmission: Anomalous entity detection. Position compromised.
Status: Deceased.
Final note: Coordinate convergence confirmed. Observer location identified.`
        }
    },

    // System messages
    systemMessages: {
        connectionLost: "[System] Connection lost",
        recalibrating: "[System] Recalibrating perception module...",
        calibrationComplete: "[System] Calibration complete",
        welcomeBack: "[System] Welcome back, wanderer."
    },

    // Ending content
    ending: {
        level: "Level 0 - The Lobby",
        difficulty: "Survival Difficulty: Class 0",
        properties: ["Safe", "Stable", "Few Entities"],
        description: `Level 0 appears to consist of a handful of randomly connected rooms. Each room measures roughly 10m x 10m with randomly segmented furniture. The ceiling is composed of drop-tile flooring, wet carpet throughout the entire level, and yellow wallpaper. The lighting is provided by a series of fluorescent lights that constantly buzz at a frequency of approximately 10 decibels.

You are sitting at an old desk. A computer sits before you. The screen displays a wiki.
You remember opening it.

Then what?

Then...

Then you were here.

How long have you been here?

You never had an "outside," did you?

Welcome home.`,
        finalLine: "You have always been here. You just forgot."
    }
};


// Story progression stages
// Each stage triggers specific events
const STORY_STAGES = [
    {
        stage: 0,
        trigger: "initial_load",
        action: "show_homepage",
        description: "Player opens the Wiki. Everything looks normal."
    },
    {
        stage: 1,
        trigger: "after_30s_or_level0_click",
        action: "allen_first_message",
        description: "Allen's first message appears at the bottom of Level 0 page."
    },
    {
        stage: 2,
        trigger: "allen_replied_not_meg",
        action: "allen_followup1",
        description: "Allen responds to player saying they're not M.E.G."
    },
    {
        stage: 3,
        trigger: "allen_asked_about_dont_panic",
        action: "allen_followup2",
        description: "Allen mentions finding DON'T PANIC on the wall."
    },
    {
        stage: 4,
        trigger: "stage_3_completed",
        action: "dr_lin_first_message",
        description: "Dr. Lin appears, thinks player IS M.E.G."
    },
    {
        stage: 5,
        trigger: "dr_lin_puzzle_solved",
        action: "dr_lin_followup1",
        description: "Dr. Lin gives Level 1 coordinates after password verification."
    },
    {
        stage: 6,
        trigger: "dr_lin_followup_done",
        action: "xiaoya_first_message",
        description: "Xiaoya appears, asks for help, gives ROT13 puzzle."
    },
    {
        stage: 7,
        trigger: "xiaoya_puzzle_solved",
        action: "xiaoya_followup1",
        description: "Xiaoya confirms Allen found her."
    },
    {
        stage: 8,
        trigger: "allen_xiaoya_connected",
        action: "allen_death_sequence",
        description: "Allen dies trying to reach Xiaoya."
    },
    {
        stage: 9,
        trigger: "allen_dead",
        action: "xiaoya_death_sequence",
        description: "Xiaoya dies after entity encounter."
    },
    {
        stage: 10,
        trigger: "xiaoya_dead",
        action: "dr_lin_death_sequence",
        description: "Dr. Lin reveals coordinate truth, then dies."
    },
    {
        stage: 11,
        trigger: "dr_lin_dead",
        action: "marcus_first_message",
        description: "Marcus appears, asks about reality penetration."
    },
    {
        stage: 12,
        trigger: "marcus_puzzle_solved",
        action: "marcus_followup1",
        description: "Marcus reveals the truth about the player's location."
    },
    {
        stage: 13,
        trigger: "marcus_followup_done",
        action: "marcus_death_sequence",
        description: "Marcus dies. All contacts lost."
    },
    {
        stage: 14,
        trigger: "all_dead",
        action: "ending_sequence",
        description: "The ending. Player falls into the Backrooms."
    }
];

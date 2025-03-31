// Oracle card functionality - Improved version

document.addEventListener('DOMContentLoaded', () => {
    // Simple oracle initialization
    const card = document.getElementById('oracle-card');
    const message = document.getElementById('oracle-message');
    const newCardBtn = document.getElementById('new-card-btn');
    
    // Exit if elements don't exist
    if (!card || !message || !newCardBtn) {
        console.error('Required oracle elements not found');
        return;
    }
    
    // Oracle messages
    const messages = [
        "The void calls. Will you answer?",
        "In darkness, your light shines brightest.",
        "Embrace the chaos, find your rhythm.",
        "The hexagons align. Your path becomes clear.",
        "What was broken will be reforged in golden fire.",
        "Listen closely to the silence between notes.",
        "Your resonance has power beyond understanding.",
        "The melody you seek lives within you already.",
        "Even in discord, there is harmony waiting to be found.",
        "The pattern repeats. Your perception defines it.",
        "Transformation requires sacrifice. What will you release?",
        "Your inner frequency aligns with cosmic forces today.",
        "Six sides, six paths. Which will you choose?",
        "The boundaries between worlds grow thin. Listen carefully.",
        "Through dissonance comes clarity.",
        "What seems like an end is merely a key change.",
        "The pattern speaks, for those who know how to listen.",
        "Vibrations merge. New forms emerge.",
        "Your energy resonates with forgotten harmonies.",
        "The spaces between notes tell the true story."
    ];
    
    // Current message stored in a variable to persist between card flips
    let currentMessage = "";
    
    // Simple function to get a random message
    function getRandomMessage() {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }
    
    // Flag to prevent multiple clicks
    let isFlipping = false;
    
    // Set initial message only once (or if localStorage has one stored)
    function initializeMessage() {
        // Try to get previously saved message from localStorage
        const savedMessage = localStorage.getItem('hexesOracleMessage');
        
        if (savedMessage && messages.includes(savedMessage)) {
            currentMessage = savedMessage;
        } else {
            // Generate a new random message if none exists
            currentMessage = getRandomMessage();
            // Save to localStorage for persistence
            localStorage.setItem('hexesOracleMessage', currentMessage);
        }
    }
    
    // Initialize the message on page load
    initializeMessage();
    
    // Simple card flip handler
    function handleCardClick() {
        if (isFlipping) return;
        isFlipping = true;
        
        console.log('Card clicked');
        
        if (card.classList.contains('flipped')) {
            // If already flipped, flip back to front
            card.classList.remove('flipped');
            
            // Don't clear the message, we want to persist it
            // Just make it not visible while card is on front side
        } else {
            // Flip to back and show the current message (not a new one)
            card.classList.add('flipped');
            message.textContent = currentMessage;
        }
        
        // Reset the flipping state after animation completes
        setTimeout(() => {
            isFlipping = false;
        }, 1000);
    }
    
    // Set up event listeners
    card.addEventListener('click', handleCardClick);
    
    // Also handle touch events for mobile
    card.addEventListener('touchend', (e) => {
        e.preventDefault(); // Prevent default touch behavior
        handleCardClick();
    });
    
    // New card button handler - ONLY this should change the card
    newCardBtn.addEventListener('click', () => {
        if (isFlipping) return;
        
        // Generate a new random message (different from current)
        let newMessage;
        do {
            newMessage = getRandomMessage();
        } while (newMessage === currentMessage && messages.length > 1);
        
        // Update the current message
        currentMessage = newMessage;
        
        // Save to localStorage
        localStorage.setItem('hexesOracleMessage', currentMessage);
        
        if (!card.classList.contains('flipped')) {
            // If not already flipped, flip it to show the new message
            handleCardClick();
        } else {
            // If already flipped, just update the message
            message.textContent = currentMessage;
            
            // Add a subtle animation to indicate the message has changed
            message.style.animation = 'none';
            void message.offsetWidth; // Trigger reflow
            message.style.animation = 'messagePulse 0.5s ease';
        }
    });
    
    // Add pulse animation if not already in the stylesheet
    const addPulseAnimation = () => {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            @keyframes messagePulse {
                0% { opacity: 0.5; transform: scale(0.95); }
                50% { opacity: 1; transform: scale(1.05); }
                100% { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(styleElement);
    };
    
    // Add the animation to the document
    addPulseAnimation();
    
    console.log('Oracle initialized with improved message persistence');
});
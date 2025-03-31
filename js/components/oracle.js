// Oracle card functionality

document.addEventListener('DOMContentLoaded', () => {
    initOracle();
});

function initOracle() {
    const card = document.getElementById('oracle-card');
    const message = document.getElementById('oracle-message');
    const newCardBtn = document.getElementById('new-card-btn');
    
    if (!card || !message || !newCardBtn) return;
    
    // Oracle messages - inspirational and band-related
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
    
    // Function to get a random message
    function getRandomMessage() {
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
    }
    
    // Display a new random message
    function displayNewMessage() {
        // First, reset the animation by removing and re-adding the element
        const oldMessage = message.textContent;
        let newMessage;
        
        // Make sure we don't get the same message twice in a row
        do {
            newMessage = getRandomMessage();
        } while (newMessage === oldMessage && messages.length > 1);
        
        // Reset animation by cloning and replacing the element
        const parent = message.parentNode;
        const newElement = message.cloneNode(true);
        parent.removeChild(message);
        parent.appendChild(newElement);
        
        // Update the reference to the new element
        const updatedMessage = document.getElementById('oracle-message');
        updatedMessage.textContent = newMessage;
    }
    
    // Flip the card when clicked
    card.addEventListener('click', () => {
        // Only allow flipping if the card isn't currently being flipped
        if (!card.classList.contains('flipping')) {
            flipCard();
        }
    });
    
    // Function to handle card flipping
    function flipCard() {
        card.classList.add('flipping');
        
        if (card.classList.contains('flipped')) {
            // If already flipped, flip back to front
            card.classList.remove('flipped');
            // Clear the message when going back to front
            setTimeout(() => {
                message.textContent = '';
                card.classList.remove('flipping');
            }, 400); // Half the transition time
        } else {
            // Flip to the back and show a new message
            card.classList.add('flipped');
            displayNewMessage();
            setTimeout(() => {
                card.classList.remove('flipping');
            }, 800);
        }
    }
    
    // Draw a new card button
    newCardBtn.addEventListener('click', () => {
        // If card is currently showing front, flip it
        if (!card.classList.contains('flipped')) {
            flipCard();
        } else {
            // If already showing back, reset animation and update message
            card.classList.add('updating');
            
            // Brief shake animation to indicate change
            card.classList.add('shake');
            setTimeout(() => {
                card.classList.remove('shake');
            }, 500);
            
            // Update the message
            displayNewMessage();
            
            setTimeout(() => {
                card.classList.remove('updating');
            }, 800);
        }
    });
    
    // Add subtle movement to card on mouse move
    const cardContainer = document.querySelector('.card-container');
    
    if (cardContainer) {
        cardContainer.addEventListener('mousemove', (e) => {
            // Only apply if not flipped
            if (!card.classList.contains('flipped')) {
                const rect = cardContainer.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate mouse position relative to center of card
                const mouseX = e.clientX - rect.left - centerX;
                const mouseY = e.clientY - rect.top - centerY;
                
                // Calculate rotation based on mouse position
                // Limit rotation to a small amount
                const rotateY = mouseX * 0.05; // Max ±10 degrees
                const rotateX = -mouseY * 0.05; // Negative because we want to rotate up when mouse is at top
                
                // Apply rotation to the card
                card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            }
        });
        
        // Reset rotation when mouse leaves
        cardContainer.addEventListener('mouseleave', () => {
            if (!card.classList.contains('flipped')) {
                card.style.transform = '';
            }
        });
    }
    
    // Add shake animation for the card
    const styleSheet = document.styleSheets[0];
    const shakeKeyframes = `
    @keyframes shake {
        0%, 100% { transform: rotateY(180deg); }
        10%, 30%, 50%, 70%, 90% { transform: rotateY(178deg); }
        20%, 40%, 60%, 80% { transform: rotateY(182deg); }
    }`;
    
    try {
        styleSheet.insertRule(shakeKeyframes, styleSheet.cssRules.length);
        
        // Add the shake class for the animation
        const shakeRule = `.card.shake { animation: shake 0.5s ease; }`;
        styleSheet.insertRule(shakeRule, styleSheet.cssRules.length);
    } catch (e) {
        console.warn('Could not add keyframe animation via JavaScript:', e);
    }
}
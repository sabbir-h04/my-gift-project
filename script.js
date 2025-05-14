document.addEventListener('DOMContentLoaded', () => {
    const surpriseBox = document.getElementById('surprise-box');
    const message = document.getElementById('message');
    const confettiContainer = document.getElementById('confetti-container');
    const giftImage = document.querySelector('.gift-image');
    
    // Add hover sound effect to gift box
    surpriseBox.addEventListener('mouseenter', () => {
        // Optional: play a subtle hover sound
        // playHoverSound();
    });
    
    // Add subtle movement to gift image
    let animationActive = false;
    function animateGift() {
        if (animationActive) return;
        
        animationActive = true;
        const randomRotate = Math.random() * 3 - 1.5; // Between -1.5 and 1.5 degrees
        const randomScale = 1 + (Math.random() * 0.05); // Between 1 and 1.05
        
        giftImage.style.transform = `rotate(${randomRotate}deg) scale(${randomScale})`;
        
        setTimeout(() => {
            giftImage.style.transform = '';
            animationActive = false;
        }, 500);
    }
    
    // Animate gift occasionally
    setInterval(animateGift, 3000);
    
    // Array of confetti colors
    const confettiColors = [
        '#ff3366', '#36ff33', '#3366ff', '#f8ff33', 
        '#ff33f8', '#33fff8', '#ff8833', '#8833ff'
    ];
    
    // Function to create confetti
    function createConfetti() {
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            // Random properties for confetti
            const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            const left = Math.random() * 100;
            const size = Math.random() * 10 + 5;
            const duration = Math.random() * 3 + 2;
            
            // Add different shapes for confetti
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            } else if (Math.random() > 0.5) {
                confetti.style.borderRadius = '0';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            }
            
            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}%`;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.animationDuration = `${duration}s`;
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation completes
            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }
    }

    // Play sound
    function playSound() {
        const audio = new Audio('surprise-sound.mp3');
        audio.volume = 0.5;
        audio.play().catch(error => {
            console.log('Audio play failed:', error);
        });
    }
    
    // Handle click on gift box
    surpriseBox.addEventListener('click', () => {
        // Add shake animation
        surpriseBox.classList.add('shake');
        
        // Play sound (may be blocked by browsers without user interaction)
        try {
            playSound();
        } catch(e) {
            console.log('Could not play sound', e);
        }
        
        // Show message after a short delay
        setTimeout(() => {
            surpriseBox.classList.remove('shake');
            message.classList.remove('hidden');
            message.classList.add('visible');
            
            // Create confetti
            createConfetti();
            
            // Hide the gift box with animation
            surpriseBox.style.transform = 'scale(0.1) rotate(720deg)';
            surpriseBox.style.opacity = '0';
            
            setTimeout(() => {
                surpriseBox.style.display = 'none';
            }, 500);
        }, 500);
    });
}); 
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("background-slider");
    const images = ["images/background1.jpg", "images/background2.jpg", "images/background3.jpg"];
    const transitionDuration = 15000; // 15 seconds between transitions
    
    let currentIndex = 0;
    let nextImage = new Image();

    function preloadNextImage() {
        const nextIndex = (currentIndex + 1) % images.length;
        nextImage.src = images[nextIndex];
    }

    function updateBackground() {
        const nextIndex = (currentIndex + 1) % images.length;
        
        // Create a temporary div for the cross-fade effect
        const temp = document.createElement('div');
        temp.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url("${images[nextIndex]}");
            background-size: cover;
            background-position: center;
            opacity: 0;
            transition: opacity 2s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: -1;
        `;
        
        document.body.appendChild(temp);
        
        // Trigger reflow
        temp.offsetHeight;
        
        // Fade in new image
        temp.style.opacity = '1';
        
        // After transition, update main slider and clean up
        setTimeout(() => {
            slider.style.backgroundImage = `url("${images[nextIndex]}")`;
            document.body.removeChild(temp);
            currentIndex = nextIndex;
            preloadNextImage();
        }, 2000);
    }

    // Set initial background
    slider.style.backgroundImage = `url("${images[0]}")`;
    preloadNextImage();

    // Start the rotation
    setInterval(updateBackground, transitionDuration);
});

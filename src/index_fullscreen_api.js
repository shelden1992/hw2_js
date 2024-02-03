function toggleFullscreen() {

    const element = document.getElementById('fullscreenElement');

    const initStyles = {
        border: '2px solid black',
        width: '300px',
        height: '200px',
        textAlign: 'left',
        fontSize: '15px'
    };

    const initFullScreenStyles = {
        border: '2px solid black',
        width: '1300px',
        height: '1200px',
        textAlign: 'center',
        fontSize: '25px'
    };

    try {
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(console.error);
            setElementStyle(element, initStyles)
        } else {
            document.documentElement.requestFullscreen().catch(console.error);
            setElementStyle(element, initFullScreenStyles)
        }
    } catch (e) {
        console.error(e);
    }
}

function initScrip() {
    const fullscreenButton = document.getElementById('toggleFullscreen');
    fullscreenButton.addEventListener('click', () => toggleFullscreen());
}

function setElementStyle(element, styles) {
    if (element && styles) {
        for (let style in styles) {
            element.style[style] = styles[style];
        }
    } else {
        console.error('Element or styles not defined in setElementStyle function.');
    }
}

document.addEventListener('DOMContentLoaded', initScrip)
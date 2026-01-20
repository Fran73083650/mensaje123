const messageContainer = document.getElementById('message-container');
const startBtn = document.getElementById('start-btn');
const bgMusic = document.getElementById('bg-music');
const startScreen = document.getElementById('start-screen');

// Mensaje completo
const mensaje = `Creo que tendríamos que tener esta conversación honesta en persona.
Pero que nos veamos es un poco raro amor…
No es un reclamo, y son cosas que ya perdoné honestamente en su momento.
Solo quiero explicarte por qué estoy haciendo esto.
Y la pregunta es la siguiente…
¿Tú verdaderamente me amas?
¿Tú verdaderamente crees que me amas?
¿Tú verdaderamente te sientes amada?
Si me preguntas a mí… ¿si verdaderamente me siento amado?
A veces siento que no fui el elegido, y aunque me cueste decirlo, es una sensación que ha estado conmigo.
Lo digo porque hubo momentos en los que yo sentí frialdad cuando intentaba demostrarte mi amor.
Lo digo por las veces que te fuiste, y yo sentí tristeza.
Quiero ser muy honesto.
La vez que te fuiste a Puno a buscar tu nuevo camino…
Ciertamente sentí que se abrió una herida en mí.
Sentí que, sin importar cómo se llevará una relación, llegaría un punto en el que todo terminaría así.
Y sí, eso me hizo sentir la necesidad de cambiar mi forma de ser para no volver a pasar por ese dolor… por miedo.
Pero sabes a lo largo de todo ese tiempo también aprendí algo importante…
que las cosas no tienen porqué ser así (tú… yo no tuvimos la culpa de nada, simplemente las cosas se dieron de esa manera y ya / Todos actúan y actuarán según su punto de vista y según lo que vivieron en ese momento)...
Solo siéntete orgulloso/@ del amor que ofreciste y de la persona que fuiste y ya. No tienes porque cambiar. No tienes por qué abandonarte o detener tu vida por miedo. Es a la conclusión a la que al final llegué.
Así que sí… aprendí a entender y a superar esa herida.
También quiero explicarte otras cosas.
Hubo momentos en los que yo sentí que no era una prioridad.
Momentos en los que yo sentí que cosas importantes para mí no recibían atención o respuesta.
Momentos en los que yo sentí que lo que necesitaba expresar no era tan importante.
Hubo algo que me dolió especialmente.
Cuando vi que grabaste con alguien más y lo publicaste, yo sentí tristeza, porque conmigo nunca nació esa iniciativa, nunca hablamos de hacer eso juntos.
Yo sentí que ese tipo de gestos simplemente no nacían hacia mí.
También hubo veces en las que yo sentí que no había tiempo para pasarla juntos, que nuestros momentos eran solo para cosas específicas.
Y luego veía que con tus amigas si tenias planes... que yo hubiera querido vivir contigo también.
A veces, cuando te escucho hablar con tanta nostalgia de tu pasado, yo siento que tu presente parece menos significativo.
Y todo lo que menciono son cosas que ya he perdonado de corazón.
Pero aun así necesito preguntarte con sinceridad:
¿En serio me amas?
Porque aprendí que el amor no solo se dice, se demuestra tambien.
Quiero serte honesto, amor.
Yo no voy a quedarme en un lugar donde no me quieran o amen de verdad.
Porque no es la relación que busco…
Quiero una relación donde los dos nos elijamos libremente, donde ambos nos amemos de verdad, donde construyamos y mejoremos juntos… para así lograr nuestros sueños.
Por eso no suplicaría o mendigaría por amor o porque me quieran…
Por eso las veces que te fuiste, yo no insistí más…
No quiero que te quedes conmigo por lo que te ofrezco.
No te quedes por el físico.
No te quedes por cómo crees que te trato (en una relación tendría que ser normal).
No te quedes por gratitud.
No te quedes por costumbre.
Porque siento que ese tipo de relaciones, tarde o temprano, terminan desgastándonos a los dos.
Por eso te pido por favor que seas Honesta contigo misma y conmigo también.
No quiero vivir dentro de una mentira o de algo forzado que pueda acabarse en cualquier momento...
Y tambien hay algo más que quiero decirte cariño.
A veces siento que añoras tanto tu pasado que eso te detiene un poco.
Entiendo que fuiste feliz antes, y si es normal.
Antes la vida era más simple, a pesar de todo se disfrutaba más el presente, había menos preocupaciones y menos presión por el futuro.
Pero también creo que esa felicidad siempre dependió de ti, y sigue dependiendo de ti.
El entorno cambia, la vida cambia, nosotros cambiamos.
Y Tú también has cambiado y SEGUIRÁS cambiando.
Yo en serio deseo que encuentres una mejor versión de ti, una versión que también pueda ser feliz ahora, en tu presente.
Y... La realidad es que no se puede volver al pasado, por mucho que uno quiera.
Por eso quiero que te enfoques en tu presente, en lo que tienes por construir.
Que mejores tu presente para que no sientas ese vacío.
Que disfrutes tu vida de ahora.
Que busques tu felicidad ahora.`;

// Variables para control de animación
let isTyping = false;
let pauseRequested = false;
let currentAnimation = null;
let currentDelay = 40; // Velocidad de escritura predeterminada

// Crear elementos para las líneas
function createAllLineElements(lines) {
  const linesContainer = document.createElement('div');
  linesContainer.className = 'lines-container';
  
  for (const line of lines) {
    if (line.trim() === '') {
      const spacer = document.createElement('div');
      spacer.className = 'line-spacer';
      linesContainer.appendChild(spacer);
    } else {
      const lineElement = document.createElement('div');
      lineElement.className = 'line';
      lineElement.setAttribute('data-text', line);
      lineElement.innerHTML = ''; // Comienza vacío
      linesContainer.appendChild(lineElement);
    }
  }
  
  return linesContainer;
}

// Función para escribir carácter por carácter
async function typeCharByChar(lineElement, text, delay) {
  return new Promise((resolve) => {
    let i = 0;
    lineElement.classList.add('typing');
    
    function typeNextChar() {
      if (pauseRequested) {
        currentAnimation = setTimeout(() => {
          pauseRequested = false;
          typeNextChar();
        }, 100);
        return;
      }
      
      if (i < text.length) {
        lineElement.textContent += text.charAt(i);
        i++;
        
        let pauseTime = delay;
        
        const char = text.charAt(i-1);
        if (['.', ',', ':', '…', '?', '!', ';'].includes(char)) {
          pauseTime = delay * 6;
        } else if (char === ' ') {
          pauseTime = delay * 3.8;
        }
        
        lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        currentAnimation = setTimeout(typeNextChar, pauseTime);
      } else {
        lineElement.classList.remove('typing');
        lineElement.classList.add('typed');
        resolve();
      }
    }
    
    currentAnimation = setTimeout(typeNextChar, 100);
  });
}

// Mostrar el mensaje
async function showMessage() {
  const lines = mensaje.split('\n').map(l => l.trim()).filter(Boolean);
  
  const linesContainer = createAllLineElements(lines);
  messageContainer.appendChild(linesContainer);
  
  const lineElements = linesContainer.querySelectorAll('.line');
  
  isTyping = true;
  for (let i = 0; i < lineElements.length; i++) {
    const lineElement = lineElements[i];
    const lineText = lineElement.getAttribute('data-text');
    
    await typeCharByChar(lineElement, lineText, currentDelay);
    
    if (i < lineElements.length - 1) {
      const pauseTime = Math.min(800, 400 + lineText.length * 2);
      await new Promise(r => setTimeout(r, pauseTime));
    }
  }
  
  isTyping = false;
  
  // Mostrar mensaje final
  const endMessage = document.createElement('div');
  endMessage.className = 'end-message';
  endMessage.innerHTML = `
    <div class="final-text">Gracias por leer... la respuesta que tomes la respetare, solo se honesta por favor... te amoo ❤️</div>
    <button id="restart-btn">Volver a leer</button>
  `;
  messageContainer.appendChild(endMessage);
  
  setTimeout(() => {
    endMessage.classList.add('visible');
  }, 800);
  
  document.getElementById('restart-btn').addEventListener('click', () => {
    messageContainer.innerHTML = '';
    showMessage();
  });
}

// Control de velocidad y pausas con teclado
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && isTyping) {
    e.preventDefault();
    if (currentAnimation) {
      clearTimeout(currentAnimation);
      currentAnimation = null;
      pauseRequested = true;
    }
  } else if (e.code === 'ArrowUp') {
    currentDelay = Math.max(10, currentDelay - 5);
  } else if (e.code === 'ArrowDown') {
    currentDelay = Math.min(100, currentDelay + 5);
  }
});

// Función para comprobar si el dispositivo es móvil
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Iniciar cuando se hace clic en el botón
startBtn.addEventListener('click', () => {
  if (isMobile()) {
    document.body.classList.add('mobile');
  }
  
  bgMusic.volume = 0.4;
  const playPromise = bgMusic.play();
  
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log('Reproducción automática no permitida:', error);
      const musicBtn = document.createElement('button');
      musicBtn.id = 'music-btn';
      musicBtn.textContent = '🎵 Reproducir música';
      musicBtn.addEventListener('click', () => bgMusic.play());
      messageContainer.prepend(musicBtn);
    });
  }
  
  startScreen.classList.add('fade-out');
  setTimeout(() => {
    startScreen.classList.add('hidden');
    messageContainer.classList.remove('hidden');
    messageContainer.classList.add('fade-in');
    
    setTimeout(() => {
      showMessage();
    }, 1000);
  }, 1000);
});

// Controles táctiles para móviles
messageContainer.addEventListener('click', () => {
  if (isTyping && currentAnimation) {
    clearTimeout(currentAnimation);
    currentAnimation = null;
    pauseRequested = true;
  }
});

// Detener música al salir
window.addEventListener('beforeunload', () => {
  bgMusic.pause();
});

// Información sobre controles
document.addEventListener('DOMContentLoaded', () => {
  const controlsInfo = document.createElement('div');
  controlsInfo.className = 'controls-info';
  controlsInfo.innerHTML = isMobile() ? 
    'Toca la pantalla para pausar/continuar' : 
    'Espacio: pausar/continuar | ↑: más rápido | ↓: más lento';
  
  document.body.appendChild(controlsInfo);
  
  setTimeout(() => {
    controlsInfo.classList.add('show');
    setTimeout(() => {
      controlsInfo.classList.remove('show');
    }, 5000);
  }, 500);

});

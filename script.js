const traditions = {
    global: {
        movements: [
            { type: 'vertical', meaning: 'Sim', element: 'Ar', energy: 'Positiva', advice: 'Siga sua intuição interior' },
            { type: 'horizontal', meaning: 'Não', element: 'Terra', energy: 'Estável', advice: 'Reavalie suas escolhas' },
            { type: 'circular', meaning: 'Confirmação', element: 'Fogo', energy: 'Dinâmica', advice: 'Aja com determinação' },
            { type: 'erratic', meaning: 'Incerto', element: 'Água', energy: 'Fluctuante', advice: 'Aguarde clareza' }
        ]
    },
    celtic: {
        movements: [
            { type: 'spiral', meaning: 'Ciclo Completo', element: 'Carvalho', energy: 'Cósmica', advice: 'Honre os ciclos naturais' },
            { type: 'cross', meaning: 'Encruzilhada', element: 'Teixo', energy: 'Mística', advice: 'Escolha com sabedoria' }
        ]
    },
    yoruba: {
        movements: [
            { type: 'shake', meaning: 'Atenção', element: 'Fogo', energy: 'Axé', advice: 'Consulte seus ancestrais' },
            { type: 'still', meaning: 'Equilíbrio', element: 'Terra', energy: 'Asé', advice: 'Mantenha a harmonia' }
        ]
    },
    taoista: {
        movements: [
            { type: 'yin', meaning: 'Receptividade', element: 'Água', energy: 'Yin', advice: 'Aguarde o momento certo' },
            { type: 'yang', meaning: 'Ação', element: 'Fogo', energy: 'Yang', advice: 'Inicie o movimento' }
        ]
    },
    nordic: {
        movements: [
            { type: 'runes', meaning: 'Destino', element: 'Gelo', energy: 'Urðr', advice: 'Aceite seu caminho' },
            { type: 'thunder', meaning: 'Mudança', element: 'Trovão', energy: 'Þór', advice: 'Rompa obstáculos' }
        ]
    }
};

let currentTradition = 'global';
let animationId;

document.querySelectorAll('.tradition-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tradition-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTradition = btn.dataset.tradition;
    });
});

function initiateDivination() {
    const question = document.getElementById('userQuestion').value.trim();
    if (!question) return alert("Formule sua pergunta!");
    
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('pendulum-screen').classList.remove('hidden');
    
    startAutoPendulum();
    simulateLoading();
}

function startAutoPendulum() {
    const pendulum = document.getElementById('pendulum');
    const startTime = Date.now();
    const duration = 5000;
    
    function animate() {
        const progress = (Date.now() - startTime) / duration;
        const angle = 30 * Math.sin(progress * Math.PI * 4);
        pendulum.style.transform = `rotate(${angle}deg)`;
        
        if (progress < 1) {
            animationId = requestAnimationFrame(animate);
        } else {
            determineResult();
        }
    }
    
    animationId = requestAnimationFrame(animate);
}

function simulateLoading() {
    document.querySelector('.loading-progress').style.width = '100%';
}

function determineResult() {
    cancelAnimationFrame(animationId);
    const tradition = traditions[currentTradition];
    const result = tradition.movements[Math.floor(Math.random() * tradition.movements.length)];
    
    document.getElementById('pendulum-screen').classList.add('hidden');
    document.getElementById('interpretation-screen').classList.remove('hidden');
    
    showResult(result);
}

function showResult(result) {
    document.getElementById('interpretation-title').textContent = result.meaning;
    document.getElementById('element').textContent = result.element;
    document.getElementById('energy-type').textContent = result.energy;
    document.getElementById('advice').textContent = result.advice;
    document.getElementById('interpretation-text').textContent = `Movimento ${result.type} detectado na tradição ${currentTradition}`;
}

function resetPendulum() {
    document.getElementById('interpretation-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('userQuestion').value = '';
    document.querySelector('.loading-progress').style.width = '0%';
    document.getElementById('pendulum').style.transform = 'rotate(0deg)';
}
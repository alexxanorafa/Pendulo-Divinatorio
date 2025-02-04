const traditions = {
    global: {
        movements: [
            { type: 'vertical', meaning: 'Sim', element: 'Ar', energy: 'Positiva', advice: 'Siga sua intuição' },
            { type: 'horizontal', meaning: 'Não', element: 'Terra', energy: 'Estável', advice: 'Reavalie as opções' }
        ]
    },
    celtic: {
        movements: [
            { type: 'sunwise', meaning: 'Aprovação', element: 'Carvalho', energy: 'Cósmica', advice: 'Siga o fluxo natural' },
            { type: 'widdershins', meaning: 'Cautela', element: 'Teixo', energy: 'Mística', advice: 'Reveja seus planos' }
        ]
    },
    yoruba: {
        movements: [
            { type: 'shake', meaning: 'Atenção', element: 'Fogo', energy: 'Axé', advice: 'Consulte ancestrais' },
            { type: 'still', meaning: 'Equilíbrio', element: 'Terra', energy: 'Asé', advice: 'Mantenha harmonia' }
        ]
    },
    taoista: {
        movements: [
            { type: 'yin', meaning: 'Receptivo', element: 'Água', energy: 'Yin', advice: 'Aguarde momento certo' },
            { type: 'yang', meaning: 'Ativo', element: 'Fogo', energy: 'Yang', advice: 'Tome iniciativa' }
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
let animationFrame;

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
    
    startAnalysis();
}

function startAnalysis() {
    const duration = 3000 + Math.random() * 2000;
    const start = Date.now();
    
    function animate() {
        const progress = (Date.now() - start) / duration;
        if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
        } else {
            showResult();
        }
    }
    
    animate();
}

function showResult() {
    const tradition = traditions[currentTradition];
    const result = tradition.movements[Math.floor(Math.random() * tradition.movements.length)];
    
    document.getElementById('pendulum-screen').classList.add('hidden');
    document.getElementById('interpretation-screen').classList.remove('hidden');
    
    document.getElementById('interpretation-title').textContent = result.meaning;
    document.getElementById('element').textContent = result.element;
    document.getElementById('energy-type').textContent = result.energy;
    document.getElementById('advice').textContent = result.advice;
    document.getElementById('interpretation-text').textContent = `Resposta ${result.type} na tradição ${currentTradition}`;
}

function resetPendulum() {
    cancelAnimationFrame(animationFrame);
    document.getElementById('interpretation-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('userQuestion').value = '';
}

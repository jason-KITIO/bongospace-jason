import React from 'react';
import { Chart, LineController, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

// Enregistrement des composants Chart.js
Chart.register(...registerables);

const MyChart = () => {
    // Données du graphique
    const data = {
        labels: [12, 13, 14, 15, 16, 17, 18, 19], // Abscisses
        datasets: [
            {
                label: 'data',
                data: [100, 200, 300, 200, 50, 150, 400, 200], // Ordonnées
                borderColor: '#E4626F',
                backgroundColor: 'transparent',
                fill: true,
                tension: 0.4, // Pour arrondir les points de changement
            },
        ],
    };

    // Options du graphique
    const options = {
        scales: {
            x: {
                display: true, // Ne pas afficher l'axe X
            },
            y: {
                display: true,
                beginAtZero: true,
                grid: {
                    drawBorder: false, // Ne pas afficher la bordure de l'axe Y
                    color: function (context) {
                        if (context.tick.value === 0) {
                            return 'rgba(75, 192, 192, 1)'; // Couleur continue pour la ligne à 0
                        } else {
                            return 'rgba(75, 192, 192, 0.2)'; // Couleur en pointillés pour les autres lignes
                        }
                    },
                },
            },
        },
        elements: {
            point: {
                radius: 5, // Taille des points
                hoverRadius: 7, // Taille des points au survol
            },
        },
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
};

export default MyChart;
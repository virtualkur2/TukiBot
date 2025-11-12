const { SlashCommandBuilder } = require('discord.js');
const { shuffle } = require('../utils');

const locations = [
  'Petare',
  'El Valle',
  'Mamera',
  'La Candelaria',
  'Sarría',
  'Pinto Salinas',
  'Chacao',
  'Agua Salud',
  'Caño Amarillo',
  'San Martín',
  'Montalban',
  'Caricuao',
  'Las Mercedes',
  'Caurimare',
  'Baruta',
  'Manzanares',
  'El Hatillo',
  'Terrazas del Ávila',
  'Plan de Manzano',
  'Plaza Venezuela',
  'Los Chaguaramos',
  'Bello Monte',
  'Santa Mónica',
  'El Paraíso',
  'La Vega',
  'El Zoológico',
  'Las Adjuntas',
  'El Guarataro'
];

const streets = [
  'Autopista Francisco Fajardo',
  'Cota Mil',
  'Cota 905',
  'Avenida Páez',
  'Avenida Libertador',
  'Avenida Urdaneta',
  'Avenida Nueva Granada',
  'Avenida Fuerzas Armadas',
  'Autopista Valle-Coche',
  'Avenida Principal de la Trinidad',
  'Carretera Vieja de Baruta',
  'Avenida Sucre',
  'Avenida Victoria',
  'Principal de Los Dos Caminos',
  'Principal del Cafetal',
];

const situations = [
  'se estrellaron contra una gandola',
  'les cayeron a tiro',
  'se cayó de la moto',
  'el mototaxista lo atracó y lo dejó botado',
  'los paró la Guardia Nacional y los matraqueó',
  'se les dañó la moto',
  'se quedaron sin gasolina',
  'los paró PoliChacao y se los llevó detenidos',
  'los paró PoliBaruta y se dieron al pire',
  'el mototaxista se negó porque le dio mala espina',
  'el mototaxista atracó a varios conductores en una cola',
  'se los llevó por el medio una camionetica por puesto',
  'se quedaron sin frenos y se estrellaron contra un poste',
  'el mototaxista se fue haciendo caballito casi todo el camino',
  'se le espichó el caucho a la moto',
];

const randomStreets = [];
const randomLocations = [];
const randomSituations = [];

const mototaxi = {
  data: new SlashCommandBuilder()
    .setName('mototaxi')
    .setDescription('Cooperativa Moto Taxi "Los Yuntas"'),
  async execute(interaction) {
    if (!randomLocations.length) randomLocations.push(...shuffle(locations));
    if (!randomStreets.length) randomStreets.push(...shuffle(streets));
    if (!randomSituations.length) randomSituations.push(...shuffle(situations));
    const location = randomLocations.shift();
    const situation = randomSituations.shift();
    const street = randomStreets.shift();
    const message = `${interaction.user
      } pidió un servicio de Moto Taxi para ir a ${location
      } y ${situation
      } en la ${street
      }, qué bolas!!!`;
    await interaction.reply(message);
  },
};

module.exports = mototaxi;

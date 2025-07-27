'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'destination',
      [
        {
          name: '1800 Hotel y Restaurante',
          address: 'Cerro verde',
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          image_url:
            'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/36/ec/5d/casa-1800-cerro-verde.jpg?w=900&h=500&s=1',
          likes: 0,
          is_deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Lago de Coatepeque',
          address: 'Santa Ana, El Salvador',
          description:
            'El Lago de Coatepeque es un hermoso lago volcánico ubicado en el departamento de Santa Ana. Es uno de los destinos turísticos más populares de El Salvador, conocido por sus aguas cristalinas y su entorno natural espectacular.',
          image_url: 'https://example.com/lago-coatepeque.jpg',
          likes: 15,
          is_deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Ruta de las Flores',
          address: 'Ahuachapán, El Salvador',
          description:
            'La Ruta de las Flores es una pintoresca carretera que conecta varios pueblos coloniales en las montañas de Ahuachapán. Es famosa por sus cafetales, flores coloridas y arquitectura colonial bien preservada.',
          image_url: 'https://example.com/ruta-flores.jpg',
          likes: 32,
          is_deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Playa El Tunco',
          address: 'La Libertad, El Salvador',
          description:
            'Playa El Tunco es una de las playas más famosas de El Salvador, conocida por sus excelentes olas para surfear y su vibrante vida nocturna. Es un destino popular tanto para surfistas como para turistas que buscan relajarse.',
          image_url: 'https://example.com/playa-tunco.jpg',
          likes: 28,
          is_deleted: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('destination', null, {});
  },
};

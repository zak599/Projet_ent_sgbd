require('dotenv').config();

const dbClient = require('./utils/db-client.util');

const seed = async () => {
    const db = await dbClient.db(process.env.MONGO_DB_DATABASE);

    const collections = ['professeurs', 'etudiants', 'cours', 'resultats'];

    const existingCollectionsCursor = await db.listCollections();
    const existingCollections = await existingCollectionsCursor.toArray();
    const existingCollectionNames = existingCollections.map((c) => c.name);

    for (const c of collections) {
        try {
            if (existingCollectionNames.includes(c)) {
                await db.dropCollection(c);
            }
            await db.createCollection(c);
        } catch (e) {
            console.error(c, e);
        }
    }

    const professeurDto = [
        {
            nom:'robert',
            email: 'robert.reni@gmail.com',
            address: {
                street: 'Rue du nord',
                nbr: 67,
                postCode: 7700,
                city: 'Mouscron',
                country: 'Belgium',
            },
            telephone: 0465251465,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    await db.collection('professeur').insertOne(professeurDto);

    const etudiantDto = {
        name: {
            first: 'jean',
            last: 'luc',
        },
        email: 'jean.luc@gmail.com',
        address: {
            street: 'Rue de la liberte',
            nbr: 11,
            postCode: 7700,
            city: 'Mouscron',
            country: 'Belgium',
        },
        telephone: 0467564654,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await db.collection('etudiant').insertOne(etudiantDto);

};


seed();
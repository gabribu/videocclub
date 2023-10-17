const Sequelize = require('sequelize');

const userModel = require('./models/user');
const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const memberModel = require('./models/member');
const movieActorModel = require('./models/movieActor');
const bookingModel = require('./models/booking');
const copyModel = require('./models/copy');

/*
    1) Nombre de la db
    2) Usuario db
    3) Contraseña db
    4) Objeto de config ORM
*/


const sequelize = new Sequelize('railway', 'root', '0sqw5nu$muisbctvnhx4c1bcuo2bqqlt',{
    host: 'roundhouse.proxy.rlwy.net',
    port: 51219,
    dialect: 'mysql',
});


const User = userModel(sequelize, Sequelize);
const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);
const Copy = copyModel(sequelize, Sequelize);

// Un genero puede tener muchas pelis
Genre.hasMany(Movie, {as:'movies'});
// Un peli tiene un genero
Movie.belongsTo(Genre, {as:'genre'});
// Un dir puede tener muchas pelis
Director.hasMany(Movie, {as:'movies'});
// Una peli tiene un dir
Movie.belongsTo(Director, {as: 'director'});

// Un actor participa en muchas pelis
MovieActor.belongsTo(Movie, {foreingKey: 'movieId'});

// En una peli hay muchos actores
MovieActor.belongsTo(Actor, {foreingKey: 'actorId'});

// Una peli tiene varias copias
Movie.hasMany(Copy, {as:'copies'});

// Una copia tiene una peli
Copy.belongsTo(Movie, {as:'movie'});

// Una copia tiene muchas reservas
Copy.hasMany(Booking,{as:'bookings'});

// Una reserva tiene una copia
Booking.belongsTo(Copy, {as:'copy'});

// Un miembro puede tener muchas reservas
Member.hasMany(Booking, {as:'bookings'});

// Una reserva tiene un miembro
Booking.belongsTo(Member, {as:'members'});

Movie.belongsToMany(Actor, {
    foreingKey: 'actorId',
    as: 'actors',
    through: 'movies_actors'
});

Actor.belongsToMany(Movie,{
    foreingKey: 'movieId',
    as: 'movies',
    through: 'movies_actors'
});

sequelize.sync({ 
    force: true
}).then(() => {
    console.log('Base de datos sincronizada');
});

module.exports = { User, Director, Genre, Movie, Actor, Member, Booking, Copy };

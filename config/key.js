// this file will keep the important key.
// it will not added to the gitHub. due the reference in .gitignore
// for heroku push remove the refrence and push

const configData = {
    mongoDB : { url : 'mongodb://bookfilm:bookfilm1@ds157522.mlab.com:57522/bookfilmserver'},
    expressSession : { secret : 'timetravelispossible'}, 
    googleAuth : {  clientID : "340070489197-np55i4173ljcopi5ggeoe0h15vmak33h.apps.googleusercontent.com",
                    secret: "Al-gOPvHU5ISTZaw9d88LngU",
                    redirectUrl : "http://localhost:5000/api/auth/google/callback"
                 },
}

module.exports = configData;
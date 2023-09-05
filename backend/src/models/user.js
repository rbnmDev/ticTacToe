import connection from '../db/mongoose.js';


const UserSchema = new connection.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    totalGames: {
        type: Number,
        default: 0
    }
})

const User = connection.model('User', UserSchema);

export default User;
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUser = void 0;
const database_1 = require("../database");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM users');
        res.status(200).json(response.rows);
    }
    catch (error) {
        console.error('Error al consultar la base de datos:', error);
        console.log('Error al consultar la base de datos:', error);
        res.status(500).send('Error en la base de datos');
    }
});
exports.getUser = getUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query('SELECT * FROM users WHERE id=$1', [id]);
    res.json(response.rows);
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    const response = yield database_1.pool.query('INSERT INTO users(name, email) VALUES($1, $2)', [name, email]);
    res.json({
        message: 'User created successfully',
        body: {
            user: {
                name, email
            }
        }
    });
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    yield database_1.pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
    res.json('User ' + [id] + ' updated successfully');
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    yield database_1.pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json('User ' + [id] + ' deleted successfully');
});
exports.deleteUser = deleteUser;

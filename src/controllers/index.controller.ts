import {Request, Response} from 'express'
import {QueryResult} from 'pg'

import { pool } from '../database'

export const getUser = async (req: Request, res: Response): Promise<void>  => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM users');
         res.status(200).json(response.rows);
    } catch (error) {
        console.error('Error al consultar la base de datos:', error)
        console.log('Error al consultar la base de datos:', error)
         res.status(500).send('Error en la base de datos');
    }
};

 export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id)
    const response: QueryResult = await pool.query('SELECT * FROM users WHERE id=$1', [id]);
     res.json(response.rows);
} 

export const createUser = async(req: Request, res: Response): Promise<void> => {
    const {name, email} = req.body;
    const response: QueryResult = await pool.query('INSERT INTO users(name, email) VALUES($1, $2)', [name, email])
     res.json({
        message: 'User created successfully',
        body:{
            user:{
                name, email
            }
        }
    })
}


export const updateUser = async (req: Request, res: Response): Promise<void> => {
   const id = parseInt(req.params.id);
   const {name, email} = req.body; 
   await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id]);
    res.json('User ' + [id] + ' updated successfully' );
}


export const deleteUser = async(req: Request, res: Response): Promise<void> => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
     res.json('User ' + [id] + ' deleted successfully' );
    
} 
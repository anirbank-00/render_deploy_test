/**
 * @description This file contain all functions to interact with users table in Postgresql database
 * @author {Anirban Karmakar}
 */
import connection from '../../utils/db-connect';

// Models
import { User } from '../../models/user.model';

const userRepository = connection.getRepository(User);

/**
 * @description Get one user by id
 * @param {string | mongoose.Types.ObjectId} id - User id
 * @param {ProjectionType<User>} selectedField - Selected field
 * @returns {Promise<User | null>} - User object or null
 */
async function findUserByEmail(email: string): Promise<User | null> {
  return userRepository.findOneBy({
    email,
  });
}

/**
 * @description Create new user
 * @param {User | object} data - User data
 * @returns {Promise<User>} - User object
 */
async function createOrSaveUser(data: User | object): Promise<User> {
  return userRepository.save(data);
}

export default {
  findUserByEmail,
  createOrSaveUser,
};
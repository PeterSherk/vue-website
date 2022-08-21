/**
 * @openapi
 *  components:
 *    schemas:
 *      User:
 *        required:
 *          - username
 *        properties:
 *          username:
 *            type: string
 *            description: Username for the user, needs to be unique.
 *          password:
 *            type: string
 *            description: Username's password, hashed for privacy.
 *        example:
 *           username: johndoe123
 *           password: hash(password123)
 */
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

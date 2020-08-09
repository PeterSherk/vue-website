/**
 * @swagger
 *  components:
 *    responses:
 *      ErrorMessage:
 *        properties:
 *          message:
 *            type: string
 *            description: Response message.
 *        example:
 *            message: "An error occurred."
 *
 */
class ErrorMessage {
  constructor(message) {
    this.message = message;
  }
}
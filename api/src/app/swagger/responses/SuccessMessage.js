/**
 * @swagger
 *  components:
 *    responses:
 *      SuccessMessage:
 *        properties:
 *          message:
 *            type: string
 *            description: Response message.
 *        example:
 *            message: "Request was successful."
 *
 */
class SuccessMessage {
  constructor(message) {
    this.message = message;
  }
}
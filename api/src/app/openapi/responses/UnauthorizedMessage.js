/**
 * @openapi
 *  components:
 *    responses:
 *      UnauthorizedMessage:
 *        properties:
 *          message:
 *            type: string
 *            description: Response message.
 *        example:
 *            message: "Authorization failed."
 *
 */
class UnauthorizedMessage {
  constructor(message) {
    this.message = message;
  }
}
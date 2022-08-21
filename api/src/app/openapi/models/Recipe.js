/**
 * @openapi
 *  components:
 *    schemas:
 *      Recipe:
 *        properties:
 *          id:
 *            type: number
 *            description: Primary key to uniquely identify recipe.
 *          displayName:
 *            type: string
 *            description: The display name fo the recipe
 *          websiteUrl:
 *            type: string
 *            description: The URL that the recipe came from, if any.
 *          description:
 *            type: string
 *            description: The overview of the recipe
 *          pictureUrl:
 *            type: string
 *            description: The URL of the main picture for the recipe
 *          steps:
 *            type: string
 *            description: A list of steps to make the recipe.
 *          ingredients:
 *            type: string
 *            description: A separate list of ingredients to make the recipe, possibly tied to steps.
 *          dateAte:
 *            type: string
 *            description: The date the recipe was consumed by myself. Yum.
 *          createDate:
 *            type: string
 *            description: Date the recipe was entered into the system.
 *        example:
 *            displayName: "Beef Bolognese"
 *            websiteUrl: "https://www.bonappetit.com"
 *            description: "Yummy beef recipe, super easy"
 *            pictureUrl: "https://www.bonappetit.com"
 *            steps: [{ "description": "wash it!" }, { "description": "cook it!" }, { "description": "eat it!" }]
 *            ingredients: { "dairy": ["milk", "eggs"], "produce": ["onion"] }
 *            dateAte: 2022-01-02
 *
 */
class Recipe {
  constructor(id, displayName, websiteUrl, description, pictureUrl,
      steps, ingredients, dateAte, createDate) {
    this.id = id;
    this.displayName = displayName;
    this.websiteUrl = websiteUrl;
    this.description = description;
    this.pictureUrl = pictureUrl;
    this.steps = steps;
    this.ingredients = ingredients;
    this.dateAte = dateAte;
    this.createDate = createDate;
  }
}
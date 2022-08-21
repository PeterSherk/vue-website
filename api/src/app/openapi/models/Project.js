/**
 * @openapi
 *  components:
 *    schemas:
 *      Project:
 *        properties:
 *          id:
 *            type: number
 *            description: Primary key to uniquely identify project.
 *          company:
 *            type: string
 *            description: Name of company.
 *          name:
 *            type: string
 *            description: Name of the project.
 *          overview:
 *            type: string
 *            description: The overview of the project.
 *          year:
 *            type: number
 *            description: The year that the project was done.
 *          content:
 *            type: string
 *            description: The image url's and description content for the project.
 *        example:
 *            id: 1
 *            company: "Example Company"
 *            name: "Example Company Example Project"
 *            overview: "A fun example project"
 *            year: 2020
 *            content: { "image": "img/example.png", "title": "Example Image", "description": "Fun Example Image" }
 *
 */
class Project {
  constructor(id, company, name, overview, year, content) {
    this.id = id;
    this.company = company;
    this.name = name;
    this.overview = overview;
    this.year = year;
    this.content = content;
  }
}
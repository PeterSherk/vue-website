/**
 * @swagger
 *  components:
 *    schemas:
 *      ProjectOverview:
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
 *          year:
 *            type: number
 *            description: The year that the project was done.
 *        example:
 *            id: 1
 *            company: "Example Company"
 *            name: "Example Company Example Project"
 *            year: 2020
 *
 */
class ProjectOverview {
  constructor(id, company, name, year) {
    this.id = id;
    this.company = company;
    this.name = name;
    this.year = year;
  }
}
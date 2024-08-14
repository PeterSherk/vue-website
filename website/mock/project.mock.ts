export const DEFAULT_PROJECT_LIST = [
  {
    "company": "Volvo Trucks",
    "id": "1",
    "name": "Project Tracker",
    "overview": "The Project Tracker is an application used by Requirements Managers to track their progress on various Projects. After seeing the requested updates and the current application, I decided to rewrite the application in C# using Windows Forms. My goals were simplicity and functionality. I was the only intern assigned to this task. Volvo owns and operates all rights to the Project Tracker",
    "year": "2017",
    "content": [
      {
        "image": "https://api.petersherk.com/img/old.gif",
        "title": "The Old",
        "description": "With the original design, there are a few problems. First, a password prompt that doesn't require an input for authentication. Second, there are multiple prompts to save edits or continue editing. Third, multiple options on the top right bar are inactive in edit mode, which may be confusing for the user."
      },
      {
        "image": "https://api.petersherk.com/img/editGates.gif",
        "title": "The New",
        "description": "Now, authentication is done on the back end. The user doesn't need to know how the permissions are done, just that they have access to their data. A few things have also been shuffled around: The cancel edits button now only appears in edit mode, when it would be necessary to use. Also, the items on the right hand side can be collapsed for a smaller view. Since these items aren't used often, I grouped them together. The user requested that the two Create Project and Create Sub-Project buttons still be deactivated in edit mode."
      },
      {
        "image": "https://api.petersherk.com/img/addProject.gif",
        "title": "Create a Project",
        "description": "Let us begin at the start of the user flow; creating a Project. One of my main goals for this project was to make the overall application smaller, while adding functionality. Another goal was simplicity, achieved through larger text and simpler UI."
      },
      {
        "image": "https://api.petersherk.com/img/addSubProj.gif",
        "title": "Add a Sub-Project",
        "description": "Another important feature they wanted was Sub-Projects, each with their own data but under an umbrella Project. You can see again my overall goal of simplicity. Clicking the add Sub-Project button pulls up a prompt to enter a name and submit it, nothing else. It automatically updates the tree view as well as selects the new Sub-Project. The user wanted to see all Sub-Projects gates, so a new row is added in the Gates view. I have made the currently selected gate highlighted in blue."
      },
      {
        "image": "https://api.petersherk.com/img/deleteAndRenameProj.gif",
        "title": "Delete and Rename Project",
        "description": "I decided to put the edit/delete Project actions inside of a drop-down. Since this is a more serious operation used sparingly, it didn't need to be in view. The edit operation automatically updates in the tree view as well as in the Project drop-down. Error checking is done to make sure the new ID doesn't already exist."
      },
      {
        "image": "https://api.petersherk.com/img/deleteSubProj.gif",
        "title": "Delete Sub-Project",
        "description": "You can see there are two options to delete a Sub-Project, a menu item or a right click, for those more tech savvy. Since Volvo has a varying age population, I wanted to design something that is usable by all ages and tech knowledge levels."
      },
      {
        "image": "https://api.petersherk.com/img/addRole.gif",
        "title": "Add Role",
        "description": "Roles are extremely important for Projects. This was built for Requirements Managers, who need to know who to contact for various Projects. Since people may have multiple roles, I allowed a person to be added to the system multiple times. After addition, a person is permanently added to their corresponding drop-down, accessible across Projects. The RM's requested that after addition, the system go into edit mode and the person auto-added to the role for that Project."
      },
      {
        "image": "https://api.petersherk.com/img/editAndDeleteRole.gif",
        "title": "Edit and Delete Role",
        "description": "You can see there are multiple options for searching users in the system. Once selected, you can update or delete. The corresponding drop-downs reflect changes, but assignments in Projects are left alone. So if someone is removed from the system, they aren't removed from a potentially closed Project."
      },
      {
        "image": "https://api.petersherk.com/img/email.gif",
        "title": "Email",
        "description": "Being able to email people is essential. If they are added to the system, they can be contacted. A simple drag-drop or double click lets a user easily select who to email. An Outlook template is then generated. If there are people in the current Project who are in the system, they are auto-added to the right-hand side."
      },
      {
        "image": "https://api.petersherk.com/img/fileOptions.gif",
        "title": "Filter",
        "description": "A requested feature was filtering by Open/Closed Projects. I added these to the menu bar."
      },
      {
        "title": "Overall",
        "description": "Overall, the new application was 33.33% smaller than the old one, with a lot of added functionality. My goals for the summer were to design a simpler system that catered to a variety of people. Since it was only me working on this, I had a lot of autonomy to make some interesting design decisions, some good and some bad. It was an interesting and challenging project, and I hope the improvements I made help Volvo workers in their day-to-day operations."
      }
    ]
  }
];
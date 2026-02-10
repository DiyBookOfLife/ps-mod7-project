## Description

This project is a responsive countries explorer built using the REST Countries API. Users can browse all countries, search by name, filter by region, and view detailed information for each country on a separate page. The detail view includes population data, region and subregion info, capital, languages, currencies, and clickable border countries for easy navigation. A light and dark mode toggle is also included to improve usability and match the provided design.

## Live Demo

- Live Site URL: [View Live Demo](https://ps-mod7-project-8efueq634-toni-thomas-projects.vercel.app)

### Built with

- Semantic HTML5
- CSS (Flexbox, Grid, Media Queries)
- Vanilla JavaScript
- REST Countries API
- Dynamic DOM manipulation
- URL query parameters for navigation

### What I learned

This project helped me better understand how real-world front-end applications are structured and how different pieces of functionality work together. I focused first on fetching data from the REST Countries API and rendering country cards dynamically on the homepage. From there, I added search and region filtering, which strengthened my understanding of array methods, event listeners, and updating the DOM based on user input.

One of the biggest learning moments for me was implementing navigation between pages using query parameters. I researched how to pass data through the URL and retrieve it using `URLSearchParams`. Once I understood how to use a country’s code to fetch detailed data on a separate page, the entire project started to feel more connected and realistic.

I also learned the importance of keeping rendering logic consistent and avoiding duplicated code. While debugging issues related to navigation, event listeners, and dynamic rendering, I gained more confidence in reading errors, isolating problems, and fixing them without overcomplicating the solution. Implementing dark mode helped reinforce how CSS class toggling can be used to control global styling.

### Continued development

In future projects, I want to continue improving how I structure larger JavaScript files and reduce repetition by creating reusable helper functions. I would also like to spend more time enhancing accessibility, refining responsive layouts, and persisting user preferences such as dark mode using local storage. As I move forward, I plan to keep building projects that involve APIs and multi-page navigation to further strengthen my front-end development skills.

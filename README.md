# HeliosX Frontend Tech Test

## How to run

1. Clone the repository
2. Run `npm i` to install dependencies
3. Start the application with `npm run dev` - which will run at http://localhost:5174/
4. Run `npm run test` to run the tests using Jest and react-testing-library

Node - v20.9.0
NPM - 10.2.3

## Tech Choices

- Vite with React was chosen due to the performance and ease of use to get started quickly. Based on the requirements, using a full framework like Next.js seemed unneccessary as there was not any requirement for SSR, SSG, routing or SEO improvements.
- Tailwind CSS was used to keep consistent with current technologies used at HeliosX, and as a personal preference due to existing classes making development quick, and the ability to easily extend with brand styling.
- cva, clsx and tailwind-merge to create button variants, that could be extended further easily for other common components.
- Jest and React Testing Library - widely used with lots of support, ability to test user behaviour well and test for accessibility with aria.

## Improvements

- Refactoring the ConsultationForm - quite a lot of states used and a useEffect, this could be broken up more and there is room to improve the solution to remove some of the state to improve performance.
- If extended to be a full application, supporting other pages and mediciation consultantions, it would be worth using Next.js to improve SEO and performance by using SSR.

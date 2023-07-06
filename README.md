# Uzma's Art Shop
### Brief Overview ###
I have always loved being creative, where I find hobbies in painting, sketching, and graphic design. Similarly, I am very interested in web design and full-stack development. This project serves to combine both of my interests in the form of an e-commerce shop.


https://github.com/uzFer/eCommerce-Art-Shop/assets/109243682/592e2ae0-38b2-471c-8b21-d0a9ff58e5e8



### Key Features ###
- 'Add to cart functionality' with Stripe checkout
- 'Add to favourites' functionality - can be saved to account if signed in or within session otherwise
- Paintings page with ability to add to cart, 'like', filter based on category/price, and click on any given painting for more info
- Individual painting page that shows corresponding category, buttons to add to cart/favourites, and reviews for that product
  - User can only add a review when they are signed in
  - Users can edit/delete their own reviews
- Commission request form for users to send me emails
- Autocomplete search bar with search results page (once you click on the search icon)
- Sign in functionality and favourites list on account page

### Tech Used ###
- Used **_React.js_**, **_Next.js_**, and **_Styled-Components_** for building the front-end of the application with improved server side rendering
- Stored users, paintings, categories, orders, favourites, and reviews info in **_MongoDB_** using Mongoose and HTTP requests
- **_NextAuth.js_** with Google Provider to sign users in
  - Used MongoDB adapter to store data about users, accounts, sessions, etc.
- **_EmailJS_** for sending commission request emails with my specified template
- Leveraged **_React Toastify_** library for displaying success and failure alerts to user
- Implemented filter options on painting page using **_React-Select_** library

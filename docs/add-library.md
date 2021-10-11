# Add a new library

Before adding a library you will need to determine:

- type
- scope

See 'Library type' and 'Library scope' sections below for explanation

Create the library:

1. build the nx command that will scaffold the library; to calculate this command use: [library-command-generator](https://docs.google.com/spreadsheets/d/11yt4-Tmhq87nlnX6Tcba98HnGQJk42IOBQk4t7RUIfc/edit?usp=sharing)
2. execute the nx command to generate the library
3. if the library will have ui elements add storybook configuration:
   - run: `yarn nx g @nrwl/storybook:configuration {public|shared|app}-{library-name} --configure-cypress=false --ui-framework=@storybook/angular`

## Library type

- Determines the type of code that can be placed in that library. For example a widget library can only have generic presentation components.
- Determines the access rules between libraries ie which library can depend on another

For details of what code can be added to a library and the access rules between libraries see the following powerpoint slides: [library-dependency-matrix.pptx](https://docs.google.com/presentation/d/1BKccOAkU3FWHt5A6_y2LwNCCpYkgFzxl/edit?usp=sharing&ouid=108083068793738777920&rtpof=true&sd=true)

## Library scope

Defines the visibility of the library within the repo. For example a shared library is visible to other shared libraries and to application specific libraries. Whereas an application specific library is only visible to other libraries specific to the application.

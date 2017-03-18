Hi everyone, I'm a full time flexible student here at thinkful and I'm
currently on the second lesson of the Node/backend course. As an educator
for nearly two decades, I think that the curriculum needs some major
improvements in some areas. This email will serve as a write up of various
areas which should be improved as they have caused me, and many other students
I've spoken with, immense frustration and misunderstanding.

## First, the principles I believe the curriculum should follow:

1. It needs to be accessible to all levels of experience. Many students at
thinkful including myself do have little to no prior coding experience.

2. It should be efficient and concise helping the student learn the material,
without having to waste time tracking down relevant information.

3. It should encourage research, where appropriate, including but not limited
to researching various methods related to specific frameworks taught by the
course (such as express and jquery).

4. It should provide detailed code examples (even if they are one line).
The ability to practice concepts taught in the course is as important as being
 able to read the lessons and documentation carefully.

5. The code examples need to be thoroughly explained. This is not always the
 case with the current version of the curriculum.

6. The challenge needs to be added gradually, with students being prepared for
longer and more difficult projects and challenges by preceding material.

7. Finally, debugging one's code and learning how to do it in detail is, in my
professional opinion the single most valuable thing the course needs to teach.


Below are specific examples, and suggested improvements (up to the point that
  I am currently at in the course):

### FEWD


##  Unit 1



# Lesson 1.2

  Add: Suggest trying other text editors such as Atom, and Visual Studio Code.
  Include some minor differences between them. Point out that a developer's
  workflow can be improved by learning the shortcuts for that specific editor,
  as well as installing plugins to improve productivity, such as linters
  (research encouraged), or use Sublime as recommended by default.


# Lesson 3.1

  Add: Point out that the default box model is content-box. And that
  border-box was originally used as default in IE (before being largely
  adopted as the de-facto css standard).


# Lesson 3.2

  Add: Two very useful features that every developer should know about:
    1. The ability to select a value for a property and use the up/down
    arrow keys to adjust it if it's a numerical value.
    2. That it's very useful to use the chrome dev tools to set your CSS,
    before copy pasting it to your text editor. Click on either the linked
     css if you are adding a rule to an existing selector, or the inspector
     stylesheet.css (which shows additional selectors and rules). Whether
     it was changed is marked by a background color change to red, and a   
     warning icon on the tab.


# Lesson 3.4

  Add: Include an optional drill on advanced selectors including nth:child,
  hover, active, etc.
  Add: Optional lesson on transitions and keyframes (basic things)

# Lesson 4

  Add: Lesson on github branches and merging
  Add: A final lesson drill that has the following objectives:
    1. Fork the starter files
    2. Take starter files and make a change, then commit the change.
    3. Checkout the original commit using the commit hash, and use git diff to
     see the differences (write the differences down, plus).
    4. Create a branch from the original commit.
    5. Create a new file in that branch.
    6. Checkout to master branch, then checkout to the 2nd (and final commit)
    on the master branch.
    7. Create a branch from this commit.
    8. Merge both branches into master branch and observe differences.


# Lesson 5.1

  Add: Include information on vertical alignment.

# Lesson 5.3.5 (after position property, before float)

  Add: Lesson on interactions of display and position properties. Also
  interactions of nested elements sent to different display and position
  properties. VERY important. End this lesson in an exercise.

# Lesson 5.4

  Add: A diagram showing the difference between enabling or disabling float
   and clear properties

# Lesson 6

  Add: Several drills practicing different form elements.  
  Add: Css properties as they relate to form elements (ways of making radio
     buttons prettier for example)

# Lesson 7.1

  Add: Explanation of how to determine screen width. One way in chrome tools
  is to select body and view the box model for the width.
  Add: Exercise in media queries, making at least two or three vastly different
  layouts for different resolutions.

# Lesson 7.2

  Add: Increase difficulty by adding a third layout for the given challenge.



## Unit2 (first 6 lessons are excellent)


# Lesson 6.1

  Add: Explain what happens when a key is overwritten (a new key is not added
    since keys in objects must be unique).


# Lesson 6.4

  Add: Accessing nested objects
  Add: Accessing objects with non standard symbols like '@' and '#'.
  Add: Accessing arrays inside of objects
  Add: Accessing multiple objects within a for loop
  Add: Possibly a few short exercises in using .map, .filter, and .reduce


# Lesson 6.7

  Add: Bring back advanced object drills including the merging objects drill
   (with the above additions the student is capable of doing it, and it is
     important in later preparation for the capstone)



## Unit 3


# Lesson 1.1

  Add: Explain the Jquery object, and that it has both helper functions `$.*`
  and dom traversal `$('css selector')` (turning the selected elements into an
  array)

# Lesson 2.1

  Add: The state can include data such as counters to help with controlling how
  and when functions run
  Add: A few drills on state management.


# Lesson 3.2 (move Thinkful Tube to 3.3)

  Add: Lesson on assynchronous code (especially as it relates to ajax). VERY
  important.
  Show examples that will not work (code is written in a synchronous way but
  expected to act assynchronously).



# Lesson 4.1

  Add: Provide some (short) basic examples of optimizing code


# Lesson 5.1

  Add: Recommendations for responsive design, and under what circumstances
  flex box, bootstrap, custom grids, specific media queries might be used.
  Include css rules that negatively affect responsive design and under what
  circumstances (could also be added to the css lesson)

  Add: Make the requirements more explicit

# Optional projects

  Add a way to 'complete' them if the student decides not to do them, so that
  the course shows 100% completion


### BACKEND


## Unit 1


# Lesson 1.1

  Add: Drills on ES6 components (keep them very short)

# Lesson 1.2

  Add: Drills with promises

# Lesson 1.3

  Add: Examples of http requests using vanilla node.js (no express)
  Add: Specificity everywhere (this lesson did not provide any useful
    information) (1-2 lines of code as examples)
  Add: Show the differences between GET POST PUT PATCH DELETE

# Lesson 1.4

  Add: `app.use(express.static('public'));` this line allows client scripts
  and html to request resources on the server ignoring absolute paths (provide
  short examples)


# Lesson 1.5

  Add: Specifically, go over cookies. How they are sent from client to server
  and vice versa. Explain the cookie parser (and JQuery cookie) in preparation
  for the drill







emason@thinkful.com
grae@thinkful.com
bboyle@thinkful.com

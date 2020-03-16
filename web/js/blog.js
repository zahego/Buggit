function blog(id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var contentBlog = ` 
    
    <style>
    
    #content {
        padding-left: 16px;
        padding-right: 16px;
    }
    #content h3{
    color:#F65893;
    font-size: 30px;
    }
    
    #content p {
        margin-left: 1em;
        /* indent paragraphs inside of content (indent amount is the size of a captial "M") */
    }
</style>

<h3>Homework 1: Homepage</h3>
<p>
    I created the foundation for the website that is the combination between reddit and stackoverflow.
    Very easy peasy since I have taken this class before. No visible problem.
    However, the grading said I had trouble with wrapping, which I'm sure I didn't. Will have to ask again.
    
</p>
<p>
</p>
<!-- download="../bloghw/lab_1.docx" -->
<h3>Homework 2: Database</h3>
<p>
    For the database portion, I design and populate the databases. All the information is in the link below.
    No visible problems since I have some expereince with MySQL. It just take a bit of time to relearn.
</p>
<p>
    For the web portion, I apply the router framework to my site for html injection in the content id for the sake of code reusing.
    I thought I could reuse the old code from the previous year with Ajaxcall but after rereading the requirement again, I realized I made a mistake. 
    The new method sure is strange at first, but after a while, I figure the error was the incorrect js file name when referencing.
    After that, the website should meet the requirement.
</p>
<p>
    Click <a href="https://drive.google.com/file/d/1iWYqjZUSF97gU7hH6zxkKNEXqpuunT2v/view?usp=sharing">here</a> to see the document that shows my populated database.
</p>
<h3>Homework 3: JSON Display</h3>
<p>
    In this assignment, I work on the hardcode display of table data through the use of JSON format. Nothing really new was learned, but I got the chance to practice with JSON again.
    Many issues were encounter. 
</p>
<p>First: Does the first requirement ask for both user role and web user table at the same time?
    Turn out the Search-User table require all data from Web-User table plus a few column from USer-Role table</p>
<p>Second: I was trying to do injection with script tag in my js file, but this seems to make the data unrecognization.
    Can't debug as well since console.log within the injection area doesnt work</p>
<p>Third: the combination of sorting and filtering isn't too hard. It takes quite some trials and errors though</p>
    
<h3>Homework 4: SlideShow Component</h3>
<p>
    In this assignment, I work on the slideshow component and how to manipulate DOM property inside JS file. Gotta say, this assignment was really a crime against humanity. 
Never has I seen this much trouble in my hw in this class before.
</p>
<p>First: css does not seems to allow custom property on my machine(possibly a netbean error, since the css on w3school work)</p>
<p>Second: double hyphen doesnt work. :root doesnt seems to work as well
</p>
<p>Third: css overwrite js function</p>
<p>Fourth: console.log("this is property name"+myImage.getOwnPropertyNames()); make width and height broke
</p>
<p>Fifth: dom object seems to have a lot of issue regarding non dom property</p>
<p>Sixth: My code is still very hard code right now, can't change other property like padding, margin, can only do number, no px, no string, borderLeft doesnt work</p>
<p>Overall terrible experience. 10/10 would try again</p>
    
<h3>Homework 5: WebAPI</h3>
<p>In this assignment, I created 2 jsp file to show the user and other information by pulling them from an external database. I also try out Vue and React in the spare time</p> 
<p>Easy: everything is easy as I'm quite experience with database connection. Confusing: I dont understand one of error that I had to generate: 'Database Not Authorized'. 
I expect authorization means who has access to the data, when authentication is the process of identifying user. The error I produce leans more toward authentication more than authorization</p> 
<p>Asides from the link provided, you can just click on 'User Info JSP' on the navbar to see how the JSP was beatifully turned into table format.</p>
<p> Click <a href="html/databaseError.docx">Here</a> to see my document about java DB access errors </p>
<p>Click <a href="webAPIs/listUsersAPI.jsp">here</a> for the Web API that lists the users from my DB and <a href="webAPIs/listOtherAPI.jsp">here</a> for the Web API that lists the other from my DB</p>


    `;
    document.getElementById(id).innerHTML = contentBlog;
}